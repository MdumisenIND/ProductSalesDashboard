import type { Product } from '../types/Product';
import { api } from './client';
export const fetchProducts = async (): Promise<Product[]> => (await api.get('/products')).data;