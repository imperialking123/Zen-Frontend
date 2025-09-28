import axiosInstance from "@/config/AxiosInstance";

import { create } from "zustand";
import authUserStore from "./authUserStore";

const userChatStore = create((set, get) => ({
  convoSelected: null,
  conversations: [],

  selectConvo: (d) => set({ convoSelected: d }),
  createConvo: async (username) => {
    try {
      const authUser = authUserStore.getState().authUser;
      const res = await axiosInstance.post("/conversations/add", { username });
      const fullConvo = res.data;
      const other = fullConvo.participants.find((p) => p._id !== authUser._id);
      const refinedConvo = {
        ...fullConvo,
        otherParticipant: other,
      };

      set({
        conversations: [
          ...get().conversations.filter((p) => p._id !== refinedConvo._id),
          refinedConvo,
        ],
        convoSelected: refinedConvo,
      });
      return;
    } catch {
      return;
    }
  },
  getAllConvo: async () => {
    const authUser = authUserStore.getState().authUser;
    const res = await axiosInstance.get("/conversations/all");
    const refinedConvo = res.data.map((convo) => {
      const other = convo.participants.find((p) => p._id !== authUser._id);

      return {
        ...convo,
        otherParticipant: other,
      };
    });

    set({ conversations: refinedConvo });
  },
  messages: [],
  isFetchingMessage: false,
  getMessages: async (convoId) => {
    set({ isFetchingMessage: true });
    const newConversations = get().conversations.map((convo) => {
      const authUser = authUserStore.getState().authUser;
      if (convo._id === convoId) {
        const newCount = (convo.unreadCounts[authUser._id] || 0) + 1;

        return {
          ...convo,
          unreadCounts: {
            ...(convo.unreadCounts[authUser._id] = newCount),
          },
        };
      }
      return {
        ...convo,
      };
    });
    set({ conversations: newConversations });
    try {
      const res = await axiosInstance.get(`/messages/get/${convoId}`);
      set({ messages: res.data });
    } catch {
    } finally {
      set({ isFetchingMessage: false });
    }
  },
  sendMessage: async (data) => {
    const fulldata = {
      ...data,
      tempId: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    set({ messages: [...get().messages, fulldata] });
    try {
      const res = await axiosInstance.post("/messages/send", fulldata);
      set({
        messages: [
          ...get().messages.filter((p) => p.tempId !== res.data.tempId),
          res.data,
        ],
      });

      if (res.data.conversation) {
        console.log(res.data.conversation);
        set({
          conversations: [
            ...get().conversations.filter(
              (p) => p._id !== res.data.conversation._id
            ),
            res.data.conversation,
          ],
        });
      }
    } catch {}
  },

  socketArrangeMessage: async (message) => {
    const { convoSelected, messages, conversations } = get();
    const authUser = authUserStore.getState().authUser;

    if (convoSelected && convoSelected._id === message.conversationId) {
      set({ messages: [...messages, message] });

      const socket = authUserStore.getState().socket;
      if (socket) {
        socket.emit("markRead", {
          conversationId: message.conversationId,
          user: authUser._id,
        });
      }
    }

    if (!convoSelected || convoSelected._id !== message.conversationId) {
      if (!conversations) return;

      const newConversations = conversations.map((convo) => {
        if (convo._id === message.conversationId) {
          const newUnreadCount = (convo.unreadCounts?.[authUser._id] || 0) + 1;
          return {
            ...convo,
            unreadCounts: {
              ...convo.unreadCounts,
              [authUser._id]: newUnreadCount,
            },
            lastMessage: message,
          };
        }
        return convo;
      });

      set({ conversations: newConversations });
    }

    const findOne = conversations?.some(
      (p) => p._id === message.conversationId
    );

    if (!findOne) {
      try {
        const res = await axiosInstance.get(
          `conversations/get/${message.conversationId}`
        );

        const otherUser = res.data.participants.find(
          (p) => p._id !== authUser._id
        );

        const fullConvo = {
          ...res.data,
          otherParticipant: otherUser,
        };

        set({
          conversations: [
            ...get().conversations.filter((p) => p._id !== fullConvo._id),
            fullConvo,
          ],
        });
      } catch {}
    }
  },

  isGettingConvo: false,
  handleDirect: (user) => {
    const conversations = get().conversations;

    const isConvoAvailable = conversations.filter(
      (convo) => convo.otherParticipant._id === user._id
    );

    if (isConvoAvailable.length > 0) {
      set({ convoSelected: isConvoAvailable[0] });

      return "Available";
    } else {
      const tempConvo = {
        _id: crypto.randomUUID(),
        participants: [authUserStore.getState().authUser, user],
        otherParticipant: user,
        isTemp: true,
      };

      set({ convoSelected: tempConvo, isGettingConvo: true });

      return tempConvo;
    }
  },

  continueDirect: async (convo) => {
    try {
      const res = await axiosInstance.post("/conversations/add", convo);
      set({ convoSelected: res.data });
    } catch {
    } finally {
      set({ isGettingConvo: false });
    }
  },

  renderDisplayUser: null,
  setRenderDisplayUser: (d) => set({ renderDisplayUser: d }),
}));

export default userChatStore;
