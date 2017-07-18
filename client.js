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
  'en-US': {
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
      fullstop: '.',
      finaldest: 'Final destination'
    },
    dcta: {
      thankyou: 'Thank you for riding with the DCTA.'
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
  },
  'zh-CN': {
    general: {
      nextstop: '下一站',
      thisstop: '您现在在',
      bus: '巴士',
      arriving: '现在到达',
      welcome: '欢迎到',
      nb: '北向',
      sb: '南向',
      nt: '北向终点站',
      st: '南向终点站',
      thankyou: '谢谢您坐',
      thisis: '这是',
      fullstop: '.',
      finaldest: '前往'
    },
    dcta: {
      thankyou: 'Thank you for riding with the DCTA.'
    },
    dp: {
      dp: '发现公园',
      gab: '总学术楼',
      aveg: 'G 大街',
      emery: '爱美丽路',
      university: '大学路',
      windsor: '温莎路',
      aveh: 'H 大街',
      stella: '斯特拉路交接北德州路',
      rec: '健身管',
      eesat: '环境科学楼'
    }
  }
};

// ------- Classes and prototypes ------- \\



// ------- Functions ------ \\

function get_language() {
  return $("#langlist option:selected").attr('id');
}

function utter( utterwhat ) {
  var utterance = new SpeechSynthesisUtterance( utterwhat );
  utterance.lang = get_language();
  ss.speak(utterance);
}

function play( category, name ) {
  // sounds[category][name].play();
  utter( speech[get_language()][category][name] );
}

function playall( arr ) {
  var uttertext = '';
  arr.forEach(function(element) {
    var category = element[0];
    var name = element[1];
    uttertext += speech[get_language()][category][name];
  });
  utter( uttertext );
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
  play( 'general', 'nextstop' );
  play( idinfo[1], idinfo[2] );
  if ( idinfo[3] == 'nt' || idinfo[3] == 'st' ) {
    play('general', 'thisis');
  }
  play( 'general', idinfo[3] );
});

$("#announcements").on('click', '.thisstop', function( event ) {
  event.preventDefault();
  var idinfo = $(this).attr('id').split('-');
  // sounds['general']['nextstop'].play();
  // sounds[idinfo[0]][idinfo[1]].play();
  var directionarray = ['general', 'fullstop'];
  if ( idinfo[3] == 'nb' || idinfo[3] == 'st' ) {
    directionarray = ['general', 'nb'];
  } else if ( idinfo[3] == 'sb' || idinfo[3] == 'nt' ) {
    directionarray = ['general', 'sb'];
  }
  playall( [['general', 'thisis'], directionarray, ['dp', 'dp'], ['general', 'bus'], ['general', 'fullstop']] );
  play( 'general', 'finaldest' );
  // DP bus route specific info
  if ( idinfo[3] == 'nb' || idinfo[3] == 'st' ) {
    play( 'dp', 'dp' );
  } else if ( idinfo[3] == 'sb' || idinfo[3] == 'nt' ) {
    play( 'dp', 'gab' );
  }
  play( 'general', 'thisstop' );
  play( idinfo[1], idinfo[2] );
  if ( idinfo[3] == 'nt' || idinfo[3] == 'st' ) {
    play('general', 'thisis');
  }
  play( 'general', idinfo[3] );
});

$("#announcements").on('click', '.arriving', function( event ) {
  event.preventDefault();
  var idinfo = $(this).attr('id').split('-');
  // sounds['general']['nextstop'].play();
  // sounds[idinfo[0]][idinfo[1]].play();
  play( 'general', 'arriving' );
  play( idinfo[1], idinfo[2] );
  if ( idinfo[3] == 'nt' || idinfo[3] == 'st' ) {
    play('general', 'thisis');
  }
  play( 'general', idinfo[3] );
});
