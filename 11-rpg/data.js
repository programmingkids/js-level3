// プレイヤーデータ
var player_data = {
    name    : "ジャバ",
    hp      : 40,
    attack  : 20,
    x : 15,
    y : 11,
};

// マップデータ
var map_data = [
    ['map05','map05','map05','map05','map05','map05','map05','map05','map05','map05','map05','map05','map04','map04','map04','map04',],
    ['map05','map02','map02','map02','map02','map02','map02','map02','map02','map02','map02','map07','map17','map16','map17','map04',],
    ['map05','map05','map05','map05','map05','map05','map02','map05','map05','map05','map05','map07','map15','map18','map15','map04',],
    ['map05','map02','map02','map02','map02','map02','map02','map02','map02','map02','map02','map07','map15','map18','map15','map04',],
    ['map05','map05','map05','map05','map05','map05','map05','map05','map05','map05','map02','map07','map15','map18','map15','map04',],
    ['map05','map02','map02','map02','map02','map02','map02','map02','map02','map02','map02','map07','map15','map18','map15','map04',],
    ['map05','map05','map05','map02','map05','map05','map05','map05','map05','map05','map05','map07','map15','map18','map15','map04',],
    ['map05','map02','map02','map02','map02','map02','map02','map02','map02','map02','map02','map07','map15','map18','map15','map04',],
    ['map05','map02','map05','map05','map05','map05','map05','map05','map05','map05','map02','map07','map15','map18','map15','map04',],
    ['map05','map02','map02','map02','map05','map02','map02','map02','map05','map02','map01','map16','map17','map16','map17','map04',],
    ['map05','map02','map05','map02','map02','map02','map05','map02','map02','map02','map07','map07','map01','map01','map01','map01',],
    ['map05','map05','map05','map05','map05','map05','map05','map05','map05','map05','map05','map05','map04','map04','map01','map01',],
];

// モンスターデータ
var monster_data = [
    {
        name     : "スライムA",
        hp       : 10,
        attack   : 2,
        image    : "enemy01",
        location : [14,6],
    },
    {
        name     : "スライムB",
        hp       : 10,
        attack   : 2,
        image    : "enemy01",
        location : [14,4],
    },
    {
        name     : "スライムC",
        hp       : 10,
        attack   : 2,
        image    : "enemy01",
        location : [14,2],
    },
    {
        name     : "毒蛇",
        hp       : 15,
        attack   : 5,
        image    : "enemy02",
        location : [12,5],
    },
    {
        name     : "赤鬼A",
        hp       : 20,
        attack   : 7,
        image    : "enemy03",
        location : [11,9],
    },
    {
        name     : "赤鬼B",
        hp       : 20,
        attack   : 7,
        image    : "enemy03",
        location : [8,10],
    },
    {
        name     : "魔導士A",
        hp       : 30,
        attack   : 10,
        image    : "enemy04",
        location : [6,7],
    },
    {
        name     : "魔導士B",
        hp       : 30,
        attack   : 10,
        image    : "enemy04",
        location : [9,3],
    },
    {
        name     : "悪魔の騎士",
        hp       : 15,
        attack   : 12,
        image    : "enemy05",
        location : [9,1],
    },
    {
        name     : "ドラゴン",
        hp       : 40,
        attack   : 15,
        image    : "enemy06",
        location : [1,1],
    },
];
