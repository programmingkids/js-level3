
var loadScene = new Phaser.Scene("loadScene");

loadScene.preload = function () {
    // プレイヤー画像
    this.load.image('player', './assets/images/chara01.png');
    // スタート画像
    this.load.image('startButton', './assets/images/start.gif');
    // マップ画像
    this.load.image('map01', './assets/images/map01.png');
    this.load.image('map02', './assets/images/map02.png');
    this.load.image('map03', './assets/images/map03.png');
    this.load.image('map04', './assets/images/map04.png');
    this.load.image('map05', './assets/images/map05.png');
    this.load.image('map06', './assets/images/map06.png');
    this.load.image('map07', './assets/images/map07.png');
    this.load.image('map08', './assets/images/map08.png');
    this.load.image('map09', './assets/images/map09.png');
    this.load.image('map10', './assets/images/map10.png');
    this.load.image('map11', './assets/images/map11.png');
    this.load.image('map12', './assets/images/map12.png');
    this.load.image('map13', './assets/images/map13.png');
    this.load.image('map14', './assets/images/map14.png');
    this.load.image('map15', './assets/images/map15.png');
    this.load.image('map16', './assets/images/map16.png');
    this.load.image('map17', './assets/images/map17.png');
    this.load.image('map18', './assets/images/map18.png');
    this.load.image('map19', './assets/images/map19.png');
    // 敵画像
    this.load.image('enemy01', './assets/images/enemy01.png');
    this.load.image('enemy02', './assets/images/enemy02.png');
    this.load.image('enemy03', './assets/images/enemy03.png');
    this.load.image('enemy04', './assets/images/enemy04.png');
    this.load.image('enemy05', './assets/images/enemy05.png');
    this.load.image('enemy06', './assets/images/enemy06.png');
    // ボタン画像
    this.load.image('button_blue','./assets/images/button_blue.png');
    this.load.image('button_red','./assets/images/button_red.png');
    this.load.image('button_green','./assets/images/button_green.png');
    this.load.image('button_orange','./assets/images/button_orange.png');
    this.load.image('button_pink','./assets/images/button_pink.png');
};

loadScene.create = function() {
    // スタートシーンを自動的に開始します
    this.scene.start("startScene");
};
