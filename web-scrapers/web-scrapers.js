const puppeteer = require('puppeteer');
const getDOM = require('../dom-parsers/dom-parsers');
const loginToVk = require('./auth');

const urlFilmTransform = (param) => {
  return `https://www.kinopoisk.ru/film/${param}/`;
};

const randomIdGen = () => {
  let randomId = Math.floor(Math.random() * 1200) + 1;
  return randomId;
};

const getWebScrapedData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const getFilmPageContent = async (id) => {
    await page.goto(urlFilmTransform(id), { waitUntil: 'networkidle2' });
    const rawFilmData = await page.content();
    return rawFilmData;
  };
  const rawdata = await getFilmPageContent(316);
  const movieData = await getDOM.getDOM(rawdata);
  await browser.close();
  return movieData;
};

const getWebScrapedDataArray = async (startId, endId) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let resultset = [];

  const getFilmPageContent_2 = async (id) => {
    await page.goto(urlFilmTransform(id), { waitUntil: 'networkidle2' });
    const content = await page.content();
    return content;
  };
  //формируем массив интересующих объектов
  for (i = startId; i < endId; i++) {
    const rd = await getFilmPageContent_2(i);
    const md = await getDOM.getDOM(rd);
    resultset.push(md);
  }

  await browser.close();
  return resultset;
};

const getWebScrapedDataArrayTest = async (startId, endId) => {
  const waitTimeout = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.kinopoisk.ru/', { waitUntil: 'networkidle2' });
  await waitTimeout(5000);
  await page.goto(urlFilmTransform(startId), { waitUntil: 'networkidle2' });
};

const getVkData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const getFilmPageContent = async (id) => {
    await page.goto(urlFilmTransform(id), { waitUntil: 'networkidle2' });
    const rawFilmData = await page.content();
    return rawFilmData;
  };
  const rawdata = await getFilmPageContent(316);
  const movieData = await getDOM.getDOM(rawdata);
  await browser.close();
  return movieData;
};

module.exports.getWebScrapedData = getWebScrapedData;
module.exports.getWebScrapedDataArray = getWebScrapedDataArray;
module.exports.getWebScrapedDataArrayTest = getWebScrapedDataArrayTest;
