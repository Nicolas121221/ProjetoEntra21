export default function (sequelize, DataTypes) {
    const Playlist = sequelize.define('Playlist', {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    });

    Playlist.associate = (models) => {
        Playlist.belongsTo(models.User, {
            foreignKey: 'user_id'
        });

        Playlist.belongsToMany(models.Song, {
            through: models.PlaylistSong,
            foreignKey: 'playlist_id',
            otherKey: 'song_id',
            onDelete: 'CASCADE'
        });
    };

    return Playlist;
}