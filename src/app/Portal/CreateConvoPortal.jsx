import userFriendStore from "@/store/userFriendStore";
import { Box, Flex, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { motion as Motion } from "framer-motion";

import { LuX } from "react-icons/lu";
import replacerImage from "@/assets/default.jpg";
import userPopStore from "@/store/userPopUpStore";
import userChatStore from "@/store/userChatStore";
import { useNavigate } from "react-router-dom";

const CreateConvoPortal = () => {
  const { friends, onlineFriends } = userFriendStore();
  const { setShowAddconvo, SetSliderNum, setTopText } = userPopStore();
  const { createConvo } = userChatStore();

  const navigate = useNavigate();

  const handleClick = async (username) => {
    await createConvo(username);
    setShowAddconvo(null);
    SetSliderNum(2);
    setTopText("Direct Messages");
    navigate(`@me/${username}`);
  };

  return (
    <Motion.div
      onClick={() => setShowAddconvo(false)}
      initial={{
        opacity: 0,
        position: "fixed",
        top: "0",
        width: "100%",
        height: "100vh",
        background: "#000000a1",
      }}
      animate={{
        opacity: 1,
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000a1",
      }}
    >
      <Flex
        mdDown={{ w: "100%", roundedBottom: "0px", mt: "auto", height: "80%" }}
        onClick={(e) => e.stopPropagation()}
        direction="column"
        userSelect="none"
        rounded="15px"
        bg="gray.800"
        w="35%"
        h="92%"
        p="10px"
        border="0.5px solid"
        borderColor="gray.600"
      >
        <Flex
          pl="10px"
          pr="10px"
          justifyContent="space-between"
          w="full"
          borderBottom="0.5px solid"
          borderColor="gray.600"
        >
          {" "}
          <Heading>Select Friend</Heading>
          <button
            onClick={() => setShowAddconvo(false)}
            style={{ outline: "none" }}
          >
            <LuX className="iconMedium" />
          </button>
        </Flex>

        {Array.isArray(friends) && friends.length > 0 && (
          <Flex
            mdDown={{ gap: "10px" }}
            pt="10px"
            h="calc(100%)"
            w="full"
            direction="column"
          >
            {Array.isArray(friends) &&
              friends.length > 0 &&
              friends.map((friend, index) => (
                <HStack
                  rounded="10px"
                  p="3px"
                  _hover={{ bg: "gray.700" }}
                  w="full"
                  alignItems="center"
                  key={friend._id}
                  onClick={() => handleClick(friend.username)}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="45px"
                    h="45px"
                    pos="relative"
                  >
                    <Image
                      w="40px"
                      h="40px"
                      rounded="full"
                      src={friend?.profile?.profilePicsm || replacerImage}
                    />
                    {onlineFriends.includes(friend._id) ? (
                      <Box
                        pos="absolute"
                        bottom="4%"
                        right="4%"
                        p="5.5px"
                        borderColor="gray.400"
                        rounded="full"
                        bg="#00ff00ff"
                      ></Box>
                    ) : (
                      <Box
                        pos="absolute"
                        bottom="4%"
                        right="4%"
                        border="4px solid"
                        borderColor="gray.400"
                        p="4px"
                        rounded="full"
                        bg="white"
                      ></Box>
                    )}
                  </Box>
                  <Flex direction="column">
                    <Text>{friend.name}</Text>
                    <Text fontSize="sm">{friend.username}</Text>
                  </Flex>
                </HStack>
              ))}
          </Flex>
        )}

        {Array.isArray(friends) && friends.length < 1 && (
          <Flex w="full" h="full" bg="red">
            <Text>Add a friend to create a DM </Text>
          </Flex>
        )}
      </Flex>
    </Motion.div>
  );
};

export default CreateConvoPortal;
