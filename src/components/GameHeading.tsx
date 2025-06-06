import { Heading } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import useGameQueryStore from '../store';

const GameHeading = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
  const { data: genres } = useGenres();
  const genre = genres?.results.find((g) => g.id === gameQuery.genreId);
  const heading = `${gameQuery.platform?.name || ''} ${genre?.name || ''} Games`;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default GameHeading;
