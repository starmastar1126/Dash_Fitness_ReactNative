import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={16} height={21} viewBox="0 0 16 21" fill="none" {...props}>
      <Path
        d="M8 16c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V5c0-2.76-2.24-5-5-5S3 2.24 3 5v2H2C.9 7 0 7.9 0 9v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM4.9 5c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H4.9V5zM14 19H2V9h12v10z"
        fill="#FF2272"
      />
    </Svg>
  );
}

export default SvgComponent;
