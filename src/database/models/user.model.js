import { DataTypes, } from 'sequelize';

import { connection } from '../connection.js';

const User = connection.define(
  'users',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  },
);

User.sync({
  // force: true,
});

export { User, };