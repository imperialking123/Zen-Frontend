import userCallStore from "@/store/userCallStore";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { motion as Motion } from "framer-motion";
import { IoCheckmarkSharp } from "react-icons/io5";
import { LuX } from "react-icons/lu";

const RequestVideo = ({ acceptFunc }) => {
  const { showVideoRequest, setShowVideoRequest } = userCallStore();

  return (
    <Motion.div
      initial={{
        opacity: 0,

        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        opacity: 1,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      style={{
        width: "500px",
      }}
    >
      <Flex
        userSelect="none"
        h="170px"
        w="full"
        p="20px"
        rounded="10px"
        direction="column"
        bg="black"
        color="white"
        mdDown={{
          w: "70%",
          h: "180px",
        }}
      >
        <Heading>Video Request</Heading>
        <Text mt="15px" color="whiteAlpha.700" fontSize="13px">
          <b>{showVideoRequest.name}</b> is asking to turn on video so you can
          see each other. Would you like to accept?
        </Text>

        <Flex
          mdDown={{
            mt: "25px",
          }}
          mt="15px"
          gap="15px"
          w="full"
          justifyContent="flex-end"
        >
          <Button onClick={() => setShowVideoRequest(null)} h="30px" w="30px">
            <LuX />
          </Button>
          <Button onClick={acceptFunc} h="30px" w="90px">
            <IoCheckmarkSharp />
            Accept
          </Button>
        </Flex>
      </Flex>
    </Motion.div>
  );
};

export default RequestVideo;
