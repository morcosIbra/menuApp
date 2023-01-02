import { CategoryItem } from '../../models/Categories';

export interface EditCategoryItemFormModalProps {
  categoryItem: CategoryItem;
  closeHandle: () => void;
  isOpen: boolean;
}
