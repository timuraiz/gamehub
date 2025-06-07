import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { ErrorPage } from './components/ErrorPage';
import GamePage from './pages/GamePage';
import GamesPage from './pages/GamesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <GamesPage /> },
      { path: 'games/:slug', element: <GamePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
