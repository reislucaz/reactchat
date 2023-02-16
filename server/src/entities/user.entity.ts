import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryKey()
  uuid: string = v4();

  @Property()
  name!: string;

  @Property()
  login!: string;

  @Property()
  password!: string;

  @Property({ default: true, type: 'boolean' })
  active: boolean;

  @Property({ default: Role.USER })
  role: Role;
}
