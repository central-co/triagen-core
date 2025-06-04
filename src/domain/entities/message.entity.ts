export class Message {
    constructor(
        public readonly id: string,
        public readonly from: {
            id: string;
            name: string;
        },
        public readonly datetime: number,
        public readonly type: string,
        public readonly text: string,
    ) {}
}
