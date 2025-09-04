import axiosInstance from "@/config/AxiosInstance";
import { create } from "zustand";
import userPopStore from "./userPopUpStore";

const userFriendStore = create((set, get) => ({
  friends: [],
  onlineFriends: [],
  requests: [],
  pending: [],

  deletePending: async (pendingId) => {
    try {
      const filteredPending = get().pending.filter(
        (pend) => pend._id !== pendingId
      );
      set({ pending: filteredPending });
      const res = await axiosInstance.post("/friends/delete/pending", {
        pendingId: pendingId,
      });
      console.log(res.data);
    } catch {}
  },
  getFriends: async () => {
    try {
      const res = await axiosInstance.get("/friends/get");
      set({ friends: res.data });
    } catch {}
  },
  getAllRequest: async () => {
    try {
      const res = await axiosInstance.get("/friends/all/request");
      set({ requests: res.data });
    } catch {}
  },
  getAllPending: async () => {
    try {
      const res = await axiosInstance.get("friends/all/pending");
      set({ pending: res.data });
    } catch {}
  },
  rejectReq: async (requestId) => {
    try {
      const res = await axiosInstance.post("/friends/reject/request ", {
        requestId,
      });
      const filteredRequest = get().requests.filter(
        (req) => req._id !== requestId
      );

      set({ requests: filteredRequest });
    } catch {}
  },
  acceptReq: async (requestId) => {
    try {
      const refinedRequest = get().requests.filter(
        (req) => req._id !== requestId
      );
      set({ requests: refinedRequest });
      const res = await axiosInstance.post("/friends/accept", { requestId });
      console.log(res.data);
      set({ friends: [...get().friends, res.data] });
    } catch (error) {}
  },
  socketOnlineFriends: (data) => set({ onlineFriends: data }),
  newSocketOnlineFriend: (data) =>
    set({ onlineFriends: [...get().onlineFriends, data] }),

  socketDisconnect: (data) => {
    set((state) => ({
      onlineFriends: state.onlineFriends.filter(
        (user) => user.toString() !== data.toString()
      ),
    }));
  },
  socketDeleteRequest: (requestId) => {
    const filteredRequest = get().requests.filter(
      (req) => req._id !== requestId
    );
    set({ requests: filteredRequest });
  },
  socketNewRequest: (data) => {
    set({ requests: [...get().requests, data] });
  },
  socketNewAcceptedRequest: (data) =>
    set((state) => {
      const alreadyExists = state.friends.some(
        (f) => f._id === data._id 
      );

      return alreadyExists
        ? state 
        : { friends: [...state.friends, data] };
    }),
  isSendingRequest: false,
  sentReqMessage: null,
  sendFriendReq: async (username) => {
    set({ isSendingRequest: true });
    try {
      const res = await axiosInstance.post("/friends/add", {
        username: username,
      });
      set({ pending: [...get().pending, res.data.data] });
      set({ sentReqMessage: res.data.message });
    } catch (error) {
      set({ isSendingRequest: false });
      userPopStore.setState({
        showFailedtoSendRequest: error?.response?.data?.message,
      });
    } finally {
      set({ isSendingRequest: false });
    }
  },
  clearReqMessage: () => set({ sentReqMessage: null }),

}));

export default userFriendStore;
