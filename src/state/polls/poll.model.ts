import { ID } from '@datorama/akita';

export interface Poll {
    id: ID;
    title: string;
    options: PollOption[];
    archived: boolean;
    order: number;
}

export interface PollOption {
    imdbId: string;
    count: number;
}