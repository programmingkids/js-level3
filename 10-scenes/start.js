// スタート画面のシーン
var startScene = new Phaser.Scene("startScene");

startScene.create = function () {
    // スタートボタン画像を表示する
    this.startButtonImage = this.add.image(400, 300, 'startButton');
    this.startButtonImage.setDisplaySize(300,300);
    this.startButtonImage.setInteractive();
    // スタートボタン画像をクリックしたとき
    this.startButtonImage.on('pointerdown',function(){
        // メインシーンを起動する
        this.scene.start('mainScene');
    },this);
};
