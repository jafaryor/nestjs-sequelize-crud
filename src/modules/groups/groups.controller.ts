import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { GroupsService } from './groups.service';
import { Group as GroupEntity } from './group.entity';
import { GroupDto } from './dto/group.dto';
import { UserGroupDto } from '../user-groups/dto/user-group.dto';

/**
 * Groups Controller.
 */
@Controller('groups')
@ApiTags('groups')
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  /**
   * JWT is used to protect the route.
   * Only logged in users have access to this API.
   */
  @Get()
  @ApiOkResponse({ type: [GroupDto] })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return await this.groupService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: GroupDto })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: number): Promise<GroupEntity> {
    const group = await this.groupService.findOneById(id);

    // if the group doesn't exit in the db, throw a 404 error.
    if (!group) {
      throw new NotFoundException('This Group does not exist');
    }

    return group;
  }

  @Post()
  @ApiCreatedResponse({ type: GroupEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() user: GroupDto): Promise<GroupEntity> {
    return await this.groupService.create(user);
  }

  @Put(':id')
  @ApiOkResponse({ type: GroupEntity })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: number,
    @Body() group: GroupDto
  ): Promise<GroupDto> {
    const {
      numberOfAffectedRows,
      updatedGroup,
    } = await this.groupService.update(id, group);

    // if the number of row affected is zero, it means the group doesn't exist in the db.
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('This Group does not exist');
    }

    return updatedGroup;
  }

  @Delete(':id')
  @ApiOkResponse({ type: GroupEntity })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: number): Promise<string> {
    const deleted = await this.groupService.delete(id);

    // if the number of row affected is zero, then the group doesn't exist in the db.
    if (deleted === 0) {
      throw new NotFoundException('This Group does not exist');
    }

    return 'Successfully deleted';
  }

  @Post('add-users')
  @ApiCreatedResponse({ type: GroupEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async addUsersToGroup(@Body() userGroups: UserGroupDto): Promise<string> {
    const added = await this.groupService.addUsersToGroup(userGroups);

    // if the number of row affected is zero, then the group doesn't exist in the db.
    if (added) {
      throw new NotFoundException('Ether the group or user does not exist');
    }

    return 'Successfully added';
  }
}
