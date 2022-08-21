import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InMemoryDataSource} from '../datasources';
import {Task, TaskRelations} from '../models';

export class TaskRepository extends DefaultCrudRepository<Task,
    typeof Task.prototype.id,
    TaskRelations> {
    constructor(
        @inject('datasources.InMemory') dataSource: InMemoryDataSource,
    ) {
        super(Task, dataSource);

        // event to update "updateAt" time on create/update document
        (this.modelClass as any).observe('persist', async (ctx: any) => {
            ctx.data.updateAt = new Date();
        });
    }
}
