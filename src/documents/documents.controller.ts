import { Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { DocumentsService } from "./documents.service";

@Controller('documents')
export class DocumentsController {
	constructor(
		private readonly documentsService: DocumentsService,
	) {}

	@Get('')
	async getDocument(@Query('documentId') documentId: string) {
		return await this.documentsService.getFile(documentId)
	}

	@Get('')
	async getAllDocuments() {
		return await this.documentsService.getFiles();
	}

	@Post('')
	async createDocument() {
		return await this.documentsService.createDocument();
	}

	@Delete('')
	async deleteDocument() {
		return await this.documentsService.deleteDocument();
	}
}
