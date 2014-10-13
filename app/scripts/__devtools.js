chrome.devtools.panels.create("Family Photos",
                              "icon.png",
                              "./app/index.html",
                              function(panel) { console.log("hello from callback"); });