export interface IWritable<T> {
    create(entity: T): Promise<boolean>;

    update(id: string, entity: T): Promise<boolean>;

    delete(id: string): Promise<boolean>;
}