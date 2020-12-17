/* main.js */

/*
 * グローバル変数
 */
var no;				// 数値格納用
var number;		// 数値表示部分のDOM取得用						

/*
 * スワイプイベント設定
 */
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
            next();
            next();
        }else if(45 <= sheta && sheta <= 135){ //down
            console.log('down');
            next();
        }else if(-135 <= sheta && sheta <= -45){ //up
            console.log('up');
            previous();
        }else{ //left
            console.log('left');
            previous();
            previous();
        }
		// if (startX > moveX && startX > moveX + dist) {		// 右から左にスワイプ
		// 	previous();
		// }
		// else if (startX < moveX && startX + dist < moveX) {	// 左から右にスワイプ
		// 	next();
		// }
	});
}

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
window.addEventListener("load", function(){
	// 数値表示部分のDOM取得
	number = document.getElementById("number");
	
	// 数値を画面に表示
	no = 0;
	setNumber();

	// スワイプイベント設定
	setSwipe("#contents");
});