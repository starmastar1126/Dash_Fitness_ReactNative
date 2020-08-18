import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M9.002 3h-2v4h2V3zM8.002 10a1 1 0 100-2 1 1 0 000 2z"
        fill="#1AA0FF"
      />
      <Path
        d="M15 16a1 1 0 01-.6-.2L10.667 13H1a1 1 0 01-1-1V1a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1zM2 11h9a1 1 0 01.6.2L14 13V2H2v9z"
        fill="#1AA0FF"
      />
    </Svg>
  );
}

export default SvgComponent;
