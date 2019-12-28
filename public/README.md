Description: recgonized chords in user interactions data.
API:

input
set-pattern: gets a pattern array.  type: int[0...127]
channel-name: analyzer-channel
message-params: type: 'set-pattern', pattern: array[0...127]

input
note-on: gets 'note-on' events and store it locally.  
channel-name: analyzer-channel
message-params: type: 'note-on', pitch: [0...127], velocity: [0...127]

output
pattern-recognized: raised when pattern was recognized.  
channel-name: analyzer-channel
message-params: type: 'pattern-recognized'