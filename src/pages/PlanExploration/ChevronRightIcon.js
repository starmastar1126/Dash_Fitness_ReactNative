import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={8} height={14} viewBox="0 0 8 14" fill="none" {...props}>
      <Path
        d="M1.333 1.667L6.666 7l-5.333 5.333"
        stroke="#6F80A7"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
