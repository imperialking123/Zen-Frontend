import replacerImage from "@/assets/default.jpg";
import userCallStore from "@/store/userCallStore";
import userFriendStore from "@/store/userFriendStore";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { motion as Motion } from "framer-motion";
import { useRef } from "react";
import { ImPhoneHangUp } from "react-icons/im";
import { PiPhoneCallFill } from "react-icons/pi";

const CallRinger = ({ CallData, index }) => {
  const { friends } = userFriendStore();
  const CallerProfile = friends.find((p) => p._id === CallData.senderId);

  const { setAcceptedCall, acceptedCall, setAllowedToRing } = userCallStore();

  const constraintRef = useRef(null);

  const handleAcceptCall = () => {
    if (acceptedCall) {
      setAllowedToRing(false);
      return;
    } else {
      setAcceptedCall(CallData);
    }
  };


  const handleRejectCall = () => {
    console.log("Rejecting the Call");
  };

  const handleIgnore = () => {
    console.log("CallIgnored");
  };

  const top = index * 2 + 20;
  const right = index * 1 + 11;

  return (
    <div
      ref={constraintRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <Motion.div
        drag
        dragConstraints={constraintRef}
        dragMomentum={false}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        style={{
          width: "170px",
          height: "220px",
          background: "#121213ff",
          cursor: "pointer",
          pointerEvents: "auto",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          border: "0.5px solid #1b1b1bff",
          alignItems: "center",

          position: "absolute",
          top: `${top}%`,
          right: `${right}%`,
        }}
        transition="0.3s ease"
      >
        <Heading mt="15px" fontSize="md">
          {CallerProfile?.name || "Unknown"}
        </Heading>

        <Image
          w="60px"
          h="60px"
          pointerEvents="none"
          rounded="full"
          src={CallerProfile?.profile?.profilePic || replacerImage}
        />

        <Text fontSize="sm" mt="10px">
          Incoming {CallData.callType}
        </Text>

        <Flex justifyContent="center" gap="15px" mt="20px" w="full">
          <Button display="none"></Button>
          <Button onClick={handleRejectCall} colorPalette="red">
            <ImPhoneHangUp />
          </Button>
          <Button onClick={handleAcceptCall} colorPalette="green">
            <PiPhoneCallFill />
          </Button>
        </Flex>
      </Motion.div>
    </div>
  );
};

export default CallRinger;
