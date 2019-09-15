import { useEffect, useState, useCallback } from 'react';
import { Observable, Subscription } from 'rxjs';
import { Movie } from '../state/movies/movie.model';
import { moviesService } from '../state/movies/movies.service';
import { moviesQuery } from '../state/movies/movies.query';

interface MoviesState {
    movies: Movie[];
}

function onEmit<T>(source$: Observable<T>, nextFn:(value: T) => void): Subscription {
    return source$.subscribe(nextFn, console.error);
}

/**
 * View Model for Movie view components
 */
export function useMoviesFacade(): [MoviesState, Function] {
    const [state, setState] = useState<MoviesState>({ movies: [] });

    /**
     * Manage subscriptions with auto-cleanup
     */
    useEffect(() => {
        const subscription = onEmit<Movie[]>(moviesQuery.movies$, movies => setState(state => ({ ...state, movies })));
        moviesService.load();
        return () => subscription.unsubscribe();
    }, []);

    /**
     * Memoized helper for getting movie by ID
     */
    const getMovieById = useCallback(
        (id: string) => state.movies.find(movie => movie.id === id),
        [state.movies]
    );

    return [state, getMovieById];
}