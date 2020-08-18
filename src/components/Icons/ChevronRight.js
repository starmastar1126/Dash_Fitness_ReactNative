import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={10} height={15} viewBox="0 0 10 15" fill="none" {...props}>
      <Path
        d="M2.3-.4L10 7.3 2.3 15 .8 13.6l6.3-6.3L.8 1 2.3-.4z"
        fill="#96AAC6"
      />
    </Svg>
  );
}

export default SvgComponent;
