import userPopStore from "@/store/userPopUpStore";
import { Button, Flex, Portal, Text } from "@chakra-ui/react";
import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";

import RenderSettings from "./RenderSettings";
import authUserStore from "@/store/authUserStore";

const SettingsContainer = () => {
  const { setShowSettings } = userPopStore();
  const { updateProfile } = authUserStore();

  
  const renderSettings = [
    { text: "My Account", no: 1 },
    { text: "Profile", no: 2 },
  ];

  const [renderSettingsState, setRenderSettings] = useState("My Account");

  const [updateState, setUpdateState] = useState(null);
  const [blockReturn, setBlockReturn] = useState(false);
  const [ShakerState, setShakerState] = useState(false);

  const handleSwitcher = (text) => {
    if (updateState !== null) {
      setBlockReturn(true);
      setShakerState(true);
      return;
    }
    setRenderSettings(text);
  };

  useEffect(() => {
    if (updateState !== null) {
      setBlockReturn(true);
    }
    if (updateState === null) {
      setBlockReturn(false);
    }
  }, [updateState]);

  useEffect(() => {
    let Timeout;
    if (ShakerState === true) {
      Timeout = setTimeout(() => {
        setShakerState(false);
      }, 500);
    }

    return () => clearTimeout(Timeout);
  }, [ShakerState]);

  return (
    <Portal>
      <Motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        initial={{
          scale: 0.9,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.9,
          opacity: 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      >
        <Flex
          userSelect="none"
          direction="column"
          h="full"
          w="full"
          bg="gray.900"
          position="relative"
        >
          <Flex w="full" flexGrow={1}>
            <Flex
              alignItems="flex-end"
              gap="5px"
              p="10px"
              direction="column"
              w="30%"
            >
              <Text mt="10px" w="70%" fontSize="16px" color="gray.400">
                User Settings
              </Text>
              {renderSettings.map((set, index) => (
                <Button
                  onClick={() => handleSwitcher(set.text)}
                  key={index}
                  h="35px"
                  w="70%"
                  color="white"
                  bg={
                    renderSettingsState === set.text ? "gray.700" : "gray.900"
                  }
                  display="flex"
                  justifyContent="flex-start"
                  pl="10px"
                  ml="15px"
                >
                  {set.text}
                </Button>
              ))}
            </Flex>

            <Flex w="70%" bg="gray.800">
              <RenderSettings
                setterValue={updateState}
                setterFunc={setUpdateState}
                renderState={renderSettingsState}
              />
            </Flex>
          </Flex>

          {blockReturn === true && (
            <Flex
              className={ShakerState === true ? "shake" : ""}
              boxShadow="0 2px 6px rgba(85, 83, 83, 0.33)"
              border="1px solid "
              borderColor="gray.700"
              rounded="8px"
              w="45%"
              pos="absolute"
              bottom="5%"
              left="50%"
              transform="translateX(-50%)"
              p="15px"
              bg="gray.950"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>You have Unsaved Changes</Text>
              <Flex gap="5px">
                <Button
                  onClick={() => {
                    setUpdateState(null);
                    setBlockReturn(false);
                  }}
                  color="red.500"
                  bg="none"
                  h="30px"
                  w="50px"
                >
                  Reset
                </Button>
                <Button
                  onClick={() => updateProfile(updateState)}
                  rounded="8px"
                  h="30px"
                  colorPalette="green"
                  w="100px"
                >
                  Save and Exit
                </Button>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Motion.div>
    </Portal>
  );
};

export default SettingsContainer;
