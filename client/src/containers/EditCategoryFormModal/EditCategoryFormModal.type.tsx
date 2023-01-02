import { Category, CategoryItem } from '../../models/Categories';

export interface EditCategoryFormModalProps {
  categoryData: Category;
  closeHandle: () => void;
  isOpen: boolean;
}
