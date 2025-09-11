import userPopStore from "@/store/userPopUpStore";
import { Box, Button, Flex, Image, Portal, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";

const StatusRender = () => {
  const { showRenderStatus, setShowRenderStatus } = userPopStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, SetPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [clearView, setClearView] = useState(false);

  const now = new Date();
  const allStatus = showRenderStatus.filter(
    (status) => new Date(status.expiresAt) > now
  );

  const currentData = allStatus[currentIndex];

  const handleTimerDone = () => {
    if (currentIndex < allStatus.length - 1) {
      setLoaded(false);
      SetPaused(true);
      setCurrentIndex((prev) => prev + 1); // move to next status
    } else {
      setShowRenderStatus(false); // no more statuses, close viewer
    }
  };

  const handleHoldDown = () => {
    SetPaused(true);
    setClearView(true);
  };

  const handleReleasedHold = () => {
    SetPaused(false);
    setClearView(false);
  };

  useEffect(() => {
    if (allStatus.length < 1) {
      setShowRenderStatus(false);
    }
  }, []);

  if (!showRenderStatus?.length) return null;
  return (
    <Portal>
      <Flex
        w="full"
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        bg="gray.800"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          zIndex={10}
          justifyContent="center"
          pos="absolute"
          top="0"
          w="full"
          opacity={clearView ? 0 : 1}
          transition="0.3s ease"
        >
          <Box
            onClick={() => setShowRenderStatus(false)}
            mt="10px"
            pos="absolute"
            left="5%"
            mdDown={{ left: "2%" }}
          >
            <BiChevronLeft style={{ scale: 2 }} />
          </Box>

          <Flex mt="15px" w="50%" gap="10px" mdDown={{ w: "80%" }}>
            {showRenderStatus.map((status, i) => (
              <div
                onAnimationEnd={handleTimerDone}
                key={status._id}
                className={`bar 
        ${i < currentIndex ? "filled" : ""} 
        ${i === currentIndex ? (paused ? "active paused" : "active") : ""}
      `}
              />
            ))}
          </Flex>
        </Flex>

        <Flex
          pos="relative"
          justifyContent="center"
          alignItems="center"
          h="full"
          mdDown={{ w: "100%" }}
          w="50%"
        >
          <Image
            src={currentData.url}
            onLoad={() => {
              setLoaded(true);
              SetPaused(false);
            }}
            style={{
              filter: loaded ? "none" : "blur(10px)", // blurry while loading
              transition: "filter 0.3s ease-in-out",
            }}
            objectFit="contain"
            onPointerDown={handleHoldDown}
            onPointerUp={handleReleasedHold}
            onPointerLeave={handleReleasedHold}
          />
          <Text
            mdDown={{ bottom: "35%" }}
            bottom="25%"
            rounded="10px"
            p="5px 10px"
            bg="#141414ea"
            pos="absolute"
            maxW="95%"
            whiteSpace="pre-wrap"
          >
            {currentData.text}
          </Text>
        </Flex>
      </Flex>
    </Portal>
  );
};

export default StatusRender;
