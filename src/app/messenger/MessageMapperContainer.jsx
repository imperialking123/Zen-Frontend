import { Box, Flex, Image, Text } from "@chakra-ui/react";
import replacerImage from "@/assets/default.jpg";
import { useEffect, useRef, useState } from "react";
import userChatStore from "@/store/userChatStore";
import MessageMapArranger from "@/config/MessageMapArranger";
import MapContainer from "./MapItem/MapContainer";
import LoadingMessagesSkeleton from "@/components/Skeleton/LoadingMessagesSkeleton";

const MessageMapperContainer = ({ data }) => {
  const { messages, isFetchingMessage, isGettingConvo } = userChatStore();

  const scrollRef = useRef(null);
  const processedMessages = MessageMapArranger(messages);

  useEffect(() => {
    if (processedMessages.length > 0 && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [processedMessages.length, messages]);

  return (
    <Flex id="msgMapContainer" direction="column" w="full" h="full">
      {!isGettingConvo && (
        <Flex
          padding="15px"
          userSelect="none"
          gap="10px"
          mdDown={{ gap: "5px", p: "15px" }}
          w="100%"
          direction="column"
        >
          <Image
            rounded="full"
            w="80px"
            h="80px"
            src={data?.profile?.profilePic || replacerImage}
          />
          <Text fontSize="3xl" fontWeight="medium">
            {data?.name}
          </Text>
          <Text>{data?.username}</Text>
          <Text
            mdDown={{ gap: "0px", fontSize: "md" }}
            display="Text"
            gap="5px"
          >
            This is the beginning of your direct message history with{" "}
            <b>{data?.name}</b>
          </Text>
        </Flex>
      )}

      {Array.isArray(processedMessages) &&
        !isFetchingMessage &&
        processedMessages.length > 0 &&
        processedMessages.map((msg, index) => (
          <MapContainer key={msg._id || index} msg={msg} />
        ))}

      {(isFetchingMessage || isGettingConvo) && <LoadingMessagesSkeleton />}

      <Box ref={scrollRef} w="full" p="15px" h="10px" />
    </Flex>
  );
};

export default MessageMapperContainer;
