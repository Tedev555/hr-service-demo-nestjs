import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ExampleController } from '../controllers/example.controller';
import { CatsModule } from './cats.module';
import { UserModule } from './user.module';

@Module({
  imports: [CatsModule, UserModule],
  controllers: [AppController, ExampleController],
  providers: [AppService],
})
export class AppModule {}
