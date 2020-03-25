var battleScene = new Phaser.Scene("battleScene");

battleScene.preload = function() {
    // テキストエリアを表示するプラグインの導入
    this.load.scenePlugin({
        key: 'rexuiplugin',
        url : 'assets/js/rexuiplugin.min.js',
        sceneKey: 'rexUI'
    });
};

battleScene.create = function(data) {
    // バトル画面の作成
    this.cameras.main.setBackgroundColor("#d3d3d3");
    // プレイヤーのデータ
    this.playerData = data.playerData;
    // モンスターのデータ
    this.monsterData = data.monsterData;
    // モンスター作成
    this.createMonster();
    // プレイヤー作成
    this.createPlayer();
    // UI作成
    this.createUI();
    this.createTextArea();
    
    // 最初のメッセージ
    var text = this.monsterData.name + "が現れた！";
    this.showMessage(text);
};

battleScene.update = function() {
    // 何もしない
};

battleScene.createMonster = function() {
    // モンスター作成
    this.monster = this.add.image(100, 100, this.monsterData.image);
    this.monster.setData("profile",this.monsterData);
    this.monster.setDisplaySize(150, 150);
    // モンスターの名前のラベル
    this.monsterNameLabel = this.add.text(200, 25, "敵の名前：", {
        font: '20px Open Sans',
        fill: '#000000'
    });
    // モンスターの名前のテキスト
    this.monsterNameText = this.add.text(300, 25, this.monsterData.name, {
        font: '20px Open Sans',
        fill: '#000000'
    });
    // モンスターのHPのラベル
    this.monsterHpLabel = this.add.text(200, 80, "敵のHP：", {
        font: '20px Open Sans',
        fill: '#000000'
    });
    // モンスターのHPのテキスト
    this.monsterHpText = this.add.text(300, 80, this.monsterData.hp, {
        font: '20px Open Sans',
        fill: '#000000'
    });
};

battleScene.createPlayer = function() {
    // プレイヤー作成
    this.player = this.add.image(100, 300, 'player');
    this.player.setData("profile", this.playerData);
    this.player.setDisplaySize(150,150);
    // プレイヤーの名前のラベル
    this.playerNameLabel = this.add.text(200, 225, "名前：", {
        font: '20px Open Sans',
        fill: '#000000'
    });
    // プレイヤーの名前のテキスト
    this.playerNameText = this.add.text(300, 225, this.playerData.name, {
        font: '20px Open Sans',
        fill: '#000000'
    });
    // プレイヤーのHPのラベル
    this.playerHpLabel = this.add.text(200, 280, "HP：", {
        font: '20px Open Sans',
        fill: '#000000'
    });
    // プレイヤーのHPのテキスト
    this.playerHpText = this.add.text(300, 280, this.playerData.hp, {
        font: '20px Open Sans',
        fill: '#000000'
    });
};

battleScene.createUI = function() {
    // 戦うボタン
    this.fightButton = this.add.image(150, 550, 'button_blue');
    this.fightButton.setDisplaySize(230, 50);
    this.fightText = this.add.text( 130, 540, "戦う", {
        font: '20px Open Sans',
        fill: '#ffffff'
    });
    this.fightButton.setInteractive({
        useHandCursor: true,
    });
    // 戦うボタンをクリックすると「戦う」
    this.fightButton.on('pointerdown',function(){
        this.fight();
    },this);
    
    // 待つボタン
    this.waitButton = this.add.image(400, 550, 'button_green');
    this.waitButton.setDisplaySize(230, 50);
    this.waitText = this.add.text( 380, 540, "待つ", {
        font: '20px Open Sans',
        fill: '#ffffff'
    });
    this.waitButton.setInteractive({
        useHandCursor: true,
    });
    // 待つボタンをクリックすると「待つ」
    this.waitButton.on('pointerdown',function(){
        this.wait();
    },this);
    
    // 逃げるボタン
    this.escapeButton = this.add.image(650, 550, 'button_red');
    this.escapeButton.setDisplaySize(230, 50);
    this.escapeText = this.add.text( 620, 540, "逃げる", {
        font: '20px Open Sans',
        fill: '#ffffff'
    });
    this.escapeButton.setInteractive({
        useHandCursor: true,
    });
    // 逃げるボタンをクリックすると「逃げる」
    this.escapeButton.on('pointerdown',function(){
        this.escape();
    },this);
};

battleScene.createTextArea = function() {
    // メッセージエリア
    this.message = this.rexUI.add.textArea({
        x: 600,
        y: 250,
        width: 300,
        height: 450,
        background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0,0xffffff),
        text: this.add.text(0,0, "",{
            font: '14px Open Sans',
            fill: '#000000'
        }),
        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
        },
        slider: {
            track: this.rexUI.add.roundRectangle(0, 0, 10, 10, 10, 0xcccccc),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0xff0000),
        },
        scroller: true,
    });
    this.message.layout();
};

battleScene.showMessage = function(text) {
    // メッセージに文字の追加
    this.message.appendText(text + "\n\n");
    // 自動的にテキストエリアの最下部にスクロール
    this.message.scrollToBottom();
};

battleScene.fight = function() {
    // 戦う処理
    // ボタンを押せなくする
    this.disableButton();
    
    // プレイヤーの攻撃
    this.attackPlayer();
};

battleScene.wait = function() {
    // 待つ処理
    // ボタンを押せなくする
    this.disableButton();
    
    // メッセージを表示
    var text = "[" + this.playerData.name + "] は待機中";
    this.showMessage(text);
    // プレイヤーのHP回復
    this.recoverHP();
    
    // 1秒後にモンスターの攻撃
    this.time.addEvent({
        delay: 1000,
        callback: this.attackMonster,
        loop: false,
        callbackScope: this
    });
};

battleScene.escape = function() {
    // 逃げる処理
    // ボタンを押せなくする
    this.disableButton();
    var text = "[" + this.playerData.name + "] は逃げ出した";
    this.showMessage(text);
    
    // 1秒後にメインシーンに移動
    this.time.addEvent({
        delay: 1000,
        callback: this.backToMain,
        loop: false,
        callbackScope: this
    });
};

battleScene.backToMain = function() {
    // メインシーンに移動
    var data = {
        status      : "battle",
        monsterData : this.monster.getData("profile"),
    };
    this.scene.start("mainScene", data);
};

battleScene.recoverHP = function() {
    // HPの回復は固定で「5」
    var point = 5;
    this.playerData.hp += point;
    // メッセージ表示
    var text = "[" + this.playerData.name + "] は [" + point + "] だけHPを回復した";
    this.showMessage(text);
    // プレイヤーのHPを画面に反映
    this.playerHpText.text = this.playerData.hp;
};

battleScene.attackPlayer = function() {
    // メッセージの表示
    var text = "[" + this.playerData.name + "] の攻撃";
    this.showMessage(text);
    // プレイヤーの攻撃力をランダムに作成
    var point = Phaser.Math.RND.between(1, this.playerData.attack);
    // メッセージを表示
    text = "[" + point + "] のダメージを与えた";
    this.showMessage(text);
    
    // プレイヤーのHP減算
    this.monsterData.hp -= point;
    if(this.monsterData.hp <= 0) {
        this.monsterData.hp = 0;
    }
    // 敵のHPを画面に反映
    this.monsterHpText.text = this.monsterData.hp;
    
    if(this.monsterData.hp <= 0) {
        // メッセージを表示
        text = "[" + this.monsterData.name + "] を倒した！！！";
        this.showMessage(text);
        text = "=== 戦闘終了 ===";
        this.showMessage(text);
        // 1秒後にメインシーンに移動
        this.time.addEvent({
            delay: 1000,
            callback: this.backToMain,
            loop: false,
            callbackScope: this
        });
    } else {
        // 1秒後にモンスターの攻撃
        this.time.addEvent({
            delay: 1000,
            callback: this.attackMonster,
            loop: false,
            callbackScope: this
        });
    }
};

battleScene.attackMonster = function() {
    // メッセージの表示
    var text = "[" + this.monsterData.name + "] の攻撃";
    this.showMessage(text);
    // モンスターの攻撃力をランダムに作成
    var point = Phaser.Math.RND.between(1, this.monsterData.attack);
    // メッセージの表示
    text = "[" + point + "] のダメージをうけた";
    this.showMessage(text);
    
    // プレイヤーのHP減算
    this.playerData.hp -= point;
    if(this.playerData.hp <= 0) {
        this.playerData.hp = 0;
    }
    // プレイヤーのHPを画面に反映
    this.playerHpText.text = this.playerData.hp;
    
    if(this.playerData.hp <= 0) {
        // メッセージの表示
        text = "[" + this.playerData.name + "] は負けた";
        this.showMessage(text);
        text = "=== ゲームオーバー ===";
        this.showMessage(text);
        // 1秒後にメインシーンに移動
        this.time.addEvent({
            delay: 1000,
            callback: this.backToMain,
            loop: false,
            callbackScope: this
        });
    } else {
        // ボタンの有効化
        this.enableButton();
        // メッセージの表示
        text = "== 戦闘は続きます ==";
        this.showMessage(text);
    }
};

battleScene.disableButton = function() {
    // 全てのボタンの無効化
    this.fightButton.disableInteractive();
    this.waitButton.disableInteractive();
    this.escapeButton.disableInteractive();
};

battleScene.enableButton = function() {
    // 全てのボタンの有効化
    this.fightButton.setInteractive();
    this.waitButton.setInteractive();
    this.escapeButton.setInteractive();
};
