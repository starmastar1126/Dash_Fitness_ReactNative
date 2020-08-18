import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={26} height={30} viewBox="0 0 26 30" fill="none" {...props}>
      <Path
        d="M6.556 16.75a8.75 8.75 0 00-4.931 7.875s3.5 3.5 11.375 3.5 11.375-3.5 11.375-3.5a8.75 8.75 0 00-4.933-7.875M19.125 8c0 3.383-2.742 7.875-6.125 7.875S6.875 11.383 6.875 8a6.125 6.125 0 1112.25 0v0z"
        stroke={props.stroke|| "#96AAC6"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
