import { Badge, Grid, Text } from '@chakra-ui/react';
import { GameDetail } from '../entities/GameDetail';
import { DefinitionItem } from './DefinitionItem';

interface Props {
  game: GameDetail;
}

export const GameAttributes = ({ game }: Props) => {
  return (
    <Grid templateColumns="1fr 1fr" gap={5}>
      <DefinitionItem term="Platforms">
        {game.parent_platforms.map(({ platform }) => (
          <Text key={platform.id}>{platform.name}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Metacritic">
        <Badge
          colorScheme={game.metacritic > 75 ? 'green' : game.metacritic > 60 ? 'yellow' : 'red'}
          fontSize="14px"
          paddingX={2}
        >
          {game.metacritic}
        </Badge>
      </DefinitionItem>
      <DefinitionItem term="Genres">
        {game.genres.map((genre) => (
          <Text key={genre.id}>{genre.name}</Text>
        ))}
      </DefinitionItem>
      <DefinitionItem term="Publishers">
        {game.publishers.map((publisher) => (
          <Text key={publisher.id}>{publisher.name}</Text>
        ))}
      </DefinitionItem>
    </Grid>
  );
};
