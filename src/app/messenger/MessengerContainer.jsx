import userChatStore from "@/store/userChatStore";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import replacerImage from "@/assets/default.jpg";
import userFriendStore from "@/store/userFriendStore";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaUserCircle, FaVideo } from "react-icons/fa";
import { useEffect, useState } from "react";
import DisplayUser from "./DisplayUser";
import MessageMapperContainer from "./MessageMapperContainer";
import { useNavigate } from "react-router-dom";
import InputBar from "./InputBar";
import userPopStore from "@/store/userPopUpStore";
import { LuMenu } from "react-icons/lu";
import authUserStore from "@/store/authUserStore";
const MessengerContainer = () => {
  const { convoSelected, getMessages } = userChatStore();
  const { onlineFriends } = userFriendStore();
  const { SliderNum, SetSliderNum, setTopText, setShowCallerPop } =
    userPopStore();
  const { authUser } = authUserStore();
  const navigate = useNavigate();

  const [renderDisplayUser, setRenderDisplayUser] = useState(true);

  const toggleRenderDisplayUser = () => {
    renderDisplayUser === true
      ? setRenderDisplayUser(false)
      : setRenderDisplayUser(true);
  };

  useEffect(() => {
    if (!convoSelected) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (convoSelected?.isTemp) {
      return;
    }
    if (convoSelected) {
      getMessages(convoSelected._id);
    }
  }, [convoSelected]);
  

  return (
    <Flex direction="column" w="100%" h="100%">
      {/*Top ribbon */}
      <Flex
        userSelect="none"
        w="full"
        h="7.7%"
        alignItems="center"
        borderBottom="0.5px solid"
        borderColor="gray.800"
        gap="15px"
        transition="0.5s ease"
        mdDown={{ gap: "0px" }}
      >
        <Button
          onClick={() => {
            SetSliderNum(0);
            setTopText("Friends");
          }}
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
        {convoSelected && (
          <Flex
            color="gray.300"
            w="67%"
            mdDown={{ width: SliderNum === 2 ? "100%" : "0%" }}
            justifyContent="space-between"
            pl="10px"
            pr="10px"
            alignItems="center"
          >
            <Flex alignItems="center" gap="10px">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="45px"
                h="45px"
                position="relative"
              >
                <Image
                  w="35px"
                  h="35px"
                  rounded="full"
                  src={
                    convoSelected?.otherParticipant?.profile?.profilePic ||
                    replacerImage
                  }
                />
                {Array.isArray(onlineFriends) &&
                onlineFriends.length > 0 &&
                onlineFriends.includes(convoSelected.otherParticipant?._id) ? (
                  <Box
                    pos="absolute"
                    bottom="15%"
                    right="4%"
                    p="5px"
                    borderColor="gray.400"
                    rounded="full"
                    bg="#00ff00ff"
                  ></Box>
                ) : (
                  <Box
                    pos="absolute"
                    bottom="15%"
                    right="4%"
                    border="3px solid"
                    borderColor="gray.400"
                    p="3px"
                    rounded="full"
                    bg="white"
                  ></Box>
                )}
              </Box>

              <Text fontSize="15px">
                {convoSelected.otherParticipant?.name}
              </Text>
            </Flex>

            <Flex gap="25px" mr="15px">
              {/* <button
                onClick={() =>
                  setShowCallerPop({
                    tempId: crypto.randomUUID(),
                    receiver: convoSelected.otherParticipant,
                    sender: {
                      _id: authUser._id,
                      profile: authUser?.profile,
                    },
                    video: false,
                    audio: true,
                    callType: "Audio-Call",
                    type: "call",
                    conversationId: convoSelected._id,
                  })
                }
              >
                <BiSolidPhoneCall className="iconMedium" />
              </button>

              <button>
                <FaVideo className="iconMedium" />
              </button> */}

              <button
                onClick={toggleRenderDisplayUser}
                style={{ color: renderDisplayUser ? "white" : "#c0bdbdff" }}
              >
                <FaUserCircle className="iconMedium" />
              </button>
            </Flex>
          </Flex>
        )}
      </Flex>
      {/*Top ribbon */}

      <Flex h="calc(100% - 7.7%)" w="full">
        <Flex
          direction="column"
          w={renderDisplayUser ? "67%" : "100%"}
          mdDown={{ width: SliderNum === 2 ? "100%" : "initial" }}
          h="full"
        >
          <Flex
            overflowY="auto"
            direction="column"
            flexGrow={1}
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            {convoSelected && (
              <MessageMapperContainer data={convoSelected?.otherParticipant} />
            )}
          </Flex>

          {convoSelected && (
            <Flex
              maxH="350px"
              w="full"
              alignItems="center"
              justifyContent="center"
              pb="10px"
              mdDown={{ mb: "40px" }}
            >
              <InputBar data={convoSelected?.otherParticipant} />
            </Flex>
          )}
        </Flex>

        {renderDisplayUser && convoSelected && (
          <Flex
            borderLeft="0.5px solid"
            borderColor="gray.800"
            pr="5px"
            userSelect="none"
            w="33%"
            mdDown={{ display: "none" }}
          >
            <DisplayUser profileData={convoSelected?.otherParticipant} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default MessengerContainer;
