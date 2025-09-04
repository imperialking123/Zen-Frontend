import { Image } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";

const FormLogo = () => {


  const { colorMode } = useColorMode();

  return (
    <Image
      pointerEvents='none'
      userSelect="none"
      onClick={(e) => {e.preventDefault(); e.stopPropagation()}}
      width="70px"
      height="70px"
      src={colorMode === "light" ? "/black.png" : "/white.png"}
    />
  );
};

export default FormLogo;
