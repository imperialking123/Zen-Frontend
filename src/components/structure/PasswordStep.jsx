import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { GrLinkNext } from "react-icons/gr";
import { LuEye, LuEyeClosed, LuLock } from "react-icons/lu";
import { toast } from "sonner";

const PasswordStep = ({ formData, setFormData, setSteps }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");
  const [showErrors, setShowErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.password) return toast.error("Password is Required");
    if (formData.password.length < 8)
      return toast.error("Password must atleast be 8 characters");
    if(formData.password !== confirmValue) return toast.error('Passwords does not match')
    if (showErrors.length > 1) return;
    if (showErrors.length < 1) setSteps(2);
  };

  useEffect(() => {
    if (formData.password) {
      const validDateErrors = () => {
        const errors = [];
        if (!formData.password)
          errors.push("Password must be atlest  8 characters");
        if (formData.password.length < 8)
          errors.push("Password must be atleast 8 characters");
        if (confirmValue !== formData.password)
          errors.push("Passwords do not match");
        return errors;
      };
      const check = validDateErrors();
      setShowErrors(check);
    }
  }, [formData.password, confirmValue]);

  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Heading>Choose a strong Password</Heading>

      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          marginTop: '25px'
        }}
      >
        <InputGroup
          startElement={<LuLock className="iconshift" />}
          width="65%"
          smDown={{ width: "90%" }}
          endElement={
            <button
              type="button"
              className="shiftbtn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <LuEye /> : <LuEyeClosed />}
            </button>
          }
        >
          <Input
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
        </InputGroup>

        <Text color="red" fontSize="12px" width={["90%", "65%"]}>
          {showErrors.map((err, i) => (
            <Text key={i}>{err}</Text>
          ))}
        </Text>

        <InputGroup
          endElement={
            <button
              type="button"
              className="shiftbtn"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <LuEye /> : <LuEyeClosed />}
            </button>
          }
          startElement={<LuLock className="iconshift" />}
          width="65%"
          smDown={{ width: "90%" }}
        >
          <Input
            value={confirmValue}
            onChange={(e) => setConfirmValue(e.target.value)}
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
          />
        </InputGroup>

        <Button type="submit" width="65%" smDown={{ width: "90%" }}>
          <GrLinkNext />
          Proceed
        </Button>
      </form>

      <Button
        onClick={() => setSteps(0)}
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

export default PasswordStep;
