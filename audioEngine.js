var AudioEngine = function(){
  var ContextClass = (window.AudioContext || 
    window.webkitAudioContext || 
    window.mozAudioContext || 
    window.oAudioContext || 
    window.msAudioContext);
  if (ContextClass) {
    this.context = new ContextClass();
    this.input = this.context.createGain();
    this.input.gain.value = 0.2;
    this.compressor = this.context.createDynamicsCompressor();
    this.input.connect(this.compressor);
    this.compressor.connect(this.context.destination);
  } else {
    console.error("sorry, this browser does not support the Webaudio api!");
  }
}