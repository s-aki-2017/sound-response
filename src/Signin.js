import React from 'react';
import firebase from 'firebase/app';

const Signin = () => {

    const signInWithGoogle = () => {
        // Googleプロバイダオブジェクトのインスタンスを作成
        const provider = new firebase.auth.GoogleAuthProvider()
        // ポップアップウィンドウでログインを行う場合はsignInWithPopupを呼び出す
        firebase.auth().signInWithPopup(provider)
        .then(user => {
            alert("success : " + user.user.displayName + "さんでログインしました");
          })
          .catch(error => {
              alert(error.message);
          });
    }
    
    
    return (
            <div>
                <div className="signin_button">
                    <button onClick={()=>signInWithGoogle()} alt="google signin">ログイン</button>
                </div>
            </div>
        );
}

export default Signin