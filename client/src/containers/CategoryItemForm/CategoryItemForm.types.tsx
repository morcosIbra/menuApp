import { CategoryItem } from '../../models/Categories';

export interface CategoryItemFormValues extends Pick<CategoryItem, 'name' | 'description'> {
  price: '' | number;
}
