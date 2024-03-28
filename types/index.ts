export interface Movie {
  _id:               string;
  fullplot:         string;
  imdb:             Imdb;
  year:             number;
  plot:             string;
  genres:           string[];
  rated:            string;
  metacritic:       number;
  title:            string;
  lastupdated:      Date;
  languages:        string[];
  writers:          string[];
  type:             string;
  tomatoes:         Tomatoes;
  poster:           string;
  alternatePoster:  string;
  numMflixComments: number;
  released:         Date;
  awards:           Awards;
  countries:        string[];
  cast:             string[];
  directors:        string[];
  runtime:          number;
  previewLink:      string;
}

export interface Awards {
  wins:        number;
  nominations: number;
  text:        string;
}

export interface Imdb {
  rating: number;
  votes:  number;
  id:     number;
}

export interface Tomatoes {
  website:     string;
  viewer:      Critic;
  dvd:         Date;
  critic:      Critic;
  boxOffice:   string;
  consensus:   string;
  rotten:      number;
  production:  string;
  lastUpdated: Date;
  fresh:       number;
}

export interface Critic {
  rating:     number;
  numReviews: number;
  meter:      number;
}



export interface Autocomplete {
  _id:             string;
  plot:            string;
  poster:          string;
  title:           string;
  score:           number;
  previewLink:     string;
  alternatePoster: string;
}


export interface DiverseSearch {
  _id:             string;
  poster:          string;
  title:           string;
  languages:       string[];
  year:            number;
  imdb:            Imdb;
  previewLink:     string;
  alternatePoster: string;
}


export interface SemanticSearch {
  _id:             string;
  imdb:            Imdb;
  year:            number;
  title:           string;
  languages:       string[];
  poster?:         string;
  previewLink:     string;
  alternatePoster: string;
}

export interface Imdb {
  rating: number;
  votes:  number;
  id:     number;
}







