import { Request, Response } from 'express';
import { apiRes, HttpStatusCodes, HttpStatusMessages } from '@ecommerce/shared';
import { getProducts } from '../dbCruds/productCrud';

const getProductsController = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const per_page = Number(req.query.per_page) || 10;
  const search = req.query.search as string;
  const categoryId = req.query.categoryId as string;

  const products = await getProducts(page, per_page, search, categoryId);
  return apiRes(res, 'products', HttpStatusCodes.OK, HttpStatusMessages.SUCCESS, products, true);
};

export { getProductsController };
