import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={15} height={16} viewBox="0 0 15 16" fill="none" {...props}>
      <Path
        d="M10 12.414L14.414 8 10 3.586 8.586 5l2 2H4v2h6.586l-2 2L10 12.414z"
        fill="#1AA0FF"
      />
      <Path
        d="M11 14H2V2h9V0H1a1 1 0 00-1 1v14a1 1 0 001 1h10v-2z"
        fill="#1AA0FF"
      />
    </Svg>
  );
}

export default SvgComponent;
