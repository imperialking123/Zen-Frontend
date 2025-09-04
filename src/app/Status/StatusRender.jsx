import userPopStore from "@/store/userPopUpStore";
import { Button, Flex, Image, Portal, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { RiLoader3Fill } from "react-icons/ri";

const StatusRender = () => {
  const { showRenderStatus, setShowRenderStatus } = userPopStore();

  const [currentStatus, setCurrentStatus] = useState(0);
  const [progresses, setProgresses] = useState(showRenderStatus.map(() => 0));
  const [isLoaded, setIsLoaded] = useState(false);

  const prevStatus = () => {
    if (currentStatus === 0) return;
    setCurrentStatus((prev) => prev - 1);
  };

  const nextStatus = () => {
    if (currentStatus + 1 === showRenderStatus.length) return;

    setProgresses((prev) =>
      prev.map((_, index) => (index <= currentStatus ? 100 : 0))
    );

    setCurrentStatus((prev) => prev + 1);
  };

  // useEffect(() => {
  //   if (!showRenderStatus?.length) return;

  //   let animationId;
  //   const durationMs = 5000;
  //   const maxValue = 100;
  //   const startTimeRef = { current: null };

  //   function animate(now) {
  //     if (!startTimeRef.current) startTimeRef.current = now;

  //     const elapsed = now - startTimeRef.current;
  //     const progress = Math.min((elapsed / durationMs) * maxValue, maxValue);

  //     setProgresses((prev) =>
  //       prev.map((value, index) => (index === currentStatus ? progress : value))
  //     );

  //     if (progress < maxValue) {
  //       animationId = requestAnimationFrame(animate);
  //     } else {
  //       if (currentStatus < showRenderStatus.length - 1) {
  //         setIsLoaded(false);
  //         setCurrentStatus((prev) => prev + 1);
  //       } else {
  //         setShowRenderStatus(null); // or [] depending on your code
  //       }
  //     }
  //   }

  //   animationId = requestAnimationFrame(animate);

  //   return () => cancelAnimationFrame(animationId);
  // }, [currentStatus, showRenderStatus]);

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
        <Button bg="none " color="white" pos="absolute" left="0%">
          <BiChevronLeft className="iconMedium" />
        </Button>
        {/* Top progress bars */}
        <Flex
          w="100%"
          justifyContent="center"
          alignItems="center"
          pos="absolute"
          top="1%"
        >
          <Button
            onClick={() => setShowRenderStatus(null)}
            bg="none "
            color="white"
            pos="absolute"
            left="0%"
            mdDown={{ mt: "10px" }}
          >
            <BiChevronLeft className="iconMedium" />
          </Button>
          <Flex w="50%" mdDown={{ w: "85%" }} pt="10px">
            <Flex gap="5px" w="full">
              {progresses.map((value, index) => (
                <progress
                  max={100}
                  value={value}
                  key={index}
                  className="progress"
                />
              ))}
            </Flex>
          </Flex>
        </Flex>

        {/* Left button */}
        {currentStatus !== 0 && (
          <Button
            onClick={prevStatus}
            pos="absolute"
            left="0"
            bg="none"
            color="white"
          >
            <BiChevronLeft style={{ scale: "2" }} />
          </Button>
        )}

        {/* Main image */}
        <Image
          onLoad={() => setIsLoaded(true)}
          src={showRenderStatus[currentStatus]?.url}
          w="50%"
          mdDown={{ w: "100%" }}
          h="100%"
          objectFit="contain"
          filter={!isLoaded ? "blur(20px)  " : "none"}
        />

        {!isLoaded && (
          <RiLoader3Fill
            style={{ scale: "3", position: "absolute" }}
            className="spin"
          />
        )}

        {/* Status text */}

        {showRenderStatus[currentStatus]?.text && (
          <Text
            pos="absolute"
            bottom="5%"
            color="white"
            fontSize="lg"
            bg="#1b1d1cff"
            p="8px"
            maxW="95%"
            rounded="5px"
            textAlign="center"
          >
            {showRenderStatus[currentStatus]?.text}
          </Text>
        )}

        {/* Right button */}
        {currentStatus + 1 !== showRenderStatus.length && (
          <Button
            onClick={nextStatus}
            pos="absolute"
            right="0"
            bg="none"
            color="white"
          >
            <BiChevronRight style={{ scale: "2" }} />
          </Button>
        )}
      </Flex>
    </Portal>
  );
};

export default StatusRender;
