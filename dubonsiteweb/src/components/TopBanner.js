import React from 'react';
// import banner1 from '../assets/thumb (2).gif'

const AdBanner = ({ imageUrl, linkUrl, altText }) => {
    imageUrl="https://storage.pixteller.com/designs/designs-images/2024-09-24/01/fashion-sales-banner-1-66f1ed1dd6044.png" 
    linkUrl="http://banner-link.com" 
    altText="Banner Ad"
  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer">
      <img 
        src={imageUrl} 
        alt={altText} 
        style={{ width: '100%', height: '50px',  }} 
      />
    </a>
  );
};

export default AdBanner;
