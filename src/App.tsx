import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import Navbar from './components/feature/Navbar';

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
