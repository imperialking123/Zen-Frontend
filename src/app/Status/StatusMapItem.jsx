import { Flex, Image } from "@chakra-ui/react";
import replacerImage from "@/assets/default.jpg";
import userPopStore from "@/store/userPopUpStore";

const StatusMapItem = ({ person, status }) => {
  const n = status.length;
  const r = 24;
  const circumference = 2 * Math.PI * r;

  const gap = 7; // tweak until it looks right
  const dash = circumference / n - gap;

  const dashArray = `${dash} ${gap}`;

  const { setShowRenderStatus } = userPopStore();

  return (
    <Flex
      onClick={() => setShowRenderStatus(status)}
      w="full"
      alignItems="center"
      justifyContent="center"
      pos="relative"
    >
      <Image
        src={person.profile.profilePicsm || replacerImage}
        w="45px"
        h="45px"
        rounded="full"
      />

      <svg className="statusRing" width="55" height="55">
        <circle
          cx="27.5"
          cy="27.5"
          r={24}
          fill="transparent"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={status.length > 1 ? dashArray : ""}
        />
      </svg>
    </Flex>
  );
};

export default StatusMapItem;
