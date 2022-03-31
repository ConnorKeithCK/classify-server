import { Controller, Get, Query } from "@nestjs/common";
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

}
