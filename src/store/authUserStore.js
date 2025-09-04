import axiosInstance from "@/config/AxiosInstance";
import { toast } from "sonner";
import { create } from "zustand";
import { io } from "socket.io-client";
import userPopStore from "./userPopUpStore";

const authUserStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/users/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  permitEmail: false,
  isCheckingEmail: false,

  checkEmail: async (data, func) => {
    set({ isCheckingEmail: true });
    try {
      await axiosInstance.post("/users/check/email", data);
      set({ permitEmail: true });
      func(true);
    } catch (error) {
      set({ permitEmail: false });
      return toast.error(
        error.response?.data?.message || "Bad internet connection"
      );
    } finally {
      set({ isCheckingEmail: false });
    }
  },

  usernameMessage: null,
  isUsernameValid: false,
  isCheckingUsername: false,
  checkUsername: async (username) => {
    set({ isCheckingUsername: true });
    try {
      const res = await axiosInstance.post("users/find/username", {
        username: username,
      });
      set({ usernameMessage: res.data.message });
      set({ isUsernameValid: true });
    } catch (error) {
      set({ isUsernameValid: false });
      set({
        usernameMessage:
          error?.response?.data?.message || "Bad Internet Connection",
      });
    } finally {
      set({ isCheckingUsername: false });
    }
  },
  clearUsernameMessage: () => set({ usernameMessage: null }),

  isRegistering: false,
  resendId: null,
  confirmationMessage: "Check email for confirmation code",

  register: async (data, setSteps) => {
    set({ isRegistering: true });
    try {
      const res = await axiosInstance.post("/users/register", data);
      set({ resendId: res.data.resendId });
      set({ confirmationMessage: res.data.message });
      toast.success("Check email for confirmation code");
      setSteps(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Bad internet connection");
    } finally {
      set({ isRegistering: false });
    }
  },

  isVerifying: false,
  verifyOtp: async (data) => {
    set({ isVerifying: true });
    try {
      const res = await axiosInstance.post("users/verify", { code: data });
      toast.success(res.data?.message);
      get().connectSocket();
      await get().checkAuth();
    } catch {
      get().checkAuth();
    } finally {
      set({ isVerifying: false });
    }
  },

  resendOtp: async (code) => {
    try {
      const res = await axiosInstance.post("/users/confirm/resend", {
        objectId: code,
      });
      set({ confirmationMessage: res.data.message });
      set({ resendId: res.data.objectId });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  handleGoogle: async (code) => {
    try {
      const res = await axiosInstance.post("/users/google", { code: code });
      toast.success(res.data.message);
      get().connectSocket();
    } catch (error) {
      get().checkAuth();
    }
  },

  isLogingIn: false,
  login: async (data) => {
    set({ isLogingIn: true });
    try {
      const res = await axiosInstance.post("/users/login", data);
      toast.success(res.data.message);
      get().connectSocket();
      get().checkAuth();
    } catch (error) {
      toast.error(error.response?.data?.message || "Bad internet connection");
    } finally {
      set({ isLogingIn: false });
    }
  },

  connectSocket: () => {
    const findSocket = get().socket;
    if (findSocket) {
      return;
    }
    const VITE_BACKEND_SOCKET_URL = import.meta.env.VITE_BACKEND_SOCKET_URL;
    const userId = get().authUser._id;
    const socket = io(VITE_BACKEND_SOCKET_URL, {
      query: { userId, userId },
      withCredentials: true,
    });

    set({ socket: socket });
  },

  isUpdatingProfile: false,
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    userPopStore.setState({ showSettings: null });
    try {
      const res = await axiosInstance.patch("/profile/update", { ...data });
      set({ authUser: res.data });
      userPopStore.setState({ showSettings: false });
    } catch {
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));

export default authUserStore;
