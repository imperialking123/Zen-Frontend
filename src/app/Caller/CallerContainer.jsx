import authUserStore from "@/store/authUserStore";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import isCallingRingerSound from "@/assets/outgoing.mp3";
import userCallStore from "@/store/userCallStore";
import { toast } from "sonner";
import VideoRender from "./UI/VideoRender";
import AudioRender from "./UI/AudioRender";

const CallerContainer = () => {
  const { outGoingCall, showVideoRequest } = userCallStore();
  const { authUser, socket } = authUserStore();
  let ringer = new Audio(isCallingRingerSound);

  const hasRun = useRef(null);
  const audioRef = useRef(null);

  const RTCRef = useRef(null);

  const [callStep, SetCallStep] = useState(0);
  const mediaTrack = useRef(null);
  const newTrack = useRef(null);
  const myViewRef = useRef(null);
  const RTCVideoRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [negotiationType, setNegotiationType] = useState(null);
  const [negotiationOffer, setNegotiationOffer] = useState(null);

  const [allowMedia, setAllowMedia] = useState({
    video: outGoingCall?.video,
    audio: outGoingCall?.audio,
  });

  const [isVideo, SetIsVideo] = useState(
    allowMedia.video === true && allowMedia.audio === true
  );

  const iceServers = [
    { urls: ["stun:fr-turn7.xirsys.com"] },
    {
      username:
        "2YWalJMR2O774zrjY82Ph-NqUY6p6o1xsLDgAVjgQ6oNaqJElTuLSOsVq5-k-vUCAAAAAGjFLhBJbXBlcmlhbGtpbmc=",
      credential: "58e86112-907d-11f0-833c-0275b10a6b4a",
      urls: [
        "turn:fr-turn7.xirsys.com:80?transport=udp",
        "turn:fr-turn7.xirsys.com:3478?transport=udp",
        "turn:fr-turn7.xirsys.com:80?transport=tcp",
        "turn:fr-turn7.xirsys.com:3478?transport=tcp",
        "turns:fr-turn7.xirsys.com:443?transport=tcp",
        "turns:fr-turn7.xirsys.com:5349?transport=tcp",
      ],
    },
  ];

  const [callTimer, setCallTimer] = useState(null);

  const startProcess = async () => {
    if (!isVideo) {
      try {
        const rawStream = await navigator.mediaDevices.getUserMedia({
          audio: allowMedia.audio,
          video: allowMedia.video,
        });
        mediaTrack.current = rawStream;

        const emitData = {
          senderId: authUser._id,
          receiverId: outGoingCall.receiver._id,
          video: outGoingCall.video,
          audio: outGoingCall.audio,
          callType: outGoingCall.callType,
          conversationId: outGoingCall.conversationId,
          type: outGoingCall.type,
          tempId: outGoingCall.tempId,
        };
        socket.emit("call:start", emitData);
        SetCallStep(1);
        ringer.play();
      } catch (err) {
        if (err.name === "NotAllowedError") {
          alert("Please Enable Mic in Settings");
        }
      }
    } else {
      try {
        const rawStream = await navigator.mediaDevices.getUserMedia({
          audio: allowMedia.audio,
          video: allowMedia.video,
        });
        mediaTrack.current = rawStream;

        myViewRef.current.srcObject = rawStream;

        const emitData = {
          senderId: authUser._id,
          receiverId: outGoingCall.receiver._id,
          video: outGoingCall.video,
          audio: outGoingCall.audio,
          callType: outGoingCall.callType,
          conversationId: outGoingCall.conversationId,
          type: outGoingCall.type,
          tempId: outGoingCall.tempId,
        };
        socket.emit("call:start", emitData);
        SetCallStep(1);
        ringer.play();
      } catch (err) {
        if (err.name === "NotAllowedError") {
          alert("Please Enable Mic in Settings");
        }
      }
    }
  };

  const acceptedProcess = async (args) => {
    try {
      const ids = {
        answerer: args.offerer,
        offerer: authUser._id,
      };
      const RTC = new RTCPeerConnection({ iceServers: iceServers });
      mediaTrack.current
        .getTracks()
        .forEach((track) => RTC.addTrack(track, mediaTrack.current));
      RTC.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("call:server:ice", { ice: event.candidate, ...ids });
          console.log("Sending the ice to peer 2");
        }
      };

      RTC.onconnectionstatechange = () => {
        if (RTC.connectionState === "connected") {
          setIsConnected(true);
          ringer.pause();
          ringer = null;
        }
      };

      RTC.onnegotiationneeded = handleOnNegotiationNeeded;

      RTC.ontrack = (e) => {
        audioRef.current.srcObject = e.streams[0];
      };
      RTCRef.current = RTC;

      await RTC.setRemoteDescription(args.offer);
      const answer = await RTC.createAnswer();
      await RTC.setLocalDescription(answer);
      socket.emit("call:server:answer", {
        answer: RTC.localDescription,
        ...ids,
      });

      console.log("Sending the answer to peer 2");
    } catch (error) {
      console.log("Error while receiving offer", error);
    }
  };

  let ICEBuffer = [];

  const receiveIceCandidates = async (args) => {
    if (!RTCRef.current) {
      ICEBuffer.push(args.ice);
      return;
    }
    await RTCRef.current.addIceCandidate(args.ice);
    ICEBuffer.forEach(async (ice) => {
      await RTCRef.current.addIceCandidate(ice);
    });
    console.log("Received Ice from Peer 2");
  };

  const videoRequestHandler = (args) => {
    console.log(args);
  };

  const handleAcceptVideoRequest = async () => {
    try {
      setNegotiationType("offer");
      newTrack.current
        .getVideoTracks()
        .forEach((track) => RTCRef.current.addTrack(track, newTrack));
      setShowVideoRequest(null);
    } catch (error) {
      ///Notice Catch Block
      console.log("Camera Refused", error);
    }
  };

  const handleOnNegotiationNeeded = async () => {
    if (negotiationType === "offer") {
      const offer = await RTCRef.current.createOffer();
      await RTCRef.current.setLocalDescription(offer);
      const socketData = {
        from: authUser._id,
        offer: offer,
        to: outGoingCall.receiverId,
      };
      socket.emit("call:negotiation:offer:server", socketData);
      return;
    }

    if (negotiationType === "answer") {
      await RTCRef.current.setRemoteDescription(negotiationOffer);
      const answer = await RTCRef.current.createAnswer();
      await RTCRef.current.setLocalDescription(answer);
      setNegotiationOffer(null);
      const socketData = {
        answer,
        from: authUser._id,
        to: outGoingCall.receiverId,
      };
      socket.emit("call:negotiation:answer:server", socketData);

      return;
    }
  };

  const handleCameraClick = async () => {
    if (!isVideo && outGoingCall.callType === "Audio Call") {
      try {
        const Track = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        newTrack.current = Track;
      } catch (error) {
        return;
      }

      const socketData = {
        video: true,
        from: authUser._id,
        to: outGoingCall.receiver._id,
        name: outGoingCall.receiver.name,
      };

      toast("Video Call Request Sent", {
        position: "top-center",
      });

      socket.emit("call:request:video:server", socketData);
    }
  };

  const receiveNegotiationOffer = async (args) => {
    try {
      setNegotiationType("answer");
      setNegotiationOffer(args.offer);
      console.log("OfferSDP Received for negotiation");
      const newTrack = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      newTrack.getVideoTracks().forEach((track) => {
        RTCRef.current.addTrack(track, newTrack);
      });
    } catch (error) {}
  };

  const receiveNegotiationAnswer = async (args) => {
    RTCRef.current.setRemoteDescription(args.answer);
  };

  useEffect(() => {
    if (hasRun.current === true) return;
    hasRun.current = true;
    startProcess();
  }, []);

  useEffect(() => {
    if (callStep === 1) {
      socket.on("call:client:offer", acceptedProcess);
      socket.on("call:client:ice", receiveIceCandidates);
    }
    return () => {
      socket.off("call:client:offer", acceptedProcess);
      socket.off("call:client:ice", receiveIceCandidates);
    };
  }, [callStep]);

  useEffect(() => {
    socket.on("call:request:video", videoRequestHandler);

    return () => {
      socket.off("call:request:video");
    };
  }, []);

  //Listener for OnNegotiation offer
  useEffect(() => {
    socket.on("call:negotiation:offer:client", receiveNegotiationOffer);
    return () => socket.off("call:negotiation:offer:client");
  }, []);

  //Listener for OnNegotiation answer
  useEffect(() => {
    socket.on("call:negotiation:answer:client", receiveNegotiationAnswer);
    return () => socket.off("call:negotiation:answer:client");
  }, []);

  return (
    <Box bg="black" w="full" h="60%" pos="absolute" inset={0}>
      <audio playsInline ref={audioRef} autoPlay hidden />
      <Flex w="full" h="full">
        {isVideo ? (
          <VideoRender myViewRef={myViewRef} RTCVideoRef={RTCVideoRef} />
        ) : (
          <AudioRender />
        )}
      </Flex>
      {showVideoRequest && (
        <RequestVideo acceptFunc={handleAcceptVideoRequest} />
      )}

      <Flex top="0" pos="absolute" p="10px">
        <Text userSelect="none" color="gray.300">
          @ {outGoingCall.receiver.name}
        </Text>
      </Flex>

       <Flex bottom='0' pos="absolute" p="10px">
        <Text userSelect="none" color="gray.300">
          @ {outGoingCall.receiver.name}
        </Text>
      </Flex>
    </Box>
  );
};

export default CallerContainer;
