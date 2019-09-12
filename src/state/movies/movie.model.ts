import { ID } from '@datorama/akita';

export interface Movie {
    id: ID;
    imdbId: string;
    title: string;
    genre: string[];
    plot: string;
    poster: string;
    rated: string;
    runtime: string;
    website: string;
    year: string;
    trailerUrl: string;
}