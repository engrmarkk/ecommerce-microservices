import prisma from '../lib/prisma';

// get categories
const getCategories = async () => {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
};

const getProducts = async (
  page: number,
  per_page: number,
  search?: string,
  categoryId?: string
) => {
  // 1. Initialize an empty where object
  const where: any = {};

  // 2. Add search filter if it exists
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  // 3. Add category filter if it exists
  if (categoryId) {
    where.categoryId = categoryId;
  }

  // 4. Run queries
  const [products, total_items] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * per_page,
      take: per_page,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    }),
    prisma.product.count({ where }),
  ]);

  const total_pages = Math.ceil(total_items / per_page);

  return { page, per_page, total_items, total_pages, products };
};

export { getProducts, getCategories };
