import Poll from "./Poll";

export default interface Tab {
    poll: Poll;
    title?: string;
    order?: number;
    disabled?: boolean;
}