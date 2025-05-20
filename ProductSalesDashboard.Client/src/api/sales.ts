import type { Sale } from '../types/Sale';
import { api } from './client';
export const fetchSales = async (
  productId?: number, startDate?: string, endDate?: string, page: number = 1,
): Promise<Sale[]> =>
  (await api.get('/sales', { params: { productId, startDate, endDate, page } })).data;