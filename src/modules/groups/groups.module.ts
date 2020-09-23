import { Module } from '@nestjs/common';

import { GroupsService } from './groups.service';
import { groupsProviders } from './groups.providers';
import {UsersModule} from '../users/users.module';


@Module({
  imports: [UsersModule],
  providers: [GroupsService, ...groupsProviders],
  controllers: [],
  exports: [GroupsService],
})
export class GroupsModule {}
