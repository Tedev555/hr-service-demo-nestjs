import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ExampleController } from '../controllers/example.controller';
import { CatsModule } from './cats.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/resources/users/user.entity';
import { Permission } from 'src/entities/permission.entity';
import { Role } from 'src/entities/role.entity';
import { PermissionsController } from 'src/resources/permissions/permissions.controller';
import { PermissionsModule } from 'src/resources/permissions/permissions.module';
import { PermissionsService } from 'src/resources/permissions/permissions.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Permission, Role, User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CatsModule,
    PermissionsModule,
  ],
  controllers: [AppController, ExampleController, PermissionsController],
  providers: [AppService, PermissionsService],
})
export class AppModule {}
