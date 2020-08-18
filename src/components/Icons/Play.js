import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={19} height={24} viewBox="0 0 19 24" fill="none" {...props}>
      <Path
        d="M18.998 12c0-.49-.239-.949-.64-1.23l-15-10.5A1.5 1.5 0 00.998 1.5V22.5a1.499 1.499 0 002.36 1.229l15-10.5c.401-.28.64-.739.64-1.228V12c0 .002 0 .002 0 0z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
