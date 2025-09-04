import authUserStore from "@/store/authUserStore";
import { Flex, Portal } from "@chakra-ui/react";
import { motion as Motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CallReciever = ({ callReceived }) => {
  const { socket, authUser } = authUserStore();


  const [allowMedia, SetAllowMedia] = useState({
    video: callReceived.video,
    audio: callReceived.audio,
  });

  const didRun = useRef(null);
  const didRun1 = useRef(null);
  const audioCallSpeakerRef = useRef(null);
  const WebRTC = useRef(null);
  const rawStream = useRef(null);
  const playerRef = useRef(null);

  const startProcess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: allowMedia.video,
        audio: allowMedia.audio,
      });
      rawStream.current = stream;

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
      stream.getTracks().forEach((track) => PC.addTrack(track, stream));
      PC.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("call:webrtc:ice", {
            candidate: event.candidate,
            from: authUser._id,
            to: callReceived.sender._id,
          });
        }
      };
      const offer = await PC.createOffer();
      await PC.setLocalDescription(offer);
      WebRTC.current = PC;

      WebRTC.current.ontrack = (event) => {
        if (playerRef.current) {
          playerRef.current.srcObject = event.streams[0];
        }
      };

      socket.emit("call:webrtc:offer", {
        from: authUser._id,
        to: callReceived.receiver._id,
        offer: offer,
      });
    } catch {}
  };

  const receiveAnswer = async (data) => {
    try {
      await WebRTC.current.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    startProcess();
  }, []);

  useEffect(() => {
    if (didRun1.current) return;
    didRun1.current = true;
    socket.on("call:webrtc:answer:user", (data) => {
      receiveAnswer(data);
    });

    return () => {
      socket.off("call:webrtc:answer:user");
    };
  }, []);

  return (
    <Portal>
      <Motion.div
        initial={{
          width: "100%",
          height: "100vh",
          position: "fixed",
          top: "0",
        }}
        animate={{
          width: "100%",
          height: "100vh",
          position: "fixed",
          top: "0",
          left: "0",
        }}
      >
        <audio ref={audioCallSpeakerRef} controls />
        <Flex w="full" h="full" bg="red" p="5px"></Flex>
      </Motion.div>
    </Portal>
  );
};

export default CallReciever;
