import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={11} height={9} viewBox="0 0 11 9" fill="none" {...props}>
      <Path
        d="M10.502 1.283L9.27.05a.176.176 0 00-.248 0L3.694 5.38 1.53 3.217a.176.176 0 00-.248 0L.05 4.45a.176.176 0 000 .248L3.57 8.215a.176.176 0 00.249 0l6.684-6.684a.176.176 0 000-.248z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
