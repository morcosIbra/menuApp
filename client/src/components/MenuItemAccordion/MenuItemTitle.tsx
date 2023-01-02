import { Button, Icon, Item } from 'semantic-ui-react';
import { MenuItemTitleLabel } from './MenuItemAccordion.styles';
import { MenuItemTitleProps } from './MenuItemAccordion.types';

const MenuItemTitle = ({ title, showActions, editItem, removeItem }: MenuItemTitleProps) => {
  const editItemHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    editItem();
  };
  const removeItemHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    removeItem();
  };
  return (
    <Item as={'span'}>
      <MenuItemTitleLabel as={'span'}>{title} </MenuItemTitleLabel>
      {showActions && (
        <Button.Group floated="right">
          <Button icon positive onClick={editItemHandle}>
            <Icon name="pencil" />
          </Button>
          <Button.Or />
          <Button negative icon onClick={removeItemHandle}>
            <Icon name="trash alternate" />
          </Button>
        </Button.Group>
      )}
    </Item>
  );
};
export default MenuItemTitle;
