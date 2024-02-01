import React, { useState } from "react";
import axios from "axios";

const AnimeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchAnime = async () => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${searchTerm}`
      );

      setSearchResults(response.data.data || []);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
  };

  const HandelHover = () => {};

  return (
    <div className="container">
      <div>
        <h1>Anime Search</h1>
        <input
          type="text"
          placeholder="Search for anime..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="btn">
          <button onClick={searchAnime}>Search</button>
        </div>
      </div>
      <div className="result">
        {searchResults.map((anime, index) => (
          <div onMouseOver={HandelHover} id={`i-${index}`} key={anime.mal_id}>
            <img src={anime.images.webp.image_url} alt="" />
            <h3>{anime.title}</h3>
            <p>{anime.title_synonyms}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeSearch;
