import knex from '@shared/infra/knex';
import IPointsRepository from '@modules/points/repositories/IPointsRepository';
import ICreatePointDTO from '@modules/points/dto/ICreatePointDTO';

import IPointFilterDTO from '@modules/points/dto/IPointFilterDTO';
import Point from '../entities/Point';

class PointsRepository implements IPointsRepository {
  public async create(data: ICreatePointDTO): Promise<Point> {
    const trx = await knex.transaction();
    const {
      name,
      email,
      whatsapp,
      image,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = data;
    const point = {
      name,
      email,
      whatsapp,
      image,
      latitude,
      longitude,
      city,
      uf,
    };
    const points_id = await trx('points').insert(point);
    const point_id = points_id[0];
    const pointsItems = items.map(item_id => ({
      item_id,
      point_id,
    }));
    await trx('points_items').insert(pointsItems);
    await trx.commit();
    return { id: String(point_id), ...point };
  }

  public async getPointById(id: string): Promise<Point> {
    const point = await knex('points').where('id', id).first();
    return point;
  }

  public async getPointWithFilter(filter: IPointFilterDTO): Promise<Point[]> {
    const points = await knex('points')
      .join('points_items', 'points.id', '=', 'points_items.point_id')
      .whereIn('points_items.item_id', filter.items)
      .where('city', filter.city)
      .where('uf', filter.uf)
      .distinct()
      .select('points.*');
    return points;
  }
}

export default PointsRepository;
