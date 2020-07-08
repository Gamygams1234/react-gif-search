import React from "react";
import Gif from "./Gif";
import NoGifs from "./NoGifs";

const GifList = (props) => {
  const results = props.data;

  if (results.length > 0) {
    let gifs = results.map((gif) => <Gif url={gif.images.fixed_height.url} key={gif.id} />);

    return <ul className="gif-list">{gifs}</ul>;
  } else {
    return (
      <div>
        <NoGifs />
      </div>
    );
  }
};

export default GifList;
