import React from 'react';

const CompilerIframe = ({ src, width, height }) => {
  return (
    <iframe
      src={src}
      width={width}
      height={height}
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
};

export default CompilerIframe;