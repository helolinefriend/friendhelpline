// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: './upload/',
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage });

// export default upload;



// gpt  build

import multer from 'multer';
import path from 'path';

// Setup Multer
const storage = multer.diskStorage({
  destination: './upload/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Internal utility function to handle the Multer middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default upload;
export { runMiddleware }; // This line is removed to avoid export errors








