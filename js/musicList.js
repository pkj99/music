
var musicList = [
    // 以下三個系統預留清單請勿更改，否則可能導致程式無法正常運行！
    // 預留列表：搜索結果
    {
        name: "搜索結果",   // 播放清單名字
        cover: "",          // 播放清單封面
        creatorName: "",        // 列表創建者名字
        creatorAvatar: "",      // 列表創建者頭像
        item: []
    },
    // 預留列表：正在播放
    {
        name: "正在播放",   // 播放清單名字
        cover: "",          // 播放清單封面
        creatorName: "",        // 列表創建者名字
        creatorAvatar: "",      // 列表創建者頭像
        item: []
    },
    // 預留列表：播放歷史
    {
        name: "播放歷史",   // 播放清單名字
        cover: "images/history.png",          // 播放清單封面
        creatorName: "",        // 列表創建者名字
        creatorAvatar: "",      // 列表創建者頭像
        item: []
    },
    // 以上三個系統預留清單請勿更改，否則可能導致程式無法正常運行！
    //*********************************************
    // 自訂列表開始，您可以自由添加您的自訂列表
    { id: 3778678 }, // 雲音樂熱歌榜
    { id: 3779629 }, // 雲音樂新歌榜
    { id: 19723756 }, // 雲音樂飆升榜 
    { id: 2884035 }, // 網易原創歌曲榜
    { id: 2250011882 }, // 抖音排行榜
    { id: 60198 }, // "美國Billboard榜"
    { id: 180106 }, // "UK排行榜周榜"
    //{  id: 21845217      }, // "KTV嘜榜"
    { id: 3812895 }, // Beatport全球電子舞曲榜
    { id: 2809513713 },
    { id: 2809577409 },
    { id: 60131 },
    { id: 745956260 },
    { id: 1978921795 }, // 雲音樂電音榜
    { id: 71384707 }  // 雲音樂古典榜
    //{ id:4395559} // 華語金曲榜
];

var OriginalMusicList = musicList;

var DefaultMusicList = [
    // 以下三個系統預留清單請勿更改，否則可能導致程式無法正常運行！
    // 預留列表：搜索結果
    {
        name: "搜索結果",   // 播放清單名字
        cover: "",          // 播放清單封面
        creatorName: "",        // 列表創建者名字
        creatorAvatar: "",      // 列表創建者頭像
        item: []
    },
    // 預留列表：正在播放
    {
        name: "正在播放",   // 播放清單名字
        cover: "",          // 播放清單封面
        creatorName: "",        // 列表創建者名字
        creatorAvatar: "",      // 列表創建者頭像
        item: []
    },
    // 預留列表：播放歷史
    {
        name: "播放歷史",   // 播放清單名字
        cover: "images/history.png",          // 播放清單封面
        creatorName: "",        // 列表創建者名字
        creatorAvatar: "",      // 列表創建者頭像
        item: []
    }
];

var HomeMusicList = [
    {
        name: "搜索結果",   // 播放清單名字
        cover: "",          // 播放清單封面
        creatorName: "",        // 列表創建者名字
        creatorAvatar: "",      // 列表創建者頭像
        item: []
    },
    // {
    //     id: 'original',
    //     name: "網易排行榜",
    //     cover: "https://p3.music.126.net/lL5KpMsL3mxWkm6_bM1d1g==/109951168165612314.jpg?param=200y200",
    //     creatorID: -1,
    //     creatorName: "網易排行榜",
    //     creatorAvatar: 0,
    //     item: []
    // },
    {
        id: 'myBangs',
        name: "酷我排行榜",
        cover: "https://p2.music.126.net/yMuFijIttE4FQsYIEb5gKQ==/109951167482049172.jpg?param=200y200",
        creatorID: -1,
        creatorName: "酷我排行榜",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'myRadios',
        name: "廣播",
        cover: "https://img.freepik.com/premium-vector/online-radio-station-vintage-icon-symbol_8071-25787.jpg?w=200",
        creatorID: -1,
        creatorName: "廣播",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'cookie',
        name: "我的收藏",
        cover: "https://p4.music.126.net/JSWQbHmxI7Cz5UdpLX377g==/109951168179150903.jpg?param=200y200",
        creatorID: -1,
        creatorName: "我的收藏",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'myalbums',
        name: "專輯收藏",
        cover: "https://p3.music.126.net/KkK14m6QgFrRjWkrv4Cqqw==/5825212604057949.jpg?param=200y200",
        creatorID: -1,
        creatorName: "專輯收藏",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'album1',
        name: "華語男歌手",
        cover: "https://p1.music.126.net/Esjm32Q05PQoX8pF008u7w==/109951165793871057.jpg?param=200y200",
        creatorID: -1,
        creatorName: "華語男歌手",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'album2',
        name: "華語女歌手",
        cover: "https://p2.music.126.net/oJorrgJ3IotZUAbZkBMuFw==/109951167771736533.jpg?param=200y200",
        creatorID: -1,
        creatorName: "華語女歌手",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'album3',
        name: "華語團體",
        cover: "https://p1.music.126.net/MbhzNEtk-c3KybdGtq3ueQ==/109951168306621485.jpg?param=200y200",
        creatorID: -1,
        creatorName: "華語團體",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'album4',
        name: "日韓歌手",
        cover: "https://p2.music.126.net/80tmLal14nKSOrEd-ujAfw==/109951165832914024.jpg?param=200y200",
        creatorID: -1,
        creatorName: "日韓歌手",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'album5',
        name: "西洋歌手",
        cover: "https://p1.music.126.net/ERv-Y-_fffIbqW7LsC93pQ==/109951168786880941.jpg?param=200y200",
        creatorID: -1,
        creatorName: "西洋歌手",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'myArtistSongs',
        name: "酷我精選50首",
        cover: "https://p3.music.126.net/ACdcatIwH63UUaUKMOpzLQ==/109951168620062161.jpg?param=200y200",
        creatorID: -1,
        creatorName: "酷我精選50首",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'random',
        name: "隨機100首",
        cover: "https://p3.music.126.net/JV62wExylJ9UUMFeWqm1ag==/109951168277112584.jpg?param=200y200",
        creatorID: -1,
        creatorName: "隨機100首",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'recent',
        name: "新歌200首",
        cover: "https://p3.music.126.net/NwySj1tvMPmr3W9vJ4ChEQ==/109951168205089190.jpg?param=200y200",
        creatorID: -1,
        creatorName: "新歌200首",
        creatorAvatar: 0,
        item: []
    },
    // {
    //     id: 'live',
    //     name: "網易演唱會",
    //     cover: "https://p1.music.126.net/IAHRobXhEykx5Tw9zUDBSQ==/109951168162652115.jpg?param=200y200",
    //     creatorID: -1,
    //     creatorName: "網易演唱會",
    //     creatorAvatar: 0,
    //     item: []
    // },
    {
        id: 'myLives',
        name: "酷我演唱會",
        cover: "https://p1.music.126.net/mFEX1ITr2AYNugquNB-KTQ==/109951163611178132.jpg?param=200y200",
        creatorID: -1,
        creatorName: "酷我演唱會",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'ost',
        name: "原聲帶",
        cover: "https://p3.music.126.net/70unwSA6vWzVxKPrehJ5cQ==/109951168149146680.jpg?param=200y200",
        creatorID: -1,
        creatorName: "原聲帶",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'rockgolden10',
        name: "滾石香港黃金十年",
        cover: "https://p3.music.126.net/9O1BgXFwR78UK0qopuQIoQ==/109951163756892840.jpg?param=200y200",
        creatorID: -1,
        creatorName: "滾石香港黃金十年",
        creatorAvatar: 0,
        item: []
    },
    // {
    //     id: 'tiktok',
    //     name: "抖音",
    //     cover: "https://p1.music.126.net/8sRm2fQNh_KZeWmJ1sRhQQ==/109951165611408950.jpg?param=200y200",
    //     creatorID: -1,
    //     creatorName: "抖音",
    //     creatorAvatar: 0,
    //     item: []
    // },
    {
        id: 'myOldSongs',
        name: "懷舊經典",
        cover: "https://p1.music.126.net/AYojJDyx3lCQf2A5I1Z5dA==/109951168241362084.jpg?param=200y200",
        creatorID: -1,
        creatorName: "懷舊經典",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'myEndlessMelody',
        name: "聲生不息",
        cover: "https://p1.music.126.net/rk7d6mL3Y5NKQ-2v-bQPZw==/109951167333213984.jpg?param=200y200",
        creatorID: -1,
        creatorName: "聲生不息",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'myChinaGoodSound',
        name: "中國好聲音",
        cover: "https://p1.music.126.net/pleQjKOI26fSenkUGipDLw==/109951166537300832.jpg?param=200y200",
        creatorID: -1,
        creatorName: "中國好聲音",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'mySingingWithLegends',
        name: "我們的歌",
        cover: "https://p2.music.126.net/7bg49rmvAZvjitiGiRI5Yw==/109951167917694773.jpg?param=200y200",
        creatorID: -1,
        creatorName: "我們的歌",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'myIAmASinger',
        name: "我是歌手",
        cover: "https://p2.music.126.net/_xStDO-yKQkcuVn0bYptKg==/3275445147404351.jpg?param=200y200",
        creatorID: -1,
        creatorName: "我是歌手",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'myTreasuredVoice',
        name: "天賜的聲音",
        cover: "https://p2.music.126.net/X5AQWcwdJmx7h0D8-gO14w==/109951168575643881.jpg?param=200y200",
        creatorID: -1,
        creatorName: "天賜的聲音",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'myTimeMusicConcert',
        name: "時光音樂會",
        cover: "https://p1.music.126.net/zSIAHUX5q1MjJPzP-m3LwA==/109951168946810175.jpg?param=200y200",
        creatorID: -1,
        creatorName: "時光音樂會",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'myDreamVoice',
        name: "夢想的聲音",
        cover: "https://p1.music.126.net/ro1Blkdo9FvPgddmqLbivA==/109951163794412442.jpg?param=200y200",
        creatorID: -1,
        creatorName: "夢想的聲音",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'search',
        name: "搜索",
        cover: "https://p3.music.126.net/0-deIQ8ckyaCh9Sof2CvjQ==/109951168094729294.jpg?param=200y200",
        creatorID: -1,
        creatorName: "搜索",
        creatorAvatar: 0,
        item: []
    }
]

var TikTokMusicList = [
    // 以下三個系統預留清單請勿更改，否則可能導致程式無法正常運行！
    // 預留列表：搜索結果
    {
        name: "搜索結果",   // 播放清單名字
        cover: "",          // 播放清單封面
        creatorName: "",        // 列表創建者名字
        creatorAvatar: "",      // 列表創建者頭像
        item: []
    },
    // 預留列表：正在播放
    {
        name: "正在播放",   // 播放清單名字
        cover: "",          // 播放清單封面
        creatorName: "",        // 列表創建者名字
        creatorAvatar: "",      // 列表創建者頭像
        item: []
    },
    // 預留列表：播放歷史
    {
        name: "播放歷史",   // 播放清單名字
        cover: "images/history.png",          // 播放清單封面
        creatorName: "",        // 列表創建者名字
        creatorAvatar: "",      // 列表創建者頭像
        item: []
    },
    // 以上三個系統預留清單請勿更改，否則可能導致程式無法正常運行！
    //*********************************************
    // 自訂列表開始，您可以自由添加您的自訂列表
    { id: 2250011882 } // 抖音排行榜
];



