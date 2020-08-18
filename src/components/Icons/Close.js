import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none" {...props}>
      <Path
        d="M11.65.35a1.199 1.199 0 00-1.696 0L6.007 4.299 2.061.35A1.199 1.199 0 00.366 2.046l3.947 3.947L.366 9.939a1.199 1.199 0 101.695 1.695l3.946-3.947 3.947 3.947A1.199 1.199 0 0011.65 9.94L7.702 5.993l3.947-3.947a1.198 1.198 0 000-1.695z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
