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
  /*
  This isn't really used right now but i'm leaving it up just so i have a kind of a guide when creating my own thing
  */
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

  AFRAME.registerComponent('listen-to', {
    multiple: true,
    schema: {
      target: {type: 'selector'},
      event: {type: 'string', default: 'click'},
      emit: {type: 'string', default: 'click'}
    },
    init: function () {
        this.addEvent();
    },
    addEvent: function () {
      let event = this.data.event;
      let target = this.data.target;
      this.handler = evt => this.onEvent(evt);
      target.addEventListener(event, this.handler);
    },
    onEvent: function () {
      this.el.emit(this.data.emit);
    },
    update: function (oldData) {
      // We doesn't need the update phase during the initialisation phase
      if (Object.entries(oldData).length === 0) return;
      if (oldData.target != this.data.target || oldData.event != this.data.event) {
        this.remove(oldData.target, oldData.event);
        this.addEvent();
      }
    },
    remove: function (target, event) {
      let currEvent = event || this.data.event;
      let currTarget = target || this.data.target;
      currTarget.removeEventListener(currEvent, this.handler);
    }
  });