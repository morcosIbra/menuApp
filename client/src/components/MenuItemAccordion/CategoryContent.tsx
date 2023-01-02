import { Divider, Item } from 'semantic-ui-react';
import CategoryItemForm from '../../containers/CategoryItemForm/CategoryItemForm';
import { CategoryContentProps } from './MenuItemAccordion.types';
import MenuItemContent from './MenuItemContent';

const CategoryContent = ({
  id,
  description,
  showCategoryItemForm,
  children
}: CategoryContentProps) => {
  return (
    <Item>
      <MenuItemContent description={description} />
      <Divider />
      {showCategoryItemForm && <CategoryItemForm categoryId={id} />}
      {children}
    </Item>
  );
};
export default CategoryContent;
