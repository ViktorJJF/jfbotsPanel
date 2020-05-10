let addCustomScript = (src) => {
    let recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', src);
    recaptchaScript.async = true;
    document.head.appendChild(recaptchaScript)
}

export {
    addCustomScript
}