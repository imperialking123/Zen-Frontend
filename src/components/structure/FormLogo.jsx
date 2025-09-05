import { Image } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";

const FormLogo = () => {
  const { colorMode } = useColorMode();

  return (
    <Image
      userSelect="none"
      pointerEvents="none"
      onClick={(e) => e.preventDefault()}
  
      width="120px"
      src={colorMode === "light" ? "/black.png" : "/white.png"}
    />
  );
};

export default FormLogo;
