import IPointsRepository from '../repositories/IPointsRepository';
import PointsRepository from '../infra/knex/repositories/PointsRepository';
import IPointFilterDTO from '../dto/IPointFilterDTO';
import Point from '../infra/knex/entities/Point';

class GetFilterdPointService {
  private pointsRepository: IPointsRepository;

  constructor() {
    this.pointsRepository = new PointsRepository();
  }

  public async execute(filter: IPointFilterDTO): Promise<Point[]> {
    const points = await this.pointsRepository.getPointWithFilter(filter);
    return points;
  }
}

export default GetFilterdPointService;
