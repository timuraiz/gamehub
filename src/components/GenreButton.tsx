import { Button } from '@chakra-ui/react';
import { Genre } from '../hooks/useGenres';
import useGameQueryStore from '../store';

interface Props {
  genre: Genre;
  fontSize?: string;
  color?: string;
}
export const GenreButton = ({ genre, fontSize = 'md', color = 'gray.400' }: Props) => {
  const setGenreId = useGameQueryStore((s) => s.setGenreId);
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  return (
    <Button
      whiteSpace="normal"
      textAlign="left"
      fontWeight={genre.id === selectedGenreId ? 'bold' : 'normal'}
      onClick={() => setGenreId(genre.id)}
      fontSize={fontSize}
      color={color}
      variant="link"
    >
      {genre.name}
    </Button>
  );
};
