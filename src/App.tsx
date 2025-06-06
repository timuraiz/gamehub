import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import GameGrid from './components/GameGrid';
import GameDetail from './components/GameDetail';
import { ErrorPage } from './components/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <GameGrid /> },
      { path: 'games/:slug', element: <GameDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
