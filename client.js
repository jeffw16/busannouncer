/*
 * Client JS for Bus Announcer
*/

// ------- Data ------- \\

var ss = window.speechSynthesis;

// var sounds = {
//   general: {
//     nextstop: new Howl({
//       src: ['assets/nextstop.mp3']
//     }),
//     bus: new Howl({
//       src: ['assets/bus.mp3']
//     }),
//     arriving: new Howl({
//       src: ['assets/arriving.mp3']
//     }),
//     welcome: new Howl({
//       src: ['assets/welcome.mp3']
//     })
//   },
//   dp: {
//     dp: new Howl({
//       src: ['assets/dp.mp3']
//     }),
//     gab: new Howl({
//       src: ['assets/dp-gab.mp3']
//     }),
//     aveg: new Howl({
//       src: ['assets/dp-aveg.mp3']
//     })
//   }
// };

var speech = {
  general: {
    nextstop: 'Next stop',
    thisstop: 'You are currently at',
    bus: 'bus',
    arriving: 'Now arriving at',
    welcome: 'Welcome to the',
    nb: 'northbound',
    sb: 'southbound',
    nt: 'northern terminus',
    st: 'southern terminus',
    thankyou: 'Thank you for riding the',
    thisis: 'This is the',
    fullstop: '.'
  },
  dcta: {
    thankyou: 'Thank you for riding with DCTA, the Denton County Transportation Authority.'
  },
  dp: {
    dp: 'Discovery Park',
    gab: 'the GAB',
    aveg: 'Avenue G',
    emery: 'Emery',
    university: 'University',
    windsor: 'Windsor',
    aveh: 'Avenue H',
    stella: 'Stella at North Texas',
    rec: 'Rec Center',
    eesat: 'Environmental Science Building'
  }
};

// ------- Classes and prototypes ------- \\



// ------- Functions ------ \\

function play( category, name ) {
  // sounds[category][name].play();
  var utterance = new SpeechSynthesisUtterance( speech[category][name] );
  ss.speak(utterance);
}

function playall( arr ) {
  var uttertext = '';
  arr.forEach(function(element) {
    var category = element[0];
    var name = element[1];
    uttertext += speech[category][name];
  });
  var utterance = new SpeechSynthesisUtterance( uttertext );
  ss.speak(utterance);
}

// ------- jQuery ------- \\

$("#announcements").on('click', '.welcome', function( event ) {
  event.preventDefault();
  // sounds['general']['welcome'].play();
  // sounds['dp']['dp'].play();
  // sounds['general']['bus'].play();
  // play( 'general', 'welcome' );
  // play( 'dp', 'dp' );
  // play( 'general', 'bus' );
  playall( [['general', 'welcome'], ['dp', 'dp'], ['general', 'bus'], ['general', 'fullstop']] );
});

$("#announcements").on('click', '.thankyou', function( event ) {
  event.preventDefault();
  // sounds['general']['welcome'].play();
  // sounds['dp']['dp'].play();
  // sounds['general']['bus'].play();
  // play( 'general', 'thankyou' );
  // play( 'dp', 'dp' );
  // play( 'general', 'bus' );
  playall( [['general', 'thankyou'], ['dp', 'dp'], ['general', 'bus']] );
  play( 'dcta', 'thankyou' );
});

$("#announcements").on('click', '.nextstop', function( event ) {
  event.preventDefault();
  var idinfo = $(this).attr('id').split('-');
  // sounds['general']['nextstop'].play();
  // sounds[idinfo[0]][idinfo[1]].play();
  // play( 'general', 'thisis' );
  // play( 'dp', 'dp' );
  // play( 'general', 'bus' );
  playall( [['general', 'thisis'], ['dp', 'dp'], ['general', 'bus'], ['general', 'fullstop']] );
  play( 'general', 'nextstop' );
  play( idinfo[1], idinfo[2] );
  play( 'general', idinfo[3] );
});

$("#announcements").on('click', '.thisstop', function( event ) {
  event.preventDefault();
  var idinfo = $(this).attr('id').split('-');
  // sounds['general']['nextstop'].play();
  // sounds[idinfo[0]][idinfo[1]].play();
  play( 'general', 'thisstop' );
  play( idinfo[1], idinfo[2] );
  play( 'general', idinfo[3] );
});

$("#announcements").on('click', '.arriving', function( event ) {
  event.preventDefault();
  var idinfo = $(this).attr('id').split('-');
  // sounds['general']['nextstop'].play();
  // sounds[idinfo[0]][idinfo[1]].play();
  play( 'general', 'arriving' );
  play( idinfo[1], idinfo[2] );
  play( 'general', idinfo[3] );
});
