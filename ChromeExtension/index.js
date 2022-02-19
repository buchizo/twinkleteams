(() => {
  "use strict";
  console.log("[twinkle2teams] start extension...");
  const body_observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      if (mutation.type !== "attributes") continue;
      if (!mutation?.target?.classList) continue;
      if (mutation.target.classList.contains("ts-calling-participant-stream")) {
        const newval = mutation.target.getAttribute(mutation.attributeName);
        for (const c1 of mutation.target.children) {
          if (c1.classList.contains("person-name-layer")) {
            for (const c2 of c1.children) {
              if (c2.classList.contains("person-name")) {
                for (const c3 of c2.children) {
                  if (c3.className === "lpc-hoverTarget") {
                    // send status
                    chrome.runtime.sendMessage({
                      isSpeaking: newval.includes("speaking"),
                      isMuted: newval.includes("is-muted"),
                      name: c3.innerText
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  body_observer.observe(document.body, {
    attributes: true,
    attributeOldValue: true,
    characterData: false,
    characterDataOldValue: false,
    childList: true,
    subtree: true,
    attributeFilter: ["class"]
  });
})();
