declare function getMoviesData(
  x: string,
  y: string,
): Promise<
{
  title: string;
  originalTitle: string;
  rating: string;
  filmId: any;
  year: string;
  country: string;
  imgsrc: any;
  genre: string;
  description: string;
  mainActors: string[];
  director: string;
}[]
>;
