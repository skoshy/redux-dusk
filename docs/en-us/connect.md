# Connecting Shadows with Shines

Shines can connect with as many Shadows as they need. Here's a code snippet to show how a Shine connects with some Shadows.

```javascript
export default connect(
  // the Shine to connect
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

This should be exported at the bottom of your Shine file.
