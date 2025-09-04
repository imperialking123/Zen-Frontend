import CallerContainer from "@/app/Caller/CallerContainer";
import CallReciever from "@/app/Caller/CallReciever";
import CallRinger from "@/app/Caller/CallRinger";
import HangerContainer from "@/app/Hanger/HangerContainer";
import CreateConvoPortal from "@/app/Portal/CreateConvoPortal";
import SendRequestPortal from "@/app/Portal/SendRequestPortal";
import SettingsContainer from "@/app/Settings/SettingsContainer";
import SideBar from "@/app/SideBar/SideBar";
import CreateStatus from "@/app/Status/CreateStatus";
import StatusRender from "@/app/Status/StatusRender";
import { notify } from "@/config/Ringer";
import authUserStore from "@/store/authUserStore";
import userChatStore from "@/store/userChatStore";

import userFriendStore from "@/store/userFriendStore";
import userPopStore from "@/store/userPopUpStore";
import userStatusStore from "@/store/userStatusStore";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const ZenPage = () => {
  const {
    getFriends,
    getAllRequest,
    socketOnlineFriends,
    newSocketOnlineFriend,
    socketDisconnect,
    socketNewRequest,
    getAllPending,
    socketDeleteRequest,
    socketNewAcceptedRequest,
  } = userFriendStore();
  const { socket } = authUserStore();
  const {
    showFailedtoSendRequest,
    showAddConvo,
    SliderNum,
    TopText,
    showSettings,
    showCallerPop,
    showCreateStatusPoP,
    showRenderStatus,
    socketSetIncomingCall,
    incomingCall,
    socketSetIncomingSenderOffline,
    socketRejectCall,
    acceptCall,
  } = userPopStore();
  const { getAllMyStatus, getFriendsStatus, socketNewStatus } =
    userStatusStore();
  const { getAllConvo, socketArrangeMessage, socketNewConversation } =
    userChatStore();

  useEffect(() => {
    getFriends();
    getAllPending();
    getAllRequest();
    getAllConvo();
    getFriendsStatus();
    getAllMyStatus();
  }, []);

  {
    /*Sockets connection */
  }
  useEffect(() => {
    if (!socket) return;
    socket.on("onlineFriendList", (data) => {
      socketOnlineFriends(data);
    });

    socket.on("friendIsOnline", (data) => {
      newSocketOnlineFriend(data);
    });

    socket.on("userDisconnect", (data) => {
      socketDisconnect(data);
    });

    socket.on("newFriendReq", (data) => {
      notify();
      socketNewRequest(data);
      socket.on("redrawReq", (id) => socketDeleteRequest(id));
    });

    socket.on("reqAccepted", (data) => {
      socketNewAcceptedRequest(data);
    });

    socket.on("newMessage", (data) => {
      socketArrangeMessage(data);
    });

    socket.on("newConversation", (data) => {
      socketNewConversation(data);
    });

    socket.on("newStatus", (data) => socketNewStatus(data));

    socket.on("call:incoming", (data) => socketSetIncomingCall(data));

    socket.on("call:callerOfline", (data) =>
      socketSetIncomingSenderOffline(data)
    );

    socket.on("user-call:reject", (d) => {
      socketRejectCall(d);
    });

    return () => {
      if (socket) {
        socket.off("onlineFriendList");
        socket.off("friendIsOnline");
        socket.off("newFriendReq");
        socket.off("userDisconnect");
        socket.off("redrawReq");
        socket.off("newMessage");
        socket.off("newConversation");
        socket.off("newStatus");
        socket.off("call:incoming");
        socket.off("user-call:reject");
        socket.off("call:callerOfline");
      }
    };
  }, []);

  return (
    <Flex draggable={false} direction="column" bg="gray.950" w="100%" h="100vh">
      {/*Title Bar */}
      <Flex w="full" h="5%" alignItems="center" justifyContent="center">
        {TopText}
      </Flex>
      {/*Title Bar */}

      {/*App layout */}
      <Flex w="full" minH="95%" height="95%">
        <Flex
          mdDown={{
            width: SliderNum === 1 || SliderNum === 2 ? "0%" : "20%",
            display: SliderNum === 1 || SliderNum === 2 ? "none" : "flex",
          }}
          w="5%"
          h="100%"
          p="0px"
        >
          <HangerContainer />
        </Flex>

        {/*Alert::: Switching happens here ###app layout*/}
        <Flex
          borderTop="0.5px solid"
          borderLeft="0.5px solid"
          borderColor="gray.800"
          w="calc(100% - 5%)"
          mdDown={{ width: SliderNum === 1 ? "100%" : "80%" }}
          h="100%"
          roundedTopLeft="15px"
        >
          <Flex mdDown={{ width: "100%" }} w="23%" height="100%">
            <SideBar />
          </Flex>

          <Flex
            mdDown={{
              pos: "fixed",
              w: "100%",
              h: "100vh",
              display: SliderNum === 1 || SliderNum === 2 ? "flex" : "none",
            }}
            w="77%"
            bg="gray.900"
            h="100%"
          >
            <Outlet />
          </Flex>
        </Flex>
      </Flex>
      {/*App layout */}

      {/*Portal rendering here ** */}
      {showFailedtoSendRequest && <SendRequestPortal />}
      {showAddConvo && <CreateConvoPortal />}
      {showSettings && <SettingsContainer />}
      {showCallerPop && <CallerContainer />}
      {showCreateStatusPoP && <CreateStatus />}
      {showRenderStatus && <StatusRender />}
      {Array.isArray(incomingCall) &&
        incomingCall.length > 0 &&
        incomingCall.map((callData, index) => (
          <CallRinger key={index} callerData={callData} />
        ))}

      {acceptCall && <CallReciever callReceived={acceptCall} />}
    </Flex>
  );
};

export default ZenPage;
