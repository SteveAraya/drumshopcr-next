-- ─────────────────────────────────────────────
-- DRUM SHOP CR — Supabase Schema
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────

-- Tabla de productos
CREATE TABLE products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category    TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'limited', 'sold')),
  featured    BOOLEAN NOT NULL DEFAULT false,
  badge       TEXT,
  wa_text     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de imágenes de productos (máx 3 por producto)
CREATE TABLE product_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  "order"     INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_status   ON products(status);
CREATE INDEX idx_product_images_product_id ON product_images(product_id);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Row Level Security ───────────────────────

-- Productos: lectura pública, escritura solo autenticados
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read products"
  ON products FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Imágenes: lectura pública, escritura solo autenticados
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read product_images"
  ON product_images FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage product_images"
  ON product_images FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ─── Storage bucket para imágenes ────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

CREATE POLICY "Public can read product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
