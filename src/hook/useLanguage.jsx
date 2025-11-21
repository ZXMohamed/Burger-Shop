import React, { useContext } from 'react'
import { LanguageContext } from '../language/languageContext';

function useLanguage() {
    
    const languageControl = useContext(LanguageContext);

    return languageControl;
}

export default useLanguage;