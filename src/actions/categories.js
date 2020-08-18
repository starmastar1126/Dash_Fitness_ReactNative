import {api} from '../config';

export const getCategories = async () => {
  const response = await api.get('categoryapi');
  console.log("categories......", response.data)
  return response.data.data;
};
