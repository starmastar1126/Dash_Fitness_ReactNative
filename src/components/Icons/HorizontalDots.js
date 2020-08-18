import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={12} height={3} viewBox="0 0 12 3" fill="none" {...props}>
      <Path
        d="M6 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10.5 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        fill="#96AAC6"
      />
    </Svg>
  );
}

export default SvgComponent;
