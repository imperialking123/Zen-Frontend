import axiosInstance from "@/config/AxiosInstance";
import { create } from "zustand";
import userPopStore from "./userPopUpStore";
import userFriendStore from "./userFriendStore";
import authUserStore from "./authUserStore";

const userStatusStore = create((set, get) => ({
  MyStatus: [],
  FriendStatus: [],

  isCreatingStatus: null,
  createStatus: async (data) => {
    set({ isCreatingStatus: true });
    userPopStore.setState({ showCreateStatusPoP: false });
    try {
      const res = await axiosInstance.post("/status/add", data);
      set({ MyStatus: [res.data, ...get().MyStatus] });
    } catch {
    } finally {
      set({ isCreatingStatus: false });
    }
  },

  getAllMyStatus: async () => {
    try {
      const res = await axiosInstance.get("/status/all/me");
      set({ MyStatus: res.data });
    } catch {}
  },
  getFriendsStatus: async () => {
    try {
      const res = await axiosInstance.get("/status/all/friends");
      set({ FriendStatus: res.data });
    } catch {}
  },

  socketNewStatus: (data) => {
    const FriendStatus = get().FriendStatus;

    const friendIndex = FriendStatus.findIndex(
      (status) => status.friend._id.toString() === data.creatorId.toString()
    );

    if (friendIndex !== -1) {
      // Friend exists, append status
      const updated = FriendStatus.map((status, index) =>
        index === friendIndex
          ? { ...status, allStatus: [...status.allStatus, data] }
          : status
      );
      set({ FriendStatus: updated });
    } else {
      // Friend doesn't exist in status yet
      const friendProfile = userFriendStore
        .getState()
        .friends.find((f) => f._id.toString() === data.creatorId.toString());

      if (!friendProfile) return; // friend not found, ignore

      const newFriendStatus = {
        friend: friendProfile,
        allStatus: [data],
      };

      set({ FriendStatus: [...FriendStatus, newFriendStatus] });
    }
  },

  setViewedStatus: (creatorId, statusId, myself) => {
    if (myself === creatorId) return;
    const statuses = get().FriendStatus;

    const particularFriend = statuses.find((p) => p.friend._id === creatorId);
    if (!particularFriend) return;

    const targetStatus = particularFriend.allStatus.find(
      (s) => s._id === statusId
    );
    if (!targetStatus) return;

    if (!targetStatus.viewers.includes(myself)) {
      targetStatus.viewers.push(myself);
      const socket = authUserStore.getState().socket;
      if (!socket) return;
      socket.emit("viewedStatus", { creatorId, statusId, myself });
    }
  },
}));

export default userStatusStore;
