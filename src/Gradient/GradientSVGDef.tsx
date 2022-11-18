export const GradientSVGDef = () => (
  <svg aria-hidden="true" className="absolute pointer-events-none ">
    <defs>
      <radialGradient
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        id="radial-blue"
        gradientTransform="matrix(0 21 -21 0 16 7)"
      >
        <stop stopColor="#0EA5E9"></stop>
        <stop stopColor="#22D3EE" offset=".527"></stop>
        <stop stopColor="#818CF8" offset="1"></stop>
      </radialGradient>

      <radialGradient
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        id="radial-orange"
        gradientTransform="matrix(0 21 -21 0 16 7)"
      >
        <stop stopColor="rgb(255, 207, 115)"></stop>
        <stop stopColor="rgb(255, 122, 47)" offset=".6"></stop>
      </radialGradient>

      <radialGradient
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        id="radial-red"
        gradientTransform="matrix(0 21 -21 0 16 7)"
      >
        <stop stopColor="#ef4444"></stop>
        <stop stopColor="#c2410c" offset=".6"></stop>
      </radialGradient>
    </defs>
  </svg>
)
