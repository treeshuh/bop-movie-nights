import React, { useState, useCallback, useMemo } from 'react';
import moment from 'moment';

import { useMoviesFacade } from '../hooks/movies.hook';
import { useUpcomingMovieFacade } from '../hooks/upcoming-movie.hook';
import { usePollsFacade } from '../hooks/polls.hook';

import '../styles/Admin.scss';

const Admin: React.FC = () => {
    // TODO: add auth into this
    const userIsAdmin = true;
    const [useAdmin, setAdmin] = useState(false);
    const [moviesState, getMovieById] = useMoviesFacade();
    const [upcomingMovie] = useUpcomingMovieFacade();
    const [
        {
            polls
        },
        setActivePoll,
        setActivePollOption,
        addPollVote,
        voteForActiveOption
    ] = usePollsFacade();

    const handleAdmin = useCallback((event) => {
        if (event.target.checked) {
            return setAdmin(true);
        }
        return setAdmin(false);
    }, [setAdmin]);

    const moviesList = useMemo(() => moviesState.movies.map(movie => (
        <option
            key={movie.imdbId || movie.id}
            value={movie.imdbId || movie.id}
        >
            {movie.title} ({movie.imdbId || movie.id})
        </option>
    )), [moviesState]);

    const upcomingMovieDetails = useMemo(() => 
        upcomingMovie
            ? {
                id: String(upcomingMovie.imdbId || upcomingMovie.id),
                wallpaperUrl: upcomingMovie.wallpaperUrl,
                watchDate: moment(upcomingMovie.watchDate.seconds * 1000).format('YYYY-MM-DD')
            }
            : {}
    , [upcomingMovie]);

    const pollsList = useMemo(() => polls.map(poll => (
        <div key={poll.id} className="AdminPoll">
            <input className="AdminPoll-title" type="text" defaultValue={poll.title}/>
            <input className="AdminPoll-order" type="text" defaultValue={String(poll.order)}/>
            <label className="AdminPoll-archive"><input type="checkbox" defaultChecked={poll.archived} />Archive</label>
        </div>
    )), [polls])

    const pollsListAsDropdown = useMemo(() => polls.map(poll => (
        <option key={poll.id} value={poll.id}>{poll.title} ({poll.id})</option>
    )), [polls]);

    if (!userIsAdmin) {
        return null;
    }

    if (!useAdmin) {
        return (
            <div className="Admin">
                <label className="AdminSection" >
                    <input type="checkbox" onChange={handleAdmin} defaultChecked={useAdmin} />Admin Panel
                </label>
            </div>
        );        
    }

    return (
        <div className="Admin">
            <label className="AdminToggle AdminSection" >
                <input type="checkbox" defaultChecked={useAdmin} onChange={handleAdmin} /> Admin Panel
            </label>
            <div className="AdminSection">
                <h3>Upcoming Movie</h3>
                <label htmlFor="AdminHeader-movie">Movie (id)</label>
                <select
                    id="AdminHeader-movie"
                    style={{width: '100%'}}
                    defaultValue={upcomingMovieDetails.id}>
                    {moviesList}
                </select>
                <label htmlFor="AdminHeader-wallpaper">Wallpaper Url</label>
                <input id="AdminHeader-wallpaper" type="text" defaultValue={upcomingMovieDetails.wallpaperUrl} />
                <label htmlFor="AdminHeader-date">Watch Date</label>
                <input id="AdminHeader-date" type="date" defaultValue={upcomingMovieDetails.watchDate} />
                <button type="button">Update Upcoming Movie</button>
            </div>
            <div className="AdminSection">
                <h3>New Poll</h3>
                <label htmlFor="AdminNewPoll-name">Poll Name</label>
                <input id="AdminNewPoll-name" type="text" placeholder="Poll Name" />
                <label htmlFor="AdminNewPoll-order">Order</label>
                <input id="AdminNewPoll-order" type="text" placeholder="Order" />
                <button type="button">Add Poll</button>
            </div>
            <div className="AdminSection">
                <h3>Manage Polls</h3>
                {pollsList}
                <button type="button">Update Polls</button>
            </div>
            <div className="AdminSection">
                <h3>New Poll Option</h3>
                <label htmlFor="AdminNewPollOption-poll">Poll (id)</label>
                <select
                    id="AdminNewPollOption-poll"
                    style={{width: '100%'}}
                >
                    {pollsListAsDropdown}
                </select>
                <label htmlFor="AdminNewPollOption-id">IMDB id</label>
                <input id="AdminNewPollOption-id" type="text" placeholder="tt#######" />
                <button type="button">Add Poll Option</button>
            </div>
            <div className="AdminSection">
                <h3>New Movie</h3>
                <label htmlFor="AdminNewMovie-id">IMDBid</label>
                <input id="AdminNewMovie-id" type="text" placeholder="tt#######" />
                <label htmlFor="AdminNewPoll-trailer">Trailer Url</label>
                <input id="AdminNewPoll-trailer-order" type="text" placeholder="YT link to trailer" />
                <button type="button">Add Movie</button>
            </div>
        </div>
    );
}

export default Admin;
