import { Box, Flex, Grid, GridItem, Show } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import GenreList from './GenreList';
import NavBar from './NavBar';
import PlatformSelector from './PlatformSelector';
import SortSelector from './SortSelector';
import GameHeading from './GameHeading';

const Layout = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '250px 1fr',
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Outlet />
    </Grid>
  );
};

export default Layout;
