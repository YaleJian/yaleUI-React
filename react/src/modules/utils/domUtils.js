let animated_up = " animated fastest fadeOutUp";
let DomUtils = {
    remove : (obj)=>{
        obj.className += animated_up;
        setTimeout(() => obj.remove(), 300);
    },
    getTextLength : (text)=>{
        let span = document.createElement("span");
        span.innerHTML = text;
        document.body.appendChild(span);
        let length = span.offsetWidth;
        span.remove();
        return length;
    }
};
export default DomUtils;