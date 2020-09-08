import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Post } from '../../modules/posts/post.entity';


export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;

      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }

      const sequelize = new Sequelize(config);

      sequelize.addModels([User, Post]);
      await sequelize.sync();

      return sequelize;
    },
  },
];

/**
 * Sequelize in NestJS: https://docs.nestjs.com/recipes/sql-sequelize
 * Sequelize Typescript: https://github.com/RobinBuschmann/sequelize-typescript
 * Migration: https://sequelize.org/master/manual/migrations.html
 */
