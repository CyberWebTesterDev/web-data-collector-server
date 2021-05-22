const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const getDOM = async (html) => {
  const { document } = new JSDOM(html).window;

  const movieDataMeta = {
    title: document.querySelector('span[class=moviename-title-wrapper]'),
    originalTitle: document.querySelector('.alternativeHeadline'),
    rating: document.querySelector('span[class=rating_ball]'),
    filmId: document.querySelector('head > meta:nth-child(36)'),
    year: document.querySelector(
      '#infoTable > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > a',
    ),
    country: document.querySelector(
      'table.info > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1)',
    ),
    imgsrc: document.querySelector('.popupBigImage > img:nth-child(1)'),
    genre: document.querySelector(
      'table.info > tbody:nth-child(1) > tr:nth-child(11) > td:nth-child(2) > span:nth-child(1)',
    ),
    description: document.querySelector('.film-synopsys'),
    actor_1: document.querySelector(
      '#actorList > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)',
    ),
    actor_2: document.querySelector(
      '#actorList > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)',
    ),
    actor_3: document.querySelector(
      '#actorList > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)',
    ),
    actor_4: document.querySelector(
      '#actorList > ul:nth-child(2) > li:nth-child(4) > a:nth-child(1)',
    ),
    actor_5: document.querySelector(
      '#actorList > ul:nth-child(2) > li:nth-child(5) > a:nth-child(1)',
    ),
    director: document.querySelector(
      'table.info > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2) > a:nth-child(1)',
    ),
  };

  const isNullValues = (obj) => {
    const { title, rating, filmId, year, country, imgsrc } = obj;

    if (
      title !== null &&
      rating !== null &&
      filmId !== null &&
      year !== null &&
      country !== null &&
      imgsrc !== null
    ) {
      return false;
    } else {
      return true;
    }
  };

  const isNullValues2 = (obj) => {
    for (let key in obj) {
      if (obj[key] === null) {
        return true;
      }
    }
    return false;
  };

  const parseData = () => {
    console.log(
      `Starting to parse data from HTML for ${
        document.querySelector('head > meta:nth-child(33)').content
      }`,
    );

    let actor_1 = document.querySelector(
      '#actorList > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)',
    ).textContent;
    let actor_2 = document.querySelector(
      '#actorList > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)',
    ).textContent;
    let actor_3 = document.querySelector(
      '#actorList > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)',
    ).textContent;
    let actor_4 = document.querySelector(
      '#actorList > ul:nth-child(2) > li:nth-child(4) > a:nth-child(1)',
    ).textContent;
    let actor_5 = document.querySelector(
      '#actorList > ul:nth-child(2) > li:nth-child(5) > a:nth-child(1)',
    ).textContent;
    let mainActors = [];
    mainActors.push(actor_1, actor_2, actor_3, actor_4, actor_5);

    return {
      title: document.querySelector('span[class=moviename-title-wrapper]')
        .innerHTML,
      originalTitle: document.querySelector('.alternativeHeadline').textContent,
      rating: document.querySelector('span[class=rating_ball]').innerHTML,
      filmId:
        document
          .querySelector('head > meta:nth-child(36)')
          .content.split('/')[4] === 'player'
          ? document
              .querySelector('head > meta:nth-child(35)')
              .content.split('/')[4]
          : document
              .querySelector('head > meta:nth-child(36)')
              .content.split('/')[4],
      year: document.querySelector(
        '#infoTable > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > a',
      ).innerHTML,
      country: document
        .querySelector(
          'table.info > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1)',
        )
        .textContent.replace('                     ', ' ')
        .replace('\n', '')
        .replace('                ', ''),
      imgsrc: document.querySelector('.popupBigImage > img:nth-child(1)').src,
      genre: document.querySelector(
        'table.info > tbody:nth-child(1) > tr:nth-child(11) > td:nth-child(2) > span:nth-child(1)',
      ).textContent,
      description: document.querySelector('.film-synopsys').textContent,
      mainActors: mainActors,
      director: document.querySelector(
        'table.info > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2) > a:nth-child(1)',
      ).textContent,
    };
  };

  if (!isNullValues2(movieDataMeta)) {
    let obj = parseData();
    return obj;
  } else return null;
};

const getDOMtest = async (html) => {
  const { document } = new JSDOM(html).window;

  if (
    document.querySelector('#content > h5') === null &&
    document.querySelector('.page_name')
  ) {
    console.log(
      document.querySelector('.page_name').innerHTML +
        ' ' +
        document.querySelector('head > link:nth-child(30)').href,
    );
  } else if (document.querySelector('#content > h5')) {
    console.log(
      `Blocked: ${document.querySelector('head > link:nth-child(30)').href}`,
    );
  }
};

exports.getDOM = getDOM;
exports.getDOMtest = getDOMtest;
