import { writeFile, statSync, readdirSync, rm } from 'fs';
import * as path from 'path';
import * as AdmZip from 'adm-zip';
export function saveFile(file: Express.Multer.File, dir: string) {
  return new Promise((resolve, reject) => {
    if (dir && statSync(dir).isDirectory()) {
      const filename = path.resolve(dir, file.originalname);
      writeFile(filename, file.buffer, (err) => {
        if (err) {
          throw err;
        }
        resolve(filename);
      });
    } else {
      throw new Error('文件夹不存在');
    }
  });
}
export function zipDir(dir, filename) {
  // 循环获取dir下面的文件，并且添加进入压缩
  return new Promise((resolve, reject) => {
    if (dir && statSync(dir).isDirectory()) {
      const zip = new AdmZip();
      // 查询dir下面文件
      const filenames = readdirSync(dir);
      if (!filenames.length) resolve(false);
      filenames.forEach((filename) => {
        // 获取.zip文件，并且调过
        if (filename.indexOf('.zip') > -1) return;
        zip.addLocalFile(path.resolve(dir, filename));
      });
      const version = filename + '-' + new Date().getTime();
      const zipName = path.resolve(dir, version + '.zip');
      zip.writeZip(zipName);
      resolve({
        zipedFilename: zipName,
        version,
      });
    } else {
      throw new Error('文件夹不存在');
    }
  });
}
export function unzip(filePath: string) {
  return new Promise((resolve, reject) => {
    try {
      const { dir } = path.parse(filePath);
      if (filePath && statSync(filePath) && path.extname(filePath) === '.zip') {
        const zip = new AdmZip(filePath);
        zip.extractAllTo(/*target path*/ dir, /*overwrite*/ true);
        resolve(true);
      }
    } catch (e) {
      throw new Error(e);
    }
  });
}
export function rmFile(filePath: string) {
  return new Promise((resolve, reject) => {
    rm(filePath, (err) => {
      if (err) throw err;
      resolve(true);
    });
  });
}
