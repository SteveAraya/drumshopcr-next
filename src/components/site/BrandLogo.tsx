interface Props {
  className?: string
  badge?: boolean
}

export default function BrandLogo({ className = '', badge = false }: Props) {
  if (badge) {
    return (
      <img
        src="/logo.svg"
        alt="DrumShop CR Mattei"
        className={className}
      />
    )
  }

  // Compact header version — just the SVG inline at small size
  return (
    <img
      src="/logo.svg"
      alt="DrumShop CR"
      className={className}
    />
  )
}
