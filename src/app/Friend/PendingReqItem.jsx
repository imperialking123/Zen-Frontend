import { useState } from "react";
import { LuX } from "react-icons/lu";
import { motion as Motion } from "framer-motion";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import replaceImage from "@/assets/default.jpg";
import userFriendStore from "@/store/userFriendStore";

const PendingReqItem = ({ data, borderBottom, pendingId }) => {
  const [hovered, setHovered] = useState(false);
  const { deletePending } = userFriendStore();

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
        borderColor="gray.800"
        transition="0.8s ease"
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
          </Box>

          <Flex direction="column">
            <Flex gap="5px">
              <Text>{data?.name}</Text>
              {hovered ? <Text mdDown={{display: "none"}} >{data?.username}</Text> : ""}
            </Flex>
          </Flex>
        </Flex>
        {/*User Display  */}

        <Flex gap="10px">
          <Box
            onClick={() => deletePending(pendingId)}
            w="40px"
            h="40px"
            bg={hovered ? "gray.900" : "none"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            rounded="20px"
            _hover={{ bg: "gray.900" }}
          >
            <LuX className="iconMedium" />
          </Box>
        </Flex>
      </Flex>
    </Motion.div>
  );
};

export default PendingReqItem;
