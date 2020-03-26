// プレイヤーデータ
var player_data = {
    name    : "アリシア",
    hp      : 80,
    attack  : 40,
    x : 12,
    y : 1,
    level : 1,
    exp : 0,
};


// マップデータ
var map_data = [
    ['map06','map06','map06','map06','map06','map06','map06','map06','map06','map04','map04','map04','map04','map04','map04','map04',],
    ['map06','map03','map03','map03','map03','map03','map03','map03','map03','map01','map01','map01','map15','map01','map01','map04',],
    ['map06','map03','map03','map03','map03','map03','map03','map03','map03','map01','map01','map01','map15','map01','map01','map04',],
    ['map06','map03','map03','map03','map03','map03','map03','map03','map03','map01','map01','map01','map15','map01','map01','map04',],
    ['map06','map03','map03','map03','map03','map03','map03','map03','map03','map01','map01','map01','map15','map01','map01','map04',],
    ['map06','map03','map03','map03','map03','map03','map03','map03','map03','map16','map16','map16','map17','map16','map16','map04',],
    ['map06','map03','map03','map03','map03','map03','map03','map03','map03','map01','map01','map01','map15','map01','map01','map04',],
    ['map06','map03','map03','map03','map03','map03','map03','map03','map03','map01','map01','map01','map15','map01','map01','map04',],
    ['map06','map03','map03','map03','map03','map03','map03','map03','map03','map01','map01','map01','map15','map01','map01','map04',],
    ['map06','map03','map03','map03','map03','map03','map03','map03','map03','map01','map01','map01','map15','map01','map14','map04',],
    ['map06','map03','map03','map03','map03','map03','map03','map03','map03','map01','map01','map01','map15','map01','map01','map04',],
    ['map06','map06','map06','map06','map06','map06','map06','map06','map06','map04','map04','map04','map04','map04','map04','map04',],
];



// モンスターデータ
var monster_data = [
    {
        name     : "海賊",
        hp       : 20,
        attack   : 5,
        image    : "robot4",
        location : [14,6],
    },
    {
        name     : "悪の忍者",
        hp       : 20,
        attack   : 10,
        image    : "robot5",
        location : [13,6],
    },
    {
        name     : "ダークサムライ",
        hp       : 30,
        attack   : 10,
        image    : "robot6",
        location : [12,6],
    },
    {
        name     : "雷キッド",
        hp       : 20,
        attack   : 10,
        image    : "robot7",
        location : [11,6],
    },
    {
        name     : "緑竜",
        hp       : 20,
        attack   : 20,
        image    : "robot9",
        location : [10,6],
    },
    {
        name     : "悪魔の騎士",
        hp       : 15,
        attack   : 12,
        image    : "enemy05",
        location : [9,6],
    },
    {
        name     : "ドラゴン",
        hp       : 40,
        attack   : 15,
        image    : "enemy06",
        location : [8,6],
    },
];
