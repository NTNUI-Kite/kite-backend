import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const LoadingIcon = () => (
  <RefreshIndicator
    size={80}
    status="loading"
    left={0}
    top={0}
  />
);

export default LoadingIcon;
