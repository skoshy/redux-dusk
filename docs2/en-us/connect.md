# Connecting Shadows with Views

Views can connect with as many Shadows as they need. Here's a code snippet to show how a View connects with some Shadows.

```javascript
export default connect(
  // the View to connect
  LoginScreen,

  // the Shadow Actions to inherit
  [shadows.AUTH, shadows.MEETINGS],

  // the Shadow State vars to inherit
  {
    isLoading: [shadows.AUTH],
    meetings: [shadows.MEETINGS],
  },
);
```

This should be exported at the bottom of your View file.
