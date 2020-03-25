var mainScene = new Phaser.Scene("mainScene");

mainScene.create = function (data) {
    // 初期設定の読み込み
    this.config(data);
    
    // マップの作成
    this.createMap();
    
    // プレイヤー作成
    this.createPlayer();
    
    // プレイヤー操作
    this.input.keyboard.on('keydown-UP',this.moveUp, this);
    this.input.keyboard.on('keydown-DOWN',this.moveDown, this);
    this.input.keyboard.on('keydown-RIGHT',this.moveRight, this);
    this.input.keyboard.on('keydown-LEFT',this.moveLeft, this);
    
    // モンスター作成
    this.createMonster();
    
    // ゲームオーバー処理
    this.isGameOver();
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
    // データのチェック
    this.checkData(data);
};

mainScene.createMap = function() {
    // マップ作成
    // Y方向の繰り返し
    for( var y = 0; y < map_data.length; y++  ) {
        // X方向の繰り返し
        for( var x = 0; x < map_data[y].length; x++ ) {
            // マップの作成
            var mapImage = this.add.image(x * 50, y * 50, map_data[y][x]).setOrigin(0,0);
            // マップのサイズを変更
            mapImage.setDisplaySize(50, 50);
        }
    }
};

mainScene.createPlayer = function() {
    // プレイヤー画像の表示
    this.player = this.add.image(this.playerData.x * 50, this.playerData.y * 50, 'player');
    this.player.setOrigin(0,0);
    // プレイヤー画像の表示サイズ変更
    this.player.setDisplaySize(50,50);
    // 重なり
    this.player.setDepth(1);
    // プレイヤーのデータ設定
    this.player.setData("profile", this.playerData);
};

mainScene.drawPlayer = function() {
    // プレイヤー画像を移動して表示する
    this.player.setPosition(this.playerData.x * 50, this.playerData.y * 50);    
};

mainScene.moveUp = function(event) {
    // プレイヤーが上に移動
    // プレイヤーの上方向の移動後のX座標とY座標
    var x = this.playerData.x;
    var y = this.playerData.y - 1;
    // 移動できるかのチェック
    if( !this.checkMove(x, y)) {
        // 移動できない
        return false;
    }
    // 上方向へ移動
    this.playerData.y -= 1;
    this.drawPlayer();
    // モンスターのチェック
    this.checkMonster();
};

mainScene.moveDown = function(event) {
    // プレイヤーが下に移動
    // プレイヤーの下方向の移動後のX座標とY座標
    var x = this.playerData.x;
    var y = this.playerData.y + 1;
    // 移動できるかのチェック
    if( !this.checkMove(x, y)) {
        // 移動できない
        return false;
    }
    // 下方向へ移動
    this.playerData.y += 1;
    this.drawPlayer();
    // モンスターのチェック
    this.checkMonster();
};

mainScene.moveRight = function(event) {
    // プレイヤーが右に移動
    // プレイヤーの右方向の移動後のX座標とY座標
    var x = this.playerData.x + 1;
    var y = this.playerData.y;
    // 移動できるかのチェック
    if( !this.checkMove(x, y)) {
        // 移動できない
        return false;
    }
    // 右方向へ移動
    this.playerData.x += 1;
    this.drawPlayer();
    // モンスターのチェック
    this.checkMonster();
};

mainScene.moveLeft = function(event) {
    // プレイヤーが左に移動
    // プレイヤーの左方向の移動後のX座標とY座標
    var x = this.playerData.x - 1;
    var y = this.playerData.y;
    // 移動できるかのチェック
    if( !this.checkMove(x, y)) {
        // 移動できない
        return false;
    }
    // 左方向へ移動
    this.playerData.x -= 1;
    this.drawPlayer();
    // モンスターのチェック
    this.checkMonster();
};

mainScene.checkMove = function(x, y) {
    // マップの移動可能可否の確認
    if( x < 0 || x > 15 ) {
        // X方向でシーンの外に出るので移動不可
        return false;
    }
    if( y < 0 || y > 11 ) {
        // Y方向でシーンの外に出るので移動不可
        return false;
    }
    // マップ画像の移動不可のチェック
    if( !this.checkMap(x, y)) {
        return false;
    }
    // 移動してOK
    return true;
};

mainScene.checkMap = function(x, y) {
    // マップ内の移動不可の画像をチェック
    if( map_data[y][x] == "map04" || 
        map_data[y][x] == "map05" ||
        map_data[y][x] == "map07" ||
        map_data[y][x] == "map18"
        ) {
            // 移動不可の画像
            return false;
    }
    // 移動してOK
    return true;
};

mainScene.createMonster = function() {
    // モンスター作成
    this.monsterGroup = this.add.group();
    // モンスター配列に基づいてモンスターの作成
    for( var i in this.monsterData ) {
        // モンスター配列から1体のモンスターを取り出す
        var data = this.monsterData[i];
        // データにインデックスを割り当てておく
        data.index = i;
        // モンスターの座標
        var x = data.location[0];
        var y = data.location[1];
        // モンスターの画像
        var image = data.image;
        // モンスター作成
        var monster = this.monsterGroup.create(x * 50, y * 50, image);
        monster.setOrigin(0,0);
        monster.setDepth(0);
        monster.setDisplaySize(50, 50);
        // モンスターに初期データを保存
        monster.setData("profile",data);
    }
};

mainScene.checkMonster = function() {
    // プレイヤーがモンスターの位置に移動したのかの確認
    // プレイヤーの座標取得
    var playerX = this.playerData.x;
    var playerY = this.playerData.y;
    
    var monsters = this.monsterGroup.getChildren();
    for( var i in monsters ) {
        var monster = monsters[i];
        var monsterData = monster.getData("profile");
        // モンスターの座標取得
        var x = monsterData.location[0];
        var y = monsterData.location[1];
        
        if( playerX == x && playerY == y ) {
            console.log( "敵に遭遇");
            // バトルシーンに渡す連想配列を作成
            var playerData = this.player.getData("profile");
            var data = {
                status      : "main",
                playerData  : playerData,
                monsterData : monsterData,
            };
            // バトルシーンをスタート
            this.scene.start("battleScene",data);
            break;
        }
    }
};

mainScene.checkData = function(data) {
    // バトルシーンからの戻ってきた場合
    if( data['monsterData'] ) {
        // HPが「0」の場合
        if( data['monsterData'].hp <= 0 ) {
            // モンスターデータ配列から削除
            var index = data['monsterData'].index;
            this.monsterData.splice(index, 1);
        }
    }
};

mainScene.isGameOver = function() {
    if( this.playerData.hp <= 0 ) {
        // プレイヤーが負けたのでゲームオーバー
        this.time.addEvent({
            delay: 500,
            callback: this.gameOver,
            loop: false,
            callbackScope: this
        });        
    }
    
    if( this.monsterData.length <= 0) {
        // モンスターを倒したのでゲームクリア
        this.time.addEvent({
            delay: 500,
            callback: this.gameClear,
            loop: false,
            callbackScope: this
        });        
    }
};

mainScene.gameOver = function() {
    alert("ゲームオーバー");
    this.scene.start("startScene");
};

mainScene.gameClear = function() {
    alert("モンスターを倒しました");
    this.scene.start("startScene");
};
