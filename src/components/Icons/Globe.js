import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 12 12" fill="none" {...props}>
      <Path
        d="M6 0C2.688 0 0 2.688 0 6s2.688 6 6 6 6-2.688 6-6-2.688-6-6-6zm-.6 10.758A4.793 4.793 0 011.2 6c0-.372.048-.726.126-1.074L4.2 7.8v.6c0 .66.54 1.2 1.2 1.2v1.158zm4.14-1.524A1.19 1.19 0 008.4 8.4h-.6V6.6c0-.33-.27-.6-.6-.6H3.6V4.8h1.2c.33 0 .6-.27.6-.6V3h1.2c.66 0 1.2-.54 1.2-1.2v-.246c1.758.714 3 2.436 3 4.446 0 1.248-.48 2.382-1.26 3.234z"
        fill="#1AA0FF"
      />
    </Svg>
  )
}

export default SvgComponent
