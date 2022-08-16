import {IEntity} from "../../entities/IEntity";
import {CrudRepository} from "../base/CrudRepository";
import {SequelizeDriver} from "./SequelizeDriver";
import * as Sequelize from "sequelize";
import {User} from "../../entities/User";

export abstract class SequelizeBaseRepository<T extends IEntity> extends CrudRepository<T> {
    protected abstract getSequelize(): Sequelize.ModelCtor<Sequelize.Model<any, any>>;

    constructor() {
        super();

        SequelizeDriver.connect().then(() => {
        });
    }

    async getAll(): Promise<T[]> {
        const entities: T[] = [];
        const entitiesInRepo = await this.getSequelize().findAll();

        for (let entityInRepo of entitiesInRepo) {
            entities.push(entityInRepo as unknown as T);
        }

        return Promise.resolve(entities);
    }

    async findById(id: string): Promise<T> {
        const entityInRepo = await this.getSequelize().findByPk(parseInt(id)) as unknown as T;

        if (entityInRepo) return Promise.resolve(entityInRepo)

        return Promise.reject(null);
    }

    // FIX
    async create(entity: T): Promise<T> {
        // @ts-ignore
        const newEntity = await this.getSequelize().create(entity) as unknown as T;

        if (newEntity) {
            return Promise.resolve(newEntity);
        }

        return Promise.reject(new Error(`Failed to create.`));
    }

    async update(id: string, entity: T): Promise<boolean> {
        const entityInRepo = await this.getSequelize().findByPk(parseInt(id));

        if (entityInRepo) {
            // REFACTOR: for User
            const userTokens = (entity as any).tokens;
            if (userTokens) {
                entityInRepo.setDataValue('tokens', userTokens.join(';'));
            }

            entityInRepo.set(entity);
            await entityInRepo.save();

            return Promise.resolve(true);
        }

        return Promise.reject(false);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.getSequelize().destroy({
            where: {
                id: parseInt(id)
            }
        })

        if (result > 0) {
            return Promise.resolve(true);
        }

        return Promise.reject(new Error('Failed to delete entity.'));
    }

    async deleteAll(): Promise<boolean> {
        const result = this.getSequelize().destroy({
            truncate: true
        });

        return Promise.resolve(true);
    }
}