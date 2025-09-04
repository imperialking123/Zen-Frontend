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

  showCallerPop: false,
  setShowCallerPop: (d) => set({ showCallerPop: d }),

  showCreateStatusPoP: false,
  setShowCreateStatusPop: (d) => set({ showCreateStatusPoP: d }),

  showRenderStatus: null,
  setShowRenderStatus: (d) => set({ showRenderStatus: d }),

  incomingCall: [],
  callRejected: false,
  acceptCall: null,
  setAcceptCall: (d) => set({ acceptCall: d }),
  socketSetIncomingCall: (d) => {
    set({
      incomingCall: [
        ...get().incomingCall.filter((p) => p.tempId !== d.tempId),
        d,
      ],
    });
  },
  socketSetIncomingSenderOffline: (d) => {
    const newCalls = get().incomingCall.filter((p) => p.tempId !== d);
    set({ incomingCall: newCalls });
  },

  socketRejectCall: (d) => set({ callRejected: d }),
}));

export default userPopStore;
