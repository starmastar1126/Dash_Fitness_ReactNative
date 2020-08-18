import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <G
        clipPath="url(#prefix__clip0)"
        stroke="#000"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M7.334 8.666c-1.883 0-3.553.425-4.65.795a1.994 1.994 0 00-1.35 1.893v2.645h6.667M7.333 8.666c-1.84 0-3.333-2.16-3.333-4v-.667a3.334 3.334 0 016.667 0v.667c0 1.84-1.493 4-3.334 4zM12.668 10.666v4M10.668 12.666h4" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h16v16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
