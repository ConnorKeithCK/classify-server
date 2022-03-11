import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
  MongooseModule.forRoot(process.env.MONGO_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
