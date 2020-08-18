import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={17} height={18} viewBox="0 0 17 18" fill="none" {...props}>
      <Path
        d="M8.5 12.5v-11M13.5 6.5l-5-5-5 5M15.5 16.5h-14"
        stroke="#000"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
