import { useEffect } from "react";
import authUserStore from "./store/authUserStore";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useColorMode } from "./components/ui/color-mode";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import WelcomePage from "./pages/WelcomePage";
import { Toaster } from "sonner";
import GooglePage from "./pages/GooglePage";
import LoginPage from "./pages/LoginPage";
import ZenPage from "./pages/ZenPage";

import FriendContainer from "./app/Friend/FriendContainer";
import HyperZenContainer from "./app/Hyperzen/HyperZenContainer";
import MessengerContainer from "./app/messenger/MessengerContainer";

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = authUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const { colorMode } = useColorMode();

  if (isCheckingAuth) {
    return (
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        minW="100%"
        height="100vh"
        padding="10px"
      >
        <Box />

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
          src={colorMode === "light" ? "/black.png" : "/white.png"}
        />

        <Text opacity={0} fontSize="12px" color="white" userSelect="none">
          Imperial Studio Inc
        </Text>
      </Flex>
    );
  }

  return (
    <div>
      <Toaster closeButton richColors position="top-center" />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Navigate to="/zen" /> : <WelcomePage />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/zen" /> : <SignupPage />}
        />

        {/*Important Route */}

        <Route
          path="/zen"
          element={authUser ? <ZenPage /> : <Navigate to="/signup" />}
        >
          <Route index element={<FriendContainer />} />
          <Route path="hyperzen" element={<HyperZenContainer />} />
          <Route path="@me/:username" element={<MessengerContainer />} />
        </Route>

        {/*Important Route */}

        <Route
          path="/google"
          element={authUser ? <Navigate to="/zen" /> : <GooglePage />}
        />

        <Route
          path="/login"
          element={authUser ? <Navigate to="/zen" /> : <LoginPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
