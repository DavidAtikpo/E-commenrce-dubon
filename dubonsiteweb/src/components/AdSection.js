import React from 'react';

const AdSection = () => {
  const ads = [
    {
      imageUrl: 'https://via.placeholder.com/300x150.png?text=Ad+1',
      linkUrl: 'https://ad-link1.com',
      altText: 'Ad 1',
      title: 'Produit 1',
      description: 'Description du produit 1',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x150.png?text=Ad+2',
      linkUrl: 'https://ad-link2.com',
      altText: 'Ad 2',
      title: 'Produit 2',
      description: 'Description du produit 2',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x150.png?text=Ad+3',
      linkUrl: 'https://ad-link3.com',
      altText: 'Ad 3',
      title: 'Produit 3',
      description: 'Description du produit 3',
    }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      {ads.map((ad, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', width: '30%' }}>
          <a href={ad.linkUrl} target="_blank" rel="noopener noreferrer">
            <img 
              src={ad.imageUrl} 
              alt={ad.altText} 
              style={{ width: '100%', height: 'auto' }} 
            />
            <h3>{ad.title}</h3>
            <p>{ad.description}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default AdSection;
