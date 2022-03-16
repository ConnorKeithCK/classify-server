import { Controller } from "@nestjs/common";

@Controller('documents')
export class DocumentsController {
	constructor(
		private readonly documentsService: DocumentsService,
	) {}

}
