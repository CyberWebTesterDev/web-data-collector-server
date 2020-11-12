const puppeteer = require("puppeteer");
const getDOM = require("../dom-parsers/dom-parsers");

const isLoggedInVK = async () => {
  const urlVk = `https://vk.com/`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(urlVk, { waitUntil: "networkidle2" });
  let flag = await page.evaluate(() => {
    if (document.querySelector("#index_email") !== null) {
      return false;
    } else {
      return true;
    }
  });
  await browser.close();
  return flag;
};

const loginToVkVisual = async () => {
  const urlVk = `https://vk.com/`;
  const br = await puppeteer.launch({ headless: false });
  const browser = await puppeteer.connect({
    browserWSEndpoint: await br.wsEndpoint(),
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 720 });

  //переходим на заданный урл и ждем пока загрузится
  await page.goto(urlVk, { waitUntil: "networkidle2" });

  let isLoggedIn = await page.evaluate(() => {
    if (document.querySelector("#index_email") !== null) {
      return false;
    } else {
      return true;
    }
  });
  if (!isLoggedIn) {
    //если не залогинен вводим данные для аутентификации
    await page.type("#index_email", "bieterchi@yandex.ru");
    await page.type("#index_pass", "Trqgv500");
    await page.click("#index_login_button");
    //ждем перенаправления
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    //веб скрейпинг
    let content = "html";
    for (let i = 200; i < 220; i++) {
      await page.goto(`https://vk.com/id191105${i}`, {
        waitUntil: "networkidle2",
      });
      //загружаем html контент и передаем в DOM парсер
      content = await page.content();
      getDOM.getDOMtest(content);
    }
  } else {
    await page.goto(`https://vk.com/id191105119`, {
      waitUntil: "networkidle2",
    });
    //загружаем html контент и передаем в DOM парсер
    const content = await page.content();
    getDOM.getDOMtest(content);
  }
};

exports.loginToVkVisual = loginToVkVisual;
