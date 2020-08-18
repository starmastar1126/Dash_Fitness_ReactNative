import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M21 4h-3.382L15.894.552A1 1 0 0015 0H9a1 1 0 00-.894.552L6.382 4H3a3 3 0 00-3 3v14a3 3 0 003 3h18a3 3 0 003-3V7a3 3 0 00-3-3zm-9 15a5 5 0 110-9.999A5 5 0 0112 19z"
        fill={props.color || '#21293D'}
      />
    </Svg>
  );
}

export default SvgComponent;
