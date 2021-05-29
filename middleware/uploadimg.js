const multer = require('multer');
const path = require('path');

const filenames ={
  file:(req, file, cb) => {
  try {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  } catch (err) {
    console.log(err, 'upload errr')
    return cb(err, null);
  }
},
limits: {
  fileSize: 100000
},
filter:(req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
}

}
 
const multprofile ={
  storage: multer.diskStorage({
    destination: './upload/profile',
    filename: filenames.file
  }),
  limits:filenames.limits,
  fileFilter: filenames.filter
}
const multroom ={
  storage: multer.diskStorage({
    destination: './upload/room',
    filename: filenames.file
  }),
  limits:filenames.limits,
  fileFilter: filenames.filter
}  
  const uploadimg=multer(multprofile)
  const uploadroom=multer(multroom)

 
module.exports = uploadimg;
module.exports = uploadroom;