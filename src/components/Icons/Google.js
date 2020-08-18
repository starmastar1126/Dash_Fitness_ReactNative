import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none" {...props}>
      <Circle cx={24} cy={24} r={24} fill="#fff" />
      <Path
        d="M24 17.5a6.465 6.465 0 014.173 1.524l3.27-3.114a10.987 10.987 0 00-17.297 3.208l3.687 2.842A6.508 6.508 0 0124 17.5z"
        fill="#D94F3D"
      />
      <Path
        d="M17.5 24c0-.694.113-1.383.333-2.041l-3.686-2.842a10.967 10.967 0 000 9.764l3.686-2.841A6.472 6.472 0 0117.5 24z"
        fill="#F2C042"
      />
      <Path
        d="M34.55 22h-10.5v4.5H30a5.364 5.364 0 01-2.277 3.081l3.658 2.82c2.338-2.098 3.711-5.51 3.17-10.401z"
        fill="#5085ED"
      />
      <Path
        d="M27.721 29.581a6.99 6.99 0 01-3.721.92 6.508 6.508 0 01-6.167-4.46l-3.686 2.841A11.012 11.012 0 0024 35.002a10.932 10.932 0 007.379-2.6l-3.658-2.82z"
        fill="#57A75C"
      />
    </Svg>
  )
}

export default SvgComponent
