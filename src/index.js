import { initialize } from '@muzilator/sdk';

var analysisControl;
var midi;
var played = [];
var pattern = [];

window.addEventListener('load', () => {
  async function init() {
    var platform = await initialize();
    analysisControl = await platform.createChannel('analysis-control');
    midi = await platform.createChannel('midi');
    startListeners();
  }
  init();
})

function onMidiMessage(message) {
  switch (message.data.type) {
    case 'note-on':
    played.push(message.data.pitch);
    checkForMatch();
    break
  }
}

function onAnalysisMessage(message) {
  switch (message.data.type) {
    case 'set-pattern':
      console.log("Pattern:", message.data.pattern, "Arrived to Analyzer");
      pattern = message.data.pattern;
      break
  }
}

function checkForMatch() {
  console.log(played, pattern);
  if (played.toString().includes(pattern.toString())) {
      sendRecognizedToApplication();
      played = [];
  }
}

function sendRecognizedToApplication() {
  analysisControl.postMessage({type: 'pattern-recognized'});
}

function startListeners() {
  analysisControl.addEventListener('message', onAnalysisMessage);
  analysisControl.start();

  midi.addEventListener('message', onMidiMessage);
  midi.start();
}
