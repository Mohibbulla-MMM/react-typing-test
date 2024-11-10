import { useEffect, useState } from "react";

const useCompareText = (originText, writeText) => {
  const [wrongWord, setWrongWord] = useState(0);

  useEffect(() => {
    if (originText && writeText?.length > 0) {
      const originArr = originText.split(" ");
      let correctMatches = 0;

      // Loop through written text and compare with original text
      for (let i = 0; i < writeText.length; i++) {
        if (originArr[i] === writeText[i]) {
          correctMatches += 1;
        }
      }

      // Update WrongWord based on comparison
      setWrongWord(correctMatches);
    }
  }, [originText, writeText]);

  return { wrongWord };
};

export default useCompareText;
