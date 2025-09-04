import authUserStore from "@/store/authUserStore";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import replacerImage from "@/assets/default.jpg";
import userChatStore from "@/store/userChatStore";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { useState } from "react";

dayjs.extend(calendar);

const MapText = ({ data }) => {
  const { authUser } = authUserStore();
  const { convoSelected } = userChatStore();
  const isMe = data.senderId === authUser._id;

  const [isHovered, setIsHovered] = useState(false);
  const formatMessageTime = (date) => {
    const d = dayjs(date);
    return d.isSame(dayjs(), "day")
      ? d.format("h:mm A") // same day → just time
      : d.format("M/D/YYYY"); // different day → date only
  };

  return (
    <Flex
      mt={data.showAvatar ? "6px" : "0px"}
      mb={data.showAvatar ? "6px" : "0px"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      alignItems="flex-start"
      gap="10px"
      _hover={{ bg: "gray.600" }}
      w="full"
      overflowWrap="break-word"
      wordWrap="break-word"
      wordBreak="break-all"
      p="0px 5px"
      rounded="2px"
      maxW="100%"
    >
      {data.showAvatar === true && (
      
          <Image
            rounded="full"
            w="40px"
            h="40px"
            mt='5px'
            src={
              isMe === true
                ? authUser?.profile?.profilePicsm || replacerImage
                : convoSelected.otherParticipant?.profile?.profilePicsm ||
                  replacerImage
            }
          />
    
      )}

      {data.showAvatar === true && (
        <Flex p="0px" gap="0px" direction="column">
          <Flex gap="5px" alignItems="center">
            <Text fontSize="15px">
              {isMe === true
                ? authUser?.name
                : convoSelected?.otherParticipant?.name}
            </Text>{" "}
            <Text color="gray.400" fontSize="12px">
              {dayjs(data.createdAt).calendar()}
            </Text>
          </Flex>
          <Text>{data.text}</Text>
        </Flex>
      )}

      {data.showAvatar === false && (
        <>
          <Text
            opacity={isHovered ? "1" : "0" }
            color="gray.400"
            w="40px"
            alignSelf='center'
            display='flex'
            alignItems='center'
            fontSize="10px"
            
          >
            {formatMessageTime(data?.createdAt)}
          </Text>
          <Text w="calc(100% - 35px)">{data.text}</Text>
        </>
      )}
    </Flex>
  );
};

export default MapText;
