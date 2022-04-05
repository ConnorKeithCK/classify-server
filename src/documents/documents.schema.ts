import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ClassifyDocumentType = ClassifyDoc & Document

@Schema({ timestamps: true })
export class ClassifyDoc {
    @Prop()
    title: string;
    
    @Prop()
    cloudPath: string;

    @Prop()
    agency: string;

    @Prop()
    btcHash: string;

    @Prop()
    accessLevel: string;
}

export const ClassifyDocSchema = SchemaFactory.createForClass(ClassifyDoc)