import Point from '../infra/knex/entities/Point';
import ICreatePointDTO from '../dto/ICreatePointDTO';
import IPointFilterDTO from '../dto/IPointFilterDTO';

export default interface IPointsRepository {
  create(data: ICreatePointDTO): Promise<Point>;
  getPointById(id: string): Promise<Point>;
  getPointWithFilter(filter: IPointFilterDTO): Promise<Point[]>;
}
