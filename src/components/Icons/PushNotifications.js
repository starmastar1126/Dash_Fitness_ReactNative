import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M13 16H1a1 1 0 01-1-1V3a1 1 0 011-1h7v2H2v10h10V8h2v7a1 1 0 01-1 1z"
        fill="#1AA0FF"
      />
      <Path d="M16 2h-2V0h-2v2h-2v2h2v2h2V4h2V2z" fill="#1AA0FF" />
    </Svg>
  )
}

export default SvgComponent
