import { Request, Response } from 'express';
import CreatePointService from '@modules/points/services/CreatePointService';
import GetPointService from '@modules/points/services/GetPointService';
import GetFilterdPointService from '@modules/points/services/GetFilterdPointService';

class PointsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;
    const createPointService = new CreatePointService();
    const point = await createPointService.execute({
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items: items.split(',').map((item: string) => Number(item.trim())),
    });
    return response.json(point);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getPointService = new GetPointService();
    const point = await getPointService.execute(id);
    return response.json(point);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { city, uf, items } = request.query;
    const getFilteredPointService = new GetFilterdPointService();
    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));
    const points = await getFilteredPointService.execute({
      city: String(city),
      uf: String(uf),
      items: parsedItems,
    });
    return response.json(points);
  }
}

export default PointsController;
