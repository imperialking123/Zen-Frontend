import { Box, Flex, Image, Text } from "@chakra-ui/react";
import replacerImage from "@/assets/default.jpg";
import dayjs from "dayjs";
import userFriendStore from "@/store/userFriendStore";
const DisplayUser = ({ profileData }) => {
  const { onlineFriends } = userFriendStore();

  return (
    <Flex bg="gray.700" pos="relative" direction="column" w="full" h="full">
      <Box
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="20%"
        pos="relative"
        bg={profileData?.profile?.coverImage ? "none" : "gray.500"}
      >
        {profileData?.profile?.coverImage && (
          <Image src={profileData?.profile?.coverImage} w="full" h="full" />
        )}
      </Box>

      <Box
        w="90px"
        h="90px"
        rounded="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.800"
        pos="absolute"
        left="10%"
        top="7%"
      >
        <Image
          src={profileData?.profile?.profilePic || replacerImage}
          w="90%"
          h="90%"
          rounded="full"
        />

        {Array.isArray(onlineFriends) &&
        onlineFriends.length > 0 &&
        onlineFriends.includes(profileData?._id) ? (
          <Box
            pos="absolute"
            bottom="12%"
            right="10%"
            p="5px"
            border="5px solid"
            borderColor="gray.800"
            rounded="full"
            bg="#00ff00ff"
          ></Box>
        ) : (
          <Box
            pos="absolute"
            bottom="10%"
            right="10%"
            border="5px solid"
            borderColor="gray.800"
            p="5px"
            rounded="full"
            bg="white"
          ></Box>
        )}
      </Box>

      <Flex direction="column" w="full" h="100%" pt="50px">
        <Flex pl="10px" pr="10px" direction="column">
          <Text
            _hover={{ textDecor: "underline" }}
            fontWeight="bold"
            fontSize="lg"
          >
            {profileData?.name}
          </Text>
          <Text _hover={{ textDecor: "underline" }}>
            {profileData?.username}
          </Text>
        </Flex>

        <Flex
          rounded="10px"
          gap="10px"
          fontSize="14px"
          bg="gray.800"
          mt="20px"
          w="95%"
          p='10px'
          direction="column"
          alignSelf='center'
        >
          {profileData?.profile.bio && (
            <Box display="flex" flexDir="column">
              <Text fontSize="13px" fontWeight="bold">
                About Me
              </Text>
              <Text>{profileData?.profile.bio}</Text>
            </Box>
          )}
          <Box w="full" display="flex" flexDir="column">
            <Text fontSize="13px" fontWeight="bold">
              Member Since
            </Text>
            <Text>{dayjs(profileData?.createAt).format("MMM D, YYYY")}</Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DisplayUser;
