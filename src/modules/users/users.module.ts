import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { usersProviders } from './users.providers';

@Module({
  providers: [UsersService, ...usersProviders],
  controllers: [],
  exports: [UsersService],
})
export class UsersModule {}
