import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={22} height={18} viewBox="0 0 22 18" fill="none" {...props}>
      <Path
        d="M4.048 10.438a4.688 4.688 0 00-2.642 4.218s1.875 1.875 6.094 1.875 6.094-1.875 6.094-1.875a4.687 4.687 0 00-2.643-4.219M10.781 5.75c0 1.812-1.469 4.219-3.281 4.219S4.219 7.562 4.219 5.75a3.281 3.281 0 116.562 0v0zM15.625 13.504c3.34 0 4.824-1.484 4.824-1.484a3.711 3.711 0 00-2.092-3.34M18.223 3.969c0 1.434-1.163 3.34-2.598 3.34-1.435 0-2.598-1.906-2.598-3.34a2.598 2.598 0 015.196 0v0z"
        stroke={props.stroke || "#fff"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
