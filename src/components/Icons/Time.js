import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={17} height={17} viewBox="0 0 17 17" fill="none" {...props}>
      <Path
        d="M8.5 15.5a7 7 0 100-14 7 7 0 000 14z"
        stroke="#1AA0FF"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.5 4.5v4h4"
        stroke="#1AA0FF"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
