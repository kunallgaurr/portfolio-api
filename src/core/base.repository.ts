import {
    DeleteResult,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    ObjectLiteral,
    Repository,
    SaveOptions,
    UpdateResult,
    DeepPartial,
} from 'typeorm';

export abstract class BasePostgresRepository<T extends ObjectLiteral> {
    constructor(protected readonly repository: Repository<T>) { }

    async find(options?: FindManyOptions<T>): Promise<T[]> {
        return this.repository.find(options);
    }

    async findOne(options: FindOneOptions<T>): Promise<T | null> {
        return this.repository.findOne(options);
    }

    async update(criteria: FindOptionsWhere<T>, partialEntity: Partial<T>): Promise<UpdateResult> {
        return this.repository.update(criteria, partialEntity);
    }

    async delete(criteria: FindOptionsWhere<T>): Promise<DeleteResult> {
        return this.repository.delete(criteria);
    }

    async save(entities: DeepPartial<T> | DeepPartial<T>[], options?: SaveOptions): Promise<T | T[]> {
        return this.repository.save(entities as any, options);
    }
}
