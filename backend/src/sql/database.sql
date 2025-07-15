CREATE DATABASE rhythm;
USE rhythm;

CREATE TABLE `album_artists` (
  `album_id` int NOT NULL,
  `artist_id` int NOT NULL,
  `created_at` datetime DEFAULT(CURRENT_TIMESTAMP),
  `updated_at` DATETIME DEFAULT( CURRENT_TIMESTAMP)
);

CREATE TABLE `albums` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `album_cover_url` varchar(255),
  `release_date` datetime NOT NULL,
  `artist_id` int NOT NULL,
  `created_at` datetime DEFAULT(CURRENT_TIMESTAMP),
  `updated_at` DATETIME DEFAULT( CURRENT_TIMESTAMP)
);

CREATE TABLE `artists` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `artist_image_url` varchar(255),
  `created_at` datetime DEFAULT(CURRENT_TIMESTAMP),
  `updated_at` DATETIME DEFAULT( CURRENT_TIMESTAMP)
);

CREATE TABLE `keys`(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `key`varchar(4)
);

CREATE TABLE `measures`(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `beat` varchar(4)
);

CREATE TABLE `playlist_songs` (
  `song_id` int NOT NULL,
  `playlist_id` int NOT NULL,
  `created_at` datetime DEFAULT(CURRENT_TIMESTAMP),
  `updated_at` DATETIME DEFAULT( CURRENT_TIMESTAMP)
);

CREATE TABLE `playlists` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime DEFAULT(CURRENT_TIMESTAMP),
  `updated_at` DATETIME DEFAULT( CURRENT_TIMESTAMP)
);

CREATE TABLE `songs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `track_number` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `bpm` int NOT NULL,
  `duration_ms` float NOT NULL,
  `chords` JSON,
  `tuning` varchar(20) DEFAULT 'Padrão',
  `measure_id` int NOT NULL DEFAULT 1,
  `key_id` int NOT NULL DEFAULT 1 ,
  `album_id` int NOT NULL,
  `created_at` datetime DEFAULT(CURRENT_TIMESTAMP),
  `updated_at` DATETIME DEFAULT( CURRENT_TIMESTAMP)
);

CREATE TABLE `user_searches`(
 `id` int PRIMARY KEY AUTO_INCREMENT,
 `song_name` varchar(100) NOT NULL,
 `album_name` varchar(100) NOT NULL,
 `artist_name` varchar(100) NOT NULL,
 `album_image_url` varchar(255) NOT NULL,
 `user_id` int NOT NULL,
 `created_at` datetime DEFAULT(CURRENT_TIMESTAMP),
 `updated_at` DATETIME DEFAULT( CURRENT_TIMESTAMP)
);

CREATE TABLE `user_tokens` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `access_token` varchar(255) UNIQUE,
  `refresh_token` varchar(255) UNIQUE,
  `token_expires_at` datetime,
  `user_id` int UNIQUE NOT NULL,
  `created_at` datetime DEFAULT(CURRENT_TIMESTAMP),
  `updated_at` DATETIME DEFAULT( CURRENT_TIMESTAMP)
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT(CURRENT_TIMESTAMP),
  `updated_at` DATETIME DEFAULT( CURRENT_TIMESTAMP)
);

ALTER TABLE `songs`
  ADD CONSTRAINT `fk_songs_album_id`
    FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_songs_measure_id`
    FOREIGN KEY (`measure_id`) REFERENCES `measures`(`id`),
  ADD CONSTRAINT `fk_songs_key_id`
    FOREIGN KEY (`key_id`) REFERENCES `keys`(`id`);

ALTER TABLE `playlist_songs`
  ADD CONSTRAINT `fk_playlist_songs_song_id`
    FOREIGN KEY (`song_id`) REFERENCES `songs`(`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_playlist_songs_playlist_id`
    FOREIGN KEY (`playlist_id`) REFERENCES `playlists`(`id`) ON DELETE CASCADE;

ALTER TABLE `playlists`
  ADD CONSTRAINT `fk_playlists_user_id`
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;

ALTER TABLE `albums`
  ADD CONSTRAINT `fk_albums_artist_id`
    FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON DELETE CASCADE;

ALTER TABLE `album_artists`
  ADD CONSTRAINT `fk_album_artists_album_id`
    FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_album_artists_artist_id`
    FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON DELETE CASCADE;

ALTER TABLE `user_tokens`
  ADD CONSTRAINT `fk_user_tokens_user_id`
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;
