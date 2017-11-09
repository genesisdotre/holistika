app.service("overlay", function($timeout) {

  var _overlay;
  var _state; // when loading set to laoding, timeout after 10s

  var success = function() {
    _overlay = iosOverlay({
      text: "Success!",
      duration: 2e3,
      icon: "lib/iosOverlay/check.png"
    });
  };

  var error = function() {
    if (_overlay) {
      _overlay.hide(); // Loading leading to an error...
    }

    _overlay = iosOverlay({
      text: "Error!",
      duration: 2e3,
      icon: "lib/iosOverlay/cross.png"
    });
  };

  var loading = function(text) {
    if (!text) {
      text = "Loading";
    }

    var opts = {
      lines: 13, // The number of lines to draw
      length: 11, // The length of each line
      width: 5, // The line thickness
      radius: 17, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      color: '#FFF', // #rgb or #rrggbb
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: 'auto', // Top position relative to parent in px
      left: 'auto' // Left position relative to parent in px
    };
    var target = document.createElement("div");
    document.body.appendChild(target);
    var spinner = new Spinner(opts).spin(target);

    var duration = 12000;
    _state = "loading";

    _overlay = iosOverlay({
      text: text,
      duration: duration,
      spinner: spinner
    });

    $timeout(function() {
      if (_state === "loading") {
        _overlay.update({
          text: "Error!",
          icon: "lib/iosOverlay/cross.png"
        });
      }
    }, duration - 2000); // duration is set up already...
  };

  var update = function(text) {
    if (! _overlay) {
      console.error("Please make sure iosOverlay is instantiated by previous calls");
      return;
    }
    
    _overlay.update({
      text: text,
    });
  }

  var hide = function() {
    _overlay.hide();
    _state = null;
  };

  return {
    success : success,
    error : error,
    loading : loading,
    hide : hide,
    update : update
  };
});