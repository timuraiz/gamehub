import { Button, Heading, HStack, Image, List, ListItem, Spinner, Text } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import { Genre } from '../entities/Genre';
import getCroppedImageUrl from '../services/image-url';
import { GenreButton } from './GenreButton';

const GenreList = () => {
  const { data, isLoading, error } = useGenres();

  if (error) return <Text>{error.message}</Text>;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize="2xl" marginTop={9} marginBottom={3}>
        Genres
      </Heading>
      <List>
        {data?.results.map((genre) => (
          <ListItem key={genre.id} paddingY="5px">
            <HStack>
              <Image
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
              />
              <GenreButton genre={genre} />
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
