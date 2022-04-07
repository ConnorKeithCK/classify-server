import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { ClassifyDoc } from './documents.schema';
@Injectable()
export class DocumentsService {
	constructor(
		@InjectModel(ClassifyDoc.name)
		private documentModel: Model<ClassifyDoc>,
	) {}

	async getFile(documentId) {
		return await this.documentModel.findById(documentId);
	}

	async getFiles() {
		return await this.documentModel.find();
	}

	async createDocument(file, path, hash) {
		return await this.documentModel.create({
			title: file.originalname,
			cloudPath: path,
			agency: "FBI",
			btcHash: hash,
			accessLevel: "SECRET"
		});
	}

}
