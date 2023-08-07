export interface IGenericAction<T> {
    type: string;
    payload: T;
}