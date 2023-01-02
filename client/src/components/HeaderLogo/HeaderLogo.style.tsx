import styled from 'styled-components/macro';
import { Menu } from 'semantic-ui-react';

export const LogoMenuItem = styled(Menu.Item)`
  border: 0px !important;

  &:before {
    display: none;
  }
`;
