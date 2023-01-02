import { Message } from 'semantic-ui-react';
import locals from '../../locals/en.json';

const MenuItemContent = ({ description }: { description: string }) => {
  return (
    <Message>
      <Message.Header>{locals.description}</Message.Header>
      <p>{description ?? locals.noDescription}</p>
    </Message>
  );
};
export default MenuItemContent;
