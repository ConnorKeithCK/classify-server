import { BlobServiceClient } from '@azure/storage-blob'
import { v4 as uuidv4 } from 'uuid'

const client = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const documentsContainer = client.getContainerClient(process.env.AZURE_DOCS_CONTAINER)

async function uploadDocument(file) {
    const blobName = uuidv4();
    const blobClient = documentsContainer.getBlockBlobClient(blobName);
    blobClient.setMetadata({title: file.title})
    // return await blobClient.upload(data, data lenth)
}



module.exports = {
    uploadDocument
}