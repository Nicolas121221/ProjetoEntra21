export default function (sequelize, DataTypes) {
    const Measure = sequelize.define('Measure', {
        beat: {
            type: DataTypes.STRING(4),
            unique: true,
            allowNull: false
        }
    },{
        timestamps: false
    });

    Measure.associate = (models) => {
        Measure.hasMany(models.Song, { foreignKey: 'key_id' });
    };

    return Measure;
}