interface Props {
  category: string
  className?: string
}

export default function CategoryIcon({ category, className = 'w-10 h-10' }: Props) {
  const props = { viewBox: '0 0 32 32', fill: 'currentColor', className }

  switch (category) {
    case 'Baterías Acústicas':
      return (
        <svg {...props}>
          {/* Bass drum */}
          <ellipse cx="13" cy="20" rx="9" ry="6" fill="none" stroke="currentColor" strokeWidth="2"/>
          <ellipse cx="13" cy="20" rx="4.5" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          {/* Kick pedal beater */}
          <line x1="13" y1="17" x2="13" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="13" cy="10" r="1.5"/>
          {/* Hi-hat stand */}
          <line x1="24" y1="10" x2="24" y2="26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          {/* Hi-hat top */}
          <ellipse cx="24" cy="10" rx="4" ry="1.2"/>
          <ellipse cx="24" cy="12" rx="4" ry="1.2"/>
          {/* Floor tom */}
          <ellipse cx="4" cy="22" rx="3" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="2" y1="24" x2="2" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="6" y1="24" x2="6" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )

    case 'Baterías Electrónicas':
      return (
        <svg {...props}>
          {/* Rack horizontal bar */}
          <line x1="3" y1="10" x2="29" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* Rack vertical poles */}
          <line x1="5" y1="10" x2="5" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="27" y1="10" x2="27" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* Rack feet */}
          <line x1="3" y1="28" x2="7" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="25" y1="28" x2="29" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* Snare pad — center, hanging from rack */}
          <line x1="16" y1="10" x2="16" y2="15" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="16" cy="18" r="4" fill="none" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="16" cy="18" r="1.5"/>
          {/* Tom pad — left */}
          <line x1="9" y1="10" x2="9" y2="13" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="9" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="9" cy="16" r="1.2"/>
          {/* Tom pad — right */}
          <line x1="23" y1="10" x2="23" y2="13" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="23" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="23" cy="16" r="1.2"/>
          {/* Cymbal pad — top left, angled */}
          <line x1="5" y1="10" x2="5" y2="6" stroke="currentColor" strokeWidth="1.5"/>
          <ellipse cx="5" cy="5" rx="4" ry="1.5" transform="rotate(-15 5 5)"/>
          {/* Cymbal pad — top right, angled */}
          <line x1="27" y1="10" x2="27" y2="6" stroke="currentColor" strokeWidth="1.5"/>
          <ellipse cx="27" cy="5" rx="4" ry="1.5" transform="rotate(15 27 5)"/>
          {/* Kick pad — bottom center */}
          <rect x="11" y="23" width="10" height="5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="16" cy="25.5" r="1.5"/>
        </svg>
      )

    case 'Redoblantes':
      return (
        <svg {...props}>
          {/* Top head */}
          <ellipse cx="16" cy="9" rx="12" ry="4"/>
          {/* Body */}
          <line x1="4" y1="9" x2="4" y2="20" stroke="currentColor" strokeWidth="2"/>
          <line x1="28" y1="9" x2="28" y2="20" stroke="currentColor" strokeWidth="2"/>
          {/* Bottom hoop */}
          <ellipse cx="16" cy="20" rx="12" ry="4" fill="none" stroke="currentColor" strokeWidth="2"/>
          {/* Tension rods */}
          {[7, 10, 13, 16, 19, 22, 25].map((x, i) => (
            i % 2 === 0
              ? <line key={x} x1={x} y1="9" x2={x} y2="20" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
              : null
          ))}
          {/* Snare wires underneath */}
          <line x1="8" y1="22" x2="24" y2="22" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1.5"/>
          <line x1="8" y1="23.5" x2="24" y2="23.5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1.5"/>
          {/* Stick */}
          <line x1="22" y1="2" x2="10" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="22" cy="2" r="1.5"/>
        </svg>
      )

    case 'Platillos':
      return (
        <svg {...props}>
          {/* Cymbal body — angled ellipse */}
          <ellipse cx="16" cy="19" rx="13" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
          {/* Fill upper half to give the solid look */}
          <path d="M3 19 Q3 14 16 14 Q29 14 29 19" fill="currentColor" opacity="0.15"/>
          <path d="M3 19 Q3 14 16 14 Q29 14 29 19" fill="none" stroke="currentColor" strokeWidth="2"/>
          {/* Bell */}
          <ellipse cx="16" cy="14" rx="3.5" ry="2"/>
          <ellipse cx="16" cy="14" rx="1.5" ry="1" fill="white" opacity="0.3"/>
          {/* Stand rod */}
          <line x1="16" y1="10" x2="16" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="13" y1="5" x2="19" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Reflections/grooves */}
          <ellipse cx="16" cy="17" rx="7" ry="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          <ellipse cx="16" cy="15.5" rx="4" ry="1.2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        </svg>
      )

    case 'Parches':
      return (
        <svg {...props}>
          {/* Outer hoop */}
          <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="2.5"/>
          {/* Collar ring */}
          <circle cx="16" cy="16" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          {/* Head surface */}
          <circle cx="16" cy="16" r="8.5" fill="none" stroke="currentColor" strokeWidth="1"/>
          {/* Center dot */}
          <circle cx="16" cy="16" r="1.5"/>
          {/* Lug lugs around the rim */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            const x = 16 + 12 * Math.cos(rad)
            const y = 16 + 12 * Math.sin(rad)
            return <circle key={i} cx={x} cy={y} r="1" />
          })}
        </svg>
      )

    case 'Hardware':
      return (
        <svg {...props}>
          {/* Vertical tube/stand */}
          <rect x="14" y="2" width="4" height="18" rx="2"/>
          {/* Wing nut top */}
          <ellipse cx="16" cy="4" rx="6" ry="2.5"/>
          <path d="M10 4 Q8 2 10 1 L16 4 L22 1 Q24 2 22 4Z"/>
          {/* Base plate */}
          <ellipse cx="16" cy="26" rx="10" ry="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          {/* Base legs */}
          <line x1="6" y1="26" x2="4" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="16" y1="29" x2="16" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="26" y1="26" x2="28" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* Clamp in middle */}
          <rect x="12" y="14" width="8" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )

    case 'Guitarras':
      return (
        <svg {...props}>
          {/* Body lower bout */}
          <path d="M10 22 Q4 20 4 16 Q4 12 8 11 Q10 10 11 11 Q12 8 11 5 L13 4 L19 4 L21 5 Q20 8 21 11 Q22 10 24 11 Q28 12 28 16 Q28 20 22 22 Q19 24 16 24 Q13 24 10 22Z"
            fill="none" stroke="currentColor" strokeWidth="2"/>
          {/* Sound hole */}
          <circle cx="16" cy="16" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          {/* Strings */}
          <line x1="13" y1="5" x2="13" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
          <line x1="15" y1="4.5" x2="15" y2="23" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
          <line x1="17" y1="4.5" x2="17" y2="23" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
          <line x1="19" y1="5" x2="19" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
          {/* Nut */}
          <line x1="12" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* Tuning head */}
          <rect x="13" y="1" width="6" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          {/* Bridge */}
          <rect x="11" y="20" width="10" height="2" rx="1"/>
          {/* Waist */}
          <path d="M4 16 Q6 14 8 16 Q10 18 12 16" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M28 16 Q26 14 24 16 Q22 18 20 16" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )

    case 'Murat Diril':
      return (
        <svg {...props}>
          {/* Cymbal body */}
          <ellipse cx="16" cy="20" rx="13" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 20 Q3 15 16 15 Q29 15 29 20" fill="currentColor" opacity="0.12"/>
          <path d="M3 20 Q3 15 16 15 Q29 15 29 20" fill="none" stroke="currentColor" strokeWidth="2"/>
          {/* Bell */}
          <ellipse cx="16" cy="15" rx="3.5" ry="2"/>
          {/* Stand */}
          <line x1="16" y1="11" x2="16" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="13" y1="5" x2="19" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Grooves */}
          <ellipse cx="16" cy="18" rx="7" ry="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          {/* "M" monogram on bell */}
          <text x="16" y="16.5" textAnchor="middle" fontSize="4.5" fontWeight="bold"
            fontFamily="sans-serif" fill="currentColor" opacity="0.9">M</text>
        </svg>
      )

    case 'Otros':
      return (
        <svg {...props}>
          {/* Box body */}
          <path d="M4 12 L4 27 L28 27 L28 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          {/* Box lid */}
          <path d="M2 8 L16 5 L30 8 L28 12 L4 12 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          {/* Lid flaps open */}
          <path d="M4 12 L10 9 L16 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M28 12 L22 9 L16 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* Music note inside box */}
          <path d="M14 18 L14 24 M14 24 Q14 26 16 25.5 Q18 25 18 23 Q18 21 16 21.5 Q14 22 14 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <line x1="14" y1="18" x2="19" y2="17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      )

    default:
      return (
        <svg {...props}>
          <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 10 L16 22 M10 16 L22 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
  }
}
