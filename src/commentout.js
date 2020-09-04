//const [users, setUsers] = useState([]);
  //const [userName, setUserName] = useState('');
  //const [age, setAge] = useState('');
  //const [documentId, setDocumentId] = useState('');

// const { useEffect } = require("react");

// useEffect(()=>{
//     /*const unsubscribe = db.collection('users').onSnapshot((querySnapshot)=>{
//       //handleClickSoundButton1();
//       // console.log('updated');
//       // querySnapshot.forEach(doc => {
//       //   console.log(doc.id, doc.data());
//       //   console.log('--------------------');
//       // });
//       console.log(count1,count2);
//       if(count1){
//         // document.getElementById('sound-ping').play();
//         //Audioplay('sound-ping');
//         count1 = 0;
//       }
//       console.log('can you see?');
//       const _users = querySnapshot.docs.map(doc =>{
//         return{
//           userId: doc.id,
//           ...doc.data()
//         };
//       });
//       setUsers(_users);
//     });*/
// })



//ボタン押したあとの挙動全部をひとつの処理にまとめたい
  // const handleClickSoundButton1 = async () => {
  //   //document.getElementById('sound-ping').play();
  //   //document.getElementById('sound-e').play();
  //   //await setCount1(count1+1);
  //   //count1 = 1;
  //   const soundId = {soundid: '1'};
  //   handleClickShareButton(soundId);
  // };

  // const handleClickShareButton = async (soundId) => {
  //   console.log('soundId is ',soundId.soundid);
  //   if(notSend){
  //     Audioplay('sound-'+soundId.soundid+'-'+audioComponentList[soundId.soundid-1]);
  //     audioComponentList[soundId.soundid-1] = (audioComponentList[soundId.soundid-1] + 1) % audioComponentSize;
  //     return;
  //   }
  //   const docId = "admin"+soundId.soundid;
  //   const newData = {};
  //   const randomAge = Math.random();
  //   newData['name'] = "sound-"+soundId.soundid;
  //   newData['age'] = randomAge;
  //   try{
  //     const db = firebase.firestore();
  //     await db.collection('users').doc(docId).update(newData);
  //   }catch(error){
  //     // const db = firebase.firestore();
  //     // const ref = await db.collection('users').add({
  //     //   name: 'sound-'+soundId.soundid,
  //     //   age : 0
  //     // });
  //     console.error(error);
  //   }
  //   updcnt = (updcnt + 1.0);
  //   console.log(`updcnt=${randomAge+updcnt}`);
  // }

  // const handleClickFetchButton = async () => {
  //   const db = firebase.firestore();
  //   const snapshot = await db
  //     .collection('users')
  //     .get();
  //   const _users = [];
  //   snapshot.forEach(doc => {
  //     _users.push({
  //       userId: doc.id,
  //       ...doc.data()
  //     });
  //   });
  //   setUsers(_users);
  // };

  // const handleClickAddButton = async () => {
  //   //
  //   if(!userName || !age){
  //     alert('input error');
  //     return;
  //   }
  //   const parseAge = parseInt(age, 10);
  //   if(isNaN(parseAge)){
  //     alert('number input error');
  //     return;
  //   }

  //   const db = firebase.firestore();
  //   /*await db
  //     .collection('users')
  //     .doc('1')
  //     .set({
  //       //name: 'Dummy',
  //       age: 9
  //     },{merge:true});*/
  //   const ref = await db.collection('users').add({
  //     name: userName,
  //     age : parseAge
  //   });
  //   /*const snapshot = await ref.get();
  //   const data = snapshot.data();
  //   console.log(ref.id, data);*/

  //   setUserName('');
  //   setAge('');
  // };

  // const handleClickUpdateButton = async () => {
  //   /*
  //   const db = firebase.firestore();
  //   await db.collection('users').doc('QgbNr43eiC2xwljIQmIS').update({
  //     name: 'Sot',
  //     age: 100
  //   });*/
  //   if(!documentId){
  //     alert('set documentId');
  //     return;
  //   }
  //   const newData = {};
  //   if(userName){
  //     newData['name'] = userName;
  //   }
  //   if(age){
  //     newData['age'] = parseInt(age, 10);
  //   }
  //   try{
  //     const db = firebase.firestore();
  //     await db.collection('users').doc(documentId).update(newData);
  //     setUserName('');
  //     setAge('');
  //     setDocumentId('');
  //   } catch(error){
  //     console.error(error);
  //   }
  // };

  // const handleClickDeleteButton = async () => {
  //   /*const db = firebase.firestore();
  //   db.collection('users').doc('QgbNr43eiC2xwljIQmIS').delete().then(()=>{
  //     console.log('del');
  //   }).catch((error)=>{
  //     console.error('errored', error);
  //   });*/
  //   if(!documentId){
  //     alert('no documentId');
  //     return;
  //   }

  //   try{
  //     const db = firebase.firestore();
  //     await db.collection('users').doc(documentId).delete();
  //     setUserName('');
  //     setAge('');
  //     setDocumentId('');
  //   } catch(error){
  //     console.error(error);
  //   }
  // };

  // const userListItems = users.map(user => {
  //   return (
  //     <li key={user.userId}>
  //       <ul>
  //         <li>ID : {user.userId}</li>
  //         <li>name : {user.name}</li>
  //         <li>age : {user.age}</li>
  //       </ul>
  //     </li>
  //   );
  // });


  // let login_btn = (<button onClick={()=>{handleClickLoginSystem()}}>loginする</button>);
  // function login_chack(){
  //   firebase.auth().onAuthStateChanged(function(user) {
  //       if (user) {
  //           //document.getElementById("login-status").value="login";
  //           login_btn = (<p>login</p>);
  //           console.log("login");
  //       }else{
  //           //document.getElementById("login-status").value="not logged";
  //           login_btn = (
  //             <div>
  //               <input type="text" id="login-status" readonly="readonly"></input>
  //               <button id="login-btn">login</button>
  //             </div>
  //           );
  //           console.log("unlog");
  //       }
  //   });            
  // }
  // const handleClickLoginSystem = function() {
  //   var provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithPopup(provider).then(function(result) {
  //       login_chack();
  //   }).catch(function(error) {
  //       login_chack();
  //   });
  // };
  // document.addEventListener('DOMContentLoaded', function() {
  //   // 1st check
  //   login_chack();
  //   // wite
  //   handleClickLoginSystem();
  // });


  {/* <div>
        <label htmlFor='username'>userName : </label>
        <input type='text' id="username" value={userName} onChange={
          (event)=>{setUserName(event.target.value)}
        }></input>

        <label htmlFor='age'>age : </label>
        <input type='text' id="age" value={age} onChange={
          (event)=>{setAge(event.target.value)}
        }></input>

        <label htmlFor='documentId'>documentId : </label>
        <input type='text' id="documentId" value={documentId} onChange={
          (event)=>{setDocumentId(event.target.value)}
        }></input>
      </div> */}
      {/* <button onClick={handleClickFetchButton}>取得</button>
      <button onClick={handleClickAddButton}>追加</button>
      <button onClick={handleClickUpdateButton}>更新</button>
      <button onClick={handleClickDeleteButton}>削除</button> */}