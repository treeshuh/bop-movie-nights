import { useEffect, useState } from 'react';
import { Observable, Subscription } from 'rxjs';
import { UpcomingMovie } from '../state/movies/upcoming-movie.model';
import { UpcomingMovie as UpcomingMovieExternal } from '../external/firebase.d';
import { upcomingMovie$ } from '../external/firebase';
import { useMoviesFacade } from './movies.hook';

interface UpcomingMovieState {
    upcomingMovie: UpcomingMovie | null;
}

function onEmit<T>(source$: Observable<T>, nextFn:(value: T) => void): Subscription {
    return source$.subscribe(nextFn, console.error);
}

/**
 * View Model for Upcoming Movie view components
 */
export function useUpcomingMovieFacade(): [UpcomingMovie | null] {
    const [state, setState] = useState<UpcomingMovieState>({ upcomingMovie: null });
    const [, getMovieById] = useMoviesFacade();

    /**
     * Manage subscriptions with auto-cleanup
     */
    useEffect(() => {
        const subscription = onEmit<UpcomingMovieExternal>(
            upcomingMovie$,
            upcomingMovie => setState({
                upcomingMovie: {
                    ...upcomingMovie,
                    ...getMovieById(upcomingMovie.imdbId),
                }
            })
        );
        return () => subscription.unsubscribe();
    }, [getMovieById]);

    return [state.upcomingMovie];
}