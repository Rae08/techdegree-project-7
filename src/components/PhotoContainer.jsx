import React, { useEffect } from "react";
import Photo from "./Photo";
import NotFound from "./NotFound";

const PhotoContainer = props => {
  const results = props.photos;
  const loading = props.loading;
  let photos;

  // when the component mounts and there is a url parameter (/search/urlparameter), the search method will be called to fetch the data using the url parameter.
  useEffect(() => {
    if (typeof props.match !== "undefined") {
      let searchQuery = props.match.params.query;
      props.onSearch(searchQuery);
    }
  }, []);

  // if there are results, generates a photo component for each photo in the returned list
  // if there are no results, displays the not found component
  if (results.length > 0) {
    photos = results.map(photo => (
      <Photo
        key={photo.id}
        url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`}
        alt={photo.title}
      />
    ));
  } else {
    photos = <NotFound />;
  }

  return (
    <div className="photo-container">
      <h2>Results</h2>
      {loading === true ? <p>Loading...</p> : <ul>{photos}</ul>}
    </div>
  );
};

export default PhotoContainer;
