import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const fill = props.fill || '#1AA0FF';
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M12.146 4.852a.96.96 0 100-1.92.96.96 0 000 1.92zM8 12c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z"
        fill={fill}
      />
      <Path
        d="M12 16H4c-2.056 0-4-1.944-4-4V4c0-2.056 1.944-4 4-4h8c2.056 0 4 1.944 4 4v8c0 2.056-1.944 4-4 4zM4 2c-.935 0-2 1.065-2 2v8c0 .953 1.047 2 2 2h8c.935 0 2-1.065 2-2V4c0-.935-1.065-2-2-2H4z"
        fill={fill}
      />
    </Svg>
  );
}

export default SvgComponent;
