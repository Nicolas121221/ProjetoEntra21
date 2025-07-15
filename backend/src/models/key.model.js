export default function (sequelize, DataTypes) {
    const Key = sequelize.define('key', {
        key: {
            type: DataTypes.STRING(4),
            unique: true,
            allowNull: false
        }
    },{
        timestamps: false
    });

    Key.associate = (models) => {
        Key.hasMany(models.Song, { foreignKey: 'key_id' });
    };

    return Key;
}