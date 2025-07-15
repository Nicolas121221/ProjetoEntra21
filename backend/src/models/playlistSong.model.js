export default function (sequelize, DataTypes) {
  const PlaylistSong = sequelize.define(
    "PlaylistSong",
    {
      playlist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Playlist",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      song_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Song",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "playlist_songs",
    }
  );

  return PlaylistSong;
}
