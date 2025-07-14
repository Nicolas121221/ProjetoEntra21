CREATE DATABASE rhythm;
USE rhythm;

CREATE TABLE `songs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `position` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `bpm` int NOT NULL,
  `measure ` varchar(10) NOT NULL DEFAULT '4/4',
  `duration_ms` int NOT NULL,
  `chords` JSON,
  `tuning` varchar(255),
  `key` varchar(4) DEFAULT `C`,
  `album_id` int NOT NULL
);

CREATE TABLE `playlist_song` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `song_id` int NOT NULL,
  `playlist_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `playlists` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `user_id` int NOT NULL
);

CREATE TABLE `search`(
 `id` int PRIMARY KEY AUTO_INCREMENT,
 `title` varchar(255) NOT NULL,
 `album` varchar(255) NOT NULL,
 `artist` varchar(255) NOT NULL,
 `href` varchar(255) NOT NULL,
 `user_id` int NOT NULL
);

CREATE TABLE `albuns` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `href` varchar(255),
  `release_date` date NOT NULL,
  `artists_id` int NOT NULL
);

CREATE TABLE `album_artists` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `album_id` int NOT NULL,
  `artists_id` int NOT NULL
);

CREATE TABLE `artists` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `href` varchar(255)
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `spotify_user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `access_token` varchar(255) UNIQUE,
  `refresh_token` varchar(255) UNIQUE,
  `token_expires_at` datetime,
  `user_id` int UNIQUE NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE `playlist_song` ADD FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`);

ALTER TABLE `playlists` ADD FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`);

ALTER TABLE `playlist_song` ADD FOREIGN KEY (`songs_id`) REFERENCES `songs` (`id`);

ALTER TABLE `songs` ADD FOREIGN KEY (`tom_id`) REFERENCES `tons` (`id`);

ALTER TABLE `songs` ADD FOREIGN KEY (`album_id`) REFERENCES `albuns` (`id`);

ALTER TABLE `spotify_user` ADD FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`);

ALTER TABLE `album_artists` ADD FOREIGN KEY (`artista_id`) REFERENCES `artists` (`id`);

ALTER TABLE `album_artists` ADD FOREIGN KEY (`album_id`) REFERENCES `albuns` (`id`);
