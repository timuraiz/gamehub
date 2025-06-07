import { SimpleGrid, Text, GridItem, Button, Flex, Show, Box, Grid } from '@chakra-ui/react';
import useGames from '../hooks/useGames';
import { Game } from '../entities/Game';
import GameCard from '../components/GameCard';
import GameCardContainer from '../components/GameCardContainer';
import GameCardSkeleton from '../components/GameCardSkeleton';
import { useState } from 'react';
import { FetchResponse } from '../services/api-client';
import { InView } from 'react-intersection-observer';
import useGameQueryStore from '../store';
import GenreList from '../components/GenreList';
import PlatformSelector from '../components/PlatformSelector';
import GameHeading from '../components/GameHeading';
import SortSelector from '../components/SortSelector';

const GamesPage = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGames(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];
  const [columnCount, setColumnCount] = useState(3);

  const splitGames = (data: FetchResponse<Game>[]) => {
    if (!data) return Array(columnCount).fill([]);

    const results = data.flatMap((page) => page.results);
    const result: Game[][] = [];
    for (let i = 0; i < columnCount; i++) {
      result.push(results.filter((_, index) => index % columnCount === i));
    }
    return result;
  };

  if (error) return <Text>{error.message}</Text>;
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '250px 1fr',
      }}
    >
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <GameHeading />
          <Flex marginBottom={5}>
            <Box marginRight={5}>
              <PlatformSelector />
            </Box>
            <SortSelector />
          </Flex>
        </Box>
        <SimpleGrid
          columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
          ref={(grid: HTMLDivElement | null) => {
            if (grid) {
              const computedStyle = window.getComputedStyle(grid);
              const columns = computedStyle
                .getPropertyValue('grid-template-columns')
                .split(' ').length;
              setColumnCount(columns);
            }
          }}
          padding="10px"
          spacing={6}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <GameCardContainer key={skeleton}>
                <GameCardSkeleton />
              </GameCardContainer>
            ))}

          {splitGames(data?.pages ?? []).map((column, index) => (
            <GridItem key={index}>
              {column.map((game: Game) => (
                <GameCardContainer key={game.id}>
                  <GameCard game={game} />
                </GameCardContainer>
              ))}
            </GridItem>
          ))}
        </SimpleGrid>
        <InView
          onChange={(inView) => {
            if (inView && hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        >
          {({ ref }) => (
            <Button
              ref={ref}
              isLoading={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              w="100%"
              marginY={5}
              bg="transparent"
            >
              {isFetchingNextPage ? 'Loading...' : hasNextPage ? 'Load More' : 'No More Games'}
            </Button>
          )}
        </InView>
        {/* )} */}
      </GridItem>
    </Grid>
  );
};

export default GamesPage;
