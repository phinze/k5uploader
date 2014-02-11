# K5Uploader

A javascript based uploader for kaltura.

## Installation

`bower install k5uploader`

## Considerations

1. This uploader uses javascript, you may need to set up CORS on kaltura instance to use. By default kaltura does not have such headers.

2. The uploader uses [xhr2](http://caniuse.com/#feat=xhr2). Evergreen browsers support it today. Your support needs may limit your ability to use it.

## Usage

```javascript
//grab a file somehow
var file = this.files[0];

// options to configure the uploader
var opts = {
  allowedMediaTypes: ['video', 'audio'], // defaults
  sessionUrl: '/kaltura_session',
  uploadUrl: 'http://kaltura_box.com/index.php/partnerservices2/upload',
  entryUrl: 'http://kaltura_box.com/index.php/partnerservices2/addEntry',
  uiconfUrl: 'http://kaltura_box.com/index.php/partnerservices2/getuiconf',
  entryDefaults: {
    partnerData: "some custom serialized data here",
  }
};

// create instance with options
var uploader = new K5Uploader(opts);

// wait for 'K5.ready' and upload the file
uploader.addEventListener('K5.ready', function()() {
  uploader.uploadFile(file);
});

```

## Events

The K5Uploader dispatches several events during the upload process. Listen to them or ignore them as your needs dictate.

|Event | Description|
|:---- |:---------- |
|`K5.sessionError` | there has been an error loading a valid kaltura session from the `sessionUrl` option |
|`K5.uiconfError` | there has been an error loading data from the `uiconfUrl` |
| `K5.ready` | a valid kaltura session and uiconf serivce data is loaded. now save to upload |
| `K5.fileError` | uploaded filetype is not included in the `allowedMediaTypes` options |
| `K5.progress` | upload progress is detected |
| `K5.complete` | upload is complete |
| `K5.error` | error uploading file or adding upload via `entryUrl` |

## Notes on kaltura sessions

Add the appropriate `sessionUrl` to return the following kaltura session information:

* `ks`: kaltura session id
* `subp_id`: valid kaltura subpartner id
* ``
