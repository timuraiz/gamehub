import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import GameGrid from './components/GameGrid';
import GameDetail from './components/GameDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <GameGrid /> },
      { path: 'games/:id', element: <GameDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
