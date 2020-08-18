import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={16} height={18} viewBox="0 0 16 18" fill="none" {...props}>
      <Path
        d="M4.318 10A5 5 0 001.5 14.5s2 2 6.5 2 6.5-2 6.5-2a5 5 0 00-2.819-4.5M11.5 5c0 1.933-1.567 4.5-3.5 4.5S4.5 6.933 4.5 5a3.5 3.5 0 117 0v0z"
        stroke="#96AAC6"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
