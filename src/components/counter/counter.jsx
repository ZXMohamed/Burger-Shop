import { Children, cloneElement, useEffect, useRef } from "react";
import { animate } from "framer-motion";

function Counter({ from = 0, to, animationOptions, children = <span></span> }) {

    const nodeRef = useRef(null);

    useEffect(() => {
        const numberShape = Number.isAllInteger(from, to) ?
            (value = 0) => value.toFixed(0) :
            (value = 0, count = 3) => value.toFixed(count);
        
        const controls = animate(parseFloat(from), parseFloat(to), {
            duration: 1,
            ...animationOptions,
            onUpdate(value) {
                if (nodeRef.current)
                    nodeRef.current.textContent = numberShape(value, 3);
            },
            onComplete() {
                if (nodeRef.current)
                    nodeRef.current.textContent = to.toString();
            }
        });

        return () => controls.stop();

    }, [from, to, animationOptions]);

    return Children.map(Children.toArray(children), (child, inx) => {
        if (inx === 0 && child && typeof child === 'object' && 'type' in child) {
            return cloneElement(child, { ref: nodeRef });
        }
        return child;
    });
}

export default Counter;
