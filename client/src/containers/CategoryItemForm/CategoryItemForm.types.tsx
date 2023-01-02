import CategoryItemContent from '../../components/MenuItemAccordion/CategoryItemContent';
import { CategoryItem } from '../../models/Categories';

export interface CategoryItemFormValues extends Pick<CategoryItem, 'name' | 'description'> {
  price: null | number;
}
