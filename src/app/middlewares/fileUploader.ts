/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import slugify from 'slugify'; // optional, for cleaner short filenames

export const uploadFile = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let uploadPath = '';

      if (
        file.fieldname === 'cover_image' ||
        file.fieldname === 'profile_image'
      ) {
        uploadPath = 'uploads/images/profile';
      } else if (file.fieldname === 'product_img') {
        uploadPath = 'uploads/images/products';
      } else if (file.fieldname === 'cover_photo' || file.fieldname === 'gallery_photo') {
        uploadPath = 'uploads/images/restaurant';
      } else if (file.fieldname === 'image') {
        uploadPath = 'uploads/images/image';
      } else if (file.fieldname === 'message_img') {
        uploadPath = 'uploads/images/message';
      } else if (file.fieldname === 'video') {
        uploadPath = 'uploads/video';
      } else {
        uploadPath = 'uploads';
      }

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'video/mp4'
      ) {
        cb(null, uploadPath);
      } else {
        //@ts-ignore
        cb(new Error('Invalid file type'));
      }
    },

    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname); // .jpg, .png, etc.
      const base = slugify(path.basename(file.originalname, ext), {
        lower: true,
        strict: true,
      }).substring(0, 20); // optional slugified prefix, max 20 chars
      const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 1e6)}-${base}${ext}`;
      cb(null, uniqueName);
    },
  });

  const fileFilter = (req: Request, file: any, cb: any) => {
    const allowedFieldnames = [
      'image',
      'profile_image',
      'cover_image',
      'product_img',
      'video',
      'thumbnail',
      'video_thumbnail',
      'message_img',
      'gallery_photo',
      'cover_photo',
    ];

    if (file.fieldname === undefined) {
      cb(null, true);
    } else if (allowedFieldnames.includes(file.fieldname)) {
      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/webp' ||
        file.mimetype === 'video/mp4'
      ) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type'));
      }
    } else {
      cb(new Error('Invalid fieldname'));
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  }).fields([
    { name: 'image', maxCount: 30 },
    { name: 'product_img', maxCount: 10 },
    { name: 'cover_image', maxCount: 1 },
    { name: 'profile_image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'video_thumbnail', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
    { name: 'message_img', maxCount: 10 },
    { name: 'cover_photo', maxCount: 1 },
    { name: 'gallery_photo', maxCount: 10 },
  ]);

  return upload;
};
