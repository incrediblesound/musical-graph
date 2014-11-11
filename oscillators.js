var Oscillator = function(options) {
  var octaves = {
    0:110,
    1:220,
    2:440,
    3:880,
    4:55
  }
  
  this.octave = octaves[options.octave];
  this.shape = options.shape;
  this.detune = options.detune;
  this.number = options.osc;
}

Oscillator.prototype.play = function(tone) {
  var _this = this;
  var playTone = function(tone, detune){
    var osc = window.audioEngine.context.createOscillator();
    if(_this.shape === 'sine'){
      osc.type = osc.SINE;
    }
    else if(_this.shape === 'saw'){
      osc.type = osc.SAWTOOTH;
    }
    else if(_this.shape === 'square'){
      osc.type = osc.SQUARE;      
    }
    var gainNode = window.audioEngine.context.createGain();
    osc.connect(gainNode);
    gainNode.connect(window.audioEngine.input);
    osc.frequency.value = _this.octave+detune;
    osc.detune.value = tone * 100;
    osc.start(window.audioEngine.context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, window.audioEngine.context.currentTime + 0.5);
  }
  if(this.number === 'single'){
    playTone(tone);
  }
  else if(this.number === 'double'){
    playTone(tone, this.detune);
    playTone(tone, (-this.detune));
  }
  
};