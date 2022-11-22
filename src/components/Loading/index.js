import React from "react";
import { Box, Spinner } from "native-base";

export function Loading() {
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="primary.900"
    >
      <Spinner color="purple.600" size="lg" />
    </Box>
  );
}
