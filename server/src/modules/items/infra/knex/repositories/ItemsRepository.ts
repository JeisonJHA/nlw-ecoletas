import knex from '@shared/infra/knex';

import IItemsRepository from '@modules/items/repositories/IItemsRepository';

import Item from '../entities/Item';

class ItemsRepository implements IItemsRepository {
  public async findAll(): Promise<Item[]> {
    return knex('items').select('*');
  }

  public async getItemsFromPoint(point_id: string): Promise<Item[]> {
    return knex('items')
      .join('points_items', 'items.id', '=', 'points_items.item_id')
      .where('points_items.point_id', point_id)
      .select('items.title');
  }
}

export default ItemsRepository;
