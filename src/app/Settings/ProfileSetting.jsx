import { imageResizer } from "@/config/imageResize";
import replacerImage from "@/assets/default.jpg";
import authUserStore from "@/store/authUserStore";
import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRef } from "react";
import { LuX } from "react-icons/lu";
import userPopStore from "@/store/userPopUpStore";

const ProfileSetting = ({ setterFunc, setterValue }) => {
  const { authUser } = authUserStore();

  const { setShowSettings } = userPopStore();
  const profilePicInputRef = useRef(null);
  const profileCoverImageInputRef = useRef(null);

  const handleCoverImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isImage =
      file.type.startsWith("image") ||
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);
    if (!isImage) return;

    const resizeResponse = await imageResizer(file, 1280, 720, "JPEG", 0.8);
    setterFunc((prev) => ({ ...prev, coverImage: resizeResponse }));
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isImage =
      file.type.startsWith("image") ||
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);
    if (!isImage) return;
    const profilePicBase64 = await imageResizer(file, 360, 360, "JPEG", 0.85);
    const resizeResponseSm = await imageResizer(file, 120, 120, "WEBP", 1.0);
    setterFunc((prev) => ({
      ...prev,
      profilePic: profilePicBase64,
      profilePicsm: resizeResponseSm,
    }));
  };

  return (
    <Flex p="20px" direction="column" w="full">
      <Heading ml="10px" mt="20px">
        Profile Settings
      </Heading>

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

      <Flex w="full">
        <Flex w="50%" direction="column">
          <Flex mt="10px" w="100%">
            <Flex
              pb="25px"
              direction="column"
              w="full"
              borderBottom="1px solid"
              borderColor="gray.700"
            >
              <Text>Display Name</Text>

              <InputGroup mt="10px" colorPalette="blue">
                <Input
                  maxLength={18}
                  borderColor="gray.600"
                  variant="outline"
                  pl="5px"
                  placeholder={authUser?.name}
                  value={setterValue?.name || ""}
                  _placeholder={{ color: "white" }}
                  onChange={(e) =>
                    setterFunc((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </InputGroup>
            </Flex>
          </Flex>

          {/*Profile Image Section */}
          <Flex mt="10px" w="100%">
            <Flex
              pb="25px"
              direction="column"
              w="full"
              borderBottom="1px solid"
              borderColor="gray.700"
            >
              <Text>Profile Picture</Text>
              <Button
                onClick={() => profilePicInputRef.current.click()}
                colorPalette="blue"
                w="40%"
                h="35px"
              >
                Change Profile Picture
              </Button>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={profilePicInputRef}
                onChange={handleProfilePicChange}
              />
            </Flex>
          </Flex>

          {/*CoverImage Section */}
          <Flex mt="10px" w="100%">
            <Flex
              pb="25px"
              direction="column"
              w="full"
              borderBottom="1px solid"
              borderColor="gray.700"
            >
              <input
                onChange={handleCoverImageChange}
                type="file"
                ref={profileCoverImageInputRef}
                accept="image/*"
                hidden
              />
              <Text>Cover Image</Text>
              <Button
                onClick={() => profileCoverImageInputRef.current.click()}
                colorPalette="blue"
                w="40%"
                h="35px"
              >
                Change Cover Image
              </Button>
            </Flex>
          </Flex>

          {/*Bio Section */}
          <Flex mt="10px" w="100%">
            <Flex
              pb="25px"
              direction="column"
              w="full"
              borderBottom="1px solid"
              borderColor="gray.700"
            >
              <Text>About Me</Text>
              <Textarea
                placeholder={authUser?.profile?.bio}
                onChange={(e) =>
                  setterFunc((prev) => ({ ...prev, bio: e.target.value }))
                }
                value={setterValue?.bio || ""}
                colorPalette="blue"
                variant="subtle"
                maxW="80%"
                minW="80%"
                p="5px"
                minH="100px"
                maxH="120px"
                maxLength={200}
                resize="none"
                rows="4"
              />
            </Flex>
          </Flex>
        </Flex>

        {/*Previewer */}
        <Flex direction="column" alignItems="center" pt="40px" w="50%">
          <Flex
            pos="relative"
            border="1px solid"
            borderColor="gray.600"
            direction="column"
            rounded="10px"
            bg="gray.700"
            w="65%"
            maxH="78%"
            minH="70%"
          >
            <Flex
              overflow="hidden"
              w="full"
              bg="gray.600"
              roundedTop="10px"
              h="30%"
              maxH="30%"
            >
              {(setterValue?.coverImage || authUser?.profile?.coverImage) && (
                <Image
                  roundedTop="10px"
                  src={setterValue?.coverImage || authUser?.profile?.coverImage}
                  w="full"
                  h="full"
                  minH="full"
                  maxH="full"
                />
              )}
            </Flex>

            <Flex
              rounded="full"
              bg="gray.700"
              alignItems="center"
              justifyContent="center"
              w="70px"
              h="70px"
              pos="absolute"
              left="5%"
              top="15%"
            >
              <Image
                w="90%"
                h="90%"
                rounded="full"
                src={
                  setterValue?.profilePic ||
                  authUser.profile.profilePic ||
                  replacerImage
                }
              />
            </Flex>

            <Flex
              w="100%"
              flexGrow={1}
              pt="30px"
              pl="5px"
              pr="5px"
              roundedBottom="10px"
              direction="column"
            >
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="13px">
                  {setterValue?.name || authUser.name}
                </Text>
                <Text fontSize="13px" color="gray.300">
                  {authUser.username}
                </Text>
              </Flex>
              {(setterValue?.bio || authUser?.profile?.bio) && (
                <Flex
                  fontSize="12px"
                  rounded="5px"
                  mt="10px"
                  p="5px"
                  w="full"
                  bg="gray.800"
                  direction="column"
                >
                  <Text fontSize="12px" color="gray.200">
                    About Me
                  </Text>
                  <Text maxH="90px" overflow="hidden" whiteSpace="pre-line">
                    {(setterValue?.bio || authUser?.profile?.bio)
                      ?.replace(/\r\n/g, "\n") // normalize Windows line endings
                      .replace(/\r/g, "\n") // extra safety
                      .replace(/\n{3,}/g, "\n\n") // collapse big gaps
                      .trim()}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfileSetting;
