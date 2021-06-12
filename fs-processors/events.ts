import * as EventEmitter from 'events';
import { FileProcessor } from './fs-processor';
import * as readline from 'readline';
import { ECoreEvents as e } from '../lib/main-lib';
import { doOnException, doOnFileNotFound } from './callbacks';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const doOnLineEvent = (input: string) => {
  rl.prompt();
  console.info(`You have entered ${input}`);
};

rl.on('line', doOnLineEvent);

export const coreEventEmitter = new EventEmitter();
const fp = new FileProcessor();

const main = () => {
  fp.showCurrentStat();
  rl.question('Enter name of file you want to read: ', (answer: string) => {
    fp.readFileByName(answer);
  });
  //fp.readFileByName('test.js');
};

coreEventEmitter.on(e.EXCEPTION, doOnException);

coreEventEmitter.on(e.FILE_NOT_FOUND, doOnFileNotFound);

coreEventEmitter.on(e.FILES_READED, main);
