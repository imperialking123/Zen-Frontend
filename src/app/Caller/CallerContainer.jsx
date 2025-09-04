import userPopStore from "@/store/userPopUpStore";
import replacerImage from "@/assets/default.jpg";
import { Box, Button, Flex, Image, Portal, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { ImPhoneHangUp } from "react-icons/im";
import ringerMp3 from "@/assets/outgoing.mp3";
import authUserStore from "@/store/authUserStore";

const CallerContainer = () => {
  const { setShowCallerPop, showCallerPop, callRejected, socketRejectCall } =
    userPopStore();
  const { authUser, socket } = authUserStore();

  const rawStream = useRef(null);
  const ringerRef = useRef(null);
  const didRun = useRef(null);
  const didRun1 = useRef(null);
  const didRun2 = useRef(null);

  const [callStatus, setCallStatus] = useState("Calling");
  const [callAccepted, setCallAccepted] = useState(false);
  const WebRTC = useRef(null);

  const playerRef = useRef(null);

  const startProcess = async () => {
    try {
      const getStreams = await navigator.mediaDevices.getUserMedia({
        video: showCallerPop.video,
        audio: showCallerPop.audio,
      });
      rawStream.current = getStreams;
      if (ringerRef.current) {
        ringerRef.current.play();
      }
      socket.emit("call:start", showCallerPop);
    } catch {
      setShowCallerPop(null);
    }
  };

  const receiveOffer = async (data) => {
    try {
      const iceServers = [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ];
      const PC = new RTCPeerConnection({ iceServers });
      if (rawStream.current) {
        rawStream.current
          .getTracks()
          .forEach((track) => PC.addTrack(track, rawStream.current));
      }

      await PC.setRemoteDescription(data.offer);
      const answer = await PC.createAnswer();
      await PC.setLocalDescription(answer);

      PC.ontrack = (event) => {
        console.log(event);
        playerRef.current.srcObject = event.streams[0];
        playerRef.current.play();
      };

      WebRTC.current = PC;
      socket.emit("call:webrtc:answer", { to: data.from, answer: answer });
    } catch (error) {
      console.log("Receiver offer Error", error);
    }
  };

  const receiveIceCandidate = async (data) => {
    console.log(data);
  };

  /*Start up process to enable mic and start call */
  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    startProcess();
  }, [showCallerPop]);

  /*Handler for when User rejects call */
  useEffect(() => {
    let Timeout;
    if (callRejected === true) {
      setCallStatus("Rejected");

      Timeout = setTimeout(() => {
        socketRejectCall(false);
        setShowCallerPop(null);
        setCallStatus("Calling");
      }, 1500);
    }

    return () => {
      clearTimeout(Timeout);
    };
  }, [callRejected]);

  useEffect(() => {
    if (didRun1.current) return;
    didRun1.current = true;
    socket.on("call:accept:offer", (data) => {
      setCallAccepted(true);
      receiveOffer(data);
    });
  }, []);

  useEffect(() => {
    if (didRun2.current) return;
    didRun2.current = true;
    socket.on("call:ice-user", (data) => {
      console.log("Ice Receive Triggered");
      receiveIceCandidate(data);
    });

    return () => socket.off("call:ice-user");
  }, []);

  return (
    <Portal>
      <Flex
        userSelect="none"
        justifyContent="center"
        alignItems="center"
        pos="fixed"
        top="0"
        w="full"
        h="100vh"
        direction="column"
        gap="20px"
        bg="gray.900"
      >
        {/*Profile picture and ringing animation */}
        <Flex
          alignItems="center"
          justifyContent="center"
          w="120px"
          h="120px"
          pos="relative"
        >
          <Image
            zIndex={10}
            rounded="full"
            h="85%"
            w="85%"
            src={showCallerPop?.receiver?.profile?.profilePic || replacerImage}
          />

          <Box
            w="92%"
            zIndex={8}
            rounded="full"
            h="92%"
            pos="absolute"
            bg="gray.900"
          />
          <Box
            w="95%"
            rounded="full"
            h="95%"
            pos="absolute"
            animation="pulse"
            bg="white"
          />
        </Flex>

        {/*Status */}
        <Text>{callStatus}</Text>

        <audio muted={callAccepted} src={ringerMp3} hidden ref={ringerRef} />
        <audio autoPlay hidden ref={playerRef} />
        <Flex
          justifyContent="center"
          w="50%"
          h="60px"
          bg="gray.800"
          p="10px"
          mdDown={{ w: "90%" }}
          rounded="10px"
          pos="absolute"
          bottom="5%"
        >
          <Button colorPalette="red">
            <ImPhoneHangUp />
          </Button>
        </Flex>
      </Flex>
    </Portal>
  );
};

export default CallerContainer;
