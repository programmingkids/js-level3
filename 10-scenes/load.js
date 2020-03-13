
var loadScene = new Phaser.Scene("loadScene");

loadScene.preload = function () {
    // 画像の読み込み
    this.load.image('map01', '../assets/images/map01.png');
    this.load.image('treasure01', '../assets/images/treasure01.png');
    this.load.image('enemy01', '../assets/images/enemy01.png');
    this.load.image('restart', '../assets/images/restart.png');
    
    // スプライト画像の読み込み
    this.load.spritesheet('player', '../assets/images/player1.png', { frameWidth: 32, frameHeight: 32 });
    // スタート画像
    this.load.image('startButton', '../assets/images/start.gif');
};

loadScene.create = function() {
    // スタートシーンを自動的に開始します
    this.scene.start("startScene");
};
