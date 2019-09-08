import firebase from './firebase';
import fetch from 'unfetch'; // polyfill for IE11;
const OMDB_KEY = '3ceeb35b'; 

export default class Movie {
    constructor(
        readonly imdbId: string = '',
        readonly title: string = '',
        readonly genre: string[] = [],
        readonly plot: string = '',
        readonly poster: string = '',
        readonly rating: string = '',
        readonly runtime: string = '',
        readonly website: string = '',
        readonly year: string = '',
        readonly trailerUrl: string = '',
    ) {}
    
    static async get(imdbId: string): Promise<Movie> {
        const [omdbDetails, customDetails] = await Promise.all([
            Movie.fetchOMDBDetails(imdbId),
            Movie.fetchCustomDetails(imdbId)
                .then(data => typeof data === 'undefined' ? {} : data)
        ]);
        return new Movie(
            imdbId,
            omdbDetails.Title,
            omdbDetails.Genre
                .split(',')
                .map((genre: string) => genre.trim()),
            omdbDetails.Plot,
            omdbDetails.Poster,
            omdbDetails.Rated,
            omdbDetails.Runtime,
            omdbDetails.Website,
            omdbDetails.Year,
            customDetails.trailerUrl
        );
    }

    static async fetchOMDBDetails(id: string): Promise<any> {
        return fetch(`http://www.omdbapi.com/?i=${id}&apikey=${OMDB_KEY}`)
            .then(res => res.json());
    }

    static async fetchCustomDetails(id: string): Promise<any> {
        return firebase.firestore().collection('movies').doc(id).get()
            .then(doc => doc.data());
    }
};