//      Ye isliye liye new bnaya kyunki hmara ye services ka sure nahi ki hmesaha yahan se se use kre 
//      just like "IMAGEKIT" 

const ImageKit = require("@imagekit/nodejs") ;

const imagekit = new ImageKit({

    privateKey : process.env.IMAGEKIT_PRIVATE_KEY ,

})



async function uploadFile(buffer){
     
    const result = await imagekit.files.upload({

        file: buffer.toString("base64") ,
        fileName: "image.jpg"

    })

    return result ;

}

module.exports = uploadFile ;