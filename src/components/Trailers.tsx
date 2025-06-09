import { Box, Heading, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import useTrailers from '../hooks/useTrailers';

interface Props {
  gameId: number;
}

export const Trailers = ({ gameId }: Props) => {
  const { data, isLoading, error } = useTrailers(gameId.toString());

  if (isLoading) return <Spinner />;
  if (error) return <Text>{error.message}</Text>;
  if (!data?.results.length) return null;

  return (
    <Box>
      <Heading marginY={5}>Trailer</Heading>
      <video
        key={data.results[0].id}
        src={data.results[0].data['480']}
        poster={data.results[0].preview}
        controls
        width="100%"
      />
    </Box>
  );
};
