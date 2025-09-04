import authUserStore from "@/store/authUserStore";
import userPopStore from "@/store/userPopUpStore";
import { Button, Flex, Image, Portal, Text } from "@chakra-ui/react";
import { motion as Motion } from "framer-motion";
import { CgPhone } from "react-icons/cg";
import { LuX } from "react-icons/lu";

const CallRinger = ({ callerData }) => {
  const { socketSetIncomingSenderOffline, setAcceptCall } = userPopStore();
  const { socket } = authUserStore();
  const handleReject = () => {
    socketSetIncomingSenderOffline(callerData.tempId);
    socket.emit("call:reject", callerData);
  };

  const handleAccept = () => {
    socketSetIncomingSenderOffline(callerData.tempId);
    setAcceptCall(callerData);
  };

  

  return (
    <Portal>
      <Motion.div
        drag
        dragMomentum={false}
        dragConstraints={{
          top: 0,
          left: 0,
          right: window.innerWidth - 200,
          bottom: window.innerHeight - 250, 
        }}
        initial={{ position: "fixed", top: "50%", left: "25%" }}
        animate={{
          width: "200px",
          height: "250px",
          top: "0",
          userSelect: "none",
          zIndex: "999",
        }}
      >
        <Flex
          direction="column"
          bg="gray.800"
          borderRadius="10px"
          w="full"
          h="full"
          p="5px"
        >
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            w="full"
            h="80%"
            gap="15px"
          >
            <Image
              src={callerData.sender.profile.profilePic}
              rounded="full"
              w="90px"
              h="90px"
              pointerEvents="none"
              userSelect="none"
            />

            <Text fontSize="14px">Incoming {callerData.type}</Text>
          </Flex>

          <Flex justifyContent="center" gap="15px" w="full">
            <Button onClick={handleAccept} colorPalette="green">
              <CgPhone />
            </Button>
            <Button onClick={handleReject} colorPalette="red">
              <LuX />
            </Button>
          </Flex>
        </Flex>
      </Motion.div>
    </Portal>
  );
};

export default CallRinger;
