import authUserStore from "@/store/authUserStore";
import userPopStore from "@/store/userPopUpStore";
import userStatusStore from "@/store/userStatusStore";
import { Box, Button, Flex, Image, Portal, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const StatusRender = () => {
  const { showRenderStatus, setShowRenderStatus } = userPopStore();
  const { setViewedStatus } = userStatusStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, SetPaused] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [clearView, setClearView] = useState(false);

  const authUser = authUserStore.getState().authUser;

  const now = new Date();
  const allStatus = showRenderStatus.filter(
    (status) => new Date(status.expiresAt) > now
  );
  const currentData = allStatus[currentIndex];
  const isPrevable = currentIndex > 0;
  const isNextable = currentIndex < allStatus.length - 1;

  const handleTimerDone = () => {
    if (currentIndex < allStatus.length - 1) {
      setLoaded(false);
      SetPaused(true);

      setCurrentIndex((prev) => prev + 1); // move to next status
    } else {
      setShowRenderStatus(false);
    }
  };

  useEffect(() => {
    setViewedStatus(currentData.creatorId, currentData._id, authUser._id);
  }, [currentData]);

  const handleHoldDown = () => {
    SetPaused(true);
    setClearView(true);
  };

  

  const handleReleasedHold = () => {
    SetPaused(false);
    setClearView(false);
  };
  const handleNext = () => {
    if (currentIndex < allStatus.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setViewedStatus(currentData._id);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setViewedStatus(currentData._id);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (allStatus.length < 1) {
      setShowRenderStatus(false);
    }
  }, []);

  useEffect(() => {
    if (!allStatus.length) return;

    const firstUnviewedIndex = allStatus.findIndex(
      (s) => !s.viewers.includes(authUser._id)
    );

    setCurrentIndex(firstUnviewedIndex === -1 ? 0 : firstUnviewedIndex);
  }, [authUser._id]);

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
          onPointerDown={handleHoldDown}
          onPointerUp={handleReleasedHold}
          onPointerLeave={handleReleasedHold}
          minH="50%"
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
          />
          {currentData.text && (
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
          )}
        </Flex>

        {/*Clicker for Prev */}
        {isPrevable && (
          <Flex
            justifyContent="center"
            alignItems="center"
            left="0"
            minH="100%"
            pos="absolute"
            w="10%"
            onClick={handlePrev}
          >
            <Button
              bg="none"
              color="white"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              mdDown={{ display: "none" }}
            >
              <BiChevronLeft style={{ scale: "1.5" }} />
            </Button>
          </Flex>
        )}

        {/*Clicker for next */}
        {isNextable && (
          <Flex
            onClick={handleNext}
            justifyContent="center"
            alignItems="center"
            right="0"
            minH="100%"
            pos="absolute"
            w="10%"
          >
            <Button
              bg="none"
              color="white"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              mdDown={{ display: "none" }}
            >
              <BiChevronRight style={{ scale: "1.5" }} />
            </Button>
          </Flex>
        )}
      </Flex>
    </Portal>
  );
};

export default StatusRender;
