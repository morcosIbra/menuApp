import { ReactNode } from 'react';
import { Category, CategoryItem } from '../../models/Categories';

export interface CategoryContentProps extends Pick<Category, 'id' | 'description'> {
  showCategoryItemForm: boolean;
  children: ReactNode;
}

export interface CategoryItemContentProps extends Pick<CategoryItem, 'description' | 'price'> {}

export interface MenuItemTitleProps {
  title: string;
  showActions: boolean;
  editItem: () => void;
  removeItem: () => void;
}
