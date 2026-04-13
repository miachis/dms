import multer from "multer";
const myStorage = multer.memoryStorage();
export const uploads = multer({
  storage: myStorage,
  limits: {
    fieldSize: 2000000,
  },
});
