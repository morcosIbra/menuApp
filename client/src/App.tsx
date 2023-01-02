import { Segment } from 'semantic-ui-react';
import MenuPage from './pages/MenuPage/MenuPage';
import Header from './containers/Header/Header';
import MainContainer from './components/MainContainer/MainContainer';

function App() {
  return (
    <Segment vertical>
      <Header />
      <MainContainer>
        <MenuPage />
      </MainContainer>
    </Segment>
  );
}

export default App;
