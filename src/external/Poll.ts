import firebase from './firebase';

export interface PollOption {
    imdbId: string;
    count: number;
    disabled?: boolean;
}

export default class Poll {
    constructor(readonly id: string) {}

    async addOption(option: PollOption): Promise<void> {
        const pollRef = await firebase.firestore().collection('polls').doc(this.id);
        return pollRef.update({
            options: firebase.firestore.FieldValue.arrayUnion(option)
        });
    }

    async addVote(imdbId: string): Promise<void> {
        const pollRef = await firebase.firestore().collection('polls').doc(this.id);
        return firebase.firestore().runTransaction(async (transaction: firebase.firestore.Transaction) => {
            const pollDoc = await transaction.get(pollRef);
            if (!pollDoc.exists) {
                throw new Error(`Document with ref ID "${this.id}" does not exist!`);
            }
            const pollOptions: PollOption[] = pollDoc.get('options');
            const updatedPollOptions = pollOptions.map(option => ({
                ...option,
                count: option.imdbId === imdbId
                    ? option.count + 1
                    : option.count
            }));
            transaction.update(pollRef, { options: updatedPollOptions });
        });
    }

    async getOptions(): Promise<PollOption[]> {
        const pollRef = await firebase.firestore().collection('polls').doc(this.id) 
        const pollDoc = await pollRef.get();
        return pollDoc.data()!.options;
    }
    
    static async create(): Promise<Poll> {
        const pollRef = await firebase.firestore().collection('polls').add({});
        return new Poll(pollRef.id);
    }

    static async fetchAll(): Promise<Poll[]> {
        const snapshot = await firebase.firestore().collection('polls').get();
        return snapshot.docs.map(doc => new Poll(doc.ref.id));
    }
}