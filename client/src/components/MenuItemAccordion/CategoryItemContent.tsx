import { Item, Label } from 'semantic-ui-react';
import MenuItemContent from './MenuItemContent';
import locals from '../../locals/en.json';
import { CategoryItemLowerContent } from './MenuItemAccordion.styles';
import { CategoryItemContentProps } from './MenuItemAccordion.types';

const CategoryItemContent = ({ description, price }: CategoryItemContentProps) => {
  return (
    <Item>
      <MenuItemContent description={description} />
      <CategoryItemLowerContent>
        <Label color="orange">
          {price} {locals.egp}
        </Label>
      </CategoryItemLowerContent>
    </Item>
  );
};
export default CategoryItemContent;
