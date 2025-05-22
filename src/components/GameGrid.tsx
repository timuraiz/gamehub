import { SimpleGrid, Text, GridItem } from '@chakra-ui/react';
import { GameQuery } from '../App';
import useGames, { Platform, Game } from '../hooks/useGames';
import { Genre } from '../hooks/useGenres';
import GameCard from './GameCard';
import GameCardContainer from './GameCardContainer';
import GameCardSkeleton from './GameCardSkeleton';
import { useState } from 'react';

interface Props {
  gameQuery: GameQuery;
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GameGrid = ({ gameQuery, onSelectGenre, selectedGenre }: Props) => {
  const { data, error, isLoading } = useGames(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];
  const [columnCount, setColumnCount] = useState(3);

  const splitGames = () => {
    if (!data) return Array(columnCount).fill([]);

    const result: Game[][] = [];
    for (let i = 0; i < columnCount; i++) {
      result.push(data.results.filter((_, index) => index % columnCount === i));
    }
    return result;
  };

  const gameColumns = splitGames();

  if (error) return <Text>{error.message}</Text>;

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
      ref={(grid: HTMLDivElement | null) => {
        if (grid) {
          const computedStyle = window.getComputedStyle(grid);
          const columns = computedStyle.getPropertyValue('grid-template-columns').split(' ').length;
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

      {gameColumns.map((column, index) => (
        <GridItem key={index}>
          {column.map((game: Game) => (
            <GameCardContainer key={game.id}>
              <GameCard game={game} onSelectGenre={onSelectGenre} selectedGenre={selectedGenre} />
            </GameCardContainer>
          ))}
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

export default GameGrid;
