import { ID } from '@datorama/akita';

export interface Poll {
    id: ID;
    options: PollOption[];
}

export interface PollOption {
    imdbId: string;
    count: number;
}