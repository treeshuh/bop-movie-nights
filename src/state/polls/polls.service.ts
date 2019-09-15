import { ID } from "@datorama/akita";
import { PollsStore, pollsStore } from "./polls.store";
import { PollOption, Poll } from "./poll.model";
import { polls$ } from "../../external/firebase";
import * as R from "ramda";

export class PollsService {
    constructor(private pollsStore: PollsStore) {}

    load() {
        polls$.subscribe(polls => {
            this.pollsStore.set(polls.map((poll): Poll => ({
                id: poll.id,
                title: poll.title,
                options: poll.options.map((option): PollOption => ({
                    imdbId: option.imdbId,
                    count: option.count,
                })),
                archived: poll.archived,
                order: poll.order
            })));

            const activePoll = R.pipe(
                R.sortBy(R.prop('order')),
                R.filter(R.propEq('archived', false)),
                R.head,
            )(polls);

            this.setActive((activePoll as Poll).id);
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