export type App = {
    upcomingMovie: UpcomingMovie;
}

export type Movie = {
    trailerUrl: string;
}

export type UpcomingMovie = {
    imdbId: string;
    wallpaperUrl: string;
    watchDate: Date;
};

export type Poll = {
    imdbId: string;
    count: number;
};