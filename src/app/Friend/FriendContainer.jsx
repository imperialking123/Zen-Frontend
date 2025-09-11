import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineEmojiPeople } from "react-icons/md";
import RenderFriends from "./RenderFriends";
import userFriendStore from "@/store/userFriendStore";
import { LuMenu } from "react-icons/lu";
import userPopStore from "@/store/userPopUpStore";

const FriendContainer = () => {
  const [renderCase, setRenderCase] = useState("all");
  const { onlineFriends, pending, requests } = userFriendStore();
  const { SetSliderNum } = userPopStore();

  return (
    <Flex direction="column" w="100%" h="100%">
      {/*Top ribbon */}
      <Flex
        w="full"
        h="7.8%"
        alignItems="center"
        borderBottom="0.5px solid"
        borderColor="gray.800"
        pl="20px"
        pr="20px"
        gap="15px"
        transition="0.5s ease"
        mdDown={{ gap: "8px" }}
      >
        <Button
          onClick={() => SetSliderNum(0)}
          bg="none"
          w="15px"
          h="15px"
          color="white"
          outline="none"
          border="none"
          display="none"
          mdDown={{ display: "flex" }}
        >
          <LuMenu />
        </Button>
        <Flex color="gray.300" alignItems="center" gap="8px" userSelect="none">
          <MdOutlineEmojiPeople className="iconMedium" />{" "}
          <Text fontSize="17px"> Friends</Text>
          <Box p="2px" rounded="full" bg="gray.600" />
        </Flex>

        {onlineFriends.length > 0 && (
          <Box
            bg={renderCase === "online" ? "gray.700" : ""}
            userSelect="none"
            cursor="pointer"
            pl="10px"
            pr="10px"
            pt="5px"
            pb="5px"
            rounded="7px"
            transition="0.5s ease"
            onClick={() => setRenderCase("online")}
          >
            Online
          </Box>
        )}

        <Box
          pl="10px"
          pr="10px"
          pb="5px"
          pt="5px"
          rounded="7px"
          transition="0.5s ease"
          onClick={() => setRenderCase("all")}
          bg={renderCase === "all" ? "gray.700" : ""}
          userSelect="none"
          cursor="pointer"
        >
          All
        </Box>

        {Array.isArray(pending) && pending.length > 0 && (
          <Box
            pl="10px"
            pr="10px"
            pb="5px"
            pt="5px"
            rounded="7px"
            transition="0.5s ease"
            onClick={() => setRenderCase("pending")}
            bg={renderCase === "pending" ? "gray.700" : ""}
            userSelect="none"
            cursor="pointer"
          >
            Pending
          </Box>
        )}

        {Array.isArray(requests) && requests.length > 0 && (
          <Box
            pl="10px"
            pr="10px"
            pb="5px"
            pt="5px"
            rounded="7px"
            transition="0.5s ease"
            onClick={() => setRenderCase("request")}
            bg={renderCase === "request" ? "gray.700" : ""}
            userSelect="none"
            cursor="pointer"
            display="flex"
            alignItems="center"
            gap="5px"
          >
            Request <Box p="3px" rounded="full" bg="red" />
          </Box>
        )}

        <Button
          onClick={() => setRenderCase("add")}
          h="30px"
          w="85px"
          bg={renderCase === "add" ? "gray.600" : ""}
        >
          Add Friend
        </Button>
      </Flex>
      {/*Top ribbon */}

      <Flex h="calc(100% - 7.8%)" w="full">
        <Flex mdDown={{ width: "100%" }} w="67%" h="full">
          <RenderFriends renderCase={renderCase} />
        </Flex>

        <Flex
          borderLeft="0.5px solid"
          borderColor="gray.800"
          pt="20px"
          pl="5px"
          pr="5px"
          userSelect="none"
          w="33%"
          mdDown={{ display: "none" }}
        >
          <Flex w="full" direction="column">
            <Heading>Active Now </Heading>
            <Text fontWeight="medium" mt="35px" alignSelf="center">
              Its quiet right now...
            </Text>
            <Text
              alignSelf="center"
              w="98%"
              fontSize="14px"
              color="gray.500"
              textAlign="center"
            >
              When a friend starts an activity - like playing a game or hanging
              out on voice - we'll show it here
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FriendContainer;
