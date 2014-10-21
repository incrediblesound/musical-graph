var createAudioEngine = function(){
  var audioEngine = {};
  audioEngine.init = function(){
    var ContextClass = (window.AudioContext || 
      window.webkitAudioContext || 
      window.mozAudioContext || 
      window.oAudioContext || 
      window.msAudioContext);
    if (ContextClass) {
      this.context = new ContextClass();
      return;
    } else {
      console.error("sorry, this browser does not support the Webaudio api!");
    }
    return null;
  }
  return audioEngine;
}