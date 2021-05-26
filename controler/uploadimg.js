const multer=require('multer');
const path= require('path');

const storage = multer.diskStorage({
    destination: './upload/',
    filename: (req, file, cb) => {
        try{
            console.log(file)
          return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);  
        }catch (err) {
            console.log(err,'upload errr')
          return cb(err,null);
        }
        
    }
})

const upload=multer({
    storage:storage,
    limits:{
        fileSize:100000
    }
})

module.exports= upload;