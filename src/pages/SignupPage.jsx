import FormLogo from "@/components/structure/FormLogo";
import FormPattern from "@/components/structure/FormPattern";
import { Flex,  Text } from "@chakra-ui/react";
import { useState } from "react";
import { motion as Motion } from "framer-motion";
import NameEmailStep from "@/components/structure/NameEmailStep";
import { Link } from "react-router-dom";
import PasswordStep from "@/components/structure/PasswordStep";
import FormUsername from "@/components/structure/FormUsername";
import FormVerifyCode from "@/components/structure/FormVerifyCode";

const SignupPage = () => {
  const [steps, Setsteps] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });

  return (
    <Flex width="100%" maxHeight="100vh" minHeight="100vh" maxWidth="100%">
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="50%"
        mdDown={{ width: "100%" }}
      >
        <FormLogo />
        {steps === 0 && (
          <Motion.div
            style={{ width: "100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <NameEmailStep
              setSteps={Setsteps}
              formData={formData}
              setFormData={setFormData}
            />
          </Motion.div>
        )}

        {steps === 1 && (
          <Motion.div
            style={{ width: "100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {" "}
            <PasswordStep
              setFormData={setFormData}
              formData={formData}
              setSteps={Setsteps}
            />{" "}
          </Motion.div>
        )}

        {steps === 2 && (
          <Motion.div
            style={{ width: "100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FormUsername
              formData={formData}
              setFormData={setFormData}
              setSteps={Setsteps}
            />
          </Motion.div>
        )}

        {steps === 3 && (
          <Motion.div
            style={{ width: "100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          > <FormVerifyCode /> </Motion.div>
        )}
        <Text display={steps === 3 ? 'none' : ''} mt="10px">
          Already have an Account <Link to="/login">Login</Link>
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

export default SignupPage;
