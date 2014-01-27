require.config({
  baseUrl: './lib/',
  include: ['k5uploader'],
  shim: {
    underscore: {
      exports: '_'
    }
  },
  paths: {
    "underscore": "../bower_components/underscore/underscore-min",
    "jquery": "../bower_components/jquery/jquery"
  }
});

require([
  'k5uploader',
  'uploader',
  'kaltura_settings',
  'message_bus',
  'session_manager'
], function(K5, Uploader, KSettings, mBus, SessionManager){

  var input = document.getElementById('upload_file');
  input.addEventListener('change', doUpload);
  function doUpload(e) {
    var opts = {
      sessionUrl: 'http://localhost:3001/proxy/kaltura_session',
      uploadUrl: 'http://localhost:3001/index.php/partnerservices2/upload',
    }

    function onProg(e) {
      var prog = document.getElementById('prog');
      var lbl = document.getElementById('prog-label');
      console.log('setting width');
      var prc = Math.round((e.loaded / e.total) * 100);
      prog.style.width = prc + '%';
      lbl.innerHTML = prc + '%';
    }

    var file = this.files[0]

    var k5 = new K5(opts);
    k5.addEventListener('K5.progress', onProg);
    k5.addEventListener('K5.ready', function(){
      this.uploadFile(file);
    });
  }

});

