import { Box, Flex, Grid, GridItem, Show } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import GenreList from './GenreList';
import NavBar from './NavBar';
import PlatformSelector from './PlatformSelector';
import SortSelector from './SortSelector';
import GameHeading from './GameHeading';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
