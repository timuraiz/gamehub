import { SimpleGrid, Text, GridItem, Button, Flex, Show, Box } from '@chakra-ui/react';
import useGames, { Game } from '../hooks/useGames';
import GameCard from './GameCard';
import GameCardContainer from './GameCardContainer';
import GameCardSkeleton from './GameCardSkeleton';
import { useState } from 'react';
import { FetchResponse } from '../services/api-client';
import { InView } from 'react-intersection-observer';
import useGameQueryStore from '../store';
import GenreList from './GenreList';
import NavBar from './NavBar';
import PlatformSelector from './PlatformSelector';
import GameHeading from './GameHeading';
import SortSelector from './SortSelector';

const GameGrid = () => {
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
    <>
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
    </>
  );
};

export default GameGrid;
