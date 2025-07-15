export default function (sequelize, DataTypes) {
  const UserSearch = sequelize.define(
    "UserSearch",
    {
      song_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      album_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      artist_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      album_imagem_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      }
    },
    {
      tableName: "user_searches",
    }
  );

  UserSearch.associate = (models) => {
    UserSearch.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return UserSearch;
}
