import { initialize } from '@muzilator/sdk';

var analysisControl;
var midi;
var played = [];

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

// checks if the last two sets of three notes equals
function checkForMatch() {
  var match = false;
  if(played.length > 5) {
    match = true;
  for(var i=0; i < 3; i++) {
    if (played[played.length-1-i] != played[played.length-4-i]) { match = false;}
  }
}
  if (match) {
      sendRecognizedToApplication();
      played = [];
  }
}

function sendRecognizedToApplication() {
  analysisControl.postMessage({type: 'pattern-recognized'});
}

function startListeners() {
  analysisControl.start();

  midi.addEventListener('message', onMidiMessage);
  midi.start();
}
