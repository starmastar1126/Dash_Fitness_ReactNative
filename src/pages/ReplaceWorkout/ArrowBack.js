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
      >
        <Path d="M14.667 8H1.333" />
        <Path d="M6 12.667L1.333 8 6 3.333" strokeLinecap="square" />
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
