import ICreatePointDTO from '../dto/ICreatePointDTO';
import Point from '../infra/knex/entities/Point';
import IPointsRepository from '../repositories/IPointsRepository';
import PointsRepository from '../infra/knex/repositories/PointsRepository';

class CreatePointService {
  private pointsRepository: IPointsRepository;

  constructor() {
    this.pointsRepository = new PointsRepository();
  }

  public async execute(data: ICreatePointDTO): Promise<Point> {
    // TODO: verificar se os item existem
    const point = await this.pointsRepository.create(data);
    return point;
  }
}

export default CreatePointService;
