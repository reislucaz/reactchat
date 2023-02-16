import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../entities';
import * as bcrypt from 'bcrypt';
import { Logger } from 'nestjs-pino';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @Inject(Logger)
    private readonly logger: Logger,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      login: createUserDto.login,
    });

    if (userExists) return null;

    const user = new User();
    user.name = createUserDto.name;
    user.login = createUserDto.login;
    user.password = await bcrypt.hash(createUserDto.password, 10);

    this.userRepository.persist(user);
    this.userRepository.flush();

    this.logger.log(`User created with success! ${user.login}`);

    return user;
  }

  async findAll(page = 1) {
    const users = await this.userRepository.find(
      {
        active: true,
      },
      { limit: 10, offset: (page - 1) * 10 },
    );

    users.map((user) => {
      delete user.password;
      delete user.active;
      delete user.login;
    });

    return users;
  }

  async findOne(uuid: string) {
    const user = await this.userRepository.findOne({ uuid });

    if (!user) return null;

    return user;
  }

  async findByLogin(login: string) {
    const user = await this.userRepository.findOne({ login });

    if (!user) return null;

    return user;
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ uuid });

    const loginExists = await this.userRepository.findOne({
      login: updateUserDto.login,
    });

    if (loginExists && loginExists.uuid !== uuid) return null;

    if (updateUserDto.password)
      user.password = await bcrypt.hash(updateUserDto.password, 10);

    this.userRepository.assign(user, { ...user, ...updateUserDto });
    this.userRepository.flush();

    this.logger.log(`User updated with success! ${user.login}`);

    return user;
  }

  async remove(uuid: string) {
    const user = await this.userRepository.findOne({ uuid });

    if (!user) return null;

    this.userRepository.removeAndFlush(user);

    this.logger.log(`User removed with success! ${user.login}`);

    return user;
  }
}
