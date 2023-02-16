import { CacheModule, Module } from '@nestjs/common';
import { configService } from './config/config.service';
import { LoggerModule } from 'nestjs-pino/LoggerModule';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    LoggerModule.forRoot(configService.getLoggerConfig()),
    CacheModule.register(configService.getCacheConfig()),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
