import AppError from '@shared/errors/AppError';
import IItemsRepository from '@modules/items/repositories/IItemsRepository';
import ItemsRepository from '@modules/items/infra/knex/repositories/ItemsRepository';

import IPointsRepository from '../repositories/IPointsRepository';
import PointsRepository from '../infra/knex/repositories/PointsRepository';
import IGetPointResponseDTO from '../dto/IGetPointServiceResponseDTO';

class GetPointService {
  private pointsRepository: IPointsRepository;

  private itemsRepository: IItemsRepository;

  constructor() {
    this.pointsRepository = new PointsRepository();
    this.itemsRepository = new ItemsRepository();
  }

  public async execute(id: string): Promise<IGetPointResponseDTO> {
    const point = await this.pointsRepository.getPointById(id);
    if (!point) throw new AppError('Point doesn`t exists.');

    const serializedPoint = {
      ...point,
      image_url: `${process.env.APP_API_URL}/uploads/${point.image}`,
    };
    const items = await this.itemsRepository.getItemsFromPoint(id);
    return { point: serializedPoint, items };
  }
}

export default GetPointService;
