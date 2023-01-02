import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import CategoryForm from '../../containers/CategoryForm/CategoryForm';
import CategoryList from '../../containers/CategoryList/CategoryList';
import { RootState } from '../../redux/store';

const MenuPage = () => {
  const {
    user: { role }
  } = useSelector((state: RootState) => state.auth);
  const isAdmin = role === 'admin';
  const listWidthSize = isAdmin ? 12 : 16;
  return (
    <Grid>
      {isAdmin && (
        <Grid.Column mobile={16} tablet={4} computer={4}>
          <CategoryForm />
        </Grid.Column>
      )}
      <Grid.Column mobile={16} tablet={listWidthSize} computer={listWidthSize}>
        <CategoryList />
      </Grid.Column>
    </Grid>
  );
};
export default MenuPage;
