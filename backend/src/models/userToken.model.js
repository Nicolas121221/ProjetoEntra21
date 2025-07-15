export default function (sequelize, DataTypes) {
  const UserToken = sequelize.define(
    "UserToken",
    {
      access_token: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      refresh_token: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      token_expires_at: DataTypes.DATE,
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      tableName: "user_tokens",
    }
  );

  UserToken.associate = (models) => {
    UserToken.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return UserToken;
}
