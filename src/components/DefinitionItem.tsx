import { Text, Heading, Box } from '@chakra-ui/react';
import React from 'react';

interface Props {
  term: string;
  children: React.ReactNode;
}

export const DefinitionItem = ({ term, children }: Props) => {
  return (
    <Box mt={5}>
      <Heading as="dt" fontSize="md" color="gray.600">
        {term}
      </Heading>
      <dd>{children}</dd>
    </Box>
  );
};
