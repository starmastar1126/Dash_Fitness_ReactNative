import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={4} height={22} viewBox="0 0 4 22" fill="none" {...props}>
      <Path
        d="M0 11a2 2 0 104 0 2 2 0 00-4 0zM0 2a2 2 0 104 0 2 2 0 00-4 0zM0 20a2 2 0 104 0 2 2 0 00-4 0z"
        fill="#96AAC6"
      />
    </Svg>
  )
}

export default SvgComponent
