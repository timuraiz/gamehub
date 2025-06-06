import { useParams } from 'react-router-dom';
import { Heading, Text } from '@chakra-ui/react';

const GameDetail = () => {
  const { id } = useParams();

  return <Heading>Game Detail: {id}</Heading>;
};

export default GameDetail;
