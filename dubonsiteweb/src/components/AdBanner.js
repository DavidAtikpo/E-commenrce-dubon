import React from 'react';

const AdBanner = ({ imageUrl, linkUrl, altText }) => {
    imageUrl="" 
    linkUrl="http://banner-link.com" 
    altText=""
  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer">
      <img 
        src={imageUrl} 
        alt={altText} 
        style={{ width: '50%', height: '200px', display: 'block' }} 
      />
    </a>
  );
};

export default AdBanner;
