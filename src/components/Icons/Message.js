import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M8 1C4.14 1 1 3.756 1 7.145s3.14 6.144 7 6.144c.405 0 .809-.031 1.209-.093l3.179 1.733a.583.583 0 00.862-.512v-3.254A5.708 5.708 0 0015 7.145C15 3.755 11.86 1 8 1z"
        fill="#21293D"
      />
    </Svg>
  )
}

export default SvgComponent
