import { Box, Flex, Image, Text } from "@chakra-ui/react";

import replacerImage from "@/assets/default.jpg";
import userFriendStore from "@/store/userFriendStore";
import { LuX } from "react-icons/lu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userChatStore from "@/store/userChatStore";
import authUserStore from "@/store/authUserStore";
import userPopStore from "@/store/userPopUpStore";

const ConvoItem = ({ convoData, fullConvoData }) => {
  const { onlineFriends } = userFriendStore();
  const [isHovered, setIsHovered] = useState(false);
  const { selectConvo, convoSelected } = userChatStore();
  const { authUser } = authUserStore();
  const { SetSliderNum, setTopText } = userPopStore();

  const navigate = useNavigate();
  const handleClick = () => {
    SetSliderNum(2);
    setTopText("Direct Messages");
    selectConvo(fullConvoData);
    navigate(`@me/${convoData.username}`);
  };

  return (
    <Flex
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      _hover={{ bg: "gray.900" }}
      bg={
        convoSelected?.otherParticipant?._id === convoData?._id
          ? "gray.800"
          : " "
      }
      alignItems="center"
      pl="5px"
      pr="5px"
      w="95%"
      pos="relative"
      rounded="8px"
    >
      <Flex gap="8px" alignItems="center">
        <Box
          w="40px"
          h="40px"
          pos="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            w="40px"
            h="40px"
            rounded="full"
            objectFit="cover"
            src={convoData?.profile?.profilePicsm || replacerImage}
          />
          {Array.isArray(onlineFriends) &&
          onlineFriends.length > 0 &&
          onlineFriends.includes(convoData._id) ? (
            <Box
              pos="absolute"
              bottom="2%"
              right="4%"
              border="3px solid"
              borderColor="gray.900"
              p="4px"
              rounded="full"
              bg="#00ff00ff"
            ></Box>
          ) : (
            <Box
              pos="absolute"
              bottom="2%"
              right="4%"
              border="4px solid"
              borderColor="gray.700"
              p="3px"
              rounded="full"
              bg="white"
            ></Box>
          )}
        </Box>

        <Text color="white" fontSize="15px">
          {convoData.name}
        </Text>
      </Flex>

      {fullConvoData.unreadCounts[authUser._id] > 0 && (
        <Box
          bg="red"
          pos="absolute"
          w="20px"
          h="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          rounded="full"
          right="7%"
        >
          {fullConvoData.unreadCounts[authUser._id]}
        </Box>
      )}
    </Flex>
  );
};

export default ConvoItem;
