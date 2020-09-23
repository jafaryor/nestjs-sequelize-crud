import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';

import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  /**
   * Returns all the users from DB.
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  /**
   * Returns all the users with the specific ids from DB.
   */
  async findAllByIds(userIds: number[]): Promise<User[]> {
    return await this.userRepository.findAll({where: {id: userIds}});
  }

  /**
   * Look up a user from the user table by the user Id and returns the user.
   */
  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  /**
   * Look up a user by login.
   */
  async findOneByLogin(login: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { login } });
  }

  /**
   * Look up a users whose logins are similar to "login" param.
   */
  async getAutoSuggestUsers(login: string, limit: number = 5): Promise<User[]> {
    return await this.userRepository.findAll<User>({
      where: {
        login: {
          [Op.substring]: login,
        }
      },
      order: ['login'],
      limit
    });
  }

  /**
   * Creates a new user into the user table and returns
   * the newly created user object.
   */
  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  /**
   * Updates the user with new data and returns it.
   */
  async update(id: number, user: UserDto) {
    const [
      numberOfAffectedRows,
      [updatedUser],
    ] = await this.userRepository.update(
      { ...user },
      { where: { id }, returning: true },
    );

    return { numberOfAffectedRows, updatedUser };
  }

  /**
   * Deletes a user from db.
   */
  async delete(id: number): Promise<number> {
    return await this.userRepository.destroy({ where: { id } });
  }

  /**
   * Marks a user as deleted.
   */
  async softDelete(id: number): Promise<number> {
    const [
      numberOfAffectedRows,
      [updatedUser],
    ] = await this.userRepository.update(
      { isDeleted: true },
      { where: { id }, returning: true },
    );

    return numberOfAffectedRows;
  }
}
