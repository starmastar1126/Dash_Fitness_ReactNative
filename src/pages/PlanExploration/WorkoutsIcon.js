import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={14} height={18} viewBox="0 0 14 18" fill="none" {...props}>
      <Path
        d="M8.616 7.4s.7-4.114-2.155-5.9a5.034 5.034 0 01-1.9 3.644c-1.22 1.072-3.512 3.478-3.488 6.05A5.894 5.894 0 004.31 16.5a4.529 4.529 0 011.336-2.938 4.252 4.252 0 001.229-2.583c1.928.879 2.818 4.085 2.818 5.466v.012A5.516 5.516 0 0012.9 11.67c.062-2.085-.4-3.67-1.4-5.17"
        stroke="#96AAC6"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
