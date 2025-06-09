import { SimpleGrid, Image, Box, Heading } from '@chakra-ui/react';
import useScreenShots from '../hooks/useScreenShots';

interface Props {
  gameId: number;
}

export const ScreenShots = ({ gameId }: Props) => {
  const { data, error, isLoading } = useScreenShots(gameId);

  if (isLoading) return null;
  if (error) throw error;

  return (
    <Box>
      {/* <Heading marginY={5}>Screenshots</Heading> */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
        {data?.results.map((screenshot) => (
          <Image key={Math.random()} src={screenshot.image} alt="Game screenshot" />
        ))}
      </SimpleGrid>
    </Box>
  );
};
