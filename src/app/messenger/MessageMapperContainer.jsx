import { Box, Flex, Image, Text } from "@chakra-ui/react";
import replacerImage from "@/assets/default.jpg";
import { useEffect, useRef, useState } from "react";
import userChatStore from "@/store/userChatStore";
import MessageMapArranger from "@/config/MessageMapArranger";
import MapContainer from "./MapItem/MapContainer";

const MessageMapperContainer = ({ data }) => {
  const { messages, isFetchingMessage } = userChatStore();

  const scrollRef = useRef(null);
  const processedMessages = MessageMapArranger(messages);

  useEffect(() => {
    if (processedMessages.length > 0 && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [processedMessages.length, messages]);

  return (
    <Flex id="msgMapContainer" direction="column" w="full" h="full">
      <Flex
        padding="15px"
        userSelect="none"
        gap="10px"
        w="100%"
        direction="column"
      >
        <Image
          rounded="full"
          w="100px"
          h="100px"
          src={data?.profile?.profilePic || replacerImage}
        />
        <Text fontSize="25px" fontWeight="medium">
          {data?.name}
        </Text>
        <Text>{data?.username}</Text>
        <Text mdDown={{ gap: "0px" }} display="Text" gap="5px">
          This is the Beginning of your Direct Message with <b>{data?.name}</b>
        </Text>
      </Flex>

      {Array.isArray(processedMessages) &&
        !isFetchingMessage &&
        processedMessages.length > 0 &&
        processedMessages.map((msg, index) => (
          <MapContainer key={msg._id || index} msg={msg} />
        ))}
      <Box ref={scrollRef} w="full" p="15px" h="10px" />
    </Flex>
  );
};

export default MessageMapperContainer;
