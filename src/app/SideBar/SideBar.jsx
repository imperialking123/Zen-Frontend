import userChatStore from "@/store/userChatStore";
import userPopStore from "@/store/userPopUpStore";
import { Box, Flex, Text } from "@chakra-ui/react";

import { GiHypersonicMelon } from "react-icons/gi";
import { GoPlus } from "react-icons/go";
import { MdOutlineEmojiPeople } from "react-icons/md";

import { NavLink } from "react-router-dom";
import ConvoItem from "./ConvoItem";

const SideBar = () => {
  const { SetSliderNum } = userPopStore();
  const { setShowAddconvo, setTopText } = userPopStore();
  const { conversations, selectConvo } = userChatStore();
  const Navlinks = [
    {
      text: "Friends",
      to: "/",
      icon: <MdOutlineEmojiPeople className="iconScale" />,
      function: () => {
        selectConvo(null);
        setTopText("Friends");
        document.title = `Zen | Friends`;
        SetSliderNum(1);
      },
    },
    {
      text: "HyperZen",
      to: "hyperzen",
      icon: <GiHypersonicMelon className="iconScale" />,
      function: () => {
        selectConvo(null);
        document.title = "Zen | HyperZen";
      },
    },
  ];

  return (
    <Flex
      color="gray.400"
      userSelect="none"
      direction="column"
      w="full"
      h="full"
    >
      <Flex
        w="full"
        h="8%"
        alignItems="center"
        justifyContent="center"
        borderBottom="0.5px solid"
        borderColor="gray.800"
      >
        <Flex
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          rounded="5px"
          w="90%"
          h="65%"
          userSelect="none"
          bg="gray.800"
          fontSize="13px"
          fontWeight="medium"
          onClick={() => setShowAddconvo(true)}
        >
          Find or Start a conversation
        </Flex>
      </Flex>

      <Flex direction="column" w="100%" h="calc(100% - 5%)">
        {/*Navlinks Map */}
        <Flex
          borderBottom="0.5px solid "
          borderColor="gray.800"
          gap="5px"
          direction="column"
          alignItems="center"
          w="full"
          h="20%"
          p="10px"
          userSelect="none"
        >
          {Navlinks.map((nav) => (
            <NavLink
              onClick={nav.function}
              key={nav.to}
              to={nav.to}
              end
              className="navLink"
            >
              {nav.icon}
              {nav.text}
            </NavLink>
          ))}
        </Flex>
        {/*Navlinks Map */}

        <Flex pt="10px" direction="column" h="calc(100% - 20%)" w="full">
          <Flex
            mb="10px"
            pl="10px"
            pr="10px"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="14px">Direct Messages</Text>{" "}
            <button onClick={() => setShowAddconvo(true)}>
              <GoPlus />
            </button>{" "}
          </Flex>

          <Flex gap="5px" h="full" direction="column" alignItems="center">
            {Array.isArray(conversations) &&
              conversations.length > 0 &&
              conversations.map((convo) => (
                <ConvoItem
                  key={convo._id}
                  fullConvoData={convo}
                  convoData={convo.otherParticipant}
                />
              ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
