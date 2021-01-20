import React, {useState, useEffect} from 'react';
import * as firebase from 'firebase';
import './App.css';
import RangeSlider from 'react-bootstrap-range-slider';
import Auth from './Auth.js';
import CSV from './CSV.js';
import Qrcode from './qrcode';
import './Swipe.css';
import SelfNoSleep from './SelfNoSleep.js';
//import NoSleep from 'nosleep.js';
import nosleep from 'nosleep.js';

var updcnt = 0;
var totalSound = 6;
var soundVolumeManager = 0.05;
const soundAssist = [0,0,0,0,0,0];
var notSendState = ['共有モード', '操作確認モード'];
var notSendStatePC = ['共有モード', '音声確認モード'];
var notSendClass = ['bluebg', 'redbg'];
var keyList = [113,119,97,115,122,120];
var audioComponentSize = 3;
var audioComponentList = [0,0,0,0,0,0];
const room_col = "rooms";
const sound_list = "sound_list";
const push_log_ = "push_log";
var room_name = window.location.pathname;
let firstVisit = true;
let firstFlag = true;
var firstSleep = true;
var noSleep = new nosleep();
var nosleepinit = true;
var notSendPC = 1;


const TransTime = ()=>{
  //const request = new XMLHttpRequest();
  //request.open('HEAD', window.location.href, true);
  //request.send();
  let serverDate;
  let date = new Date();
  let time = date.toLocaleString();
  let mili = Date.parse(time);
  // request.onreadystatechange = function() {
  //   if (this.readyState === 4) {
  //     serverDate = new Date(request.getResponseHeader('Date'));
  //     time = serverDate.toLocaleString();
  //     mili = Date.parse(time);
  //     console.log(1);
  //   }
  // }
  //console.log(3);
  return {time: time, mili: mili};
}


var audioTagSize = 1;
var audioTagList = [0,0,0,0,0,0];
var audioTag = 0;

const soundEffectList = [
  [
    {name: "なるほど", voice: "lady1", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%AA%E3%82%8B%E3%81%BB%E3%81%A9%E5%A5%B31.wav?alt=media&token=06eca388-8c58-4c3b-b015-2155ed189783"},
    {name: "いいね", voice: "lady1", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%84%E3%81%84%E3%81%AD%E5%A5%B31.wav?alt=media&token=f4b80399-af83-44b8-9ddb-192c73dd4c0e"},
    {name: "神", voice: "lady1", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E7%A5%9E%E5%A5%B31.wav?alt=media&token=a5741d0b-815f-4be6-a93a-4993380d9760"},
    {name: "たしかに", voice: "lady1", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%9F%E3%81%97%E3%81%8B%E3%81%AB%E5%A5%B31.wav?alt=media&token=2d1ec44d-78ca-42f1-b1d1-ec53ee05bde1"},
    {name: "すごい", voice: "lady1", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%99%E3%81%94%E3%81%84%E5%A5%B31.wav?alt=media&token=41d1a813-5b0a-4aad-a3e7-e7ce458bf07b"},
    {name: "まじで", voice: "lady1", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%BE%E3%81%98%E3%81%A7%E5%A5%B31.wav?alt=media&token=271c6f98-2661-45aa-824c-bcdea55635bb"}
  ],
  [
    {name: "なるほど", voice: "lady2", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%AA%E3%82%8B%E3%81%BB%E3%81%A9%E5%A5%B32.wav?alt=media&token=cea25561-e246-4f22-b2f8-5b0544adaefe"},
    {name: "いいね", voice: "lady2", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%84%E3%81%84%E3%81%AD%E5%A5%B32.wav?alt=media&token=67412df4-c8fd-4f2a-97b7-0fee7266a531"},
    {name: "神", voice: "lady2", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E7%A5%9E%E5%A5%B32.wav?alt=media&token=083c59c5-2fd1-436b-9155-38102277a9a1"},
    {name: "たしかに", voice: "lady2", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%9F%E3%81%97%E3%81%8B%E3%81%AB%E5%A5%B32.wav?alt=media&token=c5d0ee82-bcfd-41f8-83d9-73c3a59783ca"},
    {name: "すごい", voice: "lady2", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%99%E3%81%94%E3%81%84%E5%A5%B32.wav?alt=media&token=0bb440b9-b231-4e0d-aea0-5763a1e7476a"},
    {name: "まじで", voice: "lady2", url: "https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%BE%E3%81%98%E3%81%A7%E5%A5%B32.wav?alt=media&token=16f13a1a-535e-4066-b088-d1d1cc98e4bf"}
  ],
  [
    {name: "なるほど", voice: "lady3", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%AA%E3%82%8B%E3%81%BB%E3%81%A9%E5%A5%B33.wav?alt=media&token=93aa1f29-6985-4ba1-8c44-11ed8e8afd81"},
    {name: "いいね", voice: "lady3", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%84%E3%81%84%E3%81%AD%E5%A5%B33.wav?alt=media&token=f72cdf0c-4be8-49f2-b111-743c4aa83152"},
    {name: "神", voice: "lady3", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E7%A5%9E%E5%A5%B33.wav?alt=media&token=5be9a978-f173-4003-bbfe-56a44af79120"},
    {name: "たしかに", voice: "lady3", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%9F%E3%81%97%E3%81%8B%E3%81%AB%E5%A5%B33.wav?alt=media&token=ad331ccb-8d2b-4a23-8515-c186fabf68a2"},
    {name: "すごい", voice: "lady3", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%99%E3%81%94%E3%81%84%E5%A5%B33.wav?alt=media&token=c63949d7-3f28-4416-a25a-65458a49c8b6"},
    {name: "まじで", voice: "lady3", url: "https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%BE%E3%81%98%E3%81%A7%E5%A5%B33.wav?alt=media&token=aebb361a-1882-4d49-89d5-582ef8a61311"}
  ],
  [
    {name: "なるほど", voice: "man1", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%AA%E3%82%8B%E3%81%BB%E3%81%A9%E7%94%B71.wav?alt=media&token=76d319ad-ff65-4d7c-8cc7-4c327a5b2e7f"},
    {name: "いいね", voice: "man1", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%84%E3%81%84%E3%81%AD%E7%94%B71.wav?alt=media&token=de21b022-69da-4ed6-b331-8418a0b2f53d"},
    {name: "神", voice: "man1", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E7%A5%9E%E7%94%B71.wav?alt=media&token=0b9ba888-0fba-4468-8af4-ab196995052e"},
    {name: "たしかに", voice: "man1", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%9F%E3%81%97%E3%81%8B%E3%81%AB%E7%94%B71.wav?alt=media&token=c53e9cc7-e5ce-4359-9129-be8888cf2aa8"},
    {name: "すごい", voice: "man1", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%99%E3%81%94%E3%81%84%E7%94%B71.wav?alt=media&token=9eb38452-dec9-4908-a057-6e19b42c8d75"},
    {name: "まじで", voice: "man1", url: "https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%BE%E3%81%98%E3%81%A7%E7%94%B71.wav?alt=media&token=a9e5e192-01bc-4626-8ead-a63058096f37"}
  ],
  [
    {name: "なるほど", voice: "man2", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%AA%E3%82%8B%E3%81%BB%E3%81%A9%E7%94%B72.wav?alt=media&token=f45be20d-1fb4-4b57-af92-1764b691abb3"},
    {name: "いいね", voice: "man2", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%84%E3%81%84%E3%81%AD%E7%94%B72.wav?alt=media&token=089e1439-7423-4109-bd92-cc8fd2ef2f89"},
    {name: "神", voice: "man2", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E7%A5%9E%E7%94%B72.wav?alt=media&token=4167706b-f893-48a1-b21d-58fbcf3b8dd3"},
    {name: "たしかに", voice: "man2", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%9F%E3%81%97%E3%81%8B%E3%81%AB%E7%94%B72.wav?alt=media&token=428239ec-cd9d-4340-be08-3dcfc4fd3b84"},
    {name: "すごい", voice: "man2", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%99%E3%81%94%E3%81%84%E7%94%B72.wav?alt=media&token=915c93e2-b02b-4cf3-8ce3-f1a0069ff590"},
    {name: "まじで", voice: "man2", url: "https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%BE%E3%81%98%E3%81%A7%E7%94%B72.wav?alt=media&token=8f2f3217-2c20-47f8-8aa5-bb5d9ce19d9e"}
  ],
  [
    {name: "なるほど", voice: "man3", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%AA%E3%82%8B%E3%81%BB%E3%81%A9%E7%94%B73.wav?alt=media&token=b0646041-2b10-4e53-8af6-622592258719"},
    {name: "いいね", voice: "man3", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%84%E3%81%84%E3%81%AD%E7%94%B73.wav?alt=media&token=a621a696-391a-42dc-89d5-7916d24ed673"},
    {name: "神", voice: "man3", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E7%A5%9E%E7%94%B73.wav?alt=media&token=f79d7548-233c-41c8-a3c4-41293ea59421"},
    {name: "たしかに", voice: "man3", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%9F%E3%81%97%E3%81%8B%E3%81%AB%E7%94%B73.wav?alt=media&token=12522aea-6c5e-429e-b3f0-ea2c3d3c6ba9"},
    {name: "すごい", voice: "man3", url:"https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%99%E3%81%94%E3%81%84%E7%94%B73.wav?alt=media&token=32f00606-6086-4a12-82af-5ede50028733"},
    {name: "まじで", voice: "man3", url: "https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/%E3%81%BE%E3%81%98%E3%81%A7%E7%94%B73.wav?alt=media&token=85dce6ea-385a-4cd3-98ea-273bdf0345e6"}
  ]
];

const sourceNoList = [];
const sourceIdList = [];
for(let i=0;i<6;i++){
  soundEffectList[i].map((data)=>{
    for(let j=0;j<audioTagSize;j++){
      //console.log(audioTagSize + ' tagsize');
      //console.log(data.name+data.voice+'-'+i);
      sourceIdList.push(data.name+data.voice+'-'+j);
      sourceNoList.push(
        <audio className="oto" key={data.name+data.voice+'-'+j} id={data.name+data.voice+'-'+j} preload="auto">
          <source src={data.url}></source>
        </audio>
      );
    }
  })
}

const voiceREF = ['lady1','lady2','lady3','man1','man2','man3'];



if(firstVisit){
  if(window.location.pathname === "/"){
    window.location.href = window.location.href + "fest1";
    firstVisit = false;
  }else{
    const col = firebase.firestore().collection(room_col).doc(room_name).collection(sound_list);
    for(let i=0;i<totalSound;i++){
      col.doc("sound"+i).get().then((doc) => {
        if(doc.exists){
          console.log(doc.data());
        }else{
          col.doc("sound"+i).set({
            sound: i,
            randomNum: 2.2
          });
        }
      }).catch((error)=>{
        console.log(error);
      });
    }
    for(let i=0;i<voiceREF.length;i++){
      for(let j=0;j<soundEffectList[0].length;j++){
        let voiceMan = soundEffectList[0][j].name + voiceREF[i];
        col.doc(voiceMan).get().then((doc)=>{
          if(!doc.exists){
            col.doc(voiceMan).set({
              sound: voiceMan,
              randomNum: 2.2
            });
          }
        });
      }
    }
    firstVisit = false;
  }
}




const reverseRef = {
  "lady1": 0,
  "lady2": 1,
  "lady3": 2,
  "man1": 3,
  "man2": 4,
  "man3": 5
};

const revmanRef = {
  "なるほど": 0,
  "いいね": 1,
  "神": 2,
  "たしかに": 3,
  "すごい": 4,
  "まじで": 5
};


var audioSourceList = [
  "https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/line-girl1-hee1.mp3?alt=media&token=6a2c0c19-59ba-4203-a13d-1bb9a87fae3c",
  "https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/girl_oo.mp3?alt=media&token=354475b5-b3cb-481e-a074-4d3092ddc16b",
  "https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/ieeei_re.wav?alt=media&token=e1e745cf-ad3d-4ffe-bd06-c3261bee663e",
  "https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/kansei_re.mp3?alt=media&token=71fb4d66-efb3-42a2-bdd2-413a6c7cfd17",
  "https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/yarujanaika.mp3?alt=media&token=7399a835-65b3-432e-8528-e8964b7936bf",
  "https://firebasestorage.googleapis.com/v0/b/test1-81afe.appspot.com/o/hai.mp3?alt=media&token=4a1a52bb-6750-4585-90a2-76739ddc8554",
];

var audioNameList = [
  "へぇー!",
  "おおー!",
  "いぇーい!",
  "歓声!",
  "やるじゃん!",
  "はい!"
];

var AudioList = [];
for(let i=0;i<totalSound;i++){
  AudioList.push({
    sound: i,
    name: audioNameList[i]
  });
}

var SourceList = [];
for(let i=0;i<totalSound;i++){
  for(let j=0;j<audioComponentSize;j++){
    SourceList.push({
      name: "sound-"+i+"-"+j,
      sound: i,
      audiosource: j
    });
  }
}

//-----------------------------------------------------------
/* ピッチインピッチアウトによる拡大縮小を禁止 */
  // document.documentElement.addEventListener('touchstart', function (e) {
  //   if (e.touches.length >= 2) {e.preventDefault();}
  // }, {passive: false});
  /* ダブルタップによる拡大を禁止 */
  var t = 0;
  document.documentElement.addEventListener('touchend', function (e) {
  var now = new Date().getTime();
  if ((now - t) < 50){
    e.preventDefault();
  }
  t = now;
  }, false);

//-----------------------------------------------------------

var no;				// 数値格納用
var number;	// 数値表示部分のDOM取得用
var Flicksound = ['なるほど', 'すごい', 'いいね', 'たしかに'];
var koeshitu = 'man1';
var notSendvar = 1;

/*
 * 次の番号を表示
 */
function next(){
	no ++;
	setNumber();
}

/*
 * 前の番号を表示
 */
function previous(){
	no --;
	setNumber();
}

/*
 * 数値を画面に表示する
 */
function setNumber(){
	number.innerHTML = no;
}

/*
 * 起動時の処理
 */

//-----------------------------------------------------------

function App() {
  const [soundVolume, setsoundVolume] = useState(0.05);
  const [notSend, setnotSend] = useState(1);
  const [manVoice, setmanVoice] = useState("man1");
  const [soundEffect, setsoundEffect] = useState("なるほど");
  //const [soundFlick, setsoundFlick] = useState(['なるほどlady1', 'なるほどman1', 'いいねlady1', 'いいねman1']);
  console.log('inited');

  useEffect(()=>{
    console.log('useEffect');
    if(window.location.pathname === "/") return;
    const db = firebase.firestore();
      const unsubscribe = db.collection(room_col).doc(room_name).collection(sound_list).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
            console.log(change.type);
            if (change.type === "added" || change.type === "removed"){
              return;
            }
            //if (notSend) return;
            const voiceMan = change.doc.data().sound;
            
            if(Number.isInteger(voiceMan)) Audioplay('sound-'+voiceMan+'-'+audioComponentList[voiceMan], voiceMan);
            else {
              console.log(voiceMan+'-'+audioTag+' is ring');
              Audioplay(voiceMan+'-'+audioTag, 0);
              audioTag = ( audioTag + 1 ) % audioTagSize;
            }
        });
    });
    return () => {
      unsubscribe();
    };
  },[]);

  if(firstSleep){
    noSleep.enable();
    firstSleep = false;
  }

  if(firstFlag){
    firstFlag = false;
    window.addEventListener("load", function(){
      // 数値表示部分のDOM取得
      number = document.getElementById("number");
      
      // 数値を画面に表示
      no = 0;
      setNumber();
    
      // スワイプイベント設定
      setSwipe("#contents");
    });
  }

  function setSwipe(elem) {
    let t = document.querySelector(elem);
    let startX;		// タッチ開始 x座標
    let startY;		// タッチ開始 y座標
    let moveX;	// スワイプ中の x座標
    let moveY;	// スワイプ中の y座標
    let dist = 50;	// スワイプを感知する最低距離（ピクセル単位）
    
    // タッチ開始時： xy座標を取得
    t.addEventListener("touchstart", function(e) {
      e.preventDefault();
      startX = e.touches[0].pageX;
          startY = e.touches[0].pageY;
          moveX = startX;
          moveY = startY;
    });
    
    // スワイプ中： xy座標を取得
    t.addEventListener("touchmove", function(e) {
          e.preventDefault();
      moveX = e.changedTouches[0].pageX;
      moveY = e.changedTouches[0].pageY;
    });
    
    // タッチ終了時： スワイプした距離から左右どちらにスワイプしたかを判定する/距離が短い場合何もしない
    t.addEventListener("touchend", function(e) {
          const vx = moveX - startX;
          const vy = moveY - startY;
          const sheta = Math.atan2(vy, vx) * 180 / Math.PI;
          if((vx*vx+vy*vy<dist*dist)) return;
  
          console.log(vx, vy, sheta);
          if(-45 <= sheta && sheta <= 45){ //right
              console.log('right');
              //next();
              //next();
              handleFlickPlay(1);
          }else if(45 <= sheta && sheta <= 135){ //down
              console.log('down');
              //next();
              handleFlickPlay(2);
          }else if(-135 <= sheta && sheta <= -45){ //up
              console.log('up');
              //previous();
              handleFlickPlay(3);
          }else{ //left
              console.log('left');
              //previous();
              //previous();
              handleFlickPlay(0);
          }
    });
  }

  const NosleepInit = ()=>{
    if(nosleepinit){
      noSleep.enable();
      //nosleepinit = false;
    }
    return;
  }

  const KeyPress = (e) => {
    const keyNum = e.which;
    console.log('pressed key is',keyNum);
    for(let i=0;i<totalSound;i++){
      if(keyList[i] === keyNum){
        handleClickPush(i);
      }
    }
  }

  const Audioplay = async(idName, sound) => { 
    if( typeof( document.getElementById( idName ).currentTime ) !== 'undefined' ){
 	    document.getElementById( idName ).currentTime = 0;
    }
    console.log('soundVolume is ',soundVolumeManager);
    console.log('sound idName is', idName);
    console.log('former VOLUME is '+document.getElementById(idName).volume);
    document.getElementById(idName).volume = await soundVolumeManager;
    console.log('VOLUME is '+document.getElementById(idName).volume);
    await document.getElementById(idName).play();
    
  }

  const handleClickPush = async (sound) =>{
    const db = firebase.firestore();
    //音を鳴らす用のデータを変更
    if(notSend){
      Audioplay('sound-'+sound+'-'+audioComponentList[sound], sound);
      audioComponentList[sound] = (audioComponentList[sound] + 1) % audioComponentSize;
      const push_log = db.collection(room_col).doc(room_name).collection("push_log");
      const time = new Date().toLocaleString();
      const user = firebase.auth().currentUser;
      let uid = "guest";
      let displayName = "guest";
      if(user != null){
        uid = user.uid;
        displayName = user.displayName;
      }
      const data = {time: time, sound: sound, name: displayName, uid: uid, notSend: notSend};
      push_log.doc().set(data);
      console.log(data);
      return;
    }

    const docId = "sound"+sound;
    const randomNum= Math.random();
    const newData = {sound: sound, randomNum: randomNum+updcnt};
    try{
      await db.collection(room_col).doc(room_name).collection(sound_list).doc(docId).update(newData);
    }catch(error){
      await db.collection(room_col).doc(room_name).collection(sound_list).doc(docId).set(newData);
      console.error(error);
    }
    updcnt = (updcnt + 1.0);

    //データベースに押したことを保存
    const user = firebase.auth().currentUser;
    let uid = "guest";
    let displayName = "guest";
    if(user != null){
      uid = user.uid;
      displayName = user.displayName;
    }
    //なければデータベースに追加
    const push_log = db.collection(room_col).doc(room_name).collection(push_log_);
    const time = new Date().toLocaleString();
    
    const data = {time: time, sound: sound, name: displayName, uid: uid, notSend: notSend};
    push_log.doc().set(data);
    console.log(data);
  }

  const handleClickLogButton = async()=>{
    let array = [];
    const db = firebase.firestore();
    //const person = "person1";
    //const push_log = db.collection("rooms").doc(room).collection("people").doc(person).collection("push_log");
    const push_log = db.collection(room_col).doc(room_name).collection(push_log_);
    await push_log.orderBy('time').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
        array.push(doc.data());
      })
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
    (new CSV(array)).save('push_log.csv');
    return;
  }

  const voiceChange = ()=>{
    const voicelist = document.selectlist.voiceselect;
    const num = voicelist.selectedIndex;
    const voiceData = voicelist.options[num].value;
    console.log(voiceData);
    setmanVoice(voiceData);
    koeshitu = voiceData;
  };

  const koeChange = ()=>{
    const koe = document.koelist.koeselect;
    const num = koe.selectedIndex;
    const koeData = koe.options[num].value;
    console.log(koeData);
    setsoundEffect(koeData);
  }
  

  const handleFlickPlay = async (dir)=>{
    //
    if(firstSleep){
      noSleep.enable();
      firstSleep = false;
      sourceIdList.map((idName)=>{
        //console.log(idName);
        document.getElementById(idName).volume = 0.0;
      });
    }
    const db = firebase.firestore();
    console.log('pass the handleFlickPlay');
    const voiceMan = Flicksound[dir] + koeshitu;
    console.log('man is ' + voiceMan);
    console.log('not Send is ' + notSend);
    if(notSendvar == 1){
      const voice_id = revmanRef[koeshitu];
      Audioplay(voiceMan + '-' + audioTagList[voice_id], voice_id);
      console.log('not send version ' + voiceMan + '-' + audioTagList[voice_id]);
      audioTagList[voice_id] = (audioTagList[voice_id] + 1) % audioTagSize;
      const push_log = db.collection(room_col).doc(room_name).collection("push_log");
      const date = TransTime();
      const user = firebase.auth().currentUser;
      let uid = "guest";
      let displayName = "guest";
      if(user != null){
        uid = user.uid;
        displayName = user.displayName;
      }
      const data = {mili: date.mili, time: date.time, sound: voiceMan, name: displayName, uid: uid, notSend: notSend};
      push_log.doc().set(data);
      console.log(data);
      return;
    }

    const docId = voiceMan;
    const randomNum= Math.random();
    const newData = {sound: voiceMan, randomNum: randomNum+updcnt};
    try{
      //console.log(newData);
      await db.collection(room_col).doc(room_name).collection(sound_list).doc(docId).update(newData);
    }catch(error){
      await db.collection(room_col).doc(room_name).collection(sound_list).doc(docId).set(newData);
      console.error(error);
    }
    updcnt = (updcnt + 1.0);

    //データベースに押したことを保存
    const user = firebase.auth().currentUser;
    let uid = "guest";
    let displayName = "guest";
    if(user != null){
      uid = user.uid;
      displayName = user.displayName;
    }
    //なければデータベースに追加
    //const push_log = db.collection("rooms").doc(room).collection("people").doc("person1").collection("push_log");
    const push_log = db.collection(room_col).doc(room_name).collection(push_log_);
    const date = TransTime();
    const data = {mili: date.mili, time: date.time, sound: voiceMan, name: displayName, uid: uid, notSend: notSend};
    push_log.doc().set(data);
    console.log(data);
  }

  const handleClickPlay = async (sound)=>{
    if(firstSleep){
      noSleep.enable();
      firstSleep = false;
      sourceIdList.map((idName)=>{
        //console.log(idName);
        document.getElementById(idName).volume = 0.05;
      });
    }
    const db = firebase.firestore();
    const voiceManId = reverseRef[manVoice];
    const voiceMan = soundEffectList[voiceManId][sound].name + manVoice;
    //Audioplay(voiceMan+'-'+0, sound);
    if(notSend){
      Audioplay(voiceMan + '-' + audioComponentList[sound], sound);
      //audioComponentList[sound] = (audioComponentList[sound] + 1) % audioComponentSize;
      const push_log = db.collection(room_col).doc(room_name).collection("push_log");
      const date = TransTime();
      const user = firebase.auth().currentUser;
      let uid = "guest";
      let displayName = "guest";
      if(user != null){
        uid = user.uid;
        displayName = user.displayName;
      }
      const data = {mili: date.mili, time: date.time, sound: voiceMan, name: displayName, uid: uid, notSend: notSend};
      push_log.doc().set(data);
      console.log(data);
      return;
    }
    const docId = voiceMan;
    const randomNum= Math.random();
    const newData = {sound: voiceMan, randomNum: randomNum+updcnt};
    try{
      //console.log(newData);
      await db.collection(room_col).doc(room_name).collection(sound_list).doc(docId).update(newData);
    }catch(error){
      await db.collection(room_col).doc(room_name).collection(sound_list).doc(docId).set(newData);
      console.error(error);
    }
    updcnt = (updcnt + 1.0);

    //データベースに押したことを保存
    const user = firebase.auth().currentUser;
    let uid = "guest";
    let displayName = "guest";
    if(user != null){
      uid = user.uid;
      displayName = user.displayName;
    }
    //なければデータベースに追加
    //const push_log = db.collection("rooms").doc(room).collection("people").doc("person1").collection("push_log");
    const push_log = db.collection(room_col).doc(room_name).collection(push_log_);
    const date = TransTime();
     
    const data = {mili: date.mili, time: date.time, sound: voiceMan, name: displayName, uid: uid, notSend: notSend};
    push_log.doc().set(data);
    console.log(data);
  }

  let appfunction;
  let flickzone;
  let btnzone;
  let mainbtnzone;
  if(window.location.pathname !== "/"){

    if(window.location.pathname[1] === "f"){
      flickzone = (
        <div className="fstart hole sel" id="contents">
          <p className="smaller">たしかに↑</p>
          
          <p className="flick-left smaller">なるほど←</p>
          <p id="number">{no}</p>
          <p className="flick-right smaller">→すごい</p>
          
          <p className="bottom smaller">いいね↓</p>
        </div>
      );
      btnzone = (
        <div className="pcl">
          <button className='four-btn' onClick={()=>{handleClickPlay(0)}}>なるほど</button>
          <button className='four-btn' onClick={()=>{handleClickPlay(3)}}>たしかに</button>
          <button className='four-btn' onClick={()=>{handleClickPlay(1)}}>いいね</button>
          <button className='four-btn' onClick={()=>{handleClickPlay(4)}}>すごい</button>
          
        </div>
      );
    }else{
      flickzone = (
        <div className="not-vis" id="contents">
          <p>たしかに</p>
          <p className="flick-left">なるほど</p>
          <p id="number">{no}</p>
          <p className="flick-right">すごい</p>
          
          <p>いいね</p>
        </div>
      );
      btnzone = (
        <div>
          <button className='four-btn' onClick={()=>{handleClickPlay(0)}}>なるほど</button>
          <button className='four-btn' onClick={()=>{handleClickPlay(3)}}>たしかに</button>
          <button className='four-btn' onClick={()=>{handleClickPlay(1)}}>いいね</button>
          <button className='four-btn' onClick={()=>{handleClickPlay(4)}}>すごい</button>
          
        </div>
      );
    }

    appfunction = (
    <div tabIndex='0' className="App" onClick={()=>{NosleepInit();}} onKeyPress={(e)=>{} }>
      <div>
        <h1 className="pcl inl">音声<span className="redchar">受信</span>専用画面</h1>
        <h4 className="sel"><span className="redchar">送信</span>用画面　　<span>room: {room_name}</span>
        </h4>
        <h4 className="pcl inl">　　room: {room_name}</h4>
      </div>

      <br className="pcl"></br>
      <br className="pcl"></br>

      <div>
        
        <button className='sendbutton sel' onClick={()=>{notSendvar = 1 - notSendvar;setnotSend(1-notSend);}}><span className="high-light">{notSendState[notSend]}</span></button>
        <button className='sendbutton pcl'><span className="high-light">{notSendStatePC[notSendPC]}</span></button>
        {/* <button className='sendbutton pcl' onClick={()=>{notSendvar = 1 - notSendvar;setnotSend(1-notSend);}}><span className="high-light">{notSendStatePC[notSend]}</span></button> */}
        
        <form name="selectlist" className="selection">
          <span className="sel">　　入力声 </span>
          <span className="pcl">　　声 </span>
          <select name="voiceselect" onChange={()=>{voiceChange()}}>
            <option value="man1">男:高い</option>
            <option value="man2">男:中</option>
            <option value="man3">男:低い</option>
            <option value="lady1">女:いきいき</option>
            <option value="lady2">女:しっかり</option>
            <option value="lady3">女:落ち着いた</option>
          </select>
        </form>
      </div>
      <p className="pcl smallchar">※音声確認モードでは音が共有されません</p>
      <p className="pcl smallchar">※実験用に操作確認モード以外は選べないようにしています</p>
      {/* <p className="pcl smallchar">※この画面で設定した声は確認用です</p> */}
      <p className="sel smallchar">※操作確認モードでは音が共有されません</p>
      {/* <p className="redline">[step1/3]必要に応じて音量を調節</p> */}
      <br className="pcl"></br>
      <p className="pcl inl">
          音量
          <RangeSlider className='volume-slider' max={0.3} min={0} step={0.005} value={soundVolume} onChange={(e)  => {setsoundVolume(Number(e.target.value)); soundVolumeManager = Number(e.target.value);}}/>
          {/* <input type="range"></input> */}
      </p>
      {/* <br className="sel"></br> */}
      {flickzone}
      {btnzone}
      
      {/* <form name="koelist" className="sel pcl">
        <span>ボタンの声 </span>
        <select name="koeselect" onChange={()=>{koeChange()}}>
          <option value="なるほど">なるほど</option>
          <option value="いいね">いいね</option>
          <option value="神">神</option>
          <option value="たしかに">たしかに</option>
          <option value="すごい">すごい</option>
          <option value="まじで">まじで</option>
        </select>
      </form> */}
      
      {/* <button className='mainbutton' onClick={()=>{handleClickPlay(revmanRef[soundEffect])}}>{soundEffect}</button>
      <br></br>
      <br></br> */}
      
      

      {/* <button className='playbutton colorbutton' onClick={()=>{handleClickPlay(0)}}>なるほど</button>
      <button className='playbutton colorbutton' onClick={()=>{handleClickPlay(1)}}>いいね</button>
      <button className='playbutton colorbutton' onClick={()=>{handleClickPlay(2)}}>神</button>
      <button className='playbutton colorbutton' onClick={()=>{handleClickPlay(3)}}>たしかに</button>
      <button className='playbutton colorbutton' onClick={()=>{handleClickPlay(4)}}>すごい</button>
      <button className='playbutton colorbutton' onClick={()=>{handleClickPlay(5)}}>まじで</button>
      <br></br>
      <button className='playbutton sound0' onClick={() => {handleClickPush(0)}}>{audioNameList[0]}</button>
      
      <button className='playbutton sound1' onClick={() => {handleClickPush(1)}}>{audioNameList[1]}</button>
      <br></br>
      <button className='playbutton sound2' onClick={() => {handleClickPush(2)}}>{audioNameList[2]}</button>
      
      <button className='playbutton sound3' onClick={() => {handleClickPush(3)}}>{audioNameList[3]}</button>
      <br></br>
      <button className='playbutton sound4' onClick={() => {handleClickPush(4)}}>{audioNameList[4]}</button>
      
      <button className='playbutton sound5' onClick={() => {handleClickPush(5)}}>{audioNameList[5]}</button>
      <br></br>

      {SourceList.map((itemObj) => {
        return(
          <audio key={itemObj.name} id={itemObj.name} preload="auto">
            <source src={audioSourceList[itemObj.sound]} type="audio/mp3"></source>
          </audio>
        );
      })}
    */}

      

      {sourceNoList.map((data)=>{
        //console.log(data);
        return data;
      })}
      
      <div className="qrcode">
        <p className="redline">[step1/2]↑のボタンを押して音量と声を確認</p>
        <p className="redline">[step2/2]↓スマホで読み取って入力用画面を開く</p>
        <Qrcode/>
      </div>
      <div className="sel">
        <Auth/>
      </div>
      
    </div>
    )
    
  }else{
    appfunction = (
      <div className="App">
        
      </div>
    );
  }

  // for(let i=0;i<soundEffectList[0].length;i++){
  //   for(let j=0;j<voiceREF.length;j++){
  //   let name = soundEffectList[0][i].name;
  //   let voice = voiceREF[j];
  //   //console.log(name+voice+'-0');
  //   let idName = name+voice+'-0';
  //   //document.getElementById(idName).volume = soundVolumeManager;
  //   }
  // }

  return (
    <div>
      <div>{appfunction}</div>
      <div>
        <button onClick={()=>{handleClickLogButton()}}>Log</button>
      </div>
      
      {/* <div className="sel"><SelfNoSleep/></div> */}
      
    </div>
  );
}



export default App;