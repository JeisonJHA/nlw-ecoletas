import { Request, Response } from 'express';
import ListItemsService from '@modules/items/services/ListItemsService';

export default class ItemController {
  public async index(resquest: Request, response: Response): Promise<Response> {
    const listItemsService = new ListItemsService();
    const items = await listItemsService.execute();
    return response.json(items);
  }
}
