import { Injectable, Inject } from '@nestjs/common';

import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  /**
   * Creates a new user into the user table and returns
   * the newly created user object.
   */
  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  /**
   * Look up a user from the user table by email and returns the user.
   */
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  /**
   * Look up a user from the user table by the user Id and returns the user.
   */
  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }
}
