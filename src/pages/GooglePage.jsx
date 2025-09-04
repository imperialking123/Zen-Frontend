import { useColorMode } from "@/components/ui/color-mode";
import authUserStore from "@/store/authUserStore";
import { Flex, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GooglePage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const code = query.get("code");
  const urlState = query.get("state");

  const navigate = useNavigate();

  const { colorMode } = useColorMode();
  const src = colorMode === "light" ? "./black.png" : "./white.png";
  const state = sessionStorage.getItem("ZenfoceGRK");

  const { handleGoogle } = authUserStore();

  useEffect(() => {
    if (!code || !state) {
      navigate("/signup");
    }

    let timeout;

    if (code && state === urlState) {
      timeout = setTimeout(() => {
        const cleanUrl = location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);

        handleGoogle(code);
        sessionStorage.removeItem("ZenfoceGRK");
      }, 10);
    }

    return () => clearTimeout(timeout);
  }, [code, location, handleGoogle, urlState, state, navigate]);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
    >
      <Image
        userSelect="none"
        pointerEvents="none"
        onClick={(e) => e.preventDefault()}
        animation="pulse 1.5s ease-in-out infinite"
        width="120px"
        filter={
          colorMode === "light"
            ? "drop-shadow(0 0 8px rgba(46, 51, 46, 0.6))"
            : "drop-shadow(0 0 8px rgba(201, 209, 201, 0.6))"
        }
        src={src}
      />
    </Flex>
  );
};

export default GooglePage;
