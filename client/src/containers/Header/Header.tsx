import { useDispatch, useSelector } from 'react-redux';
import { Menu, Container, Button, Label, Icon } from 'semantic-ui-react';
import HeaderLogo from '../../components/HeaderLogo/HeaderLogo';
import { setUser } from '../../redux/slices/authSlice';
import { users } from '../../redux/slices/constant';
import { RootState } from '../../redux/store';
import locals from '../../locals/en.json';

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const toggleUser = () => {
    user.role === 'user' ? dispatch(setUser('admin')) : dispatch(setUser('user'));
  };

  return (
    <Menu fixed="top">
      <Container>
        <HeaderLogo />

        <Menu.Item as="a" position="right">
          <Button onClick={toggleUser}>
            {user.role === 'user' ? users.admin.role : users.user.role}
          </Button>

          <Label>
            <Icon name="user" /> {locals.welcome}, {user.name}
          </Label>
        </Menu.Item>
      </Container>
    </Menu>
  );
};
export default Header;
