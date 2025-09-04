import FormLogo from "@/components/structure/FormLogo";
import FormPattern from "@/components/structure/FormPattern";
import GoogleInitBtn from "@/components/structure/GoogleInitBtn";
import authUserStore from "@/store/authUserStore";
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  LuEye,
  LuEyeClosed,
  LuLoaderCircle,
  LuLock,
  LuUser,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    handle: "",
  });

  const { isLogingIn, login } = authUserStore();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogingIn === true) return;
    if (!formData.handle) return toast.error("Email or username is required*");
    if (!formData.password) return toast.error("Password is required*");
    if (formData.password.length < 8)
      return toast.error("Password must atleast be of 8 characters");
    login(formData)
  };

  return (
    <Flex width="100%" maxHeight="100vh" minHeight="100vh" maxWidth="100%">
      <Flex
        minHeight="100%"
        maxHeight="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        width="50%"
        mdDown={{ width: "100%" }}
      >
        <FormLogo />

        <Heading userSelect="none">Login to account</Heading>

        <Text color="gray.400" mb="10px">
          Fill the form to login to your Zen account
        </Text>

        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
          onSubmit={handleSubmit}
        >
          <InputGroup
            startElement={<LuUser className="iconshift" />}
            width="65%"
            mdDown={{ width: "90%" }}
          >
            <Input onChange={(e) => setFormData({...formData, handle: e.target.value}) } placeholder="Email or username" />
          </InputGroup>

          <InputGroup
            endElement={
              <button
                className="shiftbtn"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <LuEye /> : <LuEyeClosed />}
              </button>
            }
            startElement={<LuLock className="iconshift" />}
            width="65%"
            mdDown={{ width: "90%" }}
          >
            <Input
            onChange={(e) => setFormData({...formData, password: e.target.value}) }
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
          </InputGroup>

          <Button type="submit" disabled={isLogingIn} width="65%" mdDown={{ width: "90%" }}>
            {isLogingIn === true ? (
              <LuLoaderCircle className="spin" />
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <GoogleInitBtn />

        <Text fontSize='15px' mt='5px' >
         Don't have an Account <Link to='/signup' >Signup</Link>
        </Text>
      </Flex>

      {/*Side animation */}
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        maxHeight="100%"
        width="50%"
        padding="100px"
        mdDown={{ display: "none" }}
      >
        <FormPattern />
      </Flex>
    </Flex>
  );
};

export default LoginPage;
