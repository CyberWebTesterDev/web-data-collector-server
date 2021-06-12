const jsdom = require('jsdom');
const { JSDOM } = jsdom;
import {
  IDocumentQuerySelectorsDictionary as IDQSD,
  DOCUMENT_MOVIES_SELECTORS,
} from './dom-parsers-lib';

const getDOM = async (html: string) => {
  const { document }: IDQSD['htmlDocument'] =
    new JSDOM(html).window;

  const movieDataMeta: IDQSD['movieSelectors'] = {
    title: document.querySelector(DOCUMENT_MOVIES_SELECTORS.title),
    originalTitle: document.querySelector(
      DOCUMENT_MOVIES_SELECTORS.originalTitle,
    ),
    rating: document.querySelector(DOCUMENT_MOVIES_SELECTORS.rating),
    filmId: document.querySelector(DOCUMENT_MOVIES_SELECTORS.filmId),
    year: document.querySelector(DOCUMENT_MOVIES_SELECTORS.year),
    country: document.querySelector(DOCUMENT_MOVIES_SELECTORS.country),
    imgsrc: document.querySelector(DOCUMENT_MOVIES_SELECTORS.imgsrc),
    genre: document.querySelector(DOCUMENT_MOVIES_SELECTORS.genre),
    description: document.querySelector(DOCUMENT_MOVIES_SELECTORS.description),
    actor_1: document.querySelector(DOCUMENT_MOVIES_SELECTORS.actor_1),
    actor_2: document.querySelector(DOCUMENT_MOVIES_SELECTORS.actor_2),
    actor_3: document.querySelector(DOCUMENT_MOVIES_SELECTORS.actor_3),
    actor_4: document.querySelector(DOCUMENT_MOVIES_SELECTORS.actor_4),
    actor_5: document.querySelector(DOCUMENT_MOVIES_SELECTORS.actor_5),
    director: document.querySelector(DOCUMENT_MOVIES_SELECTORS.director),
  };

  const isNullValues2 = <T extends IDQSD['movieSelectors']>(obj: T): boolean => {
    for (let key in obj) {
      if (obj[key] === null) {
        return true;
      }
    }
    return false;
  };

  const parseData = (): IDQSD['parsedMoviesStringData'] => {
    console.log(
      `Starting to parse data from HTML for ${
        document.querySelector('head > meta:nth-child(33)').textContent
      }`,
    );

    let actor_1 = movieDataMeta.actor_1.textContent;
    let actor_2 = movieDataMeta.actor_2.textContent;
    let actor_3 = movieDataMeta.actor_3.textContent;
    let actor_4 = movieDataMeta.actor_4.textContent;
    let actor_5 = movieDataMeta.actor_5.textContent;
    let mainActors = [];
    mainActors.push(actor_1, actor_2, actor_3, actor_4, actor_5);

    return {
      title: movieDataMeta.title.innerHTML,
      originalTitle: movieDataMeta.originalTitle.textContent,
      rating: movieDataMeta.rating.innerHTML,
      filmId:
        movieDataMeta.filmId.textContent.split('/')[4] === 'player'
          ? document
            .querySelector('head > meta:nth-child(35)')
            .textContent.split('/')[4]
          : document
            .querySelector(DOCUMENT_MOVIES_SELECTORS.filmId)
            .textContent.split('/')[4],
      year: movieDataMeta.year.innerHTML,
      country: movieDataMeta.country.textContent
        .replace('                     ', ' ')
        .replace('\n', '')
        .replace('                ', ''),
      imgsrc: movieDataMeta.imgsrc.getAttribute('src'),
      genre:  movieDataMeta.genre.textContent,
      description: movieDataMeta.description.textContent,
      mainActors: mainActors,
      director: movieDataMeta.director.textContent,
    };
  };

  if (!isNullValues2(movieDataMeta)) {
    let obj = parseData();
    return obj;
  } else {return null;}
};

exports.getDOM = getDOM;
