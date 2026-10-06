// Keep track of the iframe height.
var height;

// Create IE + others compatible event handler
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent, function (e) {
  if (/set_height=/.test(e.data)) {
    var h = Number(e.data.replace(/set_height=(\d+)/, '$1'));
    if (!isNaN(h) && h > 45 && h !== height) {
      // Height has changed, update the iframe.
      height = h;
      var iframes = document.getElementsByTagName("iframe");
      var iframe = null;
      for(var i=0; i<iframes.length; i++) {
          iframe = iframes[i];
          if(/timebok/.test(iframes[i].src) /*Legacy check, prior to adding class resizable*/ || /resizable/.test(iframes[i].className)) {
              break;
          }
      }
      if (iframe) {
          iframe.style.height = height + "px";
      }

    }
  } else if (/scroll_to=/.test(e.data)) {
    var positions = e.data.match(/scroll_to=(\d+),(\d+)/);
    var x = Number(positions[1]);
    var y = Number(positions[2]);
    if (!isNaN(x) && !isNaN(y) && x >= 0 && y >= 0) {
      window.scrollTo(x, y);
    }
  } else if (/scroll_into_view=/.test(e.data)) {
      var elementIdMatch = e.data.match(/scroll_into_view=(\S+)/);

      if(elementIdMatch.length >= 2) {
        var element = document.getElementById(elementIdMatch[1]);

        if (element) {
          element.scrollIntoView(true);
        }
      }
  }
}, false);

function scrollToFirstFieldError(){
  $('html,body').animate({
    scrollTop: $("#order-frame").contents().find('.field-error').first().parent('.form-field').offset().top
  }, 500);
}
