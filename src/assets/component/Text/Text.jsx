import { useContext, useEffect, useRef, useState } from "react";
import "./Text.css";
import Header from "../Header/Header";
import { AllresultContext } from "../../../App";

const Text = () => {
  const [text, setText] = useState("");
  const [time, setTime] = useState(null);
  const [wrongWordCount, setWrongWordCount] = useState(0);
  // const [writeWordCount, setWriteWordCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const textArr = text?.split(" ");
  const spanRef = useRef();
  const textAreaRef = useRef();
  const writeTextArrRef = useRef([]);
  const [allResult, setAllresult] = useContext(AllresultContext);
  const [hasStarted, setHasStarted] = useState(false);
  const timerRef = useRef(null);
  // console.log(timerRef)
  // let timerCount = 0;
  // State to store result

  // Function to handle the button click
  const handleClosedBtn = () => {
    // console.log(writeTextArrRef.current);
    // console.log("message");

    if (text && writeTextArrRef.current?.length > 0) {
      // console.log("message22");
      clearInterval(timerRef.current);
      const originTextArr = text.split(" ");
      let wrongCounter = 0;
      // Loop through written text and compare with original text
      for (let i = 0; i < writeTextArrRef.current.length; i++) {
        if (originTextArr[i] != writeTextArrRef.current[i]) {
          wrongCounter += 1;
          console.log({ wrong: wrongCounter });
          console.log(originTextArr[i] === writeTextArrRef.current[i]);
        }
      }

      setWrongWordCount(wrongCounter);

      // end date
      const end = new Date();
      console.log(end);
      setEndTime(end);
      // total time
      const totalTime = ((end - startTime) / 1000).toFixed(0);
      // net speed
      const netSpeed = Math.round(
        (writeTextArrRef.current.length - wrongCounter) / (totalTime / 60)
      );
      // total speed
      const totalSpeed = Math.round(
        writeTextArrRef.current.length / (totalTime / 60)
      );
      // total errro
      const error = wrongCounter;
      setAllresult({
        totalTime,
        totalSpeed,
        netSpeed,
        startTime,
        error,
      });
      console.log({
        totalTime,
        totalSpeed,
        netSpeed,
        startTime,
        error,
        writeTextArr: writeTextArrRef.current,
      });
    }
  };

  useEffect(() => {
    const url = "./text.txt";
    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        setText(data);
      });
  }, []);

  // timer on

  const handleKeyPress = (e) => {
    if (e.key === " ") {
      // console.log(writeTextArrRef, textAreaRef.current.value.trim());
      writeTextArrRef.current.push(textAreaRef.current.value.trim());
      if (!hasStarted) setHasStarted(true);
      const firstChildSpan = spanRef.current.firstChild;
      spanRef.current.removeChild(firstChildSpan);
      spanRef.current.firstChild?.classList.add("active-text");
      textAreaRef.current.value = "";
    }
    if (!startTime) {
      setStartTime(new Date());
      spanRef.current.firstChild?.classList.add("active-text");
    }
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    // Timer callback
    let myTimer;
    const handleTimer = () => {
      setTime((prevTime) => prevTime + 1); // Correct way to update based on previous state
    };
    if (hasStarted && !timerRef.current) {
      myTimer = setInterval(handleTimer, 1000); // Increment every second
      timerRef.current = myTimer;
    }

    // console.log(timerRef.current);
    // Cleanup interval when component unmounts
    return () => clearInterval(myTimer);
  }, [hasStarted]);

  return (
    <div>
      <Header handleClosedBtn={handleClosedBtn} time={time} />
      <div className="max-w-xl mx-auto flex items-center justify-center text-3xl pr-4 relative overflow-hidden">
        <div
          className="border-none p-4 line-height bg-transparent flex flex-nowrap gap-2 overflow-hidden"
          ref={spanRef}
        >
          {textArr && textArr.map((txt, i) => <span key={i}>{txt} </span>)}
        </div>

        <textarea
          className="w-full border-0 p-4 line-height bg-transparent absolute flex gap-2 outline-none text-transpa focus:border-b-2 focus:border-white"
          ref={textAreaRef}
          rows={1}
          autoFocus
          onKeyDown={handleKeyPress}
          data-gramm="false"
        ></textarea>
      </div>

      {/* Display the comparison result */}
    </div>
  );
};

export default Text;
