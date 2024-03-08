import React, { useState } from "react";
import axios from "axios";

const AnimeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [top, setTop] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isClick, setIsClick] = useState(true);

  const loadTopAnime = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/top/${top}`);

      setSearchResults(response.data.data || []);
    } catch (error) {
      console.error("Error fetching top anime data:", error);
    }
    setIsClick(false);
  };

  const searchAnime = async () => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${searchTerm}`
      );
      console.log(response.data.data);
      setSearchResults(response.data.data || []);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
  };

  return (
    <div className="container">
      <div>
        <h1>Anime Search</h1>
        <div className="hi">
          <select
            name="anime"
            id="top_ACM"
            onChange={(e) => setTop(e.currentTarget.value)}
          >
            <option value="">select</option>
            <option value="anime"> Top Anime</option>
            <option value="characters"> Top characters</option>
            <option value="manga"> Top Manga</option>
          </select>
          <button id="topAnimeButton" onClick={loadTopAnime}>
            Search
          </button>
        </div>

        <input
          type="text"
          id="searchInput"
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
          <div id={`i-${index}`} key={anime.mal_id}>
            <img src={anime.images.webp.image_url} alt={anime.title} />
            <h3>{anime.title}</h3>
            <p>{anime.title_synonyms}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeSearch;
