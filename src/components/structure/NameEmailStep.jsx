import authUserStore from "@/store/authUserStore";
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { GrLinkNext } from "react-icons/gr";
import { LuLoaderCircle, LuMail, LuUser } from "react-icons/lu";
import { toast } from "sonner";
import GoogleInitBtn from "./GoogleInitBtn";

const NameEmailStep = ({ formData, setFormData, setSteps }) => {
  const { isCheckingEmail, checkEmail, permitEmail } = authUserStore();
  const validDateForm = () => {
    if (!formData.name) return toast.error("Full Name is Required");
    if (!formData.email) return toast.error("Email is Required");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email))
      return toast.error("Invalid email format");

    return true;
  };

  const [authorizedContinue, setAuthorized] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validDateForm();
    if (success === true) {
      checkEmail(formData, setAuthorized);
    }
  };

  useEffect(() => {
    if (permitEmail === true && authorizedContinue === true) {
      setSteps(1);
      setAuthorized(false);
    }
  }, [authorizedContinue, permitEmail, setSteps]);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      width="100%"
    >
      <Heading>Create Account</Heading>
      <Text mb="20px" color="gray.400">
        Fill in full name and email to continue
      </Text>

      <form
        onSubmit={handleSubmit}
        style={{
          pointerEvents: isCheckingEmail ? "none" : "",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5px",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <InputGroup
          startElement={<LuUser className="iconshift" />}
          width="65%"
          smDown={{ width: "90%" }}
        >
          <Input
            value={formData.name}
            placeholder="Full Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </InputGroup>

        <InputGroup
          startElement={<LuMail className="iconshift" />}
          width="65%"
          smDown={{ width: "90%" }}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        >
          <Input value={formData.email} placeholder="Email" />
        </InputGroup>

        <Button
          disabled={isCheckingEmail === true}
          type="submit"
          mt="20px"
          width="65%"
          smDown={{ width: "90%" }}
        >
          {isCheckingEmail ? (
            <LuLoaderCircle className="spin" />
          ) : (
            <>
              <GrLinkNext />
              Proceed
            </>
          )}
        </Button>
      </form>

      <GoogleInitBtn />
    </Flex>
  );
};

export default NameEmailStep;
