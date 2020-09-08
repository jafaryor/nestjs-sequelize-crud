import { QueryInterface, DataTypes } from 'sequelize';


/**
 * db:migrate
 * Creates the necessary tables.
 */
export async function up(query: QueryInterface) {
  try {
    await query.createTable('Users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
      gender: {
        type: new DataTypes.ENUM('male', 'female'),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    await query.createTable('Posts', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
      body: {
        type: new DataTypes.TEXT(),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

/**
 * db:migrate:undo:all
 * Destroys the created tales.
 */
export async function down(query: QueryInterface) {
  try {
    await query.dropTable('Posts');
    await query.dropTable('Users');
  } catch (e) {
    return Promise.reject(e);
  }
}

