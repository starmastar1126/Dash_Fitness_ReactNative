import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={10} height={16} viewBox="0 0 10 16" fill="none" {...props}>
      <Path
        d="M7.7 15.4L0 7.7 7.7 0l1.5 1.4-6.3 6.3L9.2 14l-1.5 1.4z"
        fill={props.fill || "#000"}
      />
    </Svg>
  );
}

export default SvgComponent;
