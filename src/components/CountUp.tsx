import { useEffect, useState } from "react";

export default function CountUp({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const isPercent = value.includes("%");
  const isPlus = value.includes("+");

  useEffect(() => {
    let start = 0;
    const duration = 1800; // 1.8 seconds
    const intervalTime = 16;
    const step = numericTarget / (duration / intervalTime);

    const timer = setInterval(() => {
      start += step;
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [numericTarget]);

  return (
    <span>
      {count}
      {isPercent && "%"}
      {isPlus && "+"}
    </span>
  );
}
