//////////////// DESKTOP TABS ///////////////
export function tabController() {
    desktopTabController();
    mobileTabController();
}

function desktopTabController() {
    const desktopTab = document.getElementById('fx-swap');
    const synthOverlay = document.getElementById('ascii-synth-overlay');
    const fxOverlay = document.getElementById('ascii-fx-overlay');
    const fxControls = document.querySelector('#fx-container');
    const synthControls = document.querySelector('#synth-container');
    const asciiFx = '| fx |';
    const asciiSynth = '| synth |';
    let tabState = 'synth';
    desktopTab.addEventListener('click', () => {
        if (tabState === 'fx') {
            console.log('fx state');
            synthControls.style.display = 'grid';
            fxControls.style.display = 'none';
            desktopTab.innerText = asciiFx;
            synthOverlay.style.display = 'block';
            fxOverlay.style.display = 'none';
            tabState = 'synth';
        } else {
            fxControls.style.display = 'grid';
            synthControls.style.display = 'none';
            desktopTab.innerText = asciiSynth;
            console.log('synth state');
            synthOverlay.style.display = 'none';
            fxOverlay.style.display = 'block';
            tabState = 'fx';
        }
    });
}

///////////// MOBILE TABS //////////////
function mobileTabController() {
    const fxSwapTab = document.getElementById('fx-swap-tab');
    const synthSwap = document.getElementById('synth-swap');
    const seqSwap = document.getElementById('seq-swap');
    const tabContainer = document.querySelector('#tabs-container-mobile');
    const swapLabels = document.querySelectorAll('#param-swap-text');
    let tabState = 'seq';
    tabContainer.addEventListener('click', ({ target }) => {
        tabState = target.dataset.state;
        // make highlighted text bold
        swapLabels.forEach(element => {
            element.style.fontWeight = 'normal';
            target.style.fontWeight = 'bold';
        });
        if (tabState === 'seq') {
            stepContainer.style.display = 'grid';
            synthControls.style.display = 'none';
            fxControls.style.display = 'none';
            seqSwap.style.display = 'bold';
        } else if (tabState === 'synth') {
            stepContainer.style.display = 'none';
            synthControls.style.display = 'grid';
            fxControls.style.display = 'none';
            synthSwap.style.fontWeight = 'bold';
        } else if (tabState === 'fx') {
            stepContainer.style.display = 'none';
            synthControls.style.display = 'none';
            fxControls.style.display = 'grid';
            fxSwapTab.style.fontWeight = 'bold';
        }
    });
}
