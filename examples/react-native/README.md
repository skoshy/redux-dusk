# How to upgrade React Native

- First, ensure your git branch is clean. Commit/stash anything in your working state.
- `npm i --save react-native@latest`, or choose whatever version you'd like to upgrade to. You should probably also upgrade `react` to an appropriate version as well, whether that be latest or whatever else.
- as long as you have `react-native-cli` globally installed, you can now run `react-native upgrade` and it should help you upgrade to the version you just installed in your project
- ignore the react-native-git-upgrade message, i've tried it and had lots of issues with it
- What I do is replace all files (answer `y` to everything) and then view the git diff in VS Code using Gitlens and modify things back as needed.

# Debugging

This boilerplate integrates well with [react-native-debugger](https://github.com/jhen0409/react-native-debugger). Simply install/start it up, and open a new window and specify the port of the packager. It has redux integration baked in as well.

# Architecture Decisions

- 2018-12-30 - I tried using react-navigation v3.0.9, but it was quite buggy. There was issues with the navigation prop when Remote Debugging was on, many issues with screen transitions, and issues with the header and card style. Maybe we can revisit it later when it's less buggy.
