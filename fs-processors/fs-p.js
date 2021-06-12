const fs = require('fs');
const path = require('path');

class FileProcessor {
  _currentPath = '';

  _files = [];

  currentStats = {
    currentPath: this._currentPath,
  };

  constructor() {
    console.log('Starting FileProcessor module...');
    this._currentPath = path.join(__dirname);
  }

  getCurrentPath() {
    this.logger(`current path: ${this._currentPath}`);
  }

  showCurrentStat() {
    console.log(`Current stats: \n`);
    this.setNextLine();
    console.log(this.currentStats);
    this.setNextLine();
  }

  setNextLine() {
    console.log('\n');
  }

  logger(message) {
    console.log(`FileProcessor: ${message}`);
    this.setNextLine();
  }

  async getCurrentFilesList() {
    fs.readdir(this._currentPath, (err, files = []) => {
      if (err) throw err;
      this.logger('list of files in current dir: ');
      console.log(files);
      this.files = files;
      if (files.length > 0) {
        files.forEach((file) => {
          this.logger(`checking file ${file}`);
          let fileId = fs.openSync(file, 'r');
          fs.fstat(fileId, (err, stats) => {
            if (err) throw err;
            this.logger(`Stats for ${file} id: ${fileId} : `);
            console.log(stats);
            this.setNextLine();
            console.log(`is file? : ${stats.isFile()}`);
            this.setNextLine();
          });
        });
      }
    });
  }

  readFileByName = (fileName = '') => {
    if (fileName) {
      let foundFile = this._files.find((file) => file === fileName);
      console.log(foundFile)
      if (fileName) {
        const rawFileData = fs.readFileSync(fileName);
        this.logger(`Read file ${foundFile} data: `);
        console.log(rawFileData);
      } else {
        this.logger(`File name ${fileName} has not been found in files list;`);
      }
    } else {
      console.error(`The file name in argument is invalid`);
    }
  }
}

const main = async () => {
  const fp = new FileProcessor();
  await fp.getCurrentFilesList();
  fp.getCurrentPath();
  fp.readFileByName('test.js');
};

main();
