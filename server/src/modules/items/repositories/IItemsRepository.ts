import Item from '../infra/knex/entities/Item';

export default interface IItemsRepository {
  findAll(): Promise<Item[]>;
  getItemsFromPoint(id: string): Promise<Item[]>;
}
