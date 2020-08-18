import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={22} height={24} viewBox="0 0 22 24" fill="none" {...props}>
      <Path
        d="M18 11V8A7 7 0 104 8v3c0 3.3-3 4.1-3 6 0 1.7 3.9 3 10 3s10-1.3 10-3c0-1.9-3-2.7-3-6z"
        stroke="#fff"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 22a38.81 38.81 0 01-2.855-.1 2.992 2.992 0 005.71 0c-.895.066-1.845.1-2.856.1z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
