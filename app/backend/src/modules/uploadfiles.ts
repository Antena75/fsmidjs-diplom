import { NestInterceptor, Type } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

export function UploadFiles(): Type<NestInterceptor> {
  return FilesInterceptor('images', 5, {
    storage: diskStorage({
      destination: path.join(__dirname, '..', '..', '..', '/frontend/public/libraries'),
      filename: (req, file, cb) => {
        const filename = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype.includes('jpg') ||
        file.mimetype.includes('jpeg') ||
        file.mimetype.includes('png') ||
        file.mimetype.includes('webp')
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });
}
