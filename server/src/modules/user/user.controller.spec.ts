import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import config from '../../mikro-orm.config';
import { Role, User } from '../../entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { LoggerModule } from 'nestjs-pino';

const model1 = {
  name: 'Dev Developer',
  login: 'a1',
  password: 'devdevdev',
};

const model2 = {
  name: 'Dev Developer',
  login: 'a2',
  password: 'devdevdev',
};

const mockRequest = (uuid: string) => {
  return {
    user: {
      uuid: uuid,
      role: Role.USER,
    },
  };
};

describe('User Controller', () => {
  let userController: UserController;
  let orm: MikroORM;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          dbName: 'nest-mikro-test-db',
          allowGlobalContext: true,
        }),
        MikroOrmModule.forFeature({ entities: [User] }),
        LoggerModule.forRoot(),
      ],
      providers: [UserService],
      controllers: [UserController],
    }).compile();

    userController = module.get(UserController);
    orm = module.get(MikroORM);
    await orm.getSchemaGenerator().refreshDatabase();
  });

  it(`should create a new user`, async () => {
    const res1 = await userController.create(model1);

    expect(res1).toHaveProperty('uuid');
    expect(res1).toHaveProperty('name');
    expect(res1).toHaveProperty('login');
    expect(res1).toHaveProperty('password');
    expect(res1.password).not.toEqual('a1');
  });

  it(`should throw an error when creating a user with an existing login`, async () => {
    await userController.create(model1);

    expect(userController.create(model1)).rejects.toThrow();
  });

  it(`should update a user`, async () => {
    const res1 = await userController.create(model1);

    const res2 = await userController.update(
      res1.uuid,
      { password: '123456' },
      mockRequest(res1.uuid),
    );

    expect(res2).toHaveProperty('uuid');
    expect(res2).toHaveProperty('name');
    expect(res2).toHaveProperty('login');
    expect(res2).toHaveProperty('password');

    expect(bcrypt.compareSync(res2.password, 'devdevdev')).toBeFalsy();
  });

  it(`should return a user`, async () => {
    const res1 = await userController.create(model1);

    const res2 = await userController.findOne(res1.uuid);

    expect(res2).toHaveProperty('uuid');
  });

  it(`should return a list of users`, async () => {
    await userController.create(model1);
    await userController.create(model2);

    const res = await userController.findAll();

    expect(res).toHaveLength(2);
  });

  it(`should remove a user`, async () => {
    const res1 = await userController.create(model1);

    const res2 = await userController.remove(res1.uuid, mockRequest(res1.uuid));

    expect(res2).toHaveProperty('uuid');
  });
});
