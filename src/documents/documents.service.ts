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

	async getFiles(investorId) {
		return await this.documentModel.find({ folder: investorId });
	}

	async createDocument(title, folder, type, gcloudPath) {
		console.log(title, folder, type, gcloudPath);
		return await this.documentModel.create({
			title,
			folder,
			type,
			gcloudPath,
		});
	}

	async deleteDocument(documentId) {
		return await this.documentModel.findByIdAndDelete(documentId);
	}

	async updateDocument(documentId, title, folder, type, gcloudPath) {
		const document = this.documentModel.findByIdAndUpdate(
			documentId,
			{ title, folder, type, gcloudPath },
			{ new: true },
		);

		return await document.exec();
	}
}
