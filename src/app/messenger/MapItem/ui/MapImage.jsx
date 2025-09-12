import authUserStore from "@/store/authUserStore";
import { Flex, Image, Text } from "@chakra-ui/react";
import replacerImage from "@/assets/default.jpg";
import userChatStore from "@/store/userChatStore";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useState } from "react";
import userPopStore from "@/store/userPopUpStore";

dayjs.extend(localizedFormat);
dayjs.extend(calendar);

const MapImage = ({ data }) => {
  const { authUser } = authUserStore();
  const { convoSelected } = userChatStore();
  const { setShowMediaPop } = userPopStore();
  const isMe = data.senderId === authUser._id;

  const [isHovered, setIsHovered] = useState(false);
  function formatTime(date) {
    const now = dayjs();
    const d = dayjs(date);

    if (d.isSame(now, "day")) {
      return d.format("h:mm A"); // same day → show time
    } else {
      return d.format("M/D/YYYY"); // different day → show date
    }
  }

  function formatChatTimeStamp(date) {
    const d = dayjs(date);
    const now = dayjs();

    if (d.isSame(now, "day")) {
      return d.format("h:mm A"); // Today
    } else if (d.isSame(now.subtract(1, "day"), "day")) {
      return `Yesterday at ${d.format("h:mm A")}`;
    } else if (d.isSame(now, "year")) {
      return d.format("MMM D"); // Mar 5
    } else {
      return d.format("MMM D, YYYY"); // Mar 5, 2001
    }
  }

  const mediaData = {
    media: data.image || data.url,
    type: data.type.split("-")[0],
    senderProfile: convoSelected.otherParticipant.profile,
    timeStamp: data.createdAt,
  };

  return (
    <Flex
      mt={data.showAvatar === true ? "8px" : "0px"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      alignItems="flex-start"
      _hover={{ bg: "gray.800" }}
      w="99%"
      rounded="2px"
      maxW="100%"
    >
      {/*Avatar and timer when avatar show off */}
      <Flex justifyContent="center" maxW="72px" minW="72px" p="5px">
        {data.showAvatar === true ? (
          <Image
            w="40px"
            h="40px"
            rounded="full"
            src={
              isMe
                ? authUser.profile.profilePicsm || replacerImage
                : convoSelected.otherParticipant.profile.profilePicsm ||
                  replacerImage
            }
          />
        ) : (
          <Text
            userSelect="none"
            fontWeight="600"
            color="gray.400"
            fontSize="11px"
            opacity={isHovered ? "1" : "0"}
          >
            {formatTime(data?.createdAt)}
          </Text>
        )}
      </Flex>
      {/*Avatar and timer when avatar show off */}

      {/*Name and data  */}
      <Flex direction="column" w="calc(100% - 72px)">
        {data.showAvatar && (
          <Flex alignItems="center" gap="5px">
            <Text cursor="pointer" fontSize="16px">
              {isMe ? authUser.name : convoSelected.otherParticipant.name}
            </Text>

            <Text fontWeight="600" color="gray.400" fontSize="13px">
              {formatChatTimeStamp(data.createdAt)}
            </Text>
          </Flex>
        )}
        <Text
          userSelect="none"
          whiteSpace="pre-wrap"
          wordBreak="break-word"
          textAlign="left"
        >
          {data.text}
        </Text>
        <Image
          onClick={() => setShowMediaPop(mediaData)}
          rounded="15px"
          src={data.image || data.url}
          maxW="344px"
          h="350px"
          cursor='pointer'
        />
      </Flex>
    </Flex>
  );
};

export default MapImage;
