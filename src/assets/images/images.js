//*images load in small size low quality at first time for best performance
//*then loadImage() function load the main image in full size and best quality

import axios from "axios";

import homeBackground from "./homeBackground.TEMP.webp";
import gradientBackground from "./gradientBackground.TEMP.webp";
import founderBackground from "./founderBackground.TEMP.webp";

import burger1 from "./burger1.TEMP.webp";
import burger2 from "./burger2.TEMP.webp";
import burger3 from "./burger3.TEMP.webp";

import owner from "./owner.TEMP.webp";

import loading from "./loading.webp";

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

    if (window.requestIdleCallback) {
        requestIdleCallback(async () => {
            await load(image, ref, options, onError);
        });
    } else {
        await load(image, ref, options, onError);
    }

    async function load(image, ref, options, onError = () => { }) {
        const mainImage = image.replace(".TEMP", "");
        try {
            const response = await axios.get(mainImage, { responseType: "blob" });
            const blob = response.data;
            const blobUrl = URL.createObjectURL(blob);

            if (options.type === "img") {
                ref.current?.src && (ref.current.src = blobUrl);
            } else if (options.type === "background") {
                ref.current?.style && (ref.current.style.backgroundImage = `url(${blobUrl})`);
            }
        } catch (error) {
            onError();
        }
    }
}