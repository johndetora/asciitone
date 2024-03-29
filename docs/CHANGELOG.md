# Change Log

All notable changes to ascii-tone will be documented in this file.

## v0.4.1 - 2021-07-01

### Added

-   Tap tempo added by tappng T or clicking/tapping the playhead
-   Hit space to play or pause ascii-tone after initially clicking play (due to autoplay policy)
-   LFO Destinations added. You can now modulate Mod Index and Freq Ratio in addition to filter cutoff. Only one destination is active at a time.

### Changed

-   Moved LFO Spinning pipe animation to bottom right corner to make room for LFO destinations.

## v0.4.0 - 2021-06-30

### Changed

-   Build system overhaul. ascii-tone now uses webpack for production builds. This has resulted in much faster performance, which has fixed or diminished many audio glitches.
-   New updates should be recognized by the browser without clearing the cache due to including the hash numbers in the naming of the files.
-   Lower BPMs are now possible with the tempo controls.

### Added

-   Theme persistance: Themes now save in browser's cache so that next time you load ascii-tone, there's a good chance your theme has saved.
-   Pendulum Mode: The classic inclusive forward and reverse sequencing mode but with a twist. When playing back in reverse, the snooze and repeater settings are ignored.
-   Random Mode: Notes are changed every bar to random notes within the context of your scale. Fun!
-   Random note mode

## v0.3.1 - 2021-06-20

### Added

-   Added several new color themes:
    -   metro, dune, nord, dmg, solarized, 9009
-   Added a place holder favicon.

### Changed

-   Skins are now called themes.
-   The theme select button now rotates through all available themes, round robin style.
-   Small interface tweaks.

## v0.3.0 - 2021-06-23

### Added

-   v0.3.0 introduces convolution reverb to ascii-tone. Click the FX tab to try out the new parameters:
    -   Mix: Controls the wet/dry mix of reverb. Put this all the way up to hear only the reverb signal, and all the way down to hear only the synth engine.
    -   Decay: Sets the duration of the reverb.
    -   Pre-delay: Sets the amount of time before the reverb is fully ramped in once signal is sent.

### Changed

##### UI

-   v0.3 improves the overall look of ascii-tone by changing the font of the UI and improving mobile support.
-   The main font family is now 'Menlo Regular'. It is also now packaged with ascii-tone so that the UI renders more predictably across platforms.
-   Mobile breakpoints have been added for a more consistent mobile experience
-   Parameters should now be easier to control on touch screens.
-   Changing fonts is now done in the typefaces stylesheet to keep everything organized.
-   Desktop FX/Synth button now styled to look more like a tab.
-   Seperated synth and effect objects generated from Tone.js into seperate script 'synth-objects.js'

##### misc

-   Changed versioning system. Format is now |major version|minor version|patch version| with no 'b' identifier to specify beta.
-   Refactored the function that renders the horizontal sliders. It is now much cleaner and won't require adding conditions for every parameter added.

### Fixed

-   Fixed UI bug that caused FX/Synth tab to change styles once clicked.

## v0.2b1 - 2021-05-11

### Added

-   Addition of normalize.css stylesheet for css reset. This should maintain more consistency across platforms.

### Changed

-   Overlay is now wider and more open
-   Font sizes made larger
-   ascii parameters are now larger on mobile

## v0.1b2 - 2021-04-14

### Changed

-   Interface tweaks
-   Re-organized file structure

## v0.1b1 - 2021-04-08

### Added

-   Implementation of Parameter Tabs for mobile users.
-   Mobile UI is now more compact and logical.
-   Scale selection button and scale modes.

### Changed

-   Note selection meters now have a range of 12 notes instead of 10. Thanks to the tabs implementation, there is now space for this to accomodate a chromatic scale.
-   ASCII overlay refresh. There is no more space and there are prettier dividers.

## v0.0b1 - 2021-04-03

### Initial beta testing release
