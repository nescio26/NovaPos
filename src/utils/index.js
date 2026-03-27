export const getRandomBg = () => {
  const colors = [
    "bg-yellow-500",
    "bg-green-700",
    "bg-amber-800",
    "bg-gray-900",
    "bg-neutral-700",
    "bg-zinc-800",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

export const getBgColor = () => {
  const bgarr = [
    "#b73e3e",
    "#5b45b0",
    "#7f167f",
    "#735f32",
    "#1d2569",
    "#285430",
  ];
  const randomBg = Math.floor(Math.random() * bgarr.length);
  const color = bgarr[randomBg];
  return color;
};

export const getAvatarName = (name) => {
  if (!name) return "";

  return name
    .split(" ")
    .map((world) => world[0])
    .join("")
    .toUpperCase();
};

export const formatDate = (date) => {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (date) => {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
