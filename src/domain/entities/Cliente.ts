export class Cliente {
    constructor(
        public nome: string,
        public email: string,
        public status: boolean,
        public id?: number
    ) {}
}
