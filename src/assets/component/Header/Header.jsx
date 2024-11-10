const Header = ({ handleClosedBtn, time }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60); // Get minutes
    const remainingSeconds = seconds % 60; // Get remaining seconds
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };
  const handleReloadPage = () => {
    window.location.reload(true)
  };
  return (
    <div className=" w-full flex justify-between items-center overflow-hidden px-3">
      <button onClick={handleReloadPage} className="bg-black p-2 rounded-md">
        Start
      </button>
      <button className="bg-black p-2 rounded-md">
        Time: <span className="text-red-300">{formatTime(time)}</span>
      </button>
      <button onClick={handleClosedBtn} className="bg-black p-2 rounded-md">
        Close
      </button>
    </div>
  );
};

export default Header;
