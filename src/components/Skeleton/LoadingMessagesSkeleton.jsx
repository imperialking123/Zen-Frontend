import {
  Box,
  HStack,
  VStack,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

/**
 * Deterministic pattern per message so it doesn't look repetitive.
 * Each message has an array of "pills" (widths) that render on the same line.
 * Sometimes a message has an image block.
 */
const MESSAGES = [
  { pills: ["42%", "8%", "10%", "26%"], image: false },
  { pills: ["18%", "6%", "6%", "28%", "30%"], image: true }, // image message
  { pills: ["36%", "10%", "20%"], image: false },
  { pills: ["22%", "8%", "10%", "12%", "20%"], image: false },
  { pills: ["50%", "18%"], image: true },
  { pills: ["28%", "8%", "12%", "30%"], image: false },
  { pills: ["40%", "10%", "8%"], image: false },
];

const PillsRow = ({ pills, messageStart, messageEnd }) => {
  return (
    <HStack
      spacing={2}
      align="center"
      flexWrap="wrap"
      // Ensures pills stay on a single line until wrap needed
      // and gives the "flexed" look you asked for.
      w="full"
    >
      {pills.map((w, idx) => (
        <Skeleton
          variant="shine"
          key={idx}
          height="11px"
          width={w}
          borderRadius="full"
          startColor={messageStart}
          endColor={messageEnd}
        />
      ))}
    </HStack>
  );
};

const MessageSkeleton = ({
  pills,
  image,
  avatarStart,
  avatarEnd,
  messageStart,
  messageEnd,
}) => {
  return (
    <HStack align="start" spacing={4} w="full">
      {/* Avatar uses a DIFFERENT start/end color to match Discord's look */}
      <SkeletonCircle
        variant="shine"
        boxSize="44px"
        startColor={avatarStart}
        endColor={avatarEnd}
        flexShrink={0}
      />

      <VStack align="start" spacing={2} w="full">
        {/* Short header row */}
        <HStack spacing={3}>
          <Skeleton
            variant="shine"
            h="12px"
            w="120px"
            borderRadius="full"
            startColor={messageStart}
            endColor={messageEnd}
          />
          <Skeleton
            variant="shine"
            h="12px"
            w="48px"
            borderRadius="full"
            startColor={messageStart}
            endColor={messageEnd}
          />
        </HStack>

        {/* The single-line "flexed" pills row (looks like a line with many small skeletons) */}
        <PillsRow
          pills={pills}
          messageStart={messageStart}
          messageEnd={messageEnd}
        />

        {/* Random extra line sometimes */}
        <Skeleton
          h="8px"
          w="60%"
          borderRadius="full"
          variant="shine"
          startColor={messageStart}
          endColor={messageEnd}
        />

        {/* Optional image/file block */}
        {image && (
          <Skeleton
            variant="shine"
            h={{ base: "160px", md: "220px" }}
            w={{ base: "92%", md: "68%" }}
            borderRadius="md"
            startColor={messageStart}
            endColor={messageEnd}
          />
        )}
      </VStack>
    </HStack>
  );
};

const ChatSkeleton = ({ messages = MESSAGES, px = 6 }) => {
  // Colors tuned for both light and dark modes.
  // Avatar uses a slightly lighter/darker tint than message bubbles.
  const messageStart = useColorModeValue("gray.200", "gray.600");
  const messageEnd = useColorModeValue("gray.300", "gray.500");

  // Avatar color is intentionally different (a subtle contrast).
  const avatarStart = useColorModeValue("gray.100", "gray.500");
  const avatarEnd = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      w="full"
      px={px}
      py={4}
      overflowY="auto"
      // Apply skeleton shimmer colors globally for consistency fallback
      sx={{
        "& .chakra-skeleton": {
          startColor: messageStart,
          endColor: messageEnd,
        },
      }}
    >
      <VStack spacing={6} align="stretch">
        {messages.map((m, i) => (
          <MessageSkeleton
            key={i}
            pills={m.pills}
            image={m.image}
            avatarStart={avatarStart}
            avatarEnd={avatarEnd}
            messageStart={messageStart}
            messageEnd={messageEnd}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default ChatSkeleton;
