import authUserStore from "@/store/authUserStore";
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { LuAtSign, LuLoaderCircle } from "react-icons/lu";

const FormUsername = ({ formData, setFormData, setSteps }) => {
  const placeholders = [
    "the name you'd carve into your sword",
    "the nickname your friends can’t stop using",
    "something cool enough to be your alter ego",
    "your online identity — but cooler",
    "the one name that just feels right",
    "what the internet should call you",
    "something mysterious, something you",
    "your username... your legend begins here",
    "that one name no one else has (yet)",
    "go on, name yourself like a main character",
  ];

  const [username, setUsername] = useState("");
  const {
    isUsernameValid,
    checkUsername,
    clearUsernameMessage,
    isCheckingUsername,
    register,
    usernameMessage,
    isRegistering
  } = authUserStore();

  const debounceSearch = useMemo(
    () =>
      debounce((data) => {
        checkUsername(data);
      }, 1000),
    [checkUsername]
  );

  const handleRegister = async () => {
    if (isCheckingUsername === true) return;
    if (isUsernameValid !== true) return;

    const updatedForm = { ...formData, username };
    setFormData(updatedForm);
    await register(updatedForm, setSteps);

    
  };

  useEffect(() => {
    if (username.length < 6) {
      clearUsernameMessage();
    }
    if (username.length > 6) {
      debounceSearch(username);
    }
  }, [username, clearUsernameMessage, debounceSearch]);

  const random = Math.floor(Math.random() * placeholders.length);

  return (
    <Flex
      gap="10px"
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Heading userSelect="none">Choose a Unique Username</Heading>

      <Text fontSize="14px" color="gray.800">
        Username must atleast be atleast 6 characters and unique
      </Text>
      <InputGroup
        mdDown={{ width: "90%" }}
        startElement={<LuAtSign className="iconshift" />}
        width="65%"
        endElement={
          isCheckingUsername ? <LuLoaderCircle className="shiftbtn spin" /> : ""
        }
      >
        <Input
          disabled={isCheckingUsername === true}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder={placeholders[random]}
          maxLength={20}
          type="text"
        />
      </InputGroup>

      {usernameMessage && username.length !== 0 && (
        <Text
          fontSize="14px"
          color={isUsernameValid === true ? "green" : "red"}
        >
          {usernameMessage}
        </Text>
      )}

      {username.length > 5 && (
        <Button
          disabled={isUsernameValid !== true || isCheckingUsername || isRegistering}
          onClick={handleRegister}
          mdDown={{ width: "90%" }}
        width="65%"
        >
          {isCheckingUsername || isRegistering ? <LuLoaderCircle className="spin" /> : "Register" }
        </Button>
      )}
      <Button
        onClick={() => setSteps(1)}
        mt="30px"
        mb="5px"
        size="sm"
        rounded="full"
        type="button"
      >
        <BiChevronLeft className="iconMedium" />
      </Button>
    </Flex>
  );
};

export default FormUsername;
