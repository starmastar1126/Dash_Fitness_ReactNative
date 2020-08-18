import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={17} height={17} viewBox="0 0 17 17" fill="none" {...props}>
      <Path
        d="M8.5 16a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
        stroke="#1AA0FF"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.5 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM10.975 6.026l2.829-2.829M10.975 10.975l2.829 2.829M6.026 10.975l-2.829 2.829M6.026 6.026L3.197 3.197"
        stroke="#1AA0FF"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
