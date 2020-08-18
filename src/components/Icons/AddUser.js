import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M9.166 10.834c-2.353 0-4.44.532-5.812.994a2.492 2.492 0 00-1.688 2.366v3.307h8.333M9.167 10.834c-2.301 0-4.167-2.7-4.167-5v-.833a4.167 4.167 0 018.333 0v.833c0 2.3-1.866 5-4.166 5zM15.832 13.334v5M13.332 15.834h5"
        stroke="#292E3A"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
