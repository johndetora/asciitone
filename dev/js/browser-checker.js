export function browserChecker() {
    //TODO: Refactor this to its own function.  Add web browser check
    let OSName = 'Unknown OS';
    if (navigator.appVersion.indexOf('Win') != -1) OSName = 'Windows';
    if (navigator.appVersion.indexOf('Mac') != -1) OSName = 'MacOS';
    else OSName = 'Linux (probably)';
    console.log('Your OS: ' + OSName);
    const overlay = document.querySelector('.overlay');
    if (navigator.appVersion.indexOf('Win') != -1) {
        overlay.style.left = '-103px';
    }
}
