//*images load in small size low quality at first time for best performance
//*then loadImage() function load the main image in full size and best quality

import homeBackground from "./homeBackground.TEMP.jpg";
import gradientBackground from "./gradientBackground.TEMP.png";
import founderBackground from "./founderBackground.TEMP.webp";

import burger1 from "./burger1.TEMP.png";
import burger2 from "./burger2.TEMP.png";
import burger3 from "./burger3.TEMP.png";

import owner from "./owner.TEMP.jpg";

import loading from "./loading.gif";

import logo from "./logo.svg";

export {
    homeBackground,
    gradientBackground,
    founderBackground,
    burger1,
    burger2,
    burger3,
    owner,
    loading,
    logo
};

//*this function 
//*{ type:"img | background" }
export async function loadMainImage(image, ref, options, onError = () => { }) {

    requestIdleCallback(async () => {
        
        const mainImage = image.replace(".TEMP", "");
        const response = await fetch(mainImage);
    
        if (!response.ok) {
            onError();
        }
    
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        
        if (options.type == "img") {
            ref.current.src = blobUrl;
        } else if (options.type == "background") {
            ref.current.style.backgroundImage = `url(${blobUrl})`;
        }

    });
    
}