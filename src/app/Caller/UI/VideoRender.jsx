import { Flex } from "@chakra-ui/react";

const VideoRender = ({ myViewRef, RTCVideoRef, isConnected }) => {
  return (
    <Flex alignItems="center" justifyContent="center" w="full" h="full">
      <Flex
        w="50%"
        h="100%"
        overflow="hidden"
        alignItems="center"
        justifyContent="center"
      >
        <video
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scaleX(-1)",
          }}
          muted
          autoPlay
          controls={false}
          playsInline
          ref={myViewRef}
        />
      </Flex>

      {isConnected && <video autoPlay playsInline ref={RTCVideoRef} />}
    </Flex>
  );
};

export default VideoRender;
