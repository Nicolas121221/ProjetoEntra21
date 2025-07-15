export default function (sequelize, DataTypes) {
    const Artist = sequelize.define('Artist', {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        artist_image_url: DataTypes.STRING(255),
    });

    Artist.associate = (models) => {
        Artist.belongsToMany(models.Album, {
            through: models.AlbumArtist,
            foreignKey: 'artist_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    return Artist;
}