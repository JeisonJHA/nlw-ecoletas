import IItemsRepository from '../repositories/IItemsRepository';
import ItemsRepository from '../infra/knex/repositories/ItemsRepository';

interface IResponse {
  title: string;
  image_url: string;
}

class ListItemsService {
  private itemsRepository: IItemsRepository;

  constructor() {
    this.itemsRepository = new ItemsRepository();
  }

  public async execute(): Promise<IResponse[]> {
    const items = await this.itemsRepository.findAll();
    const serializedItems = items.map(item => ({
      id: item.id,
      title: item.title,
      image_url: `${process.env.APP_API_URL}/uploads/${item.image}`,
    })) as IResponse[];
    return serializedItems;
  }
}

export default ListItemsService;
