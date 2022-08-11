export interface IReadable<T> {
    getAll(): Promise<T[]>;
    
    find(entity: T): Promise<T[]>;

    findById(id: string): Promise<T>;
}