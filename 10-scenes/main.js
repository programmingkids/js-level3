var mainScene = new Phaser.Scene("mainScene");

mainScene.create = function () {
    // マップ画像の表示
    var map01Group = this.add.group({
        key: 'map01',
        frameQuantity: 192
    });
    Phaser.Actions.GridAlign(map01Group.getChildren(), {
        width: 16,
        height: 12,
        cellWidth: 50,
        cellHeight: 50,
        x: 25,
        y: 25
    });
    
    // スプライト画像の表示
    this.player = this.add.sprite(400, 300, 'player');
    // スプライト画像のサイズを1.5倍にする
    this.player.setScale(1.5);
    // 最初のフレームを「4」にする
    this.player.setFrame(0);
    
    // 正面を向く
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 0 } ],
        frameRate: 20
    });
    // 左向きのアニメーション
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    // 右向きのアニメーション
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    // 上向きのアニメーション
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    // 下向きのアニメーション
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
    
    // スコア
    this.score = 0;
    // スコア文字の表示
    this.scoreText = this.add.text(700, 50, this.score , {
        font: '40px Open Sans',
        fill: '#0000ff'
    });
    // 重なったときに上に表示される画像を指定する。大きい数値が手前に表示される
    this.player.setDepth(1);
    // 宝箱作成
    this.createTreasure();

    // 敵グループを作成　5体の敵を作成
    this.enemies = this.add.group({
        key: 'enemy01',
        repeat: 5,
    });

    // プレイヤーのHP
    this.hp = 50;
    // HPを文字で表示する
    this.hpText = this.add.text(30, 20, this.hp, {
        font: '40px Open Sans',
        fill: '#ff0000'
    });
    
    // 敵グループの画像の設定
    var enemies = this.enemies.getChildren();
    for( var i in enemies) {
        var enemy = enemies[i];
        enemy.setSize(50, 50);
        enemy.setDisplaySize(50, 50);
        enemy.setOrigin(0,0);
        enemy.setRandomPosition(0, 0, 800 - enemy.width, 600 - enemy.height);
        enemy.isHit = false;
    }
    
    // ゲームオーバーを表す変数
    this.isGameOver = false;

    // リスタート画像の表示
    this.restartImage = this.add.image(400, 500, 'restart');
    // リスタート画像をクリックできるようにする
    this.restartImage.setInteractive({
        useHandCursor: true,
    });
    // リスタート画像をクリックしたとき
    this.restartImage.on('pointerdown',function(){
        // スタートシーンを起動します
        this.scene.start("startScene");
    },this);
};

mainScene.update = function() {
    // 終了処理なら、処理を実行しない
    if( this.isGameOver ) {
        this.player.anims.stop();
        return;
    }
    
    var speed = 5;
    var cursors = this.input.keyboard.createCursorKeys();
    if(cursors.right.isDown) {
        // 右に移動
        this.player.x += speed;
        // 右向きのアニメーション
        this.player.anims.play('right', true);
    } else if(cursors.left.isDown) {
        // 左に移動
        this.player.x -= speed;
        // 左向きのアニメーション
        this.player.anims.play('left', true);
    } else if(cursors.up.isDown) {
        // 上に移動
        this.player.y -= speed;
        // 上向きのアニメーション
        this.player.anims.play('up', true);
    } else if(cursors.down.isDown) {
        // 下に移動
        this.player.y += speed;
        // 下向きのアニメーション
        this.player.anims.play('down', true);
    } else {
        // キーを放すとアニメーション停止
        this.player.anims.stop();
    }
    
    // 画像の中心点の座標を取り出す
    var playerVector2 = this.player.getCenter();
    var treasure01Vector2 = this.treasure01.getCenter();
    
    // 画像の中心点の距離を計算して、距離が40以下なら重なると判定する
    if(playerVector2.distance(treasure01Vector2) <= 40) {
        // スコアを加算
        this.score += 5;
        // 更新したスコアを表示
        this.scoreText.text = this.score;
        // 宝箱削除
        this.treasure01.destroy();
        // 新しい宝箱を作成
        this.createTreasure();
        return;
    }
    
    // プレイヤー画像の四角形オブジェクトを取得
    var playerRect = this.player.getBounds();
    
    // 敵グループから、敵配列を取得
    var enemies = this.enemies.getChildren();
    // 敵配列に繰り返し処理を実行
    for( var i in enemies ) {
        var enemy = enemies[i];
        // 敵画像の四角形オブジェクトを取得
        var enemyRect = enemy.getBounds();
        
        // プレイヤと敵の四角形が重なっていれば
        if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
            // 衝突
            if( !enemy.isHit ) {
                // HPを減算
                this.hp -= 10;
                this.hpText.text = this.hp;
                // 衝突している時は、衝突フラグを設定
                enemy.isHit = true;
                // 黄色にフラッシュする
                this.cameras.main.flash(1000, 255,255,0);
            }
        } else {
            // 距離が離れたので、衝突フラグを解除
            enemy.isHit = false;
        }
    }
    if( this.hp <= 0) {
        this.gameOver();
        return;
    }
};

mainScene.createTreasure = function() {
    // 宝箱を表示する
    this.treasure01 = this.add.image(0,0,'treasure01').setOrigin(0,0);
    this.treasure01.setRandomPosition(0, 0, 800 - this.treasure01.width, 600 - this.treasure01.height);
    // 重なったときに上に表示される画像を指定する。大きい数値が手前に表示される
    this.treasure01.setDepth(0);
};

mainScene.gameOver = function() {
    // ゲームオーバーにする
    this.isGameOver = true;
    
    // メインカメラをシェークする
    this.cameras.main.shake(1000);
    
    // シェークの完了後に実行する
    this.cameras.main.on('camerashakecomplete', function(camera, effect) {
        // 赤色にフェードアウトする
        this.cameras.main.fadeOut(1000, 255, 0, 0);
    }, this);

    // フェードアウト完了後に実行する
    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
        // スタートシーンを起動します
        this.scene.start("startScene");
    }, this);
};
