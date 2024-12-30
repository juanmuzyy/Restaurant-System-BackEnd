import crypto from 'crypto';
import multer from 'multer';
import { extname, resolve } from 'path';

export default {
  upload(folder: string) {
    return multer.diskStorage({
      destination: resolve(__dirname, '..', '..', folder), // Diretório onde as imagens serão armazenadas
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName); // Retorna o nome final do arquivo
      },
    });
  },
};
