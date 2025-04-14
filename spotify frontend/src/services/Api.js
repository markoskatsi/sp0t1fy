const CLIENT_ID = '35eb0434a68741e8a21843aa64e2e98a';
const CLIENT_SECRET = '57e5c4fcbeb74c45a7b553a6c4b14a26';

let clientAccessToken = null;

async function getClientAccessToken() {
  if (clientAccessToken) return clientAccessToken;
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    },
    body: 'grant_type=client_credentials',
  });
  const data = await result.json();
  clientAccessToken = data.access_token;
  return clientAccessToken;
}

export async function searchSongs(query, offset = 0) {
  const token = await getClientAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20&offset=${offset}`,
    { headers: { Authorization: 'Bearer ' + token } }
  );
  const data = await response.json();
  return data.tracks.items.map(track => ({
    id: track.id,
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    album: track.album.name,
    url: track.album.images[0]?.url,
  }));
}

export async function loadAllSongs() {
  const token = await getClientAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=fake%20mink&type=track&limit=50`,
    { headers: { Authorization: 'Bearer ' + token } }
  );
  const data = await response.json();
  return data.tracks.items.map(track => ({
    id: track.id,
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    album: track.album.name,
    url: track.album.images[0]?.url,
  }));
}