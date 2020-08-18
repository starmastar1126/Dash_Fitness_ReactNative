import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M9 1.867l2.318 4.696 5.182.753-3.75 3.655.885 5.162L9 13.696l-4.635 2.437.885-5.162L1.5 7.316l5.182-.753L9 1.867z"
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
