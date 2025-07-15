export default function (sequelize, DataTypes) {
    const Album = sequelize.define('Album', {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        album_cover_url: DataTypes.STRING(255),
        release_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        artist_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Album.associate = (models) => {
        Album.belongsToMany(models.Artist, {
            through: models.AlbumArtist,
            foreignKey: 'album_id',
            otherKey: 'artist_id',
        });
    };

    return Album;
}