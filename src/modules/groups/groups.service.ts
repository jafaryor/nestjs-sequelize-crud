import { Injectable, Inject } from '@nestjs/common';

import { Group } from './group.entity';
import { UsersService } from '../users/users.service';
import { GroupDto } from './dto/group.dto';
import { GROUP_REPOSITORY, USER_REPOSITORY } from '../../core/constants';
import { UserGroupDto } from '../user-groups/dto/user-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @Inject(GROUP_REPOSITORY) private readonly groupRepository: typeof Group,
    private readonly userService: UsersService
  ) {}

  /**
   * Returns all the groups from DB.
   */
  async findAll(): Promise<Group[]> {
    return await this.groupRepository.findAll<Group>();
  }

  /**
   * Look up a group from the group table by the group Id and returns the group.
   */
  async findOneById(id: number): Promise<Group> {
    return await this.groupRepository.findOne<Group>({ where: { id } });
  }

  /**
   * Creates a new group into the group table and returns
   * the newly created group object.
   */
  async create(group: GroupDto): Promise<Group> {
    return await this.groupRepository.create<Group>(group);
  }

  /**
   * Updates the group with new data and returns it.
   */
  async update(id: number, group: GroupDto) {
    const [
      numberOfAffectedRows,
      [updatedGroup],
    ] = await this.groupRepository.update(
      { ...group },
      { where: { id }, returning: true }
    );

    return { numberOfAffectedRows, updatedGroup };
  }

  /**
   * Deletes a group from DB.
   */
  async delete(id: number): Promise<number> {
    return await this.groupRepository.destroy({ where: { id } });
  }

  /**
   * Adds user to a group by their ids.
   */
  async addUsersToGroup(userGroups: UserGroupDto): Promise<boolean> {
    const users = await this.userService.findAllByIds(userGroups.userIds);
    const group = await this.groupRepository.findOne({
      where: { id: userGroups.groupId },
    });

    if (!users || !group) return false;

    group.$set('user', users);

    return true;
  }
}
