import replacerImage from "@/assets/default.jpg";
import authUserStore from "@/store/authUserStore";
import userChatStore from "@/store/userChatStore";
import { Flex, Image, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const MapImage = ({ data }) => {
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      alignItems="flex-start"
      pt="10px"
      gap="10px"
      _hover={{ bg: "gray.600" }}
      w="100%"
      p="5px 10px"
      rounded="2px"
    >
      {data.showAvatar === true && (
        <Image
          mt="5px"
          rounded="full"
          w="40px"
          h="40px"
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
          <Image
            objectFit="cover"
            filter={data.image ? "blur(3px)" : ""}
            rounded="5px"
            w="350px"
            h="350px"
            maxH="350px"
            maxW="350px"
            src={data?.image || data?.url}
          />
          {data.text && <Text>{data?.text}</Text>}
        </Flex>
      )}

      {data.showAvatar === false && (
        <>
          <Text
            opacity={isHovered ? "1" : "0"}
            color="gray.400"
            w="35px"
            fontSize="9.5px"
          >
            {formatMessageTime(data?.createdAt)}
          </Text>
          <Flex direction="column">
            <Image
              rounded="5px"
              w="200px"
              h="200px"
              src={data?.image || data?.url}
            />
            {data.text && <Text>{data?.text}</Text>}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default MapImage;
