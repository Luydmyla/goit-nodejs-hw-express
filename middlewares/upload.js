const multer = require("multer");
const path = require("path");
// __dirname = шлях до папки де знаходиться файл, а темп аплоад в папці мідлвари, в ній папки темп немає, тому дописуємо "../"
const tmpDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    // 1-передаємо нал, 2 - шлях до тимчасового сховища
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});
const upload = multer({
  storage: multerConfig,
});
module.exports = upload;
