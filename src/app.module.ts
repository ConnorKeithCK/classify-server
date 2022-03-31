import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { DocumentsController } from './documents/documents.controller';
import { DocumentsModule } from './documents/documents.module';
import { DocumentsService } from './documents/documents.service';

@Module({
  imports: [DocumentsModule,
            MongooseModule.forRoot(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
  })],
})
export class AppModule {}
