import { Badge } from '@chakra-ui/react';
import { FC } from 'react'

export const VoteDisplay: FC<{ vote: number, hasDesc?: string }> = ({ vote, hasDesc }) => {
  const description = hasDesc ? hasDesc : "";
  if (vote < 6) {
    return (
      <Badge h={5} variant="solid" colorScheme="red">
        {description}{Math.round(vote * 10) / 10}
      </Badge>
    );
  } else if (vote > 5.9 && vote < 8) {
    return (
      <Badge h={5} variant="solid" colorScheme="yellow">
        {description}{Math.round(vote * 10) / 10}
      </Badge>
    );
  } else {
    return (
      <Badge h={5} variant="solid" colorScheme="green">
        {description}{Math.round(vote * 10) / 10}
      </Badge>
    );
  }
};
