export default function (sequelize, DataTypes) {
    const AlbumArtist = sequelize.define('AlbumArtist', {
        album_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        artist_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        tableName: 'album_artists'
    });

    AlbumArtist.associate = (models) => {
        AlbumArtist.belongsTo(models.Album, {
            foreignKey: 'album_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        AlbumArtist.belongsTo(models.Artist, {
            foreignKey: 'artist_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    return AlbumArtist;
}