INSERT INTO `keys` (`key`) VALUES 
('A'), ('Bb'), ('B'), ('C'), 
('Db'), ('D'), ('Eb'), ('E'),
('F'), ('F#'), ('G '), ('Ab'),
('Am'), ('Bbm'), ('Bm'), ('Cm'), 
('Dbm'), ('Dm'), ('Ebm'), ('Em'),
('Fm'), ('F#m'), ('Gm'), ('Abm');

INSERT INTO `measures` (`beat`) VALUES 
('2/2'),
('2/4'),
('3/4'),
('3/8'),
('4/4'),
('5/4'),
('6/8'),
('7/8'),
('9/8'),
('12/8');

INSERT INTO users (email, password) VALUES 
('123@exemplo.com', 'senha123'),
('321@exemplo.com', 'senha456');

INSERT INTO user_tokens (user_id, access_token, refresh_token, token_expires_at) VALUES
(1, 'token123', 'refresh123', NULL),
(2, 'token456', 'refresh456', NULL);

INSERT INTO artists (name, artist_image_url) VALUES 
('Nirvana', 'https://i.scdn.co/image/84282c28d851a700132356381fcfbadc67ff498b'),
('The Smiths', 'https://i.scdn.co/image/4bf08a9e6eea088b20d4092d1322bbd3f39ff9af');

INSERT INTO albums (name, album_cover_url, release_date, artist_id) VALUES 
('Nevermind', 'https://i.scdn.co/image/ab67616d0000b273e175a19e530c898d167d39bf', '1991-09-24', 1),
('Hatful of Hollow', 'https://images.radiox.co.uk/images/664878?crop=1_1&width=660&format=webp&signature=-P3EXF8jlnof3ua2ZRgX3wdM3hM=', '1984-11-12', 2);

INSERT INTO album_artists (album_id, artist_id) VALUES 
(1, 1),
(2, 2);

INSERT INTO playlists (name, user_id) VALUES 
('Rock', 1),
('Musica Clássica', 2);

INSERT INTO songs (track_number, name, bpm, duration_ms, tuning, measure_id, key_id, album_id) VALUES 
(1, 'Polly', 121, 154200, 'Padrão', 5, 20, 1),
(2, 'Come As You Are', 120, 202800,'Padrão', 5, 20, 1),
(3, 'Breed', 158, 182400, 'Padrão', 5, 22, 1),
(4, 'In Bloom', 157, 249000, 'Padrão', 5, 14, 1),
(5, 'On a Plain', 133, 189600, 'Padrão', 5, 6, 1),
(6, 'Drain You', 133, 205800, 'Padrão', 5, 2, 1),
(7, 'Lithium', 123, 250200, 'Padrão', 5, 6, 1),
(8, 'Something In The Way', 105, 211200, 'Padrão', 5, 20, 1),
(9, 'Endless, Nameless', 132, 385200, 'Padrão', 5, 20, 1),
(10, 'Back to the Old House', 104, 183600, 'Padrão', 5, 6, 2);

INSERT INTO playlist_songs (song_id, playlist_id) VALUES 
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(1, 2),
(2, 2);