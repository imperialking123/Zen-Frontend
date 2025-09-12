import { imageResizer } from "@/config/imageResize";

import authUserStore from "@/store/authUserStore";
import userChatStore from "@/store/userChatStore";
import { Box, Flex, Image, Textarea } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const InputBar = ({ data }) => {
  const { authUser } = authUserStore();
  const { sendMessage, convoSelected, isGettingConvo, isFetchingMessage } =
    userChatStore();
  const [inputTextValue, setInputTextValue] = useState({
    text: "",
    type: "text-msg",
  });

  const uploadRef = useRef(null);
  const textAreaRef = useRef(null);

  const handleKeyDown = (event) => {
    if (isGettingConvo || isFetchingMessage) return;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!inputTextValue.text && !inputTextValue.image) {
        return;
      }

      const message = {
        ...inputTextValue,
        senderId: authUser?._id,
        receiverId: data?._id,
        convoId: convoSelected._id,
        isTemp: convoSelected?.isTemp || false,
      };
      sendMessage(message);

      setInputTextValue((prev) => ({
        ...prev,
        text: "",
        image: "",
        type: "text-msg",
      }));
    }
  };

  const handleSendBtn = () => {
    if (isGettingConvo || isFetchingMessage) return;
    if (!inputTextValue.text && !inputTextValue.image) {
      return;
    }

    const message = {
      ...inputTextValue,
      senderId: authUser?._id,
      receiverId: data?._id,
      convoId: convoSelected._id,
      isTemp: convoSelected?.isTemp || false,
    };
    sendMessage(message);

    setInputTextValue((prev) => ({
      ...prev,
      text: "",
      image: "",
      type: "text-msg",
    }));
  };

  const handleImageInput = async (e) => {
    const file = e.target.files[0];
    const isImage =
      file.type.startsWith("image/") ||
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);
    if (!isImage) return;
    const resized = await imageResizer(file, 1280, 1280, "WEBP", 0.8);

    setInputTextValue((prev) => ({
      ...prev,
      type: "image-msg",
      image: resized,
    }));
    textAreaRef.current.focus();
  };

  const cancelImageType = () => {
    const newCopy = { ...inputTextValue };
    delete newCopy.image;
    setInputTextValue({ ...newCopy, type: "text-msg" });
  };

  return (
    <Flex
      gap="10px"
      border="0.5px solid"
      borderColor="gray.700"
      rounded="8px"
      bg="gray.800"
      pl="10px"
      pr="10px"
      pt="10px"
      w="98%"
      minH="50px"
      maxH="100%"
      overflowY="auto"
      direction="column"
      _scrollbar={{ width: "5px" }}
    >
      {inputTextValue?.image && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="45%"
          padding="5px"
          h="250px"
          pos="relative"
          p="10px"
          border="0.5px solid"
          borderColor="gray.700"
          rounded="15px"
        >
          <Image rounded="15px" w="full" h="full" src={inputTextValue?.image} />
          <button
            onClick={cancelImageType}
            style={{
              color: "red",
              position: "absolute",
              background: "white",
              top: "0",
              right: "0",
            }}
            className="addBtn"
          >
            <MdDelete />
          </button>
        </Box>
      )}

      <Flex alignItems="flex-start" w="full">
        <button onClick={() => uploadRef.current.click()} className="addBtn">
          <LuPlus />
        </button>

        <input
          onChange={handleImageInput}
          ref={uploadRef}
          type="file"
          accept="image/*"
          hidden
        />

        <Textarea
          ref={textAreaRef}
          onChange={(e) =>
            setInputTextValue((prev) => ({ ...prev, text: e.target.value }))
          }
          onKeyDown={handleKeyDown}
          value={inputTextValue.text}
          mt="5px"
          fontSize="16px"
          autoresize
          resize="none"
          p={0}
          placeholder={"Message @" + data?.username}
          border="none"
          _focus={{
            outline: "none",
            border: "none",
            boxShadow: "none", // <- remove the focus ring glow
          }}
        />

        <button onClick={handleSendBtn} className="addBtn">
          <IoSend />
        </button>
      </Flex>
    </Flex>
  );
};

export default InputBar;
