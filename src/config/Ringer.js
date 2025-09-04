import mp3 from "@/assets/notify.mp3";
export const notify = () => {
  const audio = new Audio(mp3);
  audio.play();
};


