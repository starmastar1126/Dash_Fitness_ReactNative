import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const fill = props.fill || '#1AA0FF';
  return (
    <Svg width={10} height={16} viewBox="0 0 10 16" fill="none" {...props}>
      <Path
        d="M3.023 16L3 9H0V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H10L9 9H6.28v7H3.023z"
        fill={fill}
      />
    </Svg>
  );
}

export default SvgComponent;
