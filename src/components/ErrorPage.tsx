import { Box, Heading, Text } from '@chakra-ui/react';
import NavBar from './NavBar';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <Box padding={5}>
        <Heading>Error</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? 'This page does not exist.'
            : 'An unexpected error occurred.'}
        </Text>
      </Box>
    </>
  );
};
