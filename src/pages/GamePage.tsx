import { useParams } from 'react-router-dom';
import { Box, Button, Heading, Spinner, Text } from '@chakra-ui/react';
import useGame from '../hooks/useGame';
import { useState } from 'react';
import { GameAttributes } from '../components/GameAttributes';
import { Trailers } from '../components/Trailers';
import { ScreenShots } from '../components/ScreenShots';

const GamePage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);
  const [isTrimmed, setIsTrimmed] = useState(true);

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!game) return <Text>No game found</Text>;

  const trimmedDescription = isTrimmed
    ? game.description_raw.substring(0, 300)
    : game.description_raw;

  return (
    <Box p={5}>
      <Heading>{game?.name}</Heading>
      <Text>{trimmedDescription}</Text>
      <Button onClick={() => setIsTrimmed(!isTrimmed)}>
        {isTrimmed ? 'Show more' : 'Show less'}
      </Button>
      <GameAttributes game={game} />
      <Trailers gameId={game.id} />
      <ScreenShots gameId={game.id} />
    </Box>
  );
};

export default GamePage;
