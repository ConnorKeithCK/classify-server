import { Body, ConsoleLogger, Controller, Delete, Get, Param, Post, Query, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { StorageService } from "src/storage/azure.service";
import { DocumentsService } from "./documents.service";
import { v4 as uuidv4 } from 'uuid'

const axios = require('axios')

@Controller('documents')
export class DocumentsController {
	constructor(
		private readonly documentsService: DocumentsService,
		private readonly storageService: StorageService
	) {}

	@Get('view')
	async getUrl(@Query('file') file) {
		return await this.storageService.getSignedUrl(file)
	}

	@Get('')
	async getAllDocuments() {
		return await this.documentsService.getFiles();
	}

	@Post('')
	@UseInterceptors(FileInterceptor('file'))
	async createDocument(@UploadedFile() file: any) {
		let hash = null;
		await axios({
			method: 'post',
			url: `${process.env.KALEIDO_REST_API}/transactions`,
			data: {
					"headers": {
					  "type": "SendTransaction",
					  "signer": "user2",
					  "channel": "default-channel",
					  "chaincode": "asset_transfer"
					},
					"func": "CreateAsset",
					"args": [
					  `${file.originalname}`, "red", "10", "FBI", "1"
					],
					"init": false
			}
		}).then(res => {
			hash = res.data.transactionID
		}).catch(e => {
			console.log(e)
		})
		if (hash) {
			const path = await this.storageService.uploadDocument(file)
			return await this.documentsService.createDocument(file, path, hash);
		}
	}

	@Get('transaction')
	async getTransaction(@Query('transaction') transaction) {
		let response = null;
		await axios({
			method: 'get',
			url: `${process.env.KALEIDO_REST_API}/transactions/${transaction}?fly-channel=${encodeURIComponent('default-channel')}&fly-signer=${encodeURIComponent('user2')}`,
		}).then(res => {
			response = res.data.result
		}).catch(e => {
			console.log(e)
		})

		return response;
	}

}
