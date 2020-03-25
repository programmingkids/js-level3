var mainScene = new Phaser.Scene("mainScene");

mainScene.create = function (data) {
    // 初期設定の読み込み
    
    // マップの作成
    
    
    // プレイヤー作成
    
    
    // プレイヤー操作
    
    
    // モンスター作成
    
    
    // ゲームオーバー処理
    
};

mainScene.update = function() {
    // 何もしません
};

mainScene.config = function(data) {
    // スタートシーンから起動した場合、初回なので、データをコピーする
    if(data.status == "start") {
        // プレイヤーデータのコピー
        this.playerData = JSON.parse(JSON.stringify(player_data));
        // モンスターデーターのコピー
        this.monsterData = JSON.parse(JSON.stringify(monster_data));
    }
};

mainScene.createMap = function() {
    // マップ作成
    
};

mainScene.createPlayer = function() {
    // プレイヤー画像の表示
    
};

mainScene.drawPlayer = function() {
    // プレイヤー画像を移動して表示する
    
};

mainScene.moveUp = function(event) {
    // プレイヤーが上に移動
    
};

mainScene.moveDown = function(event) {
    // プレイヤーが下に移動
    
};

mainScene.moveRight = function(event) {
    // プレイヤーが右に移動
    
};

mainScene.moveLeft = function(event) {
    // プレイヤーが左に移動
    
};

mainScene.checkMove = function(x, y) {
    // マップの移動可能可否の確認
    
};

mainScene.checkMap = function(x, y) {
    // マップ内の移動不可の画像をチェック
    
};

mainScene.createMonster = function() {
    // モンスター作成
    
};

mainScene.checkMonster = function() {
    // プレイヤーがモンスターの位置に移動したのかの確認
    
};

mainScene.checkData = function(data) {
    // バトルシーンからの戻ってきた場合
    
};

mainScene.isGameOver = function() {
    
};

mainScene.gameOver = function() {
    alert("ゲームオーバー");
    this.scene.start("startScene");
};

mainScene.gameClear = function() {
    alert("モンスターを倒しました");
    this.scene.start("startScene");
};
