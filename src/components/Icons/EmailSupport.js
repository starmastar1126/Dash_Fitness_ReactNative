import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={16} height={14} viewBox="0 0 16 14" fill="none" {...props}>
      <Path
        d="M14 5.883V12H2V5.82L0 4.695V13a1 1 0 001 1h14a1 1 0 001-1V4.783l-2 1.1z"
        fill="#1AA0FF"
      />
      <Path
        d="M15 0H1C.4 0 0 .4 0 1v1.4l8 4.5 8-4.4V1c0-.6-.4-1-1-1z"
        fill="#1AA0FF"
      />
    </Svg>
  );
}

export default SvgComponent;
