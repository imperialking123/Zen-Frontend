import { Text } from "@chakra-ui/react";
import twemoji from "twemoji";

const RenderTextEmoji = ({ children, ...props }) => {
  function isSingleEmoji(text) {
    const emojiRegex =
      /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)(\u200D(\p{Emoji_Presentation}|\p{Emoji}\uFE0F))*$/u;
    return emojiRegex.test(text.trim());
  }

  const isOneEmoji = isSingleEmoji(children);

  const html = twemoji.parse(children, {
    folder: "svg",
    ext: ".svg",
    className: isOneEmoji ? "emoji big" : "emoji",
  });

  return (
    <Text
      {...props}
      whiteSpace="normal"
      wordBreak="break-word"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default RenderTextEmoji;
