import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={4} height={13} viewBox="0 0 4 13" fill="none" {...props}>
      <Path
        d="M3.5 6.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM3.5 2a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM3.5 11a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
        fill="#96AAC6"
      />
    </Svg>
  )
}

export default SvgComponent
