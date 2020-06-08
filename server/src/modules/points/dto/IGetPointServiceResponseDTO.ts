import Item from '@modules/items/infra/knex/entities/Item';
import Point from '../infra/knex/entities/Point';

export default interface IGetPointResponseDTO {
  point: Point;
  items: Item[];
}
