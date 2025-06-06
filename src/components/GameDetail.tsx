import { useParams } from 'react-router-dom';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import useGame from '../hooks/useGame';

const GameDetail = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!);

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!game) return <Text>No game found</Text>;

  return (
    <Box p={5}>
      <Heading>{game?.name}</Heading>
      <Text>{game?.description_raw}</Text>
    </Box>
  );
};

export default GameDetail;
