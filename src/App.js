import React, {useState, useEffect} from 'react';
import * as firebase from 'firebase';
//import logo from './logo.svg';
import './App.css';
import RangeSlider from 'react-bootstrap-range-slider';
import Auth from './Auth.js';
import CSV from './CSV.js';
//import Signin from './Signin';
//import Exp from './router.js';
//import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'

// const firebaseConfig = {
//   apiKey: "AIzaSyCWblfVKhwIxF5rG6w0H-ZUiu8E5MLKHhk",
//   authDomain: "test1-81afe.firebaseapp.com",
//   databaseURL: "https://test1-81afe.firebaseio.com",
//   projectId: "test1-81afe",
//   storageBucket: "test1-81afe.appspot.com",
//   messagingSenderId: "1005325532421",
//   appId: "1:1005325532421:web:c93c507b5c92d79b2a0b6c",
//   measurementId: "G-5NLVM6TC4W"
// };
// firebase.initializeApp(firebaseConfig);

var updcnt = 0;
//var firstAudio1 = true;
var totalSound = 6;
//var firstAudio = totalSound;
var soundVolumeManager = 0.05;
const soundAssist = [0.1,0.1,0,0,0.1,0.15];
var notSendState = ['ON', 'OFF'];
var keyList = [113,119,97,115,122,120];
var audioComponentSize = 2;
var audioComponentList = [0,0,0,0,0,0];
const room_col = "rooms";
const sound_list = "sound_list";
const push_log_ = "push_log";
var room_name = window.location.pathname;
let firstVisit = true;

if(firstVisit){
  if(window.location.pathname === "/"){
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
    firstVisit = false;
  }
}

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



function App() {
  const [soundVolume, setsoundVolume] = useState(0.05);
  const [notSend,setnotSend] = useState(0);
  console.log('inited');

  useEffect(()=>{
    console.log('useEffect');
    if(window.location.pathname === "/") return;
    const db = firebase.firestore();
      const unsubscribe = db.collection(room_col).doc(room_name).collection(sound_list).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
            // if (change.type === "added") console.log("New city: ", change.doc.data());
            // if (change.type === "modified") console.log("Modified city: ", change.doc.data());
            // if (change.type === "removed") console.log("Removed city: ", change.doc.data());
            console.log(change.type);
            if (change.type === "added" || change.type === "removed"){
              return;
            }
            // if(firstAudio > 0){
            //   //console.log(firstAudio);
            //   firstAudio--;
            //   return;
            // }
            const i = change.doc.data().sound;
            Audioplay('sound-'+i+'-'+audioComponentList[i], i);
            audioComponentList[i] = (audioComponentList[i] + 1) % audioComponentSize;
            // for(let i=0;i<totalSound;i++){
            //   if(change.doc.data().sound === i){
            //     Audioplay('sound-'+i+'-'+audioComponentList[i], i);
            //     audioComponentList[i] = (audioComponentList[i] + 1) % audioComponentSize;
            //     //console.log('if case success', i);
            //   }
            // }
        });
    });
    return () => {
      unsubscribe();
    };
  },[]);

  const KeyPress = (e) => {
    const keyNum = e.which;
    console.log('pressed key is',keyNum);
    for(let i=0;i<totalSound;i++){
      if(keyList[i] === keyNum){
        //Audioplay(`sound-${i+1}`);
        //handleClickShareButton({soundid: i});
        handleClickPush(i);
      }
    }
  }

  const Audioplay = (idName, sound) => { 
    if( typeof( document.getElementById( idName ).currentTime ) !== 'undefined' ){
 	    document.getElementById( idName ).currentTime = 0;
    }
    console.log('soundVolume is ',soundVolumeManager);
    console.log('sound idName is', idName);
    const tmp = soundVolumeManager + soundAssist[sound];
    document.getElementById(idName).volume = tmp;
    document.getElementById(idName).play();
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
    let blob = new Blob(array,{type:"text/plan"});
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'push_log.txt';
    link.click();
  }

  const Geturl = () => {
    const url = window.location.pathname;
    console.log(url);
  }

  const createRoom = () => {
    const url = window.location.href + "default";
    //room_name = "default";
    //window.location.href = url;
    window.open(url, '_brank');
  }

  const createRoomName = () => {
    let roomName = document.getElementById("roomName").value;
    console.log("roomName is:" + roomName);
    const re = / +/;
    console.log(re.test(roomName));
    roomName = roomName.replace(/\s+/g, "");
    console.log("replace roomName is:" + roomName);
    if(re.test(roomName) || roomName === "") return;
    const url = window.location.href + roomName;
    console.log(roomName);
    console.log(url);
    window.open(url, '_brank');
  }

  let appfunction;
  if(window.location.pathname !== "/"){

    appfunction = (
    <div tabIndex='0' className="App" onKeyPress={(e)=> KeyPress(e)}>
      
      <Auth/>

      

      <h3>volume
        <RangeSlider className='volume-slider' max={0.3} min={0} step={0.01} value={soundVolume} onChange={(e)  => {setsoundVolume(Number(e.target.value)); soundVolumeManager = Number(e.target.value);}}/>
      </h3>
      
      <button className='sendbutton' onClick={()=>{setnotSend(1-notSend);}}><span className="high-light">{notSendState[notSend]}</span> ← (ON:音が共有される  OFF:音は共有されない)</button>
      
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
        //console.log(itemObj.name);
        return(
          <audio key={itemObj.name} id={itemObj.name} preload="auto">
            <source src={audioSourceList[itemObj.sound]} type="audio/mp3"></source>
          </audio>
        );
      })}
      {/* <ul>{userListItems}</ul> */}
      {/* <button onClick={()=>{handleClickFetchInfo()}}>debug</button> */}
      
      
      {/* <button className="log-btn" onClick={()=>{handleClickLogButton()}}>ログ保存</button> */}
      
      <img src={"http://chart.apis.google.com/chart?cht=qr&chs=260x260&chl="+window.location.href}></img>
      <div className="bottom-margin"></div>
    </div>
    )
  }else{
    appfunction = (
      <div className="App">
        <h3>reaction tool</h3>
        <button className="enter-btn" onClick={()=>{createRoom()}}>ランダムで作成する</button>
        <br></br>
        <button className="enter-btn" onClick={()=>{createRoomName()}}>名前をつけて作成する</button>
        <br></br>
        <span>名前 </span>
        <input id="roomName"></input>
        {/* <button onClick={()=>{Geturl()}}>GetUrl</button> */}
      </div>
    );
  }

  return (
    <div>{appfunction}</div>
  );
}

export default App;
