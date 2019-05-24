# SPPlusPlugins

These plugins were made for version 5.2 of [SharePointPlus](https://github.com/Aymkdn/SharepointPlus). They've been tested on SharePoint 2010, in a Google Chrome browser, and nothing else. Use at your own discretion (and risk).

At the time of this being written, there are 3 plugins:

### SPP_CheckOut.js
SharePointPlus does not have an innate method to check files out. This plugin fills that gap. It takes 3 arguments (1 required, 2 optional):

```javascript
// Required
setup.destination = "File/To/CheckOut.aspx"; // Target File

// Optional
setup.url = "www.SharePointWebsite.com"; // Your website
// default: window.location.protocol + '//' + window.location.hostname:setup.url;

setup.toLocal = true||false; // Checkout to local
// default: false
```


### SPP_ExtendedCheckIn.js
SharePointPlus doesn't let you check things in as minor versions. So this plugin is basically exactly the same as the included one, but with a version option.

```javascript
setup.checkinType	= 0 - 2; // 0 = minor, 1 = major, 2 = overwrite
// default: 0
```

### SPP_Copy.js
This plugin lets you copy files from one location on the server to another. It takes 3 arguments (2 required, 1 optional):

```javascript
// Required
setup.source = '/your/file.aspx'; // Target File
setup.destination = 'new/copy.aspx'; // Location to Make Copy

// Optional
setup.url = "www.SharePointWebsite.com"; // Your website
// default: window.location.protocol + '//' + window.location.hostname:setup.url;
```
