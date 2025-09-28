import notifySound from "@/assets/notify.mp3";
export const notify = () => {
  const audio = new Audio(notifySound);
  audio.autoplay = false;
  audio.play();
};


