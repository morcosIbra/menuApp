import { Image } from 'semantic-ui-react';
import { LogoMenuItem } from './HeaderLogo.style';

const HeaderLogo = () => {
  return (
    <LogoMenuItem>
      <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
    </LogoMenuItem>
  );
};
export default HeaderLogo;
