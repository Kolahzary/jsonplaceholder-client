import { IModel } from './IModel';

export class Todo implements IModel {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}
