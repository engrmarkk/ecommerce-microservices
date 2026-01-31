import { apiRes, HttpStatusCodes, HttpStatusMessages } from '@ecommerce/shared';
import { Request, Response } from 'express';
import { getCategories } from '../dbCruds/productCrud';

// get categories controller
const getCategoriesController = async (req: Request, res: Response) => {
  const categories = await getCategories();
  return apiRes(
    res,
    'categories fetched',
    HttpStatusCodes.OK,
    HttpStatusMessages.SUCCESS,
    categories
  );
};

export { getCategoriesController };
