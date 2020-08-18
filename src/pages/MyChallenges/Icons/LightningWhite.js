import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={17} height={21} viewBox="0 0 17 21" fill="none" {...props}>
      <Path
        d="M16.911 8.358a.838.838 0 00-.756-.484h-6.7L10.21.958c.036-.409-.18-.78-.54-.892a.874.874 0 00-1.009.26L.161 11.704a.95.95 0 00-.072.93.838.838 0 00.756.483h6.7l-.756 6.916c-.036.41.18.781.54.893.108.037.216.074.324.074a.876.876 0 00.685-.335l8.501-11.378a.95.95 0 00.072-.93z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
