import { ID } from "@datorama/akita";
import { PollsStore, pollsStore } from "./polls.store";
import { PollOption, Poll } from "./poll.model";
import { polls$ } from "../../external/firebase";

export class PollsService {
    constructor(private pollsStore: PollsStore) {}

    load() {
        polls$.subscribe(polls => {
            this.pollsStore.set(polls.map((poll, i): Poll => ({
                id: i,
                options: poll.options.map((option): PollOption => ({
                    imdbId: option.imdbId,
                    count: option.count,
                }))
            })));
        })
    }

    setActive(id: ID) {
        this.pollsStore.setActive(id);
    }

    addOption(option: PollOption) {
        this.pollsStore.updateActive(active => ({
            ...active,
            options: [...active.options, option]
        }));
    }
}

export const pollsService = new PollsService(pollsStore);