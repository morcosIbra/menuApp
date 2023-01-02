import { Message } from 'semantic-ui-react';

const MenuItemContent = ({ description }: { description: string }) => {
  return (
    <Message>
      <Message.Header>Description</Message.Header>
      <p>{description ?? `No descroiption available`}</p>
    </Message>
  );
};
export default MenuItemContent;
