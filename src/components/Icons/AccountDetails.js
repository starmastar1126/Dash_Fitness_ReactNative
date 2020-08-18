import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M8 8a4 4 0 100-8 4 4 0 000 8zM7 13.171l3.054-3.054A18.53 18.53 0 008 10c-3.192 0-5.539.795-6.837 1.382A1.989 1.989 0 000 13.2V16h7v-2.829zM11 16H9v-2l5-5 2 2-5 5z"
        fill="#1AA0FF"
      />
    </Svg>
  );
}

export default SvgComponent;
