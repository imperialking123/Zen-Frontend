import userPopStore from "@/store/userPopUpStore";
import { Box, Flex, Portal, Text } from "@chakra-ui/react";
import { motion as Motion } from "framer-motion";
import { BiSolidError } from "react-icons/bi";

const SendRequestPortal = () => {
  const { setShowFailedTosendRequest, showFailedtoSendRequest } =
    userPopStore();
  return (
    <Portal>
      <Motion.div
        onClick={() => setShowFailedTosendRequest(false)}
        initial={{
          opacity: 0,
          position: "fixed",
          top: "0%",
          left: "0%",
          width: "100%",
          height: "100vh",
        }}
        animate={{
          width: "100%",
          height: "100vh",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: "0%",
          left: "0%",
        }}
      >
        <Flex
          onClick={(e) => e.stopPropagation()}
          direction="column"
          alignItems="center"
          justifyContent="center"
          padding="10px"
          bg="gray.950"
          color="white"
          border="0.5px solid"
          borderColor="gray.800"
          borderRadius="md"
          boxShadow="0 4px 10px rgba(0, 0, 0, 0.4)"
          mdDown={{width: "90%"}}
          w="35%"
          h="35%"
          pos="relative"
          rounded='20px'
        >
          <Box>
            <BiSolidError className="scaleerror" />
          </Box>

          <Text
            justifySelf="flex-end"
            mt="45px"
            color="hsla(0, 100%, 50%, 1.00)"
            userSelect='none'
            textAlign='center'
          >
            {showFailedtoSendRequest}
          </Text>
        </Flex>
      </Motion.div>
    </Portal>
  );
};

export default SendRequestPortal;
