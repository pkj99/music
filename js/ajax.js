
// ajax加载搜索结果
function ajaxSearch() {
    if(rem.wd === ""){
        layer.msg('搜索内容不能为空', {anim:6});
        return false;
    }
    
    if(rem.loadPage == 1) { // 弹出搜索提示
        var tmpLoading = layer.msg('搜索中', {icon: 16,shade: 0.01});
    }
    
    $.ajax({
        type: mkPlayer.method, 
        url: mkPlayer.api, 
        data: "types=search&count=" + mkPlayer.loadcount + "&source=" + rem.source + "&pages=" + rem.loadPage + "&name=" + rem.wd,
        dataType : "jsonp",
        complete: function(XMLHttpRequest, textStatus) {
            if(tmpLoading) layer.close(tmpLoading);    // 关闭加载中动画
        },  // complete
        success: function(jsonData){
            
            // 调试信息输出
            if(mkPlayer.debug) {
                console.debug("搜索结果数：" + jsonData.length);
            }
            
            if(rem.loadPage == 1)   // 加载第一页，清空列表
            {
                if(jsonData.length === 0)   // 返回结果为零
                {
                    layer.msg('没有找到相关歌曲', {anim:6});
                    return false;
                }
                musicList[0].item = [];
                rem.mainList.html('');   // 清空列表中原有的元素
                addListhead();      // 加载列表头
            } else {
                $("#list-foot").remove();     //已经是加载后面的页码了，删除之前的“加载更多”提示
            }
            
            if(jsonData.length === 0)
            {
                addListbar("nomore");  // 加载完了
                return false;
            }
            
            var tempItem = [], no = musicList[0].item.length;
            
            for (var i = 0; i < jsonData.length; i++) {
                no ++;
                tempItem =  {
                    id: jsonData[i].id,  // 音乐ID
                    name: jsonData[i].name,  // 音乐名字
                    artist: jsonData[i].artist[0], // 艺术家名字
                    album: jsonData[i].album,    // 专辑名字
                    source: jsonData[i].source,     // 音乐来源
                    url_id: jsonData[i].url_id,  // 链接ID
                    pic_id: jsonData[i].pic_id,  // 封面ID
                    lyric_id: jsonData[i].lyric_id,  // 歌词ID
                    pic: null,    // 专辑图片
                    url: null   // mp3链接
                };
                musicList[0].item.push(tempItem);   // 保存到搜索结果临时列表中
                addItem(no, tempItem.name, tempItem.artist, tempItem.album);  // 在前端显示
            }
            
            rem.dislist = 0;    // 当前显示的是搜索列表
            rem.loadPage ++;    // 已加载的列数+1
            
            dataBox("list");    // 在主界面显示出播放列表
            refreshList();  // 刷新列表，添加正在播放样式
            
            if(no < mkPlayer.loadcount) {
                addListbar("nomore");  // 没加载满，说明已经加载完了
            } else {
                addListbar("more");     // 还可以点击加载更多
            }
            
            if(rem.loadPage == 2) listToTop();    // 播放列表滚动到顶部
        },   //success
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('搜索结果获取失败 - ' + XMLHttpRequest.status);
            console.error(XMLHttpRequest + textStatus + errorThrown);
        }   // error
    });//ajax
}

// 完善获取音乐信息
// 音乐所在列表ID、音乐对应ID、回调函数
function ajaxUrl(music, callback)
{
    
    console.log('music.url:',music.url);
    // 已经有数据，直接回调
    if(music.url !== null && music.url !== "err" && music.url !== "") {
        callback(music);
        return true;
    }
    // id为空，赋值链接错误。直接回调
    if(music.id === null) {
        music.url = "err";
        updateMinfo(music); // 更新音乐信息
        callback(music);
        return true;
    }
    
    $.ajax({ 
        type: mkPlayer.method, 
        url: mkPlayer.api,
        data: "types=url&id=" + music.id + "&source=" + music.source,
        dataType : "jsonp",
        success: function(jsonData){
            // 调试信息输出
            if(mkPlayer.debug) {
                console.debug("歌曲链接：" + jsonData.url);
            }
            
            if(jsonData.url === "") {
                music.url = "err";
            } else {
                music.url = jsonData.url;    // 记录结果
            }
            
            updateMinfo(music); // 更新音乐信息
            
            callback(music);    // 回调函数
            return true;
        },   //success
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('歌曲链接获取失败 - ' + XMLHttpRequest.status);
            console.error(XMLHttpRequest + textStatus + errorThrown);
        }   // error 
    }); //ajax
    
}

// 完善获取音乐封面图
// 包含音乐信息的数组、回调函数
function ajaxPic(music, callback)
{
    // 已经有数据，直接回调
    if(music.pic !== null && music.pic !== "err" && music.pic !== "") {
        callback(music);
        return true;
    }
    // pic_id 为空，赋值链接错误。直接回调
    if(music.pic_id === null) {
        music.pic = "err";
        updateMinfo(music); // 更新音乐信息
        callback(music);
        return true;
    }
    
    $.ajax({ 
        type: mkPlayer.method, 
        url: mkPlayer.api,
        data: "types=pic&id=" + music.pic_id + "&source=" + music.source,
        dataType : "jsonp",
        success: function(jsonData){
            // 调试信息输出
            if(mkPlayer.debug) {
                console.log("歌曲封面：" + jsonData.url);
            }
            
            if(jsonData.url !== "") {
                music.pic = jsonData.url;    // 记录结果
            } else {
                music.pic = "err";
            }
            
            updateMinfo(music); // 更新音乐信息
            
            callback(music);    // 回调函数
            return true;
        },   //success
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('歌曲封面获取失败 - ' + XMLHttpRequest.status);
            console.error(XMLHttpRequest + textStatus + errorThrown);
        }   // error 
    }); //ajax
    
}

// ajax加载用户歌单
// 参数：歌单网易云 id, 歌单存储 id，回调函数
function ajaxPlayList(lid, id, callback) {

    // console.log(lid);
    // console.log(id);
    
    if(!lid) return false;
    
    // 已经在加载了，跳过
    if(musicList[id].isloading === true) {
        return true;
    }
    
    // musicList[id].isloading = true; // 更新状态：列表加载中
    
    $.ajax({
        type: mkPlayer.method, 
        url: mkPlayer.api, 
        data: "types=playlist&id=" + lid,
        // data: "types=album&id=" + lid,
        dataType : "jsonp",
        complete: function(XMLHttpRequest, textStatus) {
            musicList[id].isloading = false;    // 列表已经加载完了
        },  // complete
        success: function(jsonData){
            // console.log(jsonData);
            if (jsonData == undefined){ return false; }
            // 存储歌单信息
            var tempList = {
                id: lid,    // 列表的网易云 id
                name: jsonData.playlist.name,   // 列表名字
                cover: jsonData.playlist.coverImgUrl,   // 列表封面
                creatorName: jsonData.playlist.creator.nickname,   // 列表创建者名字
                creatorAvatar: jsonData.playlist.creator.avatarUrl,   // 列表创建者头像
                item: []
            };
            
            if(jsonData.playlist.coverImgUrl !== '') {
                tempList.cover = jsonData.playlist.coverImgUrl + "?param=200y200";
            } else {
                tempList.cover = musicList[id].cover;
            }
            
            if(typeof jsonData.playlist.tracks !== undefined || jsonData.playlist.tracks.length !== 0) {
                // 存储歌单中的音乐信息
                for (var i = 0; i < jsonData.playlist.tracks.length; i++) {
                    tempList.item[i] =  {
                        id: jsonData.playlist.tracks[i].id,  // 音乐ID
                        name: jsonData.playlist.tracks[i].name,  // 音乐名字
                        artist: jsonData.playlist.tracks[i].ar[0].name, // 艺术家名字
                        album: jsonData.playlist.tracks[i].al.name,    // 专辑名字
                        source: "netease",     // 音乐来源
                        url_id: jsonData.playlist.tracks[i].id,  // 链接ID
                        pic_id: null,  // 封面ID
                        lyric_id: jsonData.playlist.tracks[i].id,  // 歌词ID
                        pic: jsonData.playlist.tracks[i].al.picUrl + "?param=300y300",    // 专辑图片
                        url: "https://link.hhtjim.com/163/" + jsonData.playlist.tracks[i].id + ".mp3"   // mp3链接
                    };
                }
            }
            
            // 歌单用户 id 不能丢
            if(musicList[id].creatorID) {
                tempList.creatorID = musicList[id].creatorID;
                if(musicList[id].creatorID === rem.uid) {   // 是当前登录用户的歌单，要保存到缓存中
                    var tmpUlist = playerReaddata('ulist');    // 读取本地记录的用户歌单
                    if(tmpUlist) {  // 读取到了
                        for(i=0; i<tmpUlist.length; i++) {  // 匹配歌单
                            if(tmpUlist[i].id == lid) {
                                tmpUlist[i] = tempList; // 保存歌单中的歌曲
                                playerSavedata('ulist', tmpUlist);  // 保存
                                break;
                            }
                        }
                    }
                }
            }
            
            // 存储列表信息
            musicList[id] = tempList;
            
            // 首页显示默认列表
            if(id == mkPlayer.defaultlist) loadList(id);
            if(callback) callback(id);    // 调用回调函数
            
            // 改变前端列表
            $(".sheet-item[data-no='" + id + "'] .sheet-cover").attr('src', tempList.cover);    // 专辑封面
            $(".sheet-item[data-no='" + id + "'] .sheet-name").html(tempList.name);     // 专辑名字
            
            // 调试信息输出
            if(mkPlayer.debug) {
                console.debug("歌单 [" +tempList.name+ "] 中的音乐获取成功");
            }
        },   //success
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('歌单读取失败 - ' + XMLHttpRequest.status);
            console.error(XMLHttpRequest + textStatus + errorThrown);
            $(".sheet-item[data-no='" + id + "'] .sheet-name").html('<span style="color: #EA8383">读取失败</span>');     // 专辑名字
        }   // error  
    });//ajax
}

// ajax加载歌词
// 参数：音乐ID，回调函数
function ajaxLyric(music, callback) {
    lyricTip('歌词加载中...');

    if(!music.lyric_id||music.lyric_id=='0') callback('', music.lyric_id);  // 没有歌词ID，直接返回
    
    // console.log('music.lyric_id:',music.lyric_id);

    // var url = encodeURIComponent('https://music.163.com/api/song/lyric?os=pc&lv=-1&kv=-1&tv=-1&id='+music.lyric_id);
    // var url = encodeURIComponent('https://lzw.me/x/iapi/163music/api.php?type=lyric&id='+music.lyric_id);
    // fetch(`https://api.allorigins.win/get?url=${url}`)

    fetch(`https://lzw.me/x/iapi/163music/api.php?type=lyric&id=${music.lyric_id}`)
    .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
    })
    .then(data => {
        var jsonData = data;
        // var jsonData = JSON.parse(data.contents);
        if (jsonData.lrc) {
            callback(Traditionalized(jsonData.lrc.lyric), music.lyric_id);    // 回调函数
        } else {
            callback('', music.lyric_id);    // 回调函数
        }        
    });

    // $.ajax({

    //     // url: "https://api.zcentury.top/163/",
    //     // url: "https://apis.jxcxin.cn/api/163music",

    //     // type: mkPlayer.method,
    //     // url: mkPlayer.api,
    //     // data: "types=lyric&id=" + music.lyric_id + "&source=" + music.source,
    //     // dataType : "jsonp",
    //     // success: function(jsonData){
    //     //     // 调试信息输出
    //     //     if (mkPlayer.debug) {
    //     //         console.debug("歌词获取成功");
    //     //     }
            
    //     //     console.debug(jsonData);

    //     //     if (jsonData.lyric) {
    //     //         callback(jsonData.lyric, music.lyric_id);    // 回调函数
    //     //     } else {
    //     //         callback('', music.lyric_id);    // 回调函数
    //     //     }
    //     // },   //success
    //     // error: function(XMLHttpRequest, textStatus, errorThrown) {
    //     //     layer.msg('歌词读取失败 - ' + XMLHttpRequest.status);
    //     //     console.error(XMLHttpRequest + textStatus + errorThrown);
    //     //     callback('', music.lyric_id);    // 回调函数
    //     // }   // error   

    // });//ajax
}


// ajax加载用户的播放列表
// 参数 用户的网易云 id
function ajaxUserList(uid)
{
    var tmpLoading = layer.msg('加载中...', {icon: 16,shade: 0.01});
    $.ajax({
        type: mkPlayer.method,
        url: mkPlayer.api,
        data: "types=userlist&uid=" + uid,
        dataType : "jsonp",
        complete: function(XMLHttpRequest, textStatus) {
            if(tmpLoading) layer.close(tmpLoading);    // 关闭加载中动画
        },  // complete
        success: function(jsonData){
            if(jsonData.code == "-1" || jsonData.code == 400){
                layer.msg('用户 uid 输入有误');
                return false;
            }
            
            if(jsonData.playlist.length === 0 || typeof(jsonData.playlist.length) === "undefined")
            {
                layer.msg('没找到用户 ' + uid + ' 的歌单');
                return false;
            }else{
                var tempList,userList = [];
                $("#sheet-bar").remove();   // 移除登陆条
                rem.uid = uid;  // 记录已同步用户 uid
                rem.uname = jsonData.playlist[0].creator.nickname;  // 第一个列表(喜欢列表)的创建者即用户昵称
                layer.msg('欢迎您 '+rem.uname);
                // 记录登录用户
                playerSavedata('uid', rem.uid);
                playerSavedata('uname', rem.uname);
                
                for (var i = 0; i < jsonData.playlist.length; i++)
                {
                    // 获取歌单信息
                    tempList = {
                        id: jsonData.playlist[i].id,    // 列表的网易云 id
                        name: jsonData.playlist[i].name,   // 列表名字
                        cover: jsonData.playlist[i].coverImgUrl  + "?param=200y200",   // 列表封面
                        creatorID: uid,   // 列表创建者id
                        creatorName: jsonData.playlist[i].creator.nickname,   // 列表创建者名字
                        creatorAvatar: jsonData.playlist[i].creator.avatarUrl,   // 列表创建者头像
                        item: []
                    };
                    // 存储并显示播放列表
                    addSheet(musicList.push(tempList) - 1, tempList.name, tempList.cover);
                    userList.push(tempList);
                }
                playerSavedata('ulist', userList);
                // 显示退出登录的提示条
                sheetBar();
            }
            // 调试信息输出
            if(mkPlayer.debug) {
                console.debug("用户歌单获取成功 [用户网易云ID：" + uid + "]");
            }
        },   //success
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('歌单同步失败 - ' + XMLHttpRequest.status);
            console.error(XMLHttpRequest + textStatus + errorThrown);
        }   // error
    });//ajax
    return true;
}



function ajaxAlbumList(lid, callback) {

    if(!lid) return false;
    
    // 已经在加载了，跳过
    // if(musicList[id].isloading === true) {
    //     return true;
    // }
    
    // musicList[id].isloading = true; // 更新状态：列表加载中
    
    id = musicList.length;


    $.ajax({
        type: "GET", 
        url: "https://cors-anywhere.herokuapp.com/https://music.163.com/album", 
        data: "id=" + lid,
        // data: "types=album&id=" + lid,
        dataType : "text",
        complete: function(XMLHttpRequest, textStatus) {
            musicList[id].isloading = false;    // 列表已经加载完了
        },  // complete
        success: function(Data){
            // console.log(Data);
            const parser = new DOMParser();
            const d = parser.parseFromString(Data, "text/html");
            var list = d.getElementById('song-list-pre-data');
            var x = JSON.parse(list.textContent);
            var album = x[0]["album"]["name"];
            var picUrl = x[0]["album"]["picUrl"];

            // 存储歌单信息
            var tempList = {
                id: lid,    // 列表的网易云 id
                name: album,   // 列表名字
                cover: picUrl + '?param=200y200',   // 列表封面
                creatorName: album,   // 列表创建者名字
                creatorAvatar: picUrl,   // 列表创建者头像
                item: []
            };

            for (let i=0; i<x.length;i++){
                var artist = '';
                for (let j=0; j < x[i]["artists"].length; j++) { 
                    artist += x[i]["artists"][j]["name"]
                    if (j<x[i]["artists"].length-1 ) { artist += '/' }
                }
                tempList.item[i] =  {
                    id: x[i]["id"],  // 音乐ID
                    name: x[i]["name"],  // 音乐名字
                    artist: artist, // 艺术家名字
                    album: x[i]["album"]["name"],    // 专辑名字
                    source: "netease",     // 音乐来源
                    url_id: x[i]["id"],  // 链接ID
                    pic_id: null,  // 封面ID
                    lyric_id: x[i]["id"],  // 歌词ID
                    pic: picUrl + "?param=300y300",    // 专辑图片
                    url: null   // mp3链接
                };
            }

           
            // 存储列表信息
            musicList[id] = tempList;

            // 首页显示默认列表
            // if(id == mkPlayer.defaultlist) loadList(id);

            loadList(id);

            if(callback) callback(id);    // 调用回调函数
            
            // 改变前端列表
            $(".sheet-item[data-no='" + id + "'] .sheet-cover").attr('src', tempList.cover);    // 专辑封面
            $(".sheet-item[data-no='" + id + "'] .sheet-name").html(tempList.name);     // 专辑名字
            
            // 调试信息输出
            if(mkPlayer.debug) {
                console.debug("歌单 [" +tempList.name+ "] 中的音乐获取成功");
            }
        },   //success
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('歌单读取失败 - ' + XMLHttpRequest.status);
            console.error(XMLHttpRequest + textStatus + errorThrown);
            $(".sheet-item[data-no='" + id + "'] .sheet-name").html('<span style="color: #EA8383">读取失败</span>');     // 专辑名字
        }   // error  
    });//ajax
}


function ajaxArtistList(lid, callback) {

    if(!lid) return false;
    
    // 已经在加载了，跳过
    // if(musicList[id].isloading === true) {
    //     return true;
    // }
    
    // musicList[id].isloading = true; // 更新状态：列表加载中
    
    id = musicList.length;

    $.ajax({
        type: "GET", 
        url: "https://cors-anywhere.herokuapp.com/https://music.163.com/artist", 
        data: "id=" + lid,
        // data: "types=album&id=" + lid,
        dataType : "text",
        complete: function(XMLHttpRequest, textStatus) {
            musicList[id].isloading = false;    // 列表已经加载完了
        },  // complete
        success: function(Data){
            // console.log(Data);
            const parser = new DOMParser();
            const d = parser.parseFromString(Data, "text/html");
            var artist = d.getElementById('artist-name').textContent;
            var list = d.getElementById('song-list-pre-data');
            var x = JSON.parse(list.textContent);
            var album = x[0]["album"]["name"];
            var picUrl = x[0]["album"]["picUrl"];
           

            // 存储歌单信息
            var tempList = {
                id: lid,    // 列表的网易云 id
                name: artist,   // 列表名字
                cover: picUrl + '?param=200y200',   // 列表封面
                creatorName: artist,   // 列表创建者名字
                creatorAvatar: picUrl,   // 列表创建者头像
                item: []
            };

            for (let i=0; i<x.length;i++){
                var artist = '';
                for (let j=0; j < x[i]["artists"].length; j++) { 
                    artist += x[i]["artists"][j]["name"]
                    if (j<x[i]["artists"].length-1 ) { artist += '/' }
                }
                tempList.item[i] =  {
                    id: x[i]["id"],  // 音乐ID
                    name: x[i]["name"],  // 音乐名字
                    artist: artist, // 艺术家名字
                    album: x[i]["album"]["name"],    // 专辑名字
                    source: "netease",     // 音乐来源
                    url_id: x[i]["id"],  // 链接ID
                    pic_id: null,  // 封面ID
                    lyric_id: x[i]["id"],  // 歌词ID
                    pic: picUrl + "?param=300y300",    // 专辑图片
                    url: null   // mp3链接
                };

            }
           

            // 歌单用户 id 不能丢
            // if(musicList[id].creatorID) {
            //     tempList.creatorID = musicList[id].creatorID;
            //     if(musicList[id].creatorID === rem.uid) {   // 是当前登录用户的歌单，要保存到缓存中
            //         var tmpUlist = playerReaddata('ulist');    // 读取本地记录的用户歌单
            //         if(tmpUlist) {  // 读取到了
            //             for(i=0; i<tmpUlist.length; i++) {  // 匹配歌单
            //                 if(tmpUlist[i].id == lid) {
            //                     tmpUlist[i] = tempList; // 保存歌单中的歌曲
            //                     playerSavedata('ulist', tmpUlist);  // 保存
            //                     break;
            //                 }
            //             }
            //         }
            //     }
            // }
            
            // 存储列表信息
            musicList[id] = tempList;

            // 首页显示默认列表
            // if(id == mkPlayer.defaultlist) loadList(id);

            loadList(id);

            if(callback) callback(id);    // 调用回调函数
            
            // 改变前端列表
            $(".sheet-item[data-no='" + id + "'] .sheet-cover").attr('src', tempList.cover);    // 专辑封面
            $(".sheet-item[data-no='" + id + "'] .sheet-name").html(tempList.name);     // 专辑名字
            
            // 调试信息输出
            if(mkPlayer.debug) {
                console.debug("歌单 [" +tempList.name+ "] 中的音乐获取成功");
            }
        },   //success
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('歌单读取失败 - ' + XMLHttpRequest.status);
            console.error(XMLHttpRequest + textStatus + errorThrown);
            $(".sheet-item[data-no='" + id + "'] .sheet-name").html('<span style="color: #EA8383">读取失败</span>');     // 专辑名字
        }   // error  
    });//ajax

    // console.log(musicList);

}

// 專輯DB
function dbMusicList(album_id, callback) {

    if(!album_id) return false;
    
    var sqlstring = "select * from vMusic where album_id = "+album_id;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', db_url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }        

        // 存储歌单信息
        var tempList = {
            id: data[0][2],    // 列表的网易云 id
            name: data[0][3],   // 列表名字
            cover: data[0][7],   // 列表封面
            creatorName: data[0][1],   // 列表创建者名字
            creatorAvatar: data[0][6],   // 列表创建者头像
            item: []
        };

        for (var i = 0; i < data.length; i++) {
			var kuwo_id = data[i][10];
			if (kuwo_id == null) {kuwo_id = 0}
            tempList.item[i] =  {
                id: data[i][4],  // 音乐ID
                name: data[i][5],  // 音乐名字
                artist: data[i][12], // 艺术家名字
                album: data[i][3],    // 专辑名字
                source: "netease",     // 音乐来源
                url_id: kuwo_id,  // 链接ID
                pic_id: data[i][7],  // 封面ID
                lyric_id: data[i][4],  // 歌词ID
                pic: data[i][7] + "?param=300y300",    // 专辑图片
                url: "https://link.hhtjim.com/163/" + data[i][4] + ".mp3"   // mp3链接
            };
        }
		
        // 存储列表信息
        musicList = DefaultMusicList;
        musicList = musicList.concat(tempList);

        if(callback) callback(musicList);    // 调用回调函数
        
        // 调试信息输出
        if(mkPlayer.debug) {
            console.debug("歌单 [" +tempList.name+ "] 中的音乐获取成功");
        }
    };
    xhr.send();
}

// 收藏
function CookieMusicList(callback) {

    var ids = getCookieByName('music');
    var kwids = getCookieByName('kwmusic');
    if (ids == '' && kwids == ''){
        layer.msg('找不到收藏清單');
        if(callback) { callback(HomeMusicList); }
        return;
    }
    ids = '0' + ids;
    kwids='0' + kwids;

    var sqlstring = "select * from vMusic where music_id in ("+ids+") or kuwo_music_id in ("+kwids+")";
    const xhr = new XMLHttpRequest();
    xhr.open('GET', db_url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }        

        // 存储歌单信息
        var tempList = {
            id: 0,    // 列表的网易云 id
            name: '收藏',   // 列表名字
            cover: 'images/player_cover.png',   // 列表封面
            creatorName: '',   // 列表创建者名字
            creatorAvatar: '',   // 列表创建者头像
            item: []
        };

        for (var i = 0; i < data.length; i++) {
            var url = "https://link.hhtjim.com/163/" + data[i][4] + ".mp3";
			var kuwo_id = data[i][10];
			if (kuwo_id == null) {
                kuwo_id = 0;
            } else {
                // if (data[i][9] == 0) { url = "https://link.hhtjim.com/kw/" + kuwo_id + ".mp3";}
                url = "https://link.hhtjim.com/kw/" + kuwo_id + ".mp3";
            }
            tempList.item[i] =  {
                id: data[i][4],  // 音乐ID
                name: data[i][5],  // 音乐名字
                artist: data[i][12], // 艺术家名字
                album: data[i][3],    // 专辑名字
                source: "netease",     // 音乐来源
                url_id: kuwo_id,  // 链接ID
                pic_id: data[i][7],  // 封面ID
                lyric_id: data[i][4],  // 歌词ID
                pic: data[i][7] + "?param=300y300",    // 专辑图片
                url: url   // mp3链接
            };
        }
		
        // 存储列表信息
        musicList = DefaultMusicList;
        musicList = musicList.concat(tempList);

        if(callback) callback(musicList);    // 调用回调函数
        
        // 调试信息输出
        if(mkPlayer.debug) {
            console.debug("歌单 [" +tempList.name+ "] 中的音乐获取成功");
        }
    };
    xhr.send();
}

// 隨機100首
function RandomMusicList(callback) {

    // var sqlstring = "select * from vMusic where music_id in (select music_id from musics where url = 1 order by random() limit 100)"
    var sqlstring = "select * from vMusic where url=1 or kuwo_music_id <> NULL order by random() limit 100"

    const xhr = new XMLHttpRequest();
    xhr.open('GET', db_url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }        

        // 存储歌单信息
        var tempList = {
            id: 0,    // 列表的网易云 id
            name: '隨機100首',   // 列表名字
            cover: 'images/player_cover.png',   // 列表封面
            creatorName: '',   // 列表创建者名字
            creatorAvatar: '',   // 列表创建者头像
            item: []
        };

        for (var i = 0; i < data.length; i++) {
			var kuwo_id = data[i][10];
			if (kuwo_id == null) {kuwo_id = 0}
            tempList.item[i] =  {
                id: data[i][4],  // 音乐ID
                name: data[i][5],  // 音乐名字
                artist: data[i][12], // 艺术家名字
                album: data[i][3],    // 专辑名字
                source: "netease",     // 音乐来源
                url_id: kuwo_id,  // 链接ID
                pic_id: data[i][7],  // 封面ID
                lyric_id: data[i][4],  // 歌词ID
                pic: data[i][7] + "?param=300y300",    // 专辑图片
                url: "https://link.hhtjim.com/163/" + data[i][4] + ".mp3"   // mp3链接
            };
        }
		
        // 存储列表信息
        musicList = DefaultMusicList;
        musicList = musicList.concat(tempList);        
		
        if(callback) callback(musicList);    // 调用回调函数
        
        // 调试信息输出
        if(mkPlayer.debug) {
            console.debug("歌单 [" +tempList.name+ "] 中的音乐获取成功");
        }
    };
    xhr.send();
}

// 最近新歌200首
function RecentMusicList(callback) {

    // var sqlstring = "select * from vMusic where url =1 and music_name not like '%伴奏%' and music_name not like '%试听%' order by release_date desc limit 200";
    var sqlstring = "select * from vMusic where (url=1 or kuwo_music_id <> NULL)and music_name not like '%伴奏%' and music_name not like '%试听%' order by release_date desc limit 200";

    const xhr = new XMLHttpRequest();
    xhr.open('GET', db_url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }        

        // 存储歌单信息
        var tempList = {
            id: 0,    // 列表的网易云 id
            name: '最近新歌200首',   // 列表名字
            cover: 'images/player_cover.png',   // 列表封面
            creatorName: '',   // 列表创建者名字
            creatorAvatar: '',   // 列表创建者头像
            item: []
        };

        for (var i = 0; i < data.length; i++) {
			var kuwo_id = data[i][10];
			if (kuwo_id == null) {kuwo_id = 0}
            tempList.item[i] =  {
                id: data[i][4],  // 音乐ID
                name: data[i][5],  // 音乐名字
                artist: data[i][12], // 艺术家名字
                album: data[i][3],    // 专辑名字
                source: "netease",     // 音乐来源
                url_id: kuwo_id,  // 链接ID
                pic_id: data[i][7],  // 封面ID
                lyric_id: data[i][4],  // 歌词ID
                pic: data[i][7] + "?param=300y300",    // 专辑图片
                url: "https://link.hhtjim.com/163/" + data[i][4] + ".mp3"   // mp3链接
            };
        }
		
        // 存储列表信息
        musicList = DefaultMusicList;
        musicList = musicList.concat(tempList);        
		
        if(callback) callback(musicList);    // 调用回调函数
        
        // 调试信息输出
        if(mkPlayer.debug) {
            console.debug("歌单 [" +tempList.name+ "] 中的音乐获取成功");
        }
    };
    xhr.send();
}

// 關鍵字搜尋200首
function SearchMusicList(keyword,callback) {
    
    var kw = Simplized(keyword);    // 繁轉簡

    var sqlstring = "select * from vMusic where artist_name like '%"+kw+"%' or album_name like '%"+kw+"%' or music_name like '%"+kw+"%' order by release_date desc limit 200"

    const xhr = new XMLHttpRequest();
    xhr.open('GET', db_url, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }        

        // 存储歌单信息
        var tempList = {
            id: 0,    // 列表的网易云 id
            name: '關鍵字搜尋200首',   // 列表名字
            cover: 'images/player_cover.png',   // 列表封面
            creatorName: '',   // 列表创建者名字
            creatorAvatar: '',   // 列表创建者头像
            item: []
        };

        for (var i = 0; i < data.length; i++) {
			var kuwo_id = data[i][10];
			if (kuwo_id == null) {kuwo_id = 0}
            tempList.item[i] =  {
                id: data[i][4],  // 音乐ID
                name: data[i][5],  // 音乐名字
                artist: data[i][12], // 艺术家名字
                album: data[i][3],    // 专辑名字
                source: "netease",     // 音乐来源
                url_id: kuwo_id,  // 链接ID
                pic_id: data[i][7],  // 封面ID
                lyric_id: data[i][4],  // 歌词ID
                pic: data[i][7] + "?param=300y300",    // 专辑图片
                url: "https://link.hhtjim.com/163/" + data[i][4] + ".mp3"   // mp3链接
            };
        }
		
        // 存储列表信息
        musicList = DefaultMusicList;
        musicList = musicList.concat(tempList);        
        // console.log(musicList);

        // // 首页显示默认列表
        // // if(id == mkPlayer.defaultlist) loadList(id);
		
        //loadList(3);
		
        if(callback) callback(musicList);    // 调用回调函数
        
        // // 改变前端列表
        // $(".sheet-item[data-no='" + id + "'] .sheet-cover").attr('src', tempList.cover);    // 专辑封面
        // $(".sheet-item[data-no='" + id + "'] .sheet-name").html(tempList.name);     // 专辑名字
        
        // 调试信息输出
        if(mkPlayer.debug) {
            console.debug("歌单 [" +tempList.name+ "] 中的音乐获取成功");
        }
    };
    xhr.send();
}

// 專輯收藏清單
function myAlbumsMusicList(callback) {

    var ids = getCookieByName('album');
    if (ids == ''){
        layer.msg('找不到專輯收藏清單');
        if(callback) { callback(HomeMusicList); }
        return;
    }
    ids = '0' + ids;
    // ids = '88730427,159400159,159967997';

    var sqlstring = "select * from vMusic where album_id in ("+ids+") order by album_id,seq";
    // console.log(sqlstring);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', db_url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }        
        
        var jsonData = [];
        var lastAlbum_id = 0;
        var item_no =0;
        var tempList = {};
        for (var i = 0; i < data.length; i++) {
            // 存储歌单信息
            if (data[i][2] != lastAlbum_id){
                if(i>0){jsonData = jsonData.concat(tempList);}
                lastAlbum_id = data[i][2];
                item_no = 0;
                tempList = {
                    id: data[i][2],    // 列表的网易云 id
                    name: data[i][3],   // 列表名字
                    cover: data[i][7],   // 列表封面
                    creatorName: data[i][2],   // 列表创建者名字
                    creatorAvatar: data[i][2],   // 列表创建者头像
                    item: []
                };
            } else {
            var url = "https://link.hhtjim.com/163/" + data[i][4] + ".mp3"
            var kuwo_id = data[i][10];
            if (kuwo_id == null) {
                kuwo_id = 0
            } else {
                url = "https://link.hhtjim.com/kw/" + kuwo_id + ".mp3"
            }
            tempList.item[item_no] =  {
                id: data[i][4],  // 音乐ID
                name: data[i][5],  // 音乐名字
                artist: data[i][12], // 艺术家名字
                album: data[i][3],    // 专辑名字
                source: "netease",     // 音乐来源
                url_id: kuwo_id,  // 链接ID
                pic_id: data[i][7],  // 封面ID
                lyric_id: data[i][4],  // 歌词ID
                pic: data[i][7] + "?param=300y300",    // 专辑图片
                url: url  // mp3链接
            };
            item_no+=1;
            }
        }
        // 存储列表信息
        jsonData = jsonData.concat(tempList);

        // console.log(jsonData);
        
        musicList = DefaultMusicList;
        musicList = musicList.concat(jsonData);

        if(callback) callback(musicList);    // 调用回调函数
        
        // 调试信息输出
        if(mkPlayer.debug) {
            console.debug("歌单 [" +tempList.name+ "] 中的音乐获取成功");
        }
    };
    xhr.send();
}


// 滚石香港黄金十年
function RockGolden10MusicList(callback) {

    var sqlstring = "select * from vMusic where album_name like '%滚石香港黄金十年%' order by album_id,seq";
    // console.log(sqlstring);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', db_url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }        
        
        var jsonData = [];
        var lastAlbum_id = 0;
        var item_no =0;
        var tempList = {};
        for (var i = 0; i < data.length; i++) {
            // 存储歌单信息
            if (data[i][2] != lastAlbum_id){
                if(i>0){jsonData = jsonData.concat(tempList);}
                lastAlbum_id = data[i][2];
                item_no = 0;
                tempList = {
                    id: data[i][2],    // 列表的网易云 id
                    name: data[i][1],   // 列表名字
                    cover: data[i][7],   // 列表封面
                    creatorName: data[i][2],   // 列表创建者名字
                    creatorAvatar: data[i][2],   // 列表创建者头像
                    item: []
                };
            } else {
            var kuwo_id = data[i][10];
            if (kuwo_id == null) {kuwo_id = 0}
            tempList.item[item_no] =  {
                id: data[i][4],  // 音乐ID
                name: data[i][5],  // 音乐名字
                artist: data[i][12], // 艺术家名字
                album: data[i][3],    // 专辑名字
                source: "netease",     // 音乐来源
                url_id: kuwo_id,  // 链接ID
                pic_id: data[i][7],  // 封面ID
                lyric_id: data[i][4],  // 歌词ID
                pic: data[i][7] + "?param=300y300",    // 专辑图片
                url: "https://link.hhtjim.com/163/" + data[i][4] + ".mp3"   // mp3链接
            };
            item_no+=1;
            }
        }
        // 存储列表信息
        jsonData = jsonData.concat(tempList);

        // console.log(jsonData);
        
        musicList = DefaultMusicList;
        musicList = musicList.concat(jsonData);

        if(callback) callback(musicList);    // 调用回调函数
        
        // 调试信息输出
        if(mkPlayer.debug) {
            console.debug("歌单 [" +tempList.name+ "] 中的音乐获取成功");
        }
    };
    xhr.send();
}

