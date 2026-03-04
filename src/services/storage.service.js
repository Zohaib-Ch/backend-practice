const { ImageKit } = require("@imagekit/nodejs")


const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadFile(file) {
    const result = await ImageKitClient.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg",
    })

    return result;
}


module.exports = { uploadFile }