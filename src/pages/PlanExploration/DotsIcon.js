import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={20} height={4} viewBox="0 0 20 4" fill="none" {...props}>
      <Circle cx={2} cy={2} r={2} fill={props.color || '#fff'} />
      <Circle cx={10} cy={2} r={2} fill={props.color || '#fff'} />
      <Circle
        cx={18}
        cy={2}
        r={2}
        fill={props.color || '#fff'}
        fillOpacity={0.3}
      />
    </Svg>
  );
}

export default SvgComponent;
