# Overview

Dusk tries to make managing your store, state, actions, selectors, and logic easy. We use two main concepts to do this:

* `shadows` - does all the work behind the scenes
* `shines` - visible components and screens in an app

The typical Dusk project hierarchy is as follows:

```
shadows
├──── ExampleShadow.js
├──── index.js
└──── OtherShadow.js
shines
├──── components
│     ├──── CoolButton.js
│     └──── FidgetSpinner.js
└──── screens
      ├──── ExampleScreen
      └──── HomeScreen.js
```
