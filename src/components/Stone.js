import React from 'react';

const Stone = ({ stone }) => {
  return (
    <div className="stone">
      <div className="wrap">
        <div className="image">
          <a href={stone.post_url} className="stone-link" target="_blank"><img src={stone.image_url} alt={`Photograph of ${stone.title}`} /></a>
        </div>
        <div className="info">
          <h3 className="title" dangerouslySetInnerHTML={{__html: stone.title}} />
          <div className="location" dangerouslySetInnerHTML={{__html: stone.location}} />
        </div>
      </div>
    </div>
  );
}

export default Stone;
