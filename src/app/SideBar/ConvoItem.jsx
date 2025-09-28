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
  const { selectConvo, convoSelected, setRenderDisplayUser } = userChatStore();
  const { authUser } = authUserStore();
  const { SetSliderNum, setTopText } = userPopStore();

  const navigate = useNavigate();
  const handleClick = () => {
    SetSliderNum(2);
    setRenderDisplayUser(fullConvoData);
    setTopText("Direct Messages");
    selectConvo(fullConvoData);
    document.title = `Zen | @${convoData.username}`;
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
            w="32px"
            h="32px"
            rounded="full"
            objectFit="cover"
            src={convoData?.profile?.profilePicsm || replacerImage}
          />
          {Array.isArray(onlineFriends) &&
          onlineFriends.length > 0 &&
          onlineFriends.includes(convoData._id) ? (
            <Box
              bottom="0"
              right="0"
              border="3px solid"
              borderColor="gray.900"
              pos="absolute"
              p="5px"
              rounded="full"
              bg="#4CAF50"
            ></Box>
          ) : (
            <Box
              bottom="0"
              right="0"
              border="3px solid"
              borderColor="gray.900"
              pos="absolute"
              p="5px"
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
          bg="#ff1919ff"
          pos="absolute"
          w="15px"
          h="15px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          rounded="full"
          right="7%"
          p="0px"
        >
          <Text fontSize="11px" fontWeight="bold">
            {" "}
            {fullConvoData.unreadCounts[authUser._id]}
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default ConvoItem;
