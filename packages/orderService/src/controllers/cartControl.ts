import { apiRes, HttpStatusCodes, HttpStatusMessages } from "@ecommerce/shared";

const getCart = async (req: any, res: any) => {
    return apiRes(res, HttpStatusMessages.SUCCESS, HttpStatusCodes.OK, "cart fetched successfully");
};

export { getCart };
