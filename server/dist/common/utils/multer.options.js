"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = void 0;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const common_1 = require("@nestjs/common");
const createFolder = (folder) => {
    const logger = new common_1.Logger('Multer');
    try {
        logger.log('업로드 루트 폴더를 생성합니다.');
        fs.mkdirSync(path.join(__dirname, '..', `uploads`));
    }
    catch (error) {
        logger.log('업로드 루트 폴더가 이미 존재합니다.');
    }
    try {
        logger.log(`${folder} 폴더를 생성합니다.`);
        fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
    }
    catch (error) {
        logger.log(`${folder} 폴더는 이미 존재합니다.`);
    }
};
const storage = (folder) => {
    createFolder(folder);
    return multer.diskStorage({
        destination(req, file, cb) {
            const folderName = path.join(__dirname, `../uploads/${folder}`);
            cb(null, folderName);
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            const fileName = `${path.basename(file.originalname, ext)}${Date.now()}${ext}`;
            cb(null, fileName);
        },
    });
};
const multerOptions = (folder) => {
    const result = {
        storage: storage(folder),
    };
    return result;
};
exports.multerOptions = multerOptions;
//# sourceMappingURL=multer.options.js.map