/* Code snippets taken from - https://github.com/supermedium/superframe/tree/master/components
                            - https://github.com/stemkoski/A-Frame-Examples/blob/master/fade-in.html
                            - https://github.com/stemkoski/A-Frame-Examples/blob/master/text-3D.html
*/
AFRAME.registerComponent('start', {

    init: function () {
      // block pointer events until buttonEnter is clicked
      let uiDiv = document.getElementById("uiDiv");
      uiDiv.style["pointer-events"] = "auto";

      // set up background blocker
      uiDiv.style["background-color"] = "rgba(0, 0, 0, 0.75)";

      // indicate clickable with hand cursor (desktop)
      let buttonEnter = document.getElementById("buttonEnter");
      buttonEnter.style.cursor = "pointer";

      // fade-in functionality
      let fadeIn = function () {
        // allow point events again
        uiDiv.style["pointer-events"] = "none";

        // sounds can only be triggered after a mouse interaction
        let soundPlayer = document.querySelector("#ambientSound");
        soundPlayer.components.sound.playSound();

        // remove startButton
        buttonEnter.parentNode.remove(buttonEnter);

        // fade out uiDiv background
        uiDiv.style["background-color"] = "rgba(0, 0, 0, 0.0)";
        uiDiv.style["transition"] = "background-color 1000ms linear";
      }

      // activate for desktop/touchscreen
      buttonEnter.addEventListener('touchstart', fadeIn);
      buttonEnter.addEventListener('mousedown', fadeIn);
    }
  });
  
  AFRAME.registerComponent('updater', {

    init: function () {
      // apply material to this.el.object3d
    },

    tick: function (time, timeDelta) {
      let t = Math.round(time / 1000);
      let newText = "Seconds: " + t;
      let currentText = this.el.getAttribute("text-geometry")["value"];

      // only update if newText is different than current text displayed.
      if (newText != currentText) {
        this.el.setAttribute("text-geometry", "value", newText)
      }
    }

  });