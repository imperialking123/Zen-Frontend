import dayjs from "dayjs";



const MessageMapArranger = (messages) => {
  let lastMessage;
  let lastDate;
  const processedMessages = [];

  for (const message of messages) {
    const currentMessage = message;
    const currentDate = new Date(message.createdAt); 

    const isNewDay =
      !lastDate || !dayjs(currentDate).isSame(dayjs(lastDate), "day");
    if (isNewDay) {
      const divider = {
        _id: `divider-${currentDate.getTime()}`,
        type: "divider",
        date: currentDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      };
      processedMessages.push(divider);
    } // Avatar Logic

    let showAvatar = true;
    if (lastMessage) {
      const isSameSender = currentMessage.senderId === lastMessage.senderId;
      const isTimeGap = dayjs(currentDate).diff(dayjs(lastDate), "minute") > 1;
      const isDifferentType = currentMessage.type !== lastMessage.type;
      if (isSameSender && !isTimeGap && !isDifferentType) {
        showAvatar = false;
      }
    } 

    processedMessages.push({ ...currentMessage, showAvatar });

    
    lastMessage = currentMessage;
    lastDate = currentDate;
  }

  return processedMessages;
};

export default MessageMapArranger