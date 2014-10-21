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
  var gainNode = window.audioEngine.context.createGain();
  osc.connect(gainNode);
  gainNode.connect(window.audioEngine.input);
  osc.frequency.value = this.octave+this.detune;
  osc.detune.value = tone * 100;
  osc.start(window.audioEngine.context.currentTime);
  gainNode.gain.linearRampToValueAtTime(0, window.audioEngine.context.currentTime + 0.5);
  // osc.stop(window.audioEngine.context.currentTime+length+1); 
};

var DoubleOscillator = function(octave, type, detune){
	this.osc1 = new Oscillator(octave, type, detune);
	this.osc2 = new Oscillator(octave, type, -detune);
}

DoubleOscillator.prototype.play = function(note){
	this.osc1.play(note, 1);
	this.osc2.play(note, 1);
}

var oscillatorFactory = function(type, octave, shape, detune) {
  if(type === 'single'){
    return new Oscillator(octave, shape, 0)    
  }
  else if(type === 'double'){
    return new DoubleOscillator(octave, shape, detune);
  }
}