(function() {
  "use strict";

  angular
    .module("imagem", [])
    .directive("eaImgSrc", directiveConstructor);

  function directiveConstructor() {
    return { link: link };

    function link(scope, element, attrs) {
      scope.$watch(attrs.eaImgSrc, function(currentSrc, oldSrc) {
        if (currentSrc) {
          // check currentSrc is not a data url,
          // since you can't append a param to that
          if (oldSrc && !currentSrc.match(/^data/)) {
            setSrc(currentSrc + "?=" + new Date().getTime());
          } else {
            setSrc(currentSrc);
          }
        } else {
          setSrc(null);
        }
      })

      function setSrc(src) { element[0].src = src; }
    }
  }
})();