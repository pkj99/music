
var musicList = [
    // 以下三个系统预留列表请勿更改，否则可能导致程序无法正常运行！
    // 预留列表：搜索结果
    {
        name: "搜索结果",   // 播放列表名字
        cover: "",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: []
    },
    // 预留列表：正在播放
    {
        name: "正在播放",   // 播放列表名字
        cover: "",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: []
    },
    // 预留列表：播放历史
    {
        name: "播放历史",   // 播放列表名字
        cover: "images/history.png",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: []
    },  
    // 以上三个系统预留列表请勿更改，否则可能导致程序无法正常运行！
    //*********************************************
    // 自定义列表开始，您可以自由添加您的自定义列表
    {  id: 3778678         }, // 云音乐热歌榜
    {  id: 3779629         }, // 云音乐新歌榜
    {  id: 19723756        }, // 云音乐飙升榜 
    {  id: 2884035         }, // 网易原创歌曲榜
    {  id: 2250011882         }, // 抖音排行榜
    {  id: 60198      }, // "美国Billboard榜"
    {  id: 180106      }, // "UK排行榜周榜"
    //{  id: 21845217      }, // "KTV唛榜"
    {  id:3812895}, // Beatport全球电子舞曲榜
    {  id:2809513713},
    {  id:2809577409},
    {  id:60131},
    {  id:745956260},
    {  id: 1978921795         }, // 云音乐电音榜
    {  id: 71384707        }  // 云音乐古典榜
    //{	id:4395559} // 华语金曲榜
];

var OriginalMusicList = musicList;

var DefaultMusicList = [
    // 以下三个系统预留列表请勿更改，否则可能导致程序无法正常运行！
    // 预留列表：搜索结果
    {
        name: "搜索结果",   // 播放列表名字
        cover: "",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: []
    },
    // 预留列表：正在播放
    {
        name: "正在播放",   // 播放列表名字
        cover: "",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: []
    },
    // 预留列表：播放历史
    {
        name: "播放历史",   // 播放列表名字
        cover: "images/history.png",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: []
    }
];

var HomeMusicList = [
    {
        name: "搜索结果",   // 播放列表名字
        cover: "",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: []
    }, 
    {
        id: 'original',
        name: "排行榜",
        cover: "https://p3.music.126.net/lL5KpMsL3mxWkm6_bM1d1g==/109951168165612314.jpg?param=200y200",
        creatorID: -1,
        creatorName: "排行榜",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'playlist',
        name: "歌單",
        cover: "http://p4.music.126.net/4Y3MZ9YQ0X5lufAmp-eudg==/109951168296692473.jpg?param=200y200",
        creatorID: -1,
        creatorName: "歌單",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'album',
        name: "專輯",
        cover: "https://p4.music.126.net/92NWlGo76ha-if-WMK3vCg==/1410673428769729.jpg?param=200y200",
        creatorID: -1,
        creatorName: "專輯",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'collection',
        name: "精選50首",
        cover: "https://p4.music.126.net/BCw6bptJIibZH3kbwBA8FA==/109951163609551095.jpg?param=200y200",
        creatorID: -1,
        creatorName: "精選50首",
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
    {
        id: 'live',
        name: "演唱會",
        cover: "https://p3.music.126.net/0fmKlds6iJDqBPwc8WrF8Q==/109951168173611755.jpg?param=200y200",
        creatorID: -1,
        creatorName: "演唱會",
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
        name: "滚石香港黄金十年",
        cover: "https://p3.music.126.net/9O1BgXFwR78UK0qopuQIoQ==/109951163756892840.jpg?param=200y200",
        creatorID: -1,
        creatorName: "滚石香港黄金十年",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'tiktok',
        name: "抖音",
        cover: "https://p1.music.126.net/8sRm2fQNh_KZeWmJ1sRhQQ==/109951165611408950.jpg?param=200y200",
        creatorID: -1,
        creatorName: "抖音",
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
        id: 'search',
        name: "搜索",
        cover: "https://p3.music.126.net/0-deIQ8ckyaCh9Sof2CvjQ==/109951168094729294.jpg?param=200y200",
        creatorID: -1,
        creatorName: "搜索",
        creatorAvatar: 0,
        item: []
    },
    {
        id: 'artist',
        name: "歌手(外部連結)",
        cover: "https://p3.music.126.net/UbjonnoZfxIta89hT-e8cQ==/109951168262199535.jpg?param=200y200",
        creatorID: -1,
        creatorName: "歌手(外部連結)",
        creatorAvatar: 0,
        item: []
    }
    // ,
    // {
    //     id: 'kuwo',
    //     name: "酷我專輯",
    //     cover: "https://p3.music.126.net/UbjonnoZfxIta89hT-e8cQ==/109951168262199535.jpg?param=200y200",
    //     creatorID: -1,
    //     creatorName: "酷我專輯",
    //     creatorAvatar: 0,
    //     item: []
    // }
]

var TikTokMusicList = [
    // 以下三个系统预留列表请勿更改，否则可能导致程序无法正常运行！
    // 预留列表：搜索结果
    {
        name: "搜索结果",   // 播放列表名字
        cover: "",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: []
    },
    // 预留列表：正在播放
    {
        name: "正在播放",   // 播放列表名字
        cover: "",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: []
    },
    // 预留列表：播放历史
    {
        name: "播放历史",   // 播放列表名字
        cover: "images/history.png",          // 播放列表封面
        creatorName: "",        // 列表创建者名字
        creatorAvatar: "",      // 列表创建者头像
        item: []
    },  
    // 以上三个系统预留列表请勿更改，否则可能导致程序无法正常运行！
    //*********************************************
    // 自定义列表开始，您可以自由添加您的自定义列表
    {  id: 2250011882         } // 抖音排行榜
];


