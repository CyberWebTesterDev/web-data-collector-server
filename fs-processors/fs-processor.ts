import * as fs from 'fs';
import * as path from 'path';
import { ECoreEvents as e } from '../lib/main-lib';
import { coreEventEmitter } from './events';
import * as os from 'os';

export class FileProcessor {
  readonly currentPath: fs.PathLike;

  private currentStats: {
    currentPath: fs.PathLike;
    files: Array<string>;
    [key: string]: any;
  };

  constructor() {
    console.log('Starting FileProcessor module...');
    this.currentPath = path.join(__dirname);
    this.currentStats = {
      currentPath: this.currentPath,
      files: [],
    };
    this.getCurrentFilesList();
    console.log(`current hostname: ${os.hostname()}`);
  }

  public getCurrentPath = () => {
    return this.currentPath;
  };

  public showCurrentStat = () => {
    console.log(`Current stats: \n`);
    this.setNextLine();
    console.log(this.currentStats);
    this.setNextLine();
  };

  private setNextLine = () => {
    console.log('\n');
  };

  private logger = (message: string) => {
    console.log(`FileProcessor: ${message}`);
    this.setNextLine();
  };

  private getCurrentFilesList = () => {
    fs.readdir(
      this.currentPath,
      (err: NodeJS.ErrnoException, files: string[]) => {
        if (err) coreEventEmitter.emit(e.EXCEPTION, err);
        this.currentStats.files = files;
        coreEventEmitter.emit(e.FILES_READED);
      },
    );
  };

  public readFileByName = (fileName: string = '') => {
    if (fileName) {
      let foundFile = this.currentStats.files.find((file) => file === fileName);
      console.log(foundFile);
      if (foundFile) {
        const rawFileData = fs.readFileSync(foundFile);
        this.logger(`Read file ${foundFile} data: `);
        console.log(rawFileData);
      } else {
        coreEventEmitter.emit(e.FILE_NOT_FOUND, fileName);
      }
    } else {
      console.error(`The file name in argument is invalid`);
    }
  };
}
