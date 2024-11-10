import { createContext, useState } from "react";
import ShowResult from "./assets/component/ShowResult/ShowResult";
import Text from "./assets/component/Text/Text";
import TypingMainBox from "./assets/component/TypingMainBox/TypingMainBox";
import LoadingPopup from "./assets/shared/LoadingPopup/LoadingPopup";
export const AllresultContext = createContext({});
function App() {
  const [allResult, setAllresult] = useState({});

  return (
    <>
      <div className=" p-8 max-w-5xl m-auto">
        <AllresultContext.Provider value={[allResult, setAllresult]}>
          <TypingMainBox />
          <ShowResult />
        </AllresultContext.Provider>
      </div>
    </>
  );
}

export default App;
