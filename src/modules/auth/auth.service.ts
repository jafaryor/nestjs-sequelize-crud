import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Checks if the user exists and if the password is correct.
   * Returns null if not valid or the user object if valid.
   */
  async validateUser(username: string, pass: string) {
    // find if user exist with this email
    const user = await this.userService.findOneByEmail(username);

    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);

    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = user['dataValues'];

    return result;
  }

  /**
   * Logins the user.
   * This takes the user information, generates a token with it,
   * and then returns the token and user object.
   */
  public async login(user) {
    const token = await this.generateToken(user);

    return { user, token };
  }

  /**
   * Creates a new user.
   * This takes the user information, hash the user password,
   * saves the user to the DB, removes the password from the
   * newly returned user, generates a token with the user object,
   * and then returns the token and user object.
   */
  public async create(user) {
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.userService.create({ ...user, password: pass });

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newUser['dataValues'];

    // generate token
    const token = await this.generateToken(result);

    // return the user and the token
    return { user: result, token };
  }

  /**
   * Generates a token and then returns it.
   */
  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);

    return token;
  }

  /**
   * Hashes the user password and returns the hashed password.
   */
  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);

    return hash;
  }

  /**
   * Compares the user-entered password and user DB password.
   */
  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);

    return match;
  }
}
