import { Body, Controller, Delete, Get, Post, Query, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
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
	@UseInterceptors(FileInterceptor('file'))
	async createDocument(@UploadedFile() file: any, @Req() req) {
		console.log(file)
		// req.files
		return await this.documentsService.createDocument(file);
	}

	@Delete('')
	async deleteDocument() {
		return await this.documentsService.deleteDocument();
	}
}
