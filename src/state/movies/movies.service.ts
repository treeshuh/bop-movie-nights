import { MoviesStore, moviesStore } from "./movies.store";
import { movies$ } from "../../external/firebase";
import { switchMap, merge, map, mergeAll, tap, mergeMap } from 'rxjs/operators';
import { from } from "rxjs";
import { Movie } from "./movie.model";
import { fetchMovie } from "../../external/omdb";

export class MoviesService {
    constructor(private moviesStore: MoviesStore) { }

    load() {
        // TODO
        movies$.pipe(
            mergeMap(from),
            mergeMap(movie => from(fetchMovie(movie.id))),
            // tap(x => console.log(x)),
            // map(from),
            tap(x => console.log(x))
            // mergeAll(),
            // tap(x => console.log(x)),
            // switchMap(mergeAll)
        ).subscribe(movie => {
            this.moviesStore.upsert(movie.imdbID, {
                id: movie.imdbID,
                genre: movie.Genre
                    .split(',')
                    .map((genre: string) => genre.trim()),
                plot: movie.Plot,
                poster: movie.Poster,
                rated: movie.Rated,
                runtime: movie.Runtime,
                title: movie.Title,
                website: movie.Website,
                year: movie.Year,
            })
        });
    }
}

export const moviesService = new MoviesService(moviesStore);