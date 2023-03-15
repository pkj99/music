/**************************************************
 * MKOnlinePlayer v2.32
 * 播放列表配置模块
 * 编写：mengkun(http://mkblog.cn)
 * 时间：2017-9-15
 *************************************************/
// 建议修改前先备份一下
// 获取 歌曲的网易云音乐ID 或 网易云歌单ID 的方法：
// 先在 js/player.js 中开启调试模式，然后按 F12 打开浏览器的控制台。播放歌曲或点开歌单即可看到相应信息

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
    {  id: 2884035         }, // "网易原创歌曲榜"
    {  id: 64016         }, // 中国TOP排行榜（内地榜）
    {  id: 112504        },  // 中国TOP排行榜（港台榜）
    {  id: 60198      }, // "美国Billboard榜"
    {  id: 180106      }, // "UK排行榜周榜"
    {  id: 21845217      }, // "KTV唛榜"
    {id:3812895}, // Beatport全球电子舞曲榜
    {id:2809513713},
    {id:2809577409},
    {id:60131},
    {id:745956260},
    {id:4395559} // 华语金曲榜
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
    // {
    //     id: 'kuwo',
    //     name: "酷我專輯",
    //     cover: "https://p3.music.126.net/UbjonnoZfxIta89hT-e8cQ==/109951168262199535.jpg?param=200y200",
    //     creatorID: -1,
    //     creatorName: "酷我專輯",
    //     creatorAvatar: 0,
    //     item: []
    // },        
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

// var artistList = [30116848, 1876, 2116, 2110, 2201, 2348, 2522, 2738, 2736, 2842, 2852, 3066, 3079, 3154, 3627, 3684, 3683, 3691, 3692, 3705, 3686, 3694, 4755, 4813, 4895, 4948, 5196, 5197, 5538, 5358, 5354, 5379, 187229, 5350, 5357, 5359, 5360, 5768, 5774, 6066, 6075, 6070, 6452, 6460, 980025, 6454, 6652, 6456, 6469, 6473, 6459, 6480, 6463, 6730, 7214, 7219, 7220, 7346, 7570, 7535, 7538, 7534, 7652, 7662, 7667, 7654, 7760, 7762, 7779, 7896, 7929, 690001, 8163, 8147, 8298, 8329, 8326, 8325, 8353, 8345, 8753, 8354, 8350, 8926, 8922, 9103, 9102, 9106, 9104, 9109, 9167, 9255, 9272, 954154, 9274, 9275, 9548, 9606, 9612, 9611, 9646, 9633, 9940, 9945, 9944, 9943, 9942, 9954, 9951, 9946, 10200, 10221, 10562, 10559, 10577, 10763, 10569, 10566, 10564, 10579, 11109, 11260, 11363, 12676697, 1044214, 12440, 1039873, 12609, 12707, 13193, 13190];
// var playList = [{'id': 7289498727}, {'id': 2829733864}, {'id': 7050074027}, {'id': 2364025740}, {'id': 7308142944}, {'id': 2829779628}, {'id': 2890348606}, {'id': 2919023249}, {'id': 2968527373}, {'id': 7582775059}, {'id': 2829821753}, {'id': 7669623718}, {'id': 3068013756}, {'id': 7480702895}, {'id': 7738405685}, {'id': 2829807251}, {'id': 2987193702}, {'id': 5474244624}, {'id': 7481237292}, {'id': 3072883579}, {'id': 2554594486}, {'id': 4953880094}, {'id': 7561460225}, {'id': 2945028696}, {'id': 2829827274}, {'id': 5089862808}, {'id': 7336545029}, {'id': 6862602894}, {'id': 4865548839}, {'id': 7746339304}, {'id': 6948039584}, {'id': 2944021971}, {'id': 7725696145}, {'id': 7849903053}, {'id': 7732716603}];
// var artistList = [];
// var albumList = [];

// musicList = musicList.concat(playList);

// for(var i=0; i<artistList.length; i++) {
//     musicList.push({id:3778678})
// }
// for(var i=0; i<albumList.length; i++) {
//     musicList.push({id:3778678})
// }