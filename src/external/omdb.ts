import { Movie } from './omdb.d';

const OMDB_KEY = '3ceeb35b'; 

export async function fetchMovie(id: string): Promise<Movie> {
    return fetch(`http://www.omdbapi.com/?i=${id}&apikey=${OMDB_KEY}`)
        .then(res => res.json());
}