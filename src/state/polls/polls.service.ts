import { ID } from "@datorama/akita";
import { PollsStore, pollsStore } from "./polls.store";
import { PollOption, Poll } from "./poll.model";
import { polls$, addVote } from "../../external/firebase";
import { Subscription } from "rxjs";

export class PollsService {
    constructor(private pollsStore: PollsStore) {}

    load(): Subscription {
        return polls$.subscribe(polls => {
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
        });
    }

    setActive(id: ID): void {
        this.pollsStore.setActive(id);
    }

    async addVote(id: ID, optionId: string): Promise<void> {
        await addVote(id.toString(), optionId);
        this.pollsStore.upsert(id, poll => ({
            options: poll.options.map(
                option => ({
                    ...option,
                    count: option.count + 1
                })
            )
        }))
    }

    setActiveOption(option: PollOption | null) {
        this.pollsStore.setActiveOption(option);
    }

    addOption(id: ID, option: PollOption): void {
        this.pollsStore.upsert(id, poll => ({
            options: [...poll.options, option]
        }));
    }
}

export const pollsService = new PollsService(pollsStore);