var Oscillator = function(octave, type, detune) {
  var octaves = {
    0:110,
    1:220,
    2:440,
    3:880,
    4:55
  }
  this.octave = octaves[octave];
  this.type = type;
  this.detune = detune;
}

Oscillator.prototype.play = function(tone, length) {
    var osc = window.audioEngine.context.createOscillator();
    if(this.type === 'sine'){
      osc.type = osc.SINE;
    }
    else if(this.type === 'saw'){
      osc.type = osc.SAWTOOTH;
    }
    else if(this.type === 'square'){
      osc.type = osc.SQUARE;      
    }
  osc.connect(window.audioEngine.context.destination);
  osc.frequency.value = this.octave+this.detune;
  osc.detune.value = tone * 100;
  osc.start(window.audioEngine.context.currentTime);
  osc.stop(window.audioEngine.context.currentTime+length); 
};