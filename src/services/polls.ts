import firebase from './firebase';

export type PollOption = {
    imdbId: string;
    voteCount: number;
}

export async function create(): Promise<string> {
    const pollRef = await firebase.firestore().collection('polls').add({});
    return pollRef.id;
}

export async function addOption(pollRefId: string, option: PollOption) {
    const pollRef = await firebase.firestore().collection('polls').doc(pollRefId);
    return pollRef.update({
        options: firebase.firestore.FieldValue.arrayUnion(option)
    });
}

export async function addVote(pollRefId: string, imdbId: string) {
    const pollRef = await firebase.firestore().collection('polls').doc(pollRefId);
    return firebase.firestore().runTransaction(async (transaction: firebase.firestore.Transaction) => {
        const pollDoc = await transaction.get(pollRef);
        if (!pollDoc.exists) {
            throw `Document with ref ID "${pollRefId}" does not exist!`;
        }
        const pollOptions: PollOption[] = pollDoc.get('options');
        const updatedPollOptions = pollOptions.map(option => ({
            ...option,
            voteCount: option.imdbId === imdbId
                ? option.voteCount + 1
                : option.voteCount
        }));
        transaction.update(pollRef, { options: updatedPollOptions });
    });
}