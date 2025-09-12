import { Flex, Image } from "@chakra-ui/react";
import replacerImage from "@/assets/default.jpg";
import userPopStore from "@/store/userPopUpStore";
import authUserStore from "@/store/authUserStore";

const StatusMapItem = ({ person, status }) => {
  const { setShowRenderStatus } = userPopStore();
  const { authUser } = authUserStore();

  const imageSize = 40;      // 👈 profile image size
  const strokeWidth = 3;     // 👈 thickness of the ring
  const ringGap = 4;         // 👈 gap between image and ring

  const n = status.length;   // total statuses
  const r = imageSize / 2 + ringGap; // radius = image radius + gap
  const size = imageSize + strokeWidth * 2 + ringGap * 2; // total box size
  const circumference = 2 * Math.PI * r;
  const segmentGap = 6; // spacing between segments
  const dash = circumference / n - segmentGap;
  const dashArray = `${dash} ${circumference}`;

  return (
    <Flex
      onClick={() => setShowRenderStatus(status)}
      alignItems="center"
      justifyContent="center"
      position="relative"
      w={`${size}px`}
      h={`${size}px`}
    >
      {/* Profile image */}
      <Image
        src={person?.profile?.profilePicsm || replacerImage}
        w={`${imageSize}px`}
        h={`${imageSize}px`}
        rounded="full"
      />

      {/* Status ring */}
      <svg
        className="statusRing"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`} // 👈 dynamic box
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {status.map((s, i) => {
          const offset = -(i * (dash + segmentGap));
          const isViewed = s.viewers.includes(authUser._id);

          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="transparent"
              stroke={isViewed ? "#787971ff" : "#0ff053ff"}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={n > 1 ? dashArray : ""}
              strokeDashoffset={offset}
            />
          );
        })}
      </svg>
    </Flex>
  );
};

export default StatusMapItem;
