import { Movie } from './movie.model';

export interface UpcomingMovie extends Movie {
    wallpaperUrl: string;
    watchDate: any;
}