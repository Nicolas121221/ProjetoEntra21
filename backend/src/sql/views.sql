CREATE OR REPLACE VIEW vw_songs_playlists_artists AS
SELECT
  s.id AS song_id,
  s.track_number,
  s.name AS song_name,
  s.bpm,
  s.duration_ms,
  s.chords,
  s.tuning,
  
  p.name AS playlist_name,
  p.user_id AS playlist_user_id,
  
  a.id AS album_id,
  a.name AS album_name,
  a.release_date,
  a.artist_id AS album_artist_id,
  
  ar.name AS artist_name,
  ar.artist_image_url,
  
  k.key AS key_name,
  
  m.beat AS measure_beat

FROM songs s
LEFT JOIN playlist_songs ps ON s.id = ps.song_id
LEFT JOIN playlists p ON ps.playlist_id = p.id
LEFT JOIN albums a ON s.album_id = a.id
LEFT JOIN artists ar ON a.artist_id = ar.id
LEFT JOIN `keys` k ON s.key_id = k.id
LEFT JOIN measures m ON s.measure_id = m.id;
