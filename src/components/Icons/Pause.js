import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={12} height={14} viewBox="0 0 12 14" fill="none" {...props}>
      <Path d="M0 14h4V0H0v14zM8 0v14h4V0H8z" fill="#fff" />
    </Svg>
  )
}

export default SvgComponent
