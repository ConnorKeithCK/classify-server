import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DocumentsController } from './documents.controller'
import { ClassifyDoc, ClassifyDocSchema } from './documents.schema'
import { DocumentsService } from './documents.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: ClassifyDoc.name, schema: ClassifyDocSchema }])],
    controllers: [DocumentsController],
    providers: [DocumentsService],
  })
  export class DocumentsModule {}