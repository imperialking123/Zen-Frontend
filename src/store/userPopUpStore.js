import { create } from "zustand";

const userPopStore = create((set, get) => ({
  showFriendsPoP: false,
  setFriendsPopup: (data) => set({ showFriendsPoP: data }),

  showFailedtoSendRequest: false,
  setShowFailedTosendRequest: (data) => set({ showFailedtoSendRequest: data }),

  showAddConvo: false,
  setShowAddconvo: (data) => set({ showAddConvo: data }),

  SliderNum: 0,
  SetSliderNum: (num) => set({ SliderNum: num }),

  TopText: "Friends",
  setTopText: (txt) => set({ TopText: txt }),

  showSettings: false,
  setShowSettings: (d) => set({ showSettings: d }),

  showCreateStatusPoP: false,
  setShowCreateStatusPop: (d) => set({ showCreateStatusPoP: d }),

  showRenderStatus: null,
  setShowRenderStatus: (d) => set({ showRenderStatus: d }),

  showMediaPop: false,
  setShowMediaPop: (d) => set({ showMediaPop: d }),
}));

export default userPopStore;
