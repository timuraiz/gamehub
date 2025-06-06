import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardBody, Heading, HStack, Image, Text } from '@chakra-ui/react';
import { Game } from '../entities/Game';
import getCroppedImageUrl from '../services/image-url';
import CriticScore from './CriticScore';
import Emoji from './Emoji';
import PlatformIconList from './PlatformIconList';
import { useRef, useState } from 'react';
import { GenreButton } from './GenreButton';

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const [height, setHeight] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <RouterLink to={`/games/${game.slug}`}>
      <Box
        position="relative"
        mb={5}
        transition="transform 0.15s ease-in-out"
        _hover={{
          transform: 'scale(1.02)',
          zIndex: 1,
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        }}
        style={{ height: height ?? undefined }}
      >
        <Card
          ref={boxRef}
          overflow="hidden"
          position={height ? 'absolute' : 'relative'}
          onMouseEnter={() => {
            if (boxRef.current) {
              setHeight(boxRef.current.offsetHeight);
            }
          }}
          onMouseLeave={() => {
            if (boxRef.current) {
              setHeight(null);
            }
          }}
        >
          <Image src={getCroppedImageUrl(game.background_image)} />
          <CardBody>
            <HStack justifyContent="space-between" marginBottom={3}>
              <PlatformIconList platforms={game.parent_platforms?.map((p) => p.platform)} />
              <CriticScore score={game.metacritic} />
            </HStack>
            <Heading fontSize="2xl">
              {game.name}
              <Emoji rating={game.rating_top} />
            </Heading>
            {height && (
              <Box>
                <Box mt={2} display="flex" flexDirection="row" justifyContent="space-between">
                  <Text fontSize="xs" color="gray.500">
                    Release Date:
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {game.released}
                  </Text>
                </Box>
                <Box my={2} height="1px" backgroundColor="gray.500" opacity={0.3} />
                <Box
                  mt={2}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="baseline"
                >
                  <Text fontSize="xs" color="gray.500">
                    Genres:
                  </Text>
                  <HStack
                    fontSize="xs"
                    color="gray.500"
                    spacing={0.5}
                    flexWrap="wrap"
                    justifyContent="flex-end"
                  >
                    {game.genres.slice(0, 3).map((genre) => (
                      <GenreButton key={genre.id} genre={genre} fontSize="xs" color="gray.500" />
                    ))}
                    {game.genres.length > 3 && (
                      <Text fontSize="xs" color="gray.500">
                        ...
                      </Text>
                    )}
                  </HStack>
                </Box>
                <Box my={2} height="1px" backgroundColor="gray.500" opacity={0.3} />
                <HStack justifyContent="space-between">
                  <Text fontSize="xs" color="gray.500">
                    Rating:
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {game.rating}
                  </Text>
                </HStack>
              </Box>
            )}
          </CardBody>
        </Card>
      </Box>
    </RouterLink>
  );
};

export default GameCard;
