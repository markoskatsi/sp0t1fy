import React, { useState, useEffect } from "react";
import SongCard from "../components/SongCard";
import "../css/Home.css";
import { searchSongs, loadAllSongs } from "../services/Api.js";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const loadMore = async () => {
    try {
      setLoading(true);
      const newOffset = offset + 20;
      const newSongs = await searchSongs(searchQuery || "fake mink", newOffset);
      setSongs([...songs, ...newSongs]);
      setOffset(newOffset);
    } catch (err) {
      setError("Failed to load more songs");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const results = await searchSongs(searchQuery, 0);
      setSongs(results);
      setOffset(20);
    } catch (err) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        const popularSongs = await searchSongs("fake mink", 0);
        setSongs(popularSongs);
        setOffset(20);
      } catch (err) {
        setError("Failed to load songs");
      }
    };
    fetchAllSongs();
  }, []);

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for songs..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {loading && <p>Loading songs...</p>}
      {error && <p>{error}</p>}

      <div className="songs-grid">
        {songs.map((song) => (
          <SongCard song={song} key={song.id} />
        ))}
      </div>

      {songs.length > 0 && (
        <button 
          onClick={loadMore} 
          className="load-more-button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default Home;
