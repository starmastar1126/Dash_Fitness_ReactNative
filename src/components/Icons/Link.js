import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M11 0C9.7 0 8.4.5 7.5 1.5L6.3 2.6c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0l1.2-1.2c1.1-1.1 3.1-1.1 4.2 0 .6.6.9 1.4.9 2.2 0 .8-.3 1.6-.9 2.1L12 8.3c-.4.4-.4 1 0 1.4.2.2.5.3.7.3.2 0 .5-.1.7-.3l1.2-1.2C15.5 7.6 16 6.3 16 5c0-1.3-.5-2.6-1.5-3.5C13.6.5 12.3 0 11 0zM8.3 12l-1.2 1.2c-1.1 1.1-3.1 1.1-4.2 0-.6-.6-.9-1.4-.9-2.2 0-.8.3-1.6.9-2.1L4 7.7c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L1.5 7.5C.5 8.4 0 9.7 0 11c0 1.3.5 2.6 1.5 3.5.9 1 2.2 1.5 3.5 1.5 1.3 0 2.6-.5 3.5-1.5l1.2-1.2c.4-.4.4-1 0-1.4-.4-.4-1-.3-1.4.1z"
        fill="#21293D"
      />
      <Path
        d="M9.4 5.2L5.2 9.4c-.4.4-.4 1 0 1.4.2.2.5.3.7.3.2 0 .5-.1.7-.3l4.2-4.2c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"
        fill="#21293D"
      />
    </Svg>
  )
}

export default SvgComponent
