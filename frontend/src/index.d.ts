declare module 'react-fittext' {
  import * as React from 'react';

  interface ReactFixTextProps {
    children: JSX.Element;
    compressor?: number;
    minFontSize?: number;
    maxFontSize?: number;
  }

  export default class ReactFixText extends React.Component<ReactFixTextProps, any> {}
}

// Add explicit "any" to unknown external types.

declare module '@antv/data-set' {
  export class DataView {
    source: any;
  }
}
