const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {
    try {
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const containerName = "your-container-name"; // change this

        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);

        const file = req.body;
        const fileName = req.query.name;

        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.uploadData(file);

        context.res = {
            status: 200,
            body: "Upload successful"
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: err.message
        };
    }
};
