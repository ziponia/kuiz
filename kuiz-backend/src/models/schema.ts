
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class AddGameInput {
    question: string;
    answer: string;
    order: number;
}

export class Game {
    __typename?: 'Game';
    id: string;
    author?: User;
    questions?: Qna[];
    createAt?: DateTime;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract addGame(input: AddGameInput[]): Game | Promise<Game>;

    abstract _empty(): string | Promise<string>;
}

export class Qna {
    __typename?: 'Qna';
    id: string;
    question?: string;
    answer?: string;
    game?: Game;
    createAt?: DateTime;
    owner?: User;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract _version(): string | Promise<string>;

    abstract users(): User[] | Promise<User[]>;

    abstract me(): User | Promise<User>;
}

export class User {
    __typename?: 'User';
    id: string;
    email: string;
    profile_pic?: string;
    createAt?: DateTime;
    lastUpdateAt?: DateTime;
    games?: Game[];
}

export type JSON = any;
export type DateTime = any;
