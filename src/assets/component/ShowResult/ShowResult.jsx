import { useContext } from "react";
import { AllresultContext } from "../../../App";

const ShowResult = () => {
  const [allResult] = useContext(AllresultContext);
  // console.log(allResult);
  // totalTime,
  // totalSpeed,
  // netSpeed,
  // startTime,
  // error,
  const date = allResult?.startTime;
  const ss = date?.getSeconds();
  const mm = date?.getMinutes();
  const hh = date?.getHours();
  const yy = date?.getFullYear()

  const startDate = `${ss} : ${mm} : ${hh} / ${yy}`;

  return (
    <div
      className="fixed top-0 left-0 w-full p-4
  bg-gray-800
  "
    >
      <div>Start Time: {startDate}</div>
      <div>Total Time: {allResult?.totalTime}</div>
      <div>WPM: {allResult?.netSpeed}</div>
      <div>Gross Typing Speed: {allResult?.totalSpeed}</div>
      <div>Error: {allResult?.error}</div>
    </div>
  );
};

export default ShowResult;
