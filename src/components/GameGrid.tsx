import { SimpleGrid, Text, GridItem, Button } from '@chakra-ui/react';
import { GameQuery } from '../App';
import useGames, { Platform, Game } from '../hooks/useGames';
import { Genre } from '../hooks/useGenres';
import GameCard from './GameCard';
import GameCardContainer from './GameCardContainer';
import GameCardSkeleton from './GameCardSkeleton';
import { useState } from 'react';
import { FetchResponse } from '../services/api-client';
import { InView } from 'react-intersection-observer';

interface Props {
  gameQuery: GameQuery;
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GameGrid = ({ gameQuery, onSelectGenre, selectedGenre }: Props) => {
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
  console.log(data?.pages[0].results.length);
  return (
    <>
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
                <GameCard game={game} onSelectGenre={onSelectGenre} selectedGenre={selectedGenre} />
              </GameCardContainer>
            ))}
          </GridItem>
        ))}
      </SimpleGrid>
      {/* {data?.pages.length && data.pages.length > 1 && ( */}
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
    </>
  );
};

export default GameGrid;
