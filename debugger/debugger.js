(function() {
  if (!this) return;

  var play = (function() {
    var current;
    var sounds = {
      log: new Audio('./debugger/log.mp3'),
      warn: new Audio('./debugger/warn.mp3'),
      error: new Audio('./debugger/error.mp3')
    };

    return function play(type) {
      current && current.pause();

      switch (type) {
        case 'warn':
          current = sounds.warn;
          break;
        case 'error':
          current = sounds.error;
          break;
        default:
          current = sounds.log;
      }

      try {
        current.play();
      } catch (x_O){};
    };
  })();

  var con = this.console;
  var log = document.createElement('aside');

  var show = (function() {
    function show(type, message) {
      if (typeof message === 'undefined') {
        return show.log(type);
      }
      con[type](message);
      var msg = document.createElement('p');
      message = typeof message === 'string' ? message : message.toString();
      msg.innerText = type.toUpperCase() + ': ' + message;
      log.appendChild(msg);
      play(type);
    }

    show.log = show.bind(null, 'log');
    show.info = show.bind(null, 'info');
    show.warn = show.bind(null, 'warn');
    show.error = show.bind(null, 'error');

    return show;
  })();

  this.console = {
    log: show.log,
    info: show.info,
    warn: show.warn,
    error: show.error
  };
  this.addEventListener('error', function(event) {
    event.preventDefault();
    show.error(event.error);
  });

  window.addEventListener('load', function() {
    document.body.insertBefore(log, document.body.children[0]);
  });
})();
