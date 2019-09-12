export type App = {
    upcomingMovie: UpcomingMovie;
}

export type Movie = {
    id: string;
    trailerUrl: string;
}

export type UpcomingMovie = {
    imdbId: string;
    wallpaperUrl: string;
    watchDate: Date;
};

export type Poll = {
    options: PollOption[];
};

export type PollOption = {
    imdbId: string;
    count: number;
}