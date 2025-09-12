import authUserStore from "@/store/authUserStore";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import replacerImage from "@/assets/default.jpg";

import userPopStore from "@/store/userPopUpStore";

import { useRef } from "react";
import { FaGear } from "react-icons/fa6";
import { TbCameraPlus } from "react-icons/tb";
import userStatusStore from "@/store/userStatusStore";
import StatusMapItem from "../Status/StatusMapItem";

const HangerContainer = () => {
  const { authUser } = authUserStore();
  const { setShowSettings, setShowCreateStatusPop, setShowRenderStatus } =
    userPopStore();
  const { isCreatingStatus, MyStatus, FriendStatus } = userStatusStore();

  const inputRef = useRef(null);

  const n = MyStatus.length;
  const r = 24;
  const circumference = 2 * Math.PI * r;
  const gap = 7;
  const dash = circumference / n - gap;
  const dashArray = `${dash} ${gap}`;

  const handleUploader = async (event) => {
    const file = event.target.files[0];

    const isImage =
      file.type.startsWith("image/") ||
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);

    if (isImage) {
      const Reader = new FileReader();
      Reader.onload = () => {
        setShowCreateStatusPop({ image: Reader.result, type: "image" });
      };
      Reader.readAsDataURL(file);
    }

    return;
  };

  const handleMyStatus = () => {
    if (MyStatus.length < 1) return;
    setShowRenderStatus(MyStatus);
  };

  return (
    <Flex
      pt="10px"
      pb="10px"
      alignItems="center"
      direction="column"
      w="full"
      h="full"
    >
      <Flex alignItems="center" w="full" direction="column" flexGrow={1}>
        <Box
          w="full"
          gap="10px"
          flexDirection="column"
          alignItems="center"
          display="flex"
          p="10px"
        >
          {/*Profile Picture and status viewer */}
          <Box
            onClick={handleMyStatus}
            w="full"
            display="flex"
            pos="relative"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={authUser?.profile?.profilePicsm || replacerImage}
              w="45px"
              h="45px"
              rounded="100%"
            />

            {!isCreatingStatus && MyStatus.length > 0 && (
              <svg className="statusRing" width="55" height="55">
                <circle
                  cx="27.5"
                  cy="27.5"
                  r={24}
                  fill="transparent"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={MyStatus.length > 1 ? dashArray : ""}
                />
              </svg>
            )}

            {isCreatingStatus && (
              <svg className="upload-ring" width="55" height="55">
                <circle
                  cx="27.5"
                  cy="27.5"
                  r="24"
                  fill="transparent"
                  stroke="white"
                  strokeWidth="4"
                  strokeDasharray="6 5" // tight dashes like IG story
                  strokeLinecap="round"
                />
              </svg>
            )}
          </Box>
          {/*Profile Picture and status viewer */}

          {/*Add Status Button */}
          <Button
            onClick={() => inputRef.current.click()}
            bg="#ffffffff"
            rounded="full"
            w="45px"
            h="45px"
          >
            <TbCameraPlus style={{ scale: 1.2 }} />
            <input
              ref={inputRef}
              type="file"
              accept="image/*,video/*"
              hidden
              onChange={handleUploader}
            />
          </Button>

          <Flex h="1px" bg="gray.500" w="full" />
        </Box>

        {Array.isArray(FriendStatus) &&
          FriendStatus.length > 0 &&
          FriendStatus.map((status, index) => (
            <StatusMapItem
              key={index}
              person={status.friend}
              status={status.allStatus}
            />
          ))}
      </Flex>

      <Button
        onClick={() => setShowSettings(true)}
        _hover={{ animation: "spinGear 0.5s linear 1" }}
        color="white"
        bg="none"
      >
        <FaGear />
      </Button>
    </Flex>
  );
};

export default HangerContainer;
