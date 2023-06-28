import React, { useEffect, useState } from 'react';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(
        'https://itunes.apple.com/us/rss/topalbums/limit=50/json'
      );
      const data = await response.json();
      setAlbums(data.feed.entry);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAlbums = albums.filter((album) =>
    album['im:name'].label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Top 50 Albums</h1>
      <div>
        <input
          type="text"
          placeholder="Search albums"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div>
        {filteredAlbums.map((album) => (
          <div
            key={album.id.attributes['im:id']}
          >
            <img
              src={album['im:image'][2].label}
              alt={album['im:name'].label}
            />
            <h2 className="text-xl font-bold mb-2">{album['im:name'].label}</h2>
            <p>{album['im:artist'].label}</p>
            <p>{album['im:price'].label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
