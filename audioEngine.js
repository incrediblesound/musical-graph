var createAudioEngine = function(){
  var audioEngine = {};
  audioEngine.init = function(){
    console.log(this)
    var ContextClass = (window.AudioContext || 
      window.webkitAudioContext || 
      window.mozAudioContext || 
      window.oAudioContext || 
      window.msAudioContext);
    console.log(ContextClass)
    if (ContextClass) {
      this.context = new ContextClass();
      console.log(this)
      this.input = this.context.createGain();
      this.input.gain.value = 0.2;
      this.compressor = this.context.createDynamicsCompressor();
      this.input.connect(this.compressor);
      this.compressor.connect(this.context.destination);
      return;
    } else {
      console.error("sorry, this browser does not support the Webaudio api!");
    }
    return null;
  }
  return audioEngine;
}