import { Body, Controller, Delete, Get, Post, Query, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { StorageService } from "src/storage/azure.service";
import { DocumentsService } from "./documents.service";

@Controller('documents')
export class DocumentsController {
	constructor(
		private readonly documentsService: DocumentsService,
		private readonly storageService: StorageService
	) {}

	@Get('view')
	async getUrl(file) {
		return await this.storageService.getSignedUrl(file)
	}

	@Get('')
	async getAllDocuments() {
		return await this.documentsService.getFiles();
	}

	@Post('')
	@UseInterceptors(FileInterceptor('file'))
	async createDocument(@UploadedFile() file: any) {
		const path = await this.storageService.uploadDocument(file)
		return await this.documentsService.createDocument(file, path);
	}

	@Delete('')
	async deleteDocument() {
		return await this.documentsService.deleteDocument();
	}
}
