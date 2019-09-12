import { QueryEntity } from "@datorama/akita";
import { MoviesState, MoviesStore, moviesStore } from "./movies.store";
import { Movie } from "./movie.model";
import { Observable } from "rxjs";

export class MoviesQuery extends QueryEntity<MoviesState, Movie> {
    constructor(protected store: MoviesStore) {
        super(store);
    }

    movies$: Observable<Movie[]> = this.selectAll();
}

export const moviesQuery = new MoviesQuery(moviesStore);