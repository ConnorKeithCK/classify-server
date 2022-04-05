import { v4 as uuidv4 } from 'uuid'
import { BlobClient, BlobSASPermissions, BlobServiceClient, ContainerClient, generateBlobSASQueryParameters, StorageSharedKeyCredential } from "@azure/storage-blob";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StorageService {
    client: BlobServiceClient;
    docsContainer: ContainerClient;
    key: any;

    constructor() {
        // this.client = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING)
        // this.docsContainer = this.client.getContainerClient(process.env.AZURE_DOCS_CONTAINER)
        this.key = new StorageSharedKeyCredential(process.env.AZURE_ACCOUNT_NAME, process.env.AZURE_ACCOUNT_KEY)
    }

    
    async uploadDocument(file) {
        const blobName = uuidv4();
        const blobServiceClient = new BlobServiceClient(`https://${process.env.AZURE_ACCOUNT_NAME}.blob.core.windows.net`, this.key)
        const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_DOCS_CONTAINER)
        const blobClient = containerClient.getBlockBlobClient(blobName);
        // blobClient.setMetadata({title: file.originalname})

        const uploadedFile = await blobClient.upload(file.buffer, file.buffer.length, { blobHTTPHeaders: {
            blobContentType: "application/pdf"
        }})

        return blobName;
    }

    async getSignedUrl(file) {
        const blobServiceClient = new BlobServiceClient(`https://${process.env.AZURE_ACCOUNT_NAME}.blob.core.windows.net`, this.key)
        const url = generateBlobSASQueryParameters({
            containerName: process.env.AZURE_DOCS_CONTAINER,
            blobName: file,
            startsOn: new Date(),
            expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // 1 hour
            permissions: BlobSASPermissions.parse("r"),
        }, this.key).toString();

        const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_DOCS_CONTAINER)
        const blobClient = containerClient.getBlobClient(file)
        console.log(url)
        return `${blobClient.url}?${url}`;
    }


}