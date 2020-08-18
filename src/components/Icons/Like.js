import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M3.5 7.5h-3v8h3v-8zM5.5 15.5h6.9a2 2 0 001.952-1.566l1.111-5A2 2 0 0013.507 6.5H9.5v-4a2 2 0 00-2-2l-2 6"
        stroke={props.color || '#21293D'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
