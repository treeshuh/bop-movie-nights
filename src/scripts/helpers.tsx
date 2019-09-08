import fetch from 'unfetch'; // polyfill for IE11;
const omdbKey = '3ceeb35b'; 

export interface MovieDetail {
    title: string,
    genre: string[],
    imdbId: string,
    plot: string,
    poster: string,
    rating: string,
    runtime: string
    website?: string, 
    year: string,
};

export async function fetchMovieById(id: string): Promise<MovieDetail> {
    return fetch(`http://www.omdbapi.com/?i=${id}&apikey=${omdbKey}`)
        .then(res => res.json())
        .then(data => ({
            title: data.Title,
            genre: data.Genre
                .split(',')
                .map((genre: string) => genre.trim()),
            imdbId: id,
            plot: data.Plot,
            poster: data.Poster,
            rating: data.Rated,
            runtime: data.Runtime,
            website: data.Website, 
            year: data.Year,
        }));
}