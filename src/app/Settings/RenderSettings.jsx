import authUserStore from "@/store/authUserStore";
import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import replacerImage from "@/assets/default.jpg";
import ProfileSetting from "./ProfileSetting";
import userPopStore from "@/store/userPopUpStore";

const RenderSettings = ({ renderState, setterValue, setterFunc }) => {
  const { authUser } = authUserStore();
  const { setShowSettings } = userPopStore();
  if (renderState === "My Account") {
    return (
      <Flex pos="relative" direction="column" w="full" h="full">
        <Flex
          p="10px"
          pl="40px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading>My Account</Heading>

          <Button
            pos="absolute"
            _hover={{ color: "white" }}
            border="1px solid"
            color="gray.300"
            bg="none"
            rounded="full"
            right="20%"
            top="5%"
            onClick={() => setShowSettings(false)}
          >
            <LuX />
          </Button>
        </Flex>

        <Flex pl="40px" alignItems="center" w="full" flexGrow={1}>
          <Flex
            pos="relative"
            direction="column"
            bg="gray.900"
            rounded="8px"
            w="70%"
            h="80%"
          >
            <Flex overflow="hidden" w="full" h="30%" bg="gray" roundedTop="8px">
              {authUser?.profile?.coverImage && (
                <Image src={authUser.profile.coverImage} w="full" h="full" />
              )}
            </Flex>

            <Flex
              rounded="full"
              bg="gray.900"
              alignItems="center"
              justifyContent="center"
              w="90px"
              h="90px"
              pos="absolute"
              left="5%"
              top="17%"
            >
              <Image
                w="85%"
                h="85%"
                rounded="full"
                src={authUser.profile.profilePic || replacerImage}
              />
            </Flex>

            <Flex direction="column" pt="45px" pr="10px" pl="10px">
              <Heading>{authUser?.name}</Heading>

              <Flex
                direction="column"
                gap="20px"
                rounded="8px"
                w="full"
                bg="gray.800"
                p="10px"
              >
                {/*Display Name */}
                <Flex direction="column" w="full">
                  <Text fontWeight="bold">Display Name</Text>

                  <Flex
                    w="full"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>{authUser.name}</Text>
                    <Button
                      bg="gray.600"
                      color="white"
                      border="0.5px solid"
                      borderColor="gray.500"
                      rounded="10px"
                      h="30px"
                    >
                      Edit
                    </Button>
                  </Flex>
                </Flex>
                {/*Display Name */}

                {/*Username  */}
                <Flex direction="column" w="full">
                  <Text fontWeight="bold">Username</Text>

                  <Flex
                    w="full"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text>{authUser.username}</Text>
                    {/* <Button
                      bg="gray.600"
                      color="white"
                      border="0.5px solid"
                      borderColor="gray.500"
                      rounded="10px"
                      h="30px"
                    >
                      Edit
                    </Button> */}
                  </Flex>
                </Flex>
                {/*Username  */}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        {/* <Flex pl="40px" direction="column" h="12%" w="full">
          <Heading>Password and Authentication</Heading>

          <Button w="120px" h="30px">
            Change Password
          </Button>
        </Flex> */}
      </Flex>
    );
  }

  if (renderState === "Profile") {
    return <ProfileSetting setterValue={setterValue} setterFunc={setterFunc} />;
  }
  return null;
};

export default RenderSettings;
