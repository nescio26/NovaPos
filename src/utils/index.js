export const getRandomBg = () => {
  const colors = [
    "bg-yellow-500",
    "bg-green-700",
    "bg-amber-800",
    "bg-gray-200",
    "bg-gray-400",
    "bg-gray-900",
    "bg-neutral-700",
    "bg-zinc-800",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};
