// "use client";

// import { useState, useRef, useEffect, ChangeEvent } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { clearInterval } from "timers";

// export default function Countdown() {
//   const [duration, setDuration] = useState<number | string>("");
//   const [timeLeft, setTimeLeft] = useState<number>(0);
//   const [isActive, setIsActive] = useState<boolean>(false);
//   const [isPaused, setIsPaused] = useState<boolean>(false);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   const handleSetDuration = (): void => {
//     if (typeof duration === "number" && duration >0) {
//       setTimeLeft(duration);
//       setIsActive(false);
//       setIsPaused(false);
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     }
//   };
//   const handleStart = (): void => {
//     if (timeLeft > 0) {
//       setIsActive(true);
//       setIsPaused(false);
//     }
//   };
//   const handlePause = (): void => {
//     if (isActive) {
//       setIsPaused(true);
//       setIsActive(false);
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     }
//   };
//   const handleReset = (): void => {
//     setIsActive(false);
//     setIsPaused(false);
//     setTimeLeft(typeof duration === "number" ? duration : 0);
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//     }
//   };
//   useEffect(() => {
//     if (isActive && !isPaused) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prevTime) => {
//           if (prevTime <= 1) {
//             clearInterval(timerRef.current!);
//             return 0;
//           }
//           return prevTime - 1;
//         });
//       }, 1000);
//     }
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, [isActive, isPaused]);

//   const formatTime = (time: number): string => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
//       2,
//       "0"
//     )}`;
//   };

//   const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     setDuration(Number(e.target.value) || "");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-slate-800">
//       <div className="bg-white dark:bg-gray-800  shadow-lg rounded-lg  p-8 before:max-w-md w-full space-y-6">
//         <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
//           Countdown Timer
//         </h1>
//         <div className="flex items-center mb-6">
//           <Input
//             type="number"
//             id="duration"
//             className="mr-4 flex-1 rounded-md border-gray-300 dark:border-gray-200"
//             placeholder="Enter duration in seconds"
//             value={duration}
//             onChange={handleDurationChange}
//           />
//           <Button
//             onClick={handleSetDuration}
//             variant="outline"
//             className="text-gray-800 dark:text-gray-200"
//           >
//             set
//           </Button>
//         </div>
//         <div className="text-6xl  font-bold text-gray-800 dark:text-gray-200 mb-8 text-center ">
//           {formatTime(timeLeft)}
//         </div>
//         <div className="flex justify-center gap-4">
//           <Button
//             onClick={handleStart}
//             variant="outline"
//             className="text-gray-800 dark:text-gray-200"
//           >
//             {isPaused ? "Resume" : "Start"}
//           </Button>
//           <Button
//             onClick={handlePause}
//             variant="outline"
//             className="text-gray-800 dark:text-gray-200"
//           >
//             pause
//           </Button>
//           <Button
//             onClick={handleReset}
//             variant="outline"
//             className="text-gray-800 dark:text-gray-200"
//           >
//             Reset
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Countdown() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    const numericDuration = Number(duration);
    if (numericDuration > 0) {
      setTimeLeft(numericDuration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleStart = (): void => {
    if (timeLeft > 0 && !isActive) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-500 shadow-lg rounded-full p-8 border-b-8 w-2/3 space-y-6">
        <h1 className="text-5xl font-bold mb-4  flex justify-center text-white">
          Countdown Timer
        </h1>
        <div className="flex justify-center mb-4 w-2/3 ml-32 ">
          <Input
            type="number"
            id="duration"
            className="mr-4 text-lg flex-1 rounded-xl border-b-4 border-gray-600"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="bg-gray-700 text-white hover:bg-gray-600"
          >
            Set
          </Button>
        </div>
        <div className="text-6xl font-bold text-white mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="bg-gray-700 text-white hover:bg-gray-600"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="bg-gray-700 text-white hover:bg-gray-600"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="bg-gray-700 text-white hover:bg-gray-600"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
