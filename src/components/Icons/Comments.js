import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M15.5 7C15.5 3.41 12.142.5 8 .5 3.858.5.5 3.41.5 7s3.358 6.5 7.5 6.5c.525 0 1.037-.048 1.532-.137L13.5 15.5v-4.091c1.238-1.159 2-2.705 2-4.409z"
        stroke={props.color || "#21293D"}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
