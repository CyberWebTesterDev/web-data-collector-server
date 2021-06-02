export interface IDocumentQuerySelectorsDictionary {
  movieSelectors: {
    title: HTMLElement;
    originalTitle: HTMLElement;
    rating: HTMLElement;
    filmId: HTMLElement;
    year: HTMLElement;
    country: HTMLElement;
    imgsrc: HTMLElement;
    genre: HTMLElement;
    description: HTMLElement;
    actor_1: HTMLElement;
    actor_2: HTMLElement;
    actor_3: HTMLElement;
    actor_4: HTMLElement;
    actor_5: HTMLElement;
    director: HTMLElement;
  };
  parsedMoviesStringData: {
    title: string;
    originalTitle: string;
    rating: string;
    filmId: string;
    year: string;
    country: string;
    imgsrc: string;
    genre: string;
    description: string;
    director: string;
    mainActors: string[];
  };
  htmlDocument: {
    document: HTMLElement;
  };
}

export const DOCUMENT_MOVIES_SELECTORS = {
  title: 'span[class=moviename-title-wrapper]',
  originalTitle: '.alternativeHeadline',
  rating: 'span[class=rating_ball]',
  filmId: 'head > meta:nth-child(36)',
  year: '#infoTable > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > a',
  country:
    'table.info > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1)',
  imgsrc: '.popupBigImage > img:nth-child(1)',
  genre:
    'table.info > tbody:nth-child(1) > tr:nth-child(11) > td:nth-child(2) > span:nth-child(1)',
  description: '.film-synopsys',
  actor_1: '#actorList > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)',
  actor_2: '#actorList > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)',
  actor_3: '#actorList > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)',
  actor_4: '#actorList > ul:nth-child(2) > li:nth-child(4) > a:nth-child(1)',
  actor_5: '#actorList > ul:nth-child(2) > li:nth-child(5) > a:nth-child(1)',
  director:
    'table.info > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2) > a:nth-child(1)',
};
