export default function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  },{
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  User.associate = (models) => {
    User.hasMany(models.Playlist, { foreignKey: "user_id" });
    User.hasMany(models.UserSearch, { foreignKey: "user_id" });
    User.hasOne(models.UserToken, { foreignKey: "user_id" });
  };

  return User;
}
