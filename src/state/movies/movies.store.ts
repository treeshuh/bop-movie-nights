import { EntityStore, EntityState, StoreConfig } from "@datorama/akita";
import { Movie } from "./movie.model";

export interface MoviesState extends EntityState<Movie> {}

@StoreConfig({ name: 'movies' })
export class MoviesStore extends EntityStore<MoviesState> {}

export const moviesStore = new MoviesStore();