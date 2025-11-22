import { LanguageContext } from "./languageContext";
import { changeLanguage } from "./utils/changeLanguage";


export const LanguageProvider = ({ children }) => {

  return (
    <LanguageContext.Provider value={{ changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};