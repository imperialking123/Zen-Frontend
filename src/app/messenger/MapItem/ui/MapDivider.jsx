import { Flex, Text } from "@chakra-ui/react";

const MapDivider = ({ data }) => {
  return (
    <Flex mt='5px' mb='5px' userSelect="none"  w="full" alignItems="center">
      <Flex mr="10px" bg="gray.800" h="2px" flexGrow={1} />
      <Text color="gray.400" fontSize="13px">
        {data.date}{" "}
      </Text>
      <Flex ml="10px" bg="gray.800" h="1px" flexGrow={1} />
    </Flex>
  );
};

export default MapDivider;
