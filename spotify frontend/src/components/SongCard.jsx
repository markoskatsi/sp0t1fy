import React from 'react'
import "../css/SongCard.css"

function SongCard({song}) {
  return (
    <>
      <div className="song-card">
        <div className="song-cover">
          <img src={song.url}/>
        </div>
        <div className="song-info">
          <h2>{song.title}</h2>
          <h3>{song.artist}</h3>
          <p>{song.album}</p>
        </div>
      </div>
    </>
  )
}

export default SongCard;