import { Box, Flex, Image, Popover, Portal, Text } from "@chakra-ui/react";
import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { LuMessageCircle } from "react-icons/lu";
import replaceImage from "@/assets/default.jpg";
import userFriendStore from "@/store/userFriendStore";
import userChatStore from "@/store/userChatStore";
import { useNavigate } from "react-router-dom";
import userPopStore from "@/store/userPopUpStore";

const FriendMapItem = ({ data, borderBottom }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const { SetSliderNum, setTopText } = userPopStore();
  const { onlineFriends } = userFriendStore();
  const { createOrSetConvo } = userChatStore();
  const isOnline = onlineFriends?.includes(data?._id.toString());

  const handleSetter = async () => {
    const awaiter = await createOrSetConvo(data);
    if (awaiter === true) {
      navigate(`@me/${data.username}`);
      SetSliderNum(2);
      setTopText("Direct Messages");
    }
  };

  return (
    <Motion.div
      initial={{ width: "100%", height: "10px", opacity: 0 }}
      animate={{
        width: "100%",
        height: "55px",
        opacity: 1,
      }}
    >
      <Flex
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        transition="0.5s ease"
        w="100%"
        h="100%"
        _hover={{ bg: "gray.800", border: "0px" }}
        alignItems="center"
        rounded="10px"
        p="5px"
        pl="10px"
        pr="10px"
        justifyContent="space-between"
      >
        {/*User Display  */}
        <Flex gap="10px" alignItems="center">
          <Box
            w="40px"
            h="40px"
            display="flex"
            justifyContent="center"
            pos="relative"
            alignItems="center"
          >
            <Image
              w="40px"
              h="40px"
              rounded="full"
              src={data?.profile?.profilePicsm || replaceImage}
            />
            {isOnline ? (
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

          <Flex direction="column">
            <Flex gap="5px">
              <Text>{data?.name}</Text>
              {hovered ? (
                <Text mdDown={{ display: "none" }}>{data?.username}</Text>
              ) : (
                ""
              )}
            </Flex>
            <Text>{isOnline ? "Online" : "Offline"}</Text>
          </Flex>
        </Flex>
        {/*User Display  */}

        <Flex gap="10px">
          {/* <Box
            onClick={handleSetter}
            w="40px"
            h="40px"
            bg={hovered ? "gray.900" : "none"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            rounded="20px"
            _hover={{ bg: "gray.900" }}
          >
            <LuMessageCircle className="iconMedium" />
          </Box> */}

          <Popover.Root>
            <Popover.Trigger asChild>
              <Box
                w="40px"
                h="40px"
                bg={hovered ? "gray.900" : "none"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="20px"
                _hover={{ bg: "gray.900" }}
              >
                <FiMoreVertical className="iconMedium" />
              </Box>
            </Popover.Trigger>

            <Portal>
              <Popover.Positioner>
                <Popover.Content userSelect="none" width="170px">
                  <Popover.Body
                    p="15px"
                    display="flex"
                    flexDirection="column"
                    gap="5px"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      p="5px"
                      rounded="5px"
                      bg="none"
                      color="white"
                      w="full"
                      h="30px"
                      transition="0.5s ease"
                      _hover={{ bg: "gray.800" }}
                    >
                      Start a Video Call
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      p="5px"
                      rounded="5px"
                      bg="none"
                      color="white"
                      w="full"
                      h="30px"
                      transition="0.5s ease"
                      _hover={{ bg: "gray.800" }}
                    >
                      Start a Voice Call
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      p="5px"
                      rounded="5px"
                      bg="none"
                      color="white"
                      w="full"
                      h="30px"
                      transition="0.5s ease"
                      _hover={{ bg: "red.800" }}
                    >
                      Remove Friend
                    </Box>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
        </Flex>
      </Flex>
    </Motion.div>
  );
};

export default FriendMapItem;
