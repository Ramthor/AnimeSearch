import React, { useState, useEffect } from "react";
import axios from "axios";

const AnimeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [top, setTop] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isClick, setIsClick] = useState(false);

  const apiUrl = "https://api.jikan.moe/v4/top/";

  useEffect(() => {
    // Load top anime initially when the component mounts
    if (isClick) {
      loadTopAnime();
    }
  }, [isClick]);

  const loadTopAnime = async () => {
    try {
      const response = await axios.get(`${apiUrl}${top}`);
      console.log(top);
      console.log(response.data.data);
      setSearchResults(response.data.data || []);
      setTop("");
    } catch (error) {
      console.error("Error fetching top anime data:", error);
    }
  };

  const searchAnime = async () => {
    try {
      if (isClick) {
        // If it's Top Anime, do nothing here, it will be loaded initially
      } else {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime?q=${searchTerm}`
        );
        console.log(response.data.data);
        setSearchResults(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching anime data:", error);
      // You can add user-friendly error handling here
    }
  };

  const HandelClick = (e) => {
    const selectedTop = e.currentTarget.value;
    console.log(selectedTop);
    setIsClick(!isClick);
    // Update top and call loadTopAnime
    if (!isClick) {
      setTop(selectedTop);
      loadTopAnime();
    }
  };

  return (
    <div className="container">
      <div>
        <h1>Anime Search</h1>
        <button id="topAnimeButton" value="anime" onClick={HandelClick}>
          <p> Top Anime</p>
        </button>
        <button id="topAnimeButton" value="manga" onClick={HandelClick}>
          <p> Top Manga</p>
        </button>

        <button id="topAnimeButton" value="characters" onClick={HandelClick}>
          <p> Top characters</p>
        </button>
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
