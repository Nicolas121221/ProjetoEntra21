export default function (sequelize, DataTypes) {
    const Song = sequelize.define('Song', {
        track_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        bpm: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        duration_ms: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        chords: {
            type: DataTypes.JSON
        },
        tuning: {
            type: DataTypes.STRING(20),
            allowNull: true,
            defaultValue: 'Padrão'
        },
        measure_id: DataTypes.INTEGER,
        key_id: DataTypes.INTEGER,
        album_id: DataTypes.INTEGER
    },{
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    Song.associate = (models) => {
        Song.belongsTo(models.Album, {
            foreignKey: 'album_id',
            onDelete: 'CASCADE'
        });

        Song.belongsTo(models.Key, {
            foreignKey: 'key_id',
            onDelete: 'CASCADE'
        });

        Song.belongsTo(models.Measure, {
            foreignKey: 'measure_id',
            onDelete: 'CASCADE'
        });

        Song.belongsToMany(models.Playlist, {
            through: models.PlaylistSong,
            foreignKey: 'song_id',
            otherKey: 'playlist_id',
            onDelete: 'CASCADE'
        });
    };

    return Song;
}