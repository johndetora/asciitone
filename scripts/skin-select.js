// This function is used to select different color themes
export function skinSwapper() {
    const skinSwapBtn = document.querySelector('#skinSwap');
    const skinSelector = document.getElementById('skin');
    const allSkins = ['light', 'dark', 'metro', 'dune', 'nord', 'dmg', 'sol-light', '9009'];
    let skinIndex = 1;
    skinSwapBtn.addEventListener('click', () => {
        let skin = allSkins[skinIndex % allSkins.length];
        console.log(skin);
        skinSelector.setAttribute('href', `skins/${skin}.css`);
        skinSwapBtn.innerText = `[ ${skin} ]`;
        //  return (skin = 'dark');
        skinIndex++;
    });
}
