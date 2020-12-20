import React, { Component } from 'react';
import * as firebase from 'firebase';
import 'firebase/auth';
import './Auth.css';

const firebaseConfig = {
    apiKey: "AIzaSyCWblfVKhwIxF5rG6w0H-ZUiu8E5MLKHhk",
    authDomain: "test1-81afe.firebaseapp.com",
    databaseURL: "https://test1-81afe.firebaseio.com",
    projectId: "test1-81afe",
    storageBucket: "test1-81afe.appspot.com",
    messagingSenderId: "1005325532421",
    appId: "1:1005325532421:web:c93c507b5c92d79b2a0b6c",
    measurementId: "G-5NLVM6TC4W"
};
firebase.initializeApp(firebaseConfig);

class Auth extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      console.log(user);
      console.log(user.photoURL);
      return;
      if(user == null){
          console.log("user is null");
          return;
      }
      console.log("cc");
      const db = firebase.firestore();
      const room = "room1";
      const docRef = db.collection("rooms").doc(room).collection("people").doc(user.uid);
      docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    })
  }
  //componentDidMountはrenderが実行された後に行われる。データの受け渡しが可能な状態になったら下記のコードが実行されていく。
  //onAuthstateChangeでuserにログインしたユーザーの情報を与える

  login() {
    const provider = new firebase.auth.GoogleAuthProvider()
    //firebase.auth().signInWithRedirect(provider)
    firebase.auth().signInWithPopup(provider)
        .then(user => {
            //alert("success : " + user.user.displayName + "さんでログインしました");
          })
          .catch(error => {
              alert(error.message);
          });
  }
  //signInWithRedirectでGoogleのログインページに接続して、Google プロバイダ オブジェクトのインスタンスを作成する。
  logout() {
    firebase.auth().signOut()
  }

  render() {
    return (
      <div className="Auth">
        {this.state.user ? (
          <div className="UserName-log">
            <img className="photo-url" src={this.state.user.photoURL}></img>
            <h3 className="UserName"><span className="UserNameTitle">User:</span>  {this.state.user && this.state.user.displayName}  </h3>
          </div>
          // displayNameでログインした人のGoogleアカウントに登録されている名前を表示する
        ) : (
           <h3 className="UserName">Guest  </h3>
　　　　　　//ログインしていない人用の表示
        )}
        {this.state.user ? (
          <button className="logout-btn login-logout" onClick={this.logout}>Logout</button>
　　　　　　//ユーザーがログインしている時はlogoutボタンを表示する
        ) : (
          <button className="login-btn login-logout" onClick={this.login}>Login</button>
　　　　　　//ユーザーがいない時はloginボタンを表示する
        )}
      </div>
    )
  }
}

export default Auth