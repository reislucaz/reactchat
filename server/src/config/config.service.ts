import { ReflectMetadataProvider } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import * as dotenv from 'dotenv';
import * as redisStore from 'cache-manager-redis-store';
import 'reflect-metadata';
import { Logger } from '@nestjs/common';

dotenv.config();
const logger = new Logger('MikroORM');

// Classe muito importante, é através dela que é feito toda a configuração da API, através do .env ou
// variáveis de ambiente já incluídas na configuração do servidor.
// Ela é responsável por pegar as variáveis de ambiente e passar para o servidor.

export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Erro na configuração - faltando env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  // Esse método é responsável por pegar o valor da variável de ambiente MODE, que pode ser DEV ou PROD.
  public isProduction() {
    const mode = this.getValue('MODE', true);
    return mode != 'DEV';
  }

  public getMikroOrmConfig(): MikroOrmModuleSyncOptions {
    return {
      type: 'mysql',
      driver: MySqlDriver,

      clientUrl: this.getValue('DATABASE_URL'),

      entities: ['./dist/**/entities/*.entity.js'],
      entitiesTs: ['./src/**/entities/*.entity.ts'],

      migrations: { path: 'src/migration/*.ts', tableName: 'migration' },

      logger: logger.log.bind(logger),
      debug: !this.isProduction(),

      metadataProvider: ReflectMetadataProvider,
    };
  }

  public getJwtConfig() {
    return {
      secret: this.getValue('JWT_SECRET'),
      signOptions: {
        expiresIn: this.getValue('JWT_EXPIRES_IN'),
      },
    };
  }

  public getLoggerConfig() {
    if (this.isProduction()) {
      return {};
    } else {
      return {
        pinoHttp: {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: true,
              singleLine: true,
            },
          },
        },
      };
    }
  }

  public getCacheConfig(): any {
    return {
      isGlobal: true,
      ttl: 3600,
      max: 1000,
      store: redisStore,
      host: this.getValue('REDIS_HOST'),
      port: parseInt(this.getValue('REDIS_PORT')),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DATABASE_URL',
  'REDIS_HOST',
  'REDIS_PORT',
  'PORT',
  'MODE',
  'JWT_SECRET',
]);

export { configService };
