import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ClassifyDoc, ClassifyDocSchema } from './documents.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: ClassifyDoc.name, schema: ClassifyDocSchema }])],
    controllers: [DocumentController],
    providers: [DocumentService],
  })
  export class CatsModule {}