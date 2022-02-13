(() => {
  "use strict";
  const target = document.getElementsByTagName('calling-screen');
  const observer = new MutationObserver(function (mutations) {
    console.table(mutations);
  });

  observer.observe(target, {
    attributes: true,
    attributeOldValue: false,
    characterData: false,
    characterDataOldValue: false,
    childList: true,
    subtree: true,
    attributeFilter: ['class']
  });
})();
