import { create } from "zustand";

const userCallStore = create((set, get) => ({
  incomingCall: [],
  outGoingCall: null,

  setOutgoingCall: (d) => {
    const outGoingCall = get().outGoingCall;
    if (!outGoingCall) {
      set({ outGoingCall: d });
    }
  },

  socketIncomingCall: (d) => {
    set({ incomingCall: [...get().incomingCall, d] });
  },

  allowedToRing: false,
  setAllowedToRing: (d) => set({ allowedToRing: d }),

  acceptedCall: null,
  setAcceptedCall: (d) => {
    const allIncomingCalls = get().incomingCall;
    const filteredCalls = allIncomingCalls.filter((p) => p.tempId !== d.tempId);
    set({ acceptedCall: d, incomingCall: filteredCalls, allowedToRing: false });
  },

  showVideoRequest: null,
  setShowVideoRequest: (d) => set({ showVideoRequest: d }),
}));

export default userCallStore;
