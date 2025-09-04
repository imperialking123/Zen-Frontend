import authUserStore from "@/store/authUserStore";
import { Button, Flex, PinInput, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { LuLoaderCircle } from "react-icons/lu";

const FormVerifyCode = () => {
  const [pinInputValue, setInputValue] = useState("");
  // const [timer, setTimer] = useState(15 * 60);
  // const minutes = Math.floor(timer / 60);
  // const seconds = timer % 60;

  // const fullTimer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  const { confirmationMessage, isVerifying, resendOtp, verifyOtp, resendId } =
    authUserStore();

  const handleConfirm = () => {
    if (isVerifying === true) return;
    if (pinInputValue.length < 4) return;
    verifyOtp(pinInputValue);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      width="full"
      gap="15px"
    >
      {confirmationMessage && <Text color="green">{confirmationMessage}</Text>}

      <PinInput.Root
        otp
        placeholder="🙂‍↔️"
        gap="10px"
        onValueChange={(e) => setInputValue(e.valueAsString)}
        disabled={isVerifying === true}
      >
        <PinInput.Control>
          <PinInput.Input index={0} />
          <PinInput.Input index={1} />
          <PinInput.Input index={2} />
          <PinInput.Input index={3} />
          <PinInput.Input index={4} />
          <PinInput.Input index={5} />
        </PinInput.Control>
      </PinInput.Root>

      <Flex
        userSelect="none"
        justifyContent="space-between"
        pl="10px"
        pr="10px"
        mdDown={{ width: "90%" }}
        width="65%"
        fontWeight="medium"
        color="gray.500"
      >
        {resendId && (
          <Text
            onClick={() => resendOtp(resendId)}
            color="black"
            cursor="pointer"
          >
            Resend Code
          </Text>
        )}
      </Flex>

      {pinInputValue.length > 3 && (
        <Button
          disabled={isVerifying === true}
          width="65%"
          mdDown={{ width: "90%" }}
          onClick={handleConfirm}
        >
          {isVerifying === false ? (
            "Register"
          ) : (
            <LuLoaderCircle className="spin" />
          )}
        </Button>
      )}
    </Flex>
  );
};

export default FormVerifyCode;
