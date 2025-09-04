import userPopStore from "@/store/userPopUpStore";
import userStatusStore from "@/store/userStatusStore";
import {
  Button,
  Flex,
  Image,
  InputGroup,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { motion as Motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { LuSend } from "react-icons/lu";

const CreateStatus = () => {
  const { showCreateStatusPoP, setShowCreateStatusPop } = userPopStore();
  const { createStatus } = userStatusStore();
  const [focused, setFocused] = useState(false);

  const sendBtnRef = useRef(null);

  useEffect(() => {
    sendBtnRef.current.focus();
  }, []);
  return (
    <Portal>
      <Motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        initial={{
          scale: 0.9,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.9,
          opacity: 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      >
        <Flex
          pos="relative"
          bg="gray.900"
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="100%"
          userSelect="none"
        >
          <Flex p="15px" top="0" w="full" pos="absolute">
            <Button
              onClick={() => setShowCreateStatusPop(false)}
              bg="none"
              color="white"
            >
              <FaChevronLeft />
            </Button>
          </Flex>
          <Image
            src={showCreateStatusPoP.image}
            objectFit="contain"
            w={{ base: "100%", md: "50%" }} // 100% on small screens, 50% on desktop
            h={{ base: "auto", md: "100%" }} // auto height to keep aspect ratio
          />

          {/*Caption input */}
          <InputGroup
            mdDown={{ w: "90%" }}
            pos="absolute"
            bottom="15px"
            w="45%"
            h="auto"
            minH="40px"
            bg={focused ? "gray.300" : "gray.800"}
            color={focused ? "gray.900" : "white"}
            rounded="15px"
            alignItems="center"
            transition="0.5s ease"
            px="3"
            endElement={
              <Button
                ref={sendBtnRef}
                onClick={() => createStatus(showCreateStatusPoP)}
                bg="none"
                color={focused ? "gray.900" : "white"}
              >
                <LuSend />
              </Button>
            }
          >
            <Textarea
              onChange={(e) =>
                setShowCreateStatusPop({
                  ...showCreateStatusPoP,
                  text: e.target.value,
                })
              }
              variant="none"
              placeholder="Add a caption"
              resize="none"
              bg="transparent"
              color="inherit"
              fontSize="14px"
              rows={1}
              overflow="hidden"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoresize
              maxLength={600}
              _placeholder={{ color: "gray.300" }}
            />
          </InputGroup>
        </Flex>
      </Motion.div>
    </Portal>
  );
};

export default CreateStatus;
