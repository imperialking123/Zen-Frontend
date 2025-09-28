import userPopStore from "@/store/userPopUpStore";
import { Box, Button, Flex, Image, Portal } from "@chakra-ui/react";
import { motion as Motion, AnimatePresence, color } from "framer-motion";
import { TbWindowMaximize } from "react-icons/tb";
import { Tooltip } from "@/components/ui/tooltip";
import { FiDownload } from "react-icons/fi";
import { LuX } from "react-icons/lu";

const ViewMediaPop = () => {
  const { showMediaPop, setShowMediaPop } = userPopStore();

  const handleDownload = async () => {
    const res = await fetch(showMediaPop.media);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const mimeToExt = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "video/mp4": "mp4",
    };

    const ext = mimeToExt[blob.type] || "bin";
    const filename = (showMediaPop.timeStamp || "download") + "." + ext;

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Portal>
      <AnimatePresence>
        <Motion.div
          key="portal-box"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            inset: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Flex
            justifyContent="space-between"
            top="5%"
            pos="absolute"
            w="full"
            h="55px"
            zIndex={10}
            mdDown={{
              top: "1%",
            }}
          >
            <Box />
            <Flex
              p="10px"
              bg="gray.800"
              mr="15px"
              h="95%"
              alignItems="center"
              gap="10px"
              rounded="15px"
            >
              <Tooltip
                contentProps={{ css: { padding: "5px", zIndex: "10" } }}
                openDelay={300}
                closeDelay={200}
                content="Save Media"
              >
                <Button
                  bg="none"
                  color="gray.200"
                  h="35px"
                  w="35px"
                  rounded="10px"
                  _hover={{
                    bg: "gray.700",
                    border: "1px solid",
                  }}
                  onClick={handleDownload}
                >
                  <FiDownload />
                </Button>
              </Tooltip>

              <Tooltip
                contentProps={{ css: { padding: "5px" } }}
                openDelay={300}
                closeDelay={200}
                content="Open in new Tab"
              >
                <a target="_blank" href={showMediaPop.media}>
                  <Button
                    bg="none"
                    color="gray.200"
                    h="35px"
                    w="35px"
                    rounded="10px"
                    _hover={{
                      bg: "gray.700",
                      border: "1px solid",
                    }}
                  >
                    <TbWindowMaximize />
                  </Button>
                </a>
              </Tooltip>

              <Tooltip
                contentProps={{
                  css: {
                    padding: "5px",
                    "--tooltip-bg": "red",
                    color: "white",
                  },
                }}
                openDelay={300}
                closeDelay={200}
                content="Close Window"
              >
                <Button
                  onClick={() => setShowMediaPop(false)}
                  bg="none"
                  color="gray.200"
                  h="35px"
                  w="35px"
                  rounded="10px"
                  _hover={{
                    bg: "gray.700",
                    border: "1px solid",
                  }}
                >
                  <LuX />
                </Button>
              </Tooltip>
            </Flex>
          </Flex>

          <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
            <Image
              src={showMediaPop.media}
              alt="media"
              maxW="100%"
              maxH="90%"
              mdDown={{ maxH: "100%" }}
              objectFit="contain" // keeps aspect ratio, no stretch
            />
          </Flex>
        </Motion.div>
      </AnimatePresence>
    </Portal>
  );
};

export default ViewMediaPop;
