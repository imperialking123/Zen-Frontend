import userFriendStore from "@/store/userFriendStore";
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import FriendMapItem from "./FriendMapItem";
import PendingReqItem from "./PendingReqItem";
import RequestMapItem from "./RequestMapItem";

const RenderFriends = ({ renderCase }) => {
  const [FilteredOnline, setFilteredOnline] = useState([]);

  const [addUsername, setAddusername] = useState("");
  const {
    friends,
    onlineFriends,
    sendFriendReq,
    pending,
    requests,
    isSendingRequest,
    sentReqMessage,
    clearReqMessage,
  } = userFriendStore();

  const handleAdd = () => {
    if (addUsername === "") return;
    sendFriendReq(addUsername);
  };

  useEffect(() => {
    if (friends.length < 1) return;

    const onlineFriendsArray = friends.filter((person) =>
      onlineFriends.includes(String(person._id))
    );
    setFilteredOnline(onlineFriendsArray);
  }, [friends]);


 

  useEffect(() => {
    let timeout;
    if (sentReqMessage) {
      timeout = setTimeout(() => {
        clearReqMessage();
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [sentReqMessage]);

  if (renderCase === "online") {
    return (
      <Flex
        pt="15px"
        pl="20px"
        pr="20px"
        pb="15px"
        direction="column"
        w="full"
        h="full"
        userSelect="none"
      >
        {/* <InputGroup
          colorPalette="blue"
          endElement={<BiSearch className="searchShift" />}
        >
          <Input bg="gray.950" rounded="10px" pl="10px" placeholder="Search" />
        </InputGroup> */}

        <Text mt="15px">Online Friends - {FilteredOnline?.length}</Text>

        <Flex direction="column" scrollbar="hidden" w="full" h="100%">
          {Array.isArray(FilteredOnline) &&
            FilteredOnline?.length > 0 &&
            FilteredOnline?.map((friend, index) => (
              <FriendMapItem
                borderBottom={index !== friends.length - 1 ? true : false}
                key={friend._id}
                data={friend}
              />
            ))}
          {Array.isArray(FilteredOnline) && FilteredOnline.length < 1 && (
            <Flex
              alignItems="center"
              mt="auto"
              mb="auto"
              direction="column"
              color="gray.300"
            >
              <Heading>Nobody Here</Heading>
              <Text>You have No Friends Online Right Now..</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    );
  }

  if (renderCase === "add") {
    return (
      <Flex direction="column" w="full" h="full">
        <Flex
          pt="15px"
          pl="20px"
          pr="20px"
          pb="15px"
          w="full"
          direction="column"
          borderBottom="0.5px solid"
          borderColor="gray.600"
        >
          <Heading userSelect="none">Add Friend</Heading>
          <Text userSelect="none">You add Friends with their Zen Username</Text>

          <InputGroup
            mt="20px"
            colorPalette="blue"
            endElement={
              <Button
                disabled={addUsername === "" || isSendingRequest}
                draggable
                rounded="8px"
                w="100%"
                h="65%"
                mr="15px !important"
                onClick={handleAdd}
              >
                Send Friend Request
              </Button>
            }
          >
            <Input
              h="55px"
              rounded="10px"
              pl="10px"
              onChange={(e) => setAddusername(e.target.value)}
              bg="gray.950"
              placeholder="You can Add Friends with their Zen Username."
            />
          </InputGroup>
          {sentReqMessage && (
            <Text fontSize="14px" userSelect="none" color="#2bfc01d5">
              {sentReqMessage}
            </Text>
          )}
        </Flex>
      </Flex>
    );
  }

  if (renderCase === "pending") {
    return (
      <Flex
        pt="15px"
        pl="20px"
        pr="20px"
        pb="15px"
        direction="column"
        w="full"
        h="full"
        userSelect="none"
      >
        <Text mt="15px">Sent Request - {pending.length} </Text>

        <Flex
          direction="column"
          overflow="scroll"
          scrollbar="hidden"
          w="full"
          h="100%"
        >
          {Array.isArray(pending) &&
            pending.length > 0 &&
            pending.map((pend, index) => (
              <PendingReqItem
                borderBottom={index !== pending.length - 1 ? true : false}
                key={pend._id}
                data={pend?.receiverId}
                pendingId={pend._id}
              />
            ))}
          {Array.isArray(pending) && pending.length < 1 && (
            <Flex
              alignItems="center"
              mt="auto"
              mb="auto"
              direction="column"
              color="gray.300"
            >
              <Heading>Nothing to Show Here</Heading>
              <Text color="gray.500" fontSize="14px">
                When you Send Someone a Friend Request You will see them here
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    );
  }

  if (renderCase === "request") {
    return (
      <Flex
        pt="15px"
        pl="20px"
        pr="20px"
        pb="15px"
        direction="column"
        w="full"
        h="full"
        userSelect="none"
      >
        <Text mt="15px">Incoming Friend Requests - {requests.length} </Text>

        <Flex direction="column" scrollbar="hidden" w="full" h="100%">
          {Array.isArray(requests) &&
            requests.length > 0 &&
            requests.map((request, index) => (
              <RequestMapItem
                borderBottom={index !== requests.length - 1 ? true : false}
                key={request._id}
                data={request.senderId}
                reqId={request._id}
              />
            ))}
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      pt="15px"
      pl="20px"
      pr="20px"
      pb="15px"
      direction="column"
      w="full"
      h="full"
      userSelect="none"
    >
      {/* {Array.isArray(friends) && friends.length > 0 && (
        <InputGroup
          colorPalette="blue"
          endElement={<BiSearch className="searchShift" />}
        >
          <Input bg="gray.950" rounded="10px" pl="10px" placeholder="Search" />
        </InputGroup>
      )} */}

      {Array.isArray(friends) && friends.length > 0 && (
        <Text mt="15px">
          All Friends - {friends.length > 0 && friends.length}
        </Text>
      )}

      <Flex direction="column" scrollbar="hidden" w="full" h="100%">
        {Array.isArray(friends) &&
          friends.length > 0 &&
          friends.map((friend, index) => (
            <FriendMapItem
              borderBottom={index !== friends.length - 1 ? true : false}
              key={friend._id}
              data={friend}
            />
          ))}

        {Array.isArray(friends) && friends.length < 1 && (
          <Flex
            direction="column"
            alignItems="center"
            mt="auto"
            mb="auto"
            alignSelf="center"
            justifySelf="center"
          >
            <Heading>Nothing to show here</Heading>
            <Text fontSize="14px" color="gray.500">
              Once you Add Friends You will See them Here
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default RenderFriends;
