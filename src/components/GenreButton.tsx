import { Button } from '@chakra-ui/react';
import React from 'react';
import { Genre } from '../hooks/useGenres';

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenreId?: number;
  genre: Genre;
  fontSize?: string;
  color?: string;
}
export const GenreButton = ({
  onSelectGenre,
  selectedGenreId,
  genre,
  fontSize = 'md',
  color = 'gray.400',
}: Props) => {
  return (
    <Button
      whiteSpace="normal"
      textAlign="left"
      fontWeight={genre.id === selectedGenreId ? 'bold' : 'normal'}
      onClick={() => onSelectGenre(genre)}
      fontSize={fontSize}
      color={color}
      variant="link"
    >
      {genre.name}
    </Button>
  );
};
