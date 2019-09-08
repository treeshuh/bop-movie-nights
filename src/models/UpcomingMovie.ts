import firebase from './firebase';
import Movie from './Movie';

export default class UpcomingMovie extends Movie {
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
        readonly watchDate: Date,
        readonly wallpaperUrl: string
    ) {
        super(
            imdbId,
            title,
            genre,
            plot,
            poster,
            rating,
            runtime,
            website,
            year,
            trailerUrl
        );
    }

    static async get(): Promise<UpcomingMovie> {
        const upcomingMovie = await UpcomingMovie.fetch();
        const movie = await super.get(upcomingMovie.imdbId);
        return new UpcomingMovie(
            movie.imdbId,
            movie.title,
            movie.genre,
            movie.plot,
            movie.poster,
            movie.rating,
            movie.runtime,
            movie.website,
            movie.year,
            movie.trailerUrl,
            upcomingMovie.watchDate,
            upcomingMovie.wallpaperUrl
        );
    }

    static async fetch(): Promise<any> {
        return firebase.firestore().collection('app').doc('upcomingMovie').get()
            .then(doc => doc.data());
    }
}