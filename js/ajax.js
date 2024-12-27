
// ajax載入搜索結果
function ajaxSearch() {
    if (rem.wd === "") {
        layer.msg('搜索內容不能為空', { anim: 6 });
        return false;
    }

    if (rem.loadPage == 1) { // 彈出搜索提示
        var tmpLoading = layer.msg('搜索中', { icon: 16, shade: 0.01 });
    }

    $.ajax({
        type: mkPlayer.method,
        url: mkPlayer.api,
        data: "types=search&count=" + mkPlayer.loadcount + "&source=" + rem.source + "&pages=" + rem.loadPage + "&name=" + rem.wd,
        dataType: "jsonp",
        complete: function (XMLHttpRequest, textStatus) {
            if (tmpLoading) layer.close(tmpLoading);    // 關閉載入中動畫
        },  // complete
        success: function (jsonData) {

            // 調試資訊輸出
            if (mkPlayer.debug) {
                console.debug("搜索結果數：" + jsonData.length);
            }

            if (rem.loadPage == 1)   // 載入第一頁，清空列表
            {
                if (jsonData.length === 0)   // 返回結果為零
                {
                    layer.msg('沒有找到相關歌曲', { anim: 6 });
                    return false;
                }
                musicList[0].item = [];
                rem.mainList.html('');   // 清空清單中原有的元素
                addListhead();      // 載入列表頭
            } else {
                $("#list-foot").remove();     //已經是載入後面的頁碼了，刪除之前的“載入更多”提示
            }

            if (jsonData.length === 0) {
                addListbar("nomore");  // 載入完了
                return false;
            }

            var tempItem = [], no = musicList[0].item.length;

            for (var i = 0; i < jsonData.length; i++) {
                no++;
                tempItem = {
                    id: jsonData[i].id,  // 音樂ID
                    name: jsonData[i].name,  // 音樂名字
                    artist: jsonData[i].artist[0], // 藝術家名字
                    album: jsonData[i].album,    // 專輯名字
                    source: jsonData[i].source,     // 音樂來源
                    url_id: jsonData[i].url_id,  // 連結ID
                    pic_id: jsonData[i].pic_id,  // 封面ID
                    lyric_id: jsonData[i].lyric_id,  // 歌詞ID
                    pic: null,    // 專輯圖片
                    url: null   // mp3連結
                };
                musicList[0].item.push(tempItem);   // 保存到搜索結果臨時列表中
                addItem(no, tempItem.name, tempItem.artist, tempItem.album);  // 在前端顯示
            }

            rem.dislist = 0;    // 當前顯示的是搜索清單
            rem.loadPage++;    // 已載入的列數+1

            dataBox("list");    // 在主介面顯示出播放清單
            refreshList();  // 刷新清單，添加正在播放樣式

            if (no < mkPlayer.loadcount) {
                addListbar("nomore");  // 沒載入滿，說明已經載入完了
            } else {
                addListbar("more");     // 還可以點擊載入更多
            }

            if (rem.loadPage == 2) listToTop();    // 播放清單滾動到頂部
        },   //success
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('搜索結果獲取失敗 - ' + XMLHttpRequest.status);
            console.error(XMLHttpRequest + textStatus + errorThrown);
        }   // error
    });//ajax
}

// 完善獲取音樂資訊
// 音樂所在清單ID、音樂對應ID、回呼函數
function ajaxUrl(music, callback) {

    console.log('music.url:', music.url);
    // 已經有資料，直接回檔
    if (music.url !== null && music.url !== "err" && music.url !== "") {
        callback(music);
        return true;
    }
    // id為空，賦值連結錯誤。直接回檔
    if (music.id === null) {
        music.url = "err";
        updateMinfo(music); // 更新音樂資訊
        callback(music);
        return true;
    }

    $.ajax({
        type: mkPlayer.method,
        url: mkPlayer.api,
        data: "types=url&id=" + music.id + "&source=" + music.source,
        dataType: "jsonp",
        success: function (jsonData) {
            // 調試資訊輸出
            if (mkPlayer.debug) {
                console.debug("歌曲連結：" + jsonData.url);
            }

            if (jsonData.url === "") {
                music.url = "err";
            } else {
                music.url = jsonData.url;    // 記錄結果
            }

            updateMinfo(music); // 更新音樂資訊

            callback(music);    // 回呼函數
            return true;
        },   //success
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('歌曲連結獲取失敗 - ' + XMLHttpRequest.status);
            console.error(XMLHttpRequest + textStatus + errorThrown);
        }   // error 
    }); //ajax

}

// 完善獲取音樂封面圖
// 包含音樂資訊的陣列、回呼函數
function ajaxPic(music, callback) {
    // 已經有資料，直接回檔
    if (music.pic !== null && music.pic !== "err" && music.pic !== "") {
        callback(music);
        return true;
    }
    // pic_id 為空，賦值連結錯誤。直接回檔
    if (music.pic_id === null) {
        music.pic = "err";
        updateMinfo(music); // 更新音樂資訊
        callback(music);
        return true;
    }

    $.ajax({
        type: mkPlayer.method,
        url: mkPlayer.api,
        data: "types=pic&id=" + music.pic_id + "&source=" + music.source,
        dataType: "jsonp",
        success: function (jsonData) {
            // 調試資訊輸出
            if (mkPlayer.debug) {
                console.log("歌曲封面：" + jsonData.url);
            }

            if (jsonData.url !== "") {
                music.pic = jsonData.url;    // 記錄結果
            } else {
                music.pic = "err";
            }

            updateMinfo(music); // 更新音樂資訊

            callback(music);    // 回呼函數
            return true;
        },   //success
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('歌曲封面獲取失敗 - ' + XMLHttpRequest.status);
            console.error(XMLHttpRequest + textStatus + errorThrown);
        }   // error 
    }); //ajax

}

// ajax載入用戶歌單
// 參數：歌單網易雲 id, 歌單存儲 id，回呼函數
function ajaxPlayList(lid, id, callback) {

    // console.log(lid);
    // console.log(id);

    if (!lid) return false;

    // 已經在載入了，跳過
    if (musicList[id].isloading === true) {
        return true;
    }

    // musicList[id].isloading = true; // 更新狀態：列表載入中

    $.ajax({
        type: mkPlayer.method,
        url: mkPlayer.api,
        data: "types=playlist&id=" + lid,
        // data: "types=album&id=" + lid,
        dataType: "jsonp",
        complete: function (XMLHttpRequest, textStatus) {
            musicList[id].isloading = false;    // 列表已經載入完了
        },  // complete
        success: function (jsonData) {
            // console.log(jsonData);
            if (jsonData == undefined) { return false; }
            // 存儲歌單資訊
            var tempList = {
                id: lid,    // 列表的網易雲 id
                name: jsonData.playlist.name,   // 列表名字
                cover: jsonData.playlist.coverImgUrl,   // 列表封面
                creatorName: jsonData.playlist.creator.nickname,   // 列表創建者名字
                creatorAvatar: jsonData.playlist.creator.avatarUrl,   // 列表創建者頭像
                item: []
            };

            if (jsonData.playlist.coverImgUrl !== '') {
                tempList.cover = jsonData.playlist.coverImgUrl + "?param=200y200";
            } else {
                tempList.cover = musicList[id].cover;
            }

            if (typeof jsonData.playlist.tracks !== undefined || jsonData.playlist.tracks.length !== 0) {
                // 存儲歌單中的音樂資訊
                for (var i = 0; i < jsonData.playlist.tracks.length; i++) {
                    tempList.item[i] = {
                        id: jsonData.playlist.tracks[i].id,  // 音樂ID
                        name: jsonData.playlist.tracks[i].name,  // 音樂名字
                        artist: jsonData.playlist.tracks[i].ar[0].name, // 藝術家名字
                        album: jsonData.playlist.tracks[i].al.name,    // 專輯名字
                        source: "netease",     // 音樂來源
                        url_id: jsonData.playlist.tracks[i].id,  // 連結ID
                        pic_id: null,  // 封面ID
                        lyric_id: jsonData.playlist.tracks[i].id,  // 歌詞ID
                        pic: jsonData.playlist.tracks[i].al.picUrl + "?param=300y300",    // 專輯圖片
                        url: "https://link.hhtjim.com/163/" + jsonData.playlist.tracks[i].id + ".mp3"   // mp3連結
                    };
                }
            }

            // 歌單用戶 id 不能丟
            if (musicList[id].creatorID) {
                tempList.creatorID = musicList[id].creatorID;
                if (musicList[id].creatorID === rem.uid) {   // 是當前登錄用戶的歌單，要保存到緩存中
                    var tmpUlist = playerReaddata('ulist');    // 讀取本地記錄的使用者歌單
                    if (tmpUlist) {  // 讀取到了
                        for (i = 0; i < tmpUlist.length; i++) {  // 匹配歌單
                            if (tmpUlist[i].id == lid) {
                                tmpUlist[i] = tempList; // 保存歌單中的歌曲
                                playerSavedata('ulist', tmpUlist);  // 保存
                                break;
                            }
                        }
                    }
                }
            }

            // 存儲清單資訊
            musicList[id] = tempList;

            // 首頁顯示預設清單
            if (id == mkPlayer.defaultlist) loadList(id);
            if (callback) callback(id);    // 調用回呼函數

            // 改變前端列表
            $(".sheet-item[data-no='" + id + "'] .sheet-cover").attr('src', tempList.cover);    // 專輯封面
            $(".sheet-item[data-no='" + id + "'] .sheet-name").html(tempList.name);     // 專輯名字

            // 調試資訊輸出
            if (mkPlayer.debug) {
                console.debug("歌單 [" + tempList.name + "] 中的音樂獲取成功");
            }
        },   //success
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('歌單讀取失敗 - ' + XMLHttpRequest.status);
            console.error(XMLHttpRequest + textStatus + errorThrown);
            $(".sheet-item[data-no='" + id + "'] .sheet-name").html('<span style="color: #EA8383">讀取失敗</span>');     // 專輯名字
        }   // error  
    });//ajax
}

// ajax載入歌詞
// 參數：音樂ID，回呼函數
function ajaxLyric(music, callback) {
    lyricTip('歌詞載入中...');
    // console.log('ajaxLyric music.lyric_id:',music.lyric_id);

    if (!music.lyric_id || music.lyric_id == '0') callback('', music.lyric_id);  // 沒有歌詞ID，直接返回

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
                callback(Traditionalized(jsonData.lrc.lyric), music.lyric_id);    // 回呼函數
            } else {
                callback('', music.lyric_id);    // 回呼函數
            }
        });

}

function kuwoLyric(music, callback) {
    lyricTip('歌詞載入中...');
    fetch(`https://api.cenguigui.cn/api/kuwo/?rid=${music.id}&type=json&lrc=true`)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then(data => {
            var jsonData = data;
            // var jsonData = JSON.parse(data.contents);
            if (jsonData.data) {
                callback(Traditionalized(jsonData.data.lrc), music.id);    // 回呼函數
            } else {
                callback('', music.id);    // 回呼函數
            }
        });
}



// ajax載入用戶的播放清單
// 參數 用戶的網易雲 id
function ajaxUserList(uid) {
    var tmpLoading = layer.msg('載入中...', { icon: 16, shade: 0.01 });
    $.ajax({
        type: mkPlayer.method,
        url: mkPlayer.api,
        data: "types=userlist&uid=" + uid,
        dataType: "jsonp",
        complete: function (XMLHttpRequest, textStatus) {
            if (tmpLoading) layer.close(tmpLoading);    // 關閉載入中動畫
        },  // complete
        success: function (jsonData) {
            if (jsonData.code == "-1" || jsonData.code == 400) {
                layer.msg('用戶 uid 輸入有誤');
                return false;
            }

            if (jsonData.playlist.length === 0 || typeof (jsonData.playlist.length) === "undefined") {
                layer.msg('沒找到用戶 ' + uid + ' 的歌單');
                return false;
            } else {
                var tempList, userList = [];
                $("#sheet-bar").remove();   // 移除登陸條
                rem.uid = uid;  // 記錄已同步使用者 uid
                rem.uname = jsonData.playlist[0].creator.nickname;  // 第一個列表(喜歡列表)的創建者即用戶昵稱
                layer.msg('歡迎您 ' + rem.uname);
                // 記錄登錄使用者
                playerSavedata('uid', rem.uid);
                playerSavedata('uname', rem.uname);

                for (var i = 0; i < jsonData.playlist.length; i++) {
                    // 獲取歌單資訊
                    tempList = {
                        id: jsonData.playlist[i].id,    // 列表的網易雲 id
                        name: jsonData.playlist[i].name,   // 列表名字
                        cover: jsonData.playlist[i].coverImgUrl + "?param=200y200",   // 列表封面
                        creatorID: uid,   // 列表創建者id
                        creatorName: jsonData.playlist[i].creator.nickname,   // 列表創建者名字
                        creatorAvatar: jsonData.playlist[i].creator.avatarUrl,   // 列表創建者頭像
                        item: []
                    };
                    // 存儲並顯示播放清單
                    addSheet(musicList.push(tempList) - 1, tempList.name, tempList.cover);
                    userList.push(tempList);
                }
                playerSavedata('ulist', userList);
                // 顯示退出登錄的提示條
                sheetBar();
            }
            // 調試資訊輸出
            if (mkPlayer.debug) {
                console.debug("用戶歌單獲取成功 [用戶網易雲ID：" + uid + "]");
            }
        },   //success
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('歌單同步失敗 - ' + XMLHttpRequest.status);
            console.error(XMLHttpRequest + textStatus + errorThrown);
        }   // error
    });//ajax
    return true;
}


function ajaxAlbumList(lid, callback) {

    if (!lid) return false;

    // 已經在載入了，跳過
    // if(musicList[id].isloading === true) {
    //     return true;
    // }

    // musicList[id].isloading = true; // 更新狀態：列表載入中

    id = musicList.length;

    $.ajax({
        type: "GET",
        url: "https://cors-anywhere.herokuapp.com/https://music.163.com/album",
        data: "id=" + lid,
        // data: "types=album&id=" + lid,
        dataType: "text",
        complete: function (XMLHttpRequest, textStatus) {
            musicList[id].isloading = false;    // 列表已經載入完了
        },  // complete
        success: function (Data) {
            // console.log(Data);
            const parser = new DOMParser();
            const d = parser.parseFromString(Data, "text/html");
            var list = d.getElementById('song-list-pre-data');
            var x = JSON.parse(list.textContent);
            var album = x[0]["album"]["name"];
            var picUrl = x[0]["album"]["picUrl"];

            // 存儲歌單資訊
            var tempList = {
                id: lid,    // 列表的網易雲 id
                name: album,   // 列表名字
                cover: picUrl + '?param=200y200',   // 列表封面
                creatorName: album,   // 列表創建者名字
                creatorAvatar: picUrl,   // 列表創建者頭像
                item: []
            };

            for (let i = 0; i < x.length; i++) {
                var artist = '';
                for (let j = 0; j < x[i]["artists"].length; j++) {
                    artist += x[i]["artists"][j]["name"]
                    if (j < x[i]["artists"].length - 1) { artist += '/' }
                }
                tempList.item[i] = {
                    id: x[i]["id"],  // 音樂ID
                    name: x[i]["name"],  // 音樂名字
                    artist: artist, // 藝術家名字
                    album: x[i]["album"]["name"],    // 專輯名字
                    source: "netease",     // 音樂來源
                    url_id: x[i]["id"],  // 連結ID
                    pic_id: null,  // 封面ID
                    lyric_id: x[i]["id"],  // 歌詞ID
                    pic: picUrl + "?param=300y300",    // 專輯圖片
                    url: null   // mp3連結
                };
            }

            // 存儲清單資訊
            musicList[id] = tempList;

            // 首頁顯示預設清單
            // if(id == mkPlayer.defaultlist) loadList(id);

            loadList(id);

            if (callback) callback(id);    // 調用回呼函數

            // 改變前端列表
            $(".sheet-item[data-no='" + id + "'] .sheet-cover").attr('src', tempList.cover);    // 專輯封面
            $(".sheet-item[data-no='" + id + "'] .sheet-name").html(tempList.name);     // 專輯名字

            // 調試資訊輸出
            if (mkPlayer.debug) {
                console.debug("歌單 [" + tempList.name + "] 中的音樂獲取成功");
            }
        },   //success
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('歌單讀取失敗 - ' + XMLHttpRequest.status);
            console.error(XMLHttpRequest + textStatus + errorThrown);
            $(".sheet-item[data-no='" + id + "'] .sheet-name").html('<span style="color: #EA8383">讀取失敗</span>');     // 專輯名字
        }   // error  
    });//ajax
}

function ajaxArtistList(lid, callback) {

    if (!lid) return false;

    // 已經在載入了，跳過
    // if(musicList[id].isloading === true) {
    //     return true;
    // }

    // musicList[id].isloading = true; // 更新狀態：列表載入中

    id = musicList.length;

    $.ajax({
        type: "GET",
        url: "https://cors-anywhere.herokuapp.com/https://music.163.com/artist",
        data: "id=" + lid,
        // data: "types=album&id=" + lid,
        dataType: "text",
        complete: function (XMLHttpRequest, textStatus) {
            musicList[id].isloading = false;    // 列表已經載入完了
        },  // complete
        success: function (Data) {
            // console.log(Data);
            const parser = new DOMParser();
            const d = parser.parseFromString(Data, "text/html");
            var artist = d.getElementById('artist-name').textContent;
            var list = d.getElementById('song-list-pre-data');
            var x = JSON.parse(list.textContent);
            var album = x[0]["album"]["name"];
            var picUrl = x[0]["album"]["picUrl"];

            // 存儲歌單資訊
            var tempList = {
                id: lid,    // 列表的網易雲 id
                name: artist,   // 列表名字
                cover: picUrl + '?param=200y200',   // 列表封面
                creatorName: artist,   // 列表創建者名字
                creatorAvatar: picUrl,   // 列表創建者頭像
                item: []
            };

            for (let i = 0; i < x.length; i++) {
                var artist = '';
                for (let j = 0; j < x[i]["artists"].length; j++) {
                    artist += x[i]["artists"][j]["name"]
                    if (j < x[i]["artists"].length - 1) { artist += '/' }
                }
                tempList.item[i] = {
                    id: x[i]["id"],  // 音樂ID
                    name: x[i]["name"],  // 音樂名字
                    artist: artist, // 藝術家名字
                    album: x[i]["album"]["name"],    // 專輯名字
                    source: "netease",     // 音樂來源
                    url_id: x[i]["id"],  // 連結ID
                    pic_id: null,  // 封面ID
                    lyric_id: x[i]["id"],  // 歌詞ID
                    pic: picUrl + "?param=300y300",    // 專輯圖片
                    url: null   // mp3連結
                };

            }

            // 歌單用戶 id 不能丟
            // if(musicList[id].creatorID) {
            //     tempList.creatorID = musicList[id].creatorID;
            //     if(musicList[id].creatorID === rem.uid) {   // 是當前登錄用戶的歌單，要保存到緩存中
            //         var tmpUlist = playerReaddata('ulist');    // 讀取本地記錄的使用者歌單
            //         if(tmpUlist) {  // 讀取到了
            //             for(i=0; i<tmpUlist.length; i++) {  // 匹配歌單
            //                 if(tmpUlist[i].id == lid) {
            //                     tmpUlist[i] = tempList; // 保存歌單中的歌曲
            //                     playerSavedata('ulist', tmpUlist);  // 保存
            //                     break;
            //                 }
            //             }
            //         }
            //     }
            // }

            // 存儲清單資訊
            musicList[id] = tempList;

            // 首頁顯示預設清單
            // if(id == mkPlayer.defaultlist) loadList(id);

            loadList(id);

            if (callback) callback(id);    // 調用回呼函數

            // 改變前端列表
            $(".sheet-item[data-no='" + id + "'] .sheet-cover").attr('src', tempList.cover);    // 專輯封面
            $(".sheet-item[data-no='" + id + "'] .sheet-name").html(tempList.name);     // 專輯名字

            // 調試資訊輸出
            if (mkPlayer.debug) {
                console.debug("歌單 [" + tempList.name + "] 中的音樂獲取成功");
            }
        },   //success
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('歌單讀取失敗 - ' + XMLHttpRequest.status);
            console.error(XMLHttpRequest + textStatus + errorThrown);
            $(".sheet-item[data-no='" + id + "'] .sheet-name").html('<span style="color: #EA8383">讀取失敗</span>');     // 專輯名字
        }   // error  
    });//ajax

    // console.log(musicList);

}





// 專輯DB
function dbMusicList(album_id, callback) {

    if (!album_id) return false;

    var sqlstring = "select * from vMusic where album_id = " + album_id;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', db_url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        if (typeof data[0] == "undefined") { data = []; } else { data = data[0].values; }

        // 存儲歌單資訊
        var tempList = {
            id: data[0][2],    // 列表的網易雲 id
            name: data[0][3],   // 列表名字
            cover: data[0][7],   // 列表封面
            creatorName: data[0][1],   // 列表創建者名字
            creatorAvatar: data[0][6],   // 列表創建者頭像
            item: []
        };

        for (var i = 0; i < data.length; i++) {
            var kuwo_id = data[i][10];
            if (kuwo_id == null) { kuwo_id = 0 }
            tempList.item[i] = {
                id: data[i][4],  // 音樂ID
                name: data[i][5],  // 音樂名字
                artist: data[i][12], // 藝術家名字
                album: data[i][3],    // 專輯名字
                source: "netease",     // 音樂來源
                url_id: kuwo_id,  // 連結ID
                pic_id: data[i][7],  // 封面ID
                lyric_id: data[i][4],  // 歌詞ID
                pic: data[i][7] + "?param=300y300",    // 專輯圖片
                url: "https://link.hhtjim.com/163/" + data[i][4] + ".mp3"   // mp3連結
            };
        }

        // 存儲清單資訊
        musicList = DefaultMusicList;
        musicList = musicList.concat(tempList);

        if (callback) callback(musicList);    // 調用回呼函數

        // 調試資訊輸出
        if (mkPlayer.debug) {
            console.debug("歌單 [" + tempList.name + "] 中的音樂獲取成功");
        }
    };
    xhr.send();
}

// 收藏
function CookieMusicList(callback) {

    var ids = getCookieByName('music');
    var kwids = getCookieByName('kwmusic');
    if (ids == '' && kwids == '') {
        layer.msg('找不到收藏清單');
        if (callback) { callback(HomeMusicList); }
        return;
    }
    ids = '0' + ids;
    kwids = '0' + kwids;

    var sqlstring = "select * from vMusic where music_id in (" + ids + ") or kuwo_music_id in (" + kwids + ")";
    const xhr = new XMLHttpRequest();
    xhr.open('GET', db_url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        if (typeof data[0] == "undefined") { data = []; } else { data = data[0].values; }

        // 存儲歌單資訊
        var tempList = {
            id: 0,    // 列表的網易雲 id
            name: '收藏',   // 列表名字
            cover: 'images/player_cover.png',   // 列表封面
            creatorName: '',   // 列表創建者名字
            creatorAvatar: '',   // 列表創建者頭像
            item: []
        };

        for (var i = 0; i < data.length; i++) {
            var kuwo_id = data[i][10];
            if (kuwo_id == null) {
                kuwo_id = 0;
                source = "netease";
                var url = "https://link.hhtjim.com/163/" + data[i][4] + ".mp3"
            } else {
                source = "kuwo";
                var url = "https://link.hhtjim.com/kw/" + kuwo_id + ".mp3"
            }
            tempList.item[i] = {
                id: data[i][4],  // 音樂ID
                name: data[i][5],  // 音樂名字
                artist: data[i][12], // 藝術家名字
                album: data[i][3],    // 專輯名字
                source: source,     // 音樂來源
                url_id: kuwo_id,  // 連結ID
                pic_id: data[i][7],  // 封面ID
                lyric_id: data[i][4],  // 歌詞ID
                pic: data[i][7] + "?param=300y300",    // 專輯圖片
                url: url   // mp3連結
            };
        }

        // 存儲清單資訊
        musicList = DefaultMusicList;
        musicList = musicList.concat(tempList);

        if (callback) callback(musicList);    // 調用回呼函數

        // 調試資訊輸出
        if (mkPlayer.debug) {
            console.debug("歌單 [" + tempList.name + "] 中的音樂獲取成功");
        }
    };
    xhr.send();
}

// 隨機100首
function RandomMusicList(callback) {

    // var sqlstring = "select * from vMusic where music_id in (select music_id from musics where url = 1 order by random() limit 100)"
    var sqlstring = "select * from vMusic where url=1 or kuwo_music_id is not NULL order by random() limit 100"

    const xhr = new XMLHttpRequest();
    xhr.open('GET', db_url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        if (typeof data[0] == "undefined") { data = []; } else { data = data[0].values; }

        // 存儲歌單資訊
        var tempList = {
            id: 0,    // 列表的網易雲 id
            name: '隨機100首',   // 列表名字
            cover: 'images/player_cover.png',   // 列表封面
            creatorName: '',   // 列表創建者名字
            creatorAvatar: '',   // 列表創建者頭像
            item: []
        };

        for (var i = 0; i < data.length; i++) {
            var kuwo_id = data[i][10];
            if (kuwo_id == null) {
                kuwo_id = 0;
                source = "netease";
                var url = "https://link.hhtjim.com/163/" + data[i][4] + ".mp3"
            } else {
                source = "kuwo";
                var url = "https://link.hhtjim.com/kw/" + kuwo_id + ".mp3"
            }
            tempList.item[i] = {
                id: data[i][4],  // 音樂ID
                name: data[i][5],  // 音樂名字
                artist: data[i][12], // 藝術家名字
                album: data[i][3],    // 專輯名字
                source: source,     // 音樂來源
                url_id: kuwo_id,  // 連結ID
                pic_id: data[i][7],  // 封面ID
                lyric_id: data[i][4],  // 歌詞ID
                pic: data[i][7] + "?param=300y300",    // 專輯圖片
                url: url   // mp3連結
            };
        }

        // 存儲清單資訊
        musicList = DefaultMusicList;
        musicList = musicList.concat(tempList);

        if (callback) callback(musicList);    // 調用回呼函數

        // 調試資訊輸出
        if (mkPlayer.debug) {
            console.debug("歌單 [" + tempList.name + "] 中的音樂獲取成功");
        }
    };
    xhr.send();
}

// 最近新歌200首
function RecentMusicList(callback) {

    var sqlstring = "select * from vMusic where (url=1 or kuwo_music_id is not NULL) and music_name not like '%伴奏%' and music_name not like '%試聽%' order by release_date desc limit 200";

    const xhr = new XMLHttpRequest();
    xhr.open('GET', db_url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        if (typeof data[0] == "undefined") { data = []; } else { data = data[0].values; }

        // 存儲歌單資訊
        var tempList = {
            id: 0,    // 列表的網易雲 id
            name: '最近新歌200首',   // 列表名字
            cover: 'images/player_cover.png',   // 列表封面
            creatorName: '',   // 列表創建者名字
            creatorAvatar: '',   // 列表創建者頭像
            item: []
        };

        for (var i = 0; i < data.length; i++) {
            var kuwo_id = data[i][10];
            if (kuwo_id == null) {
                kuwo_id = 0;
                source = "netease";
                var url = "https://link.hhtjim.com/163/" + data[i][4] + ".mp3"
            } else {
                source = "kuwo";
                var url = "https://link.hhtjim.com/kw/" + kuwo_id + ".mp3"
            }
            tempList.item[i] = {
                id: data[i][4],  // 音樂ID
                name: data[i][5],  // 音樂名字
                artist: data[i][12], // 藝術家名字
                album: data[i][3],    // 專輯名字
                source: source,     // 音樂來源
                url_id: kuwo_id,  // 連結ID
                pic_id: data[i][7],  // 封面ID
                lyric_id: data[i][4],  // 歌詞ID
                pic: data[i][7] + "?param=300y300",    // 專輯圖片
                url: url   // mp3連結
            };
        }

        // 存儲清單資訊
        musicList = DefaultMusicList;
        musicList = musicList.concat(tempList);

        if (callback) callback(musicList);    // 調用回呼函數

        // 調試資訊輸出
        if (mkPlayer.debug) {
            console.debug("歌單 [" + tempList.name + "] 中的音樂獲取成功");
        }
    };
    xhr.send();
}

// 關鍵字搜尋200首
function SearchMusicList(keyword, callback) {

    var kw = Traditionalized(keyword);    // 簡轉繁

    var sqlstring = "select * from vMusic where artist_name like '%" + kw + "%' or album_name like '%" + kw + "%' or music_name like '%" + kw + "%' order by release_date desc limit 200"

    const xhr = new XMLHttpRequest();
    xhr.open('GET', db_url, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        if (typeof data[0] == "undefined") { data = []; } else { data = data[0].values; }

        // 存儲歌單資訊
        var tempList = {
            id: 0,    // 列表的網易雲 id
            name: '關鍵字搜尋200首',   // 列表名字
            cover: 'images/player_cover.png',   // 列表封面
            creatorName: '',   // 列表創建者名字
            creatorAvatar: '',   // 列表創建者頭像
            item: []
        };

        for (var i = 0; i < data.length; i++) {
            var kuwo_id = data[i][10];
            if (kuwo_id == null) {
                kuwo_id = 0;
                source = "netease";
                var url = "https://link.hhtjim.com/163/" + data[i][4] + ".mp3"
            } else {
                source = "kuwo";
                var url = "https://link.hhtjim.com/kw/" + kuwo_id + ".mp3"
            }
            tempList.item[i] = {
                id: data[i][4],  // 音樂ID
                name: data[i][5],  // 音樂名字
                artist: data[i][12], // 藝術家名字
                album: data[i][3],    // 專輯名字
                source: source,     // 音樂來源
                url_id: kuwo_id,  // 連結ID
                pic_id: data[i][7],  // 封面ID
                lyric_id: data[i][4],  // 歌詞ID
                pic: data[i][7] + "?param=300y300",    // 專輯圖片
                url: url   // mp3連結
            };
        }

        // 存儲清單資訊
        musicList = DefaultMusicList;
        musicList = musicList.concat(tempList);
        // console.log(musicList);

        // // 首頁顯示預設清單
        // // if(id == mkPlayer.defaultlist) loadList(id);

        //loadList(3);

        if (callback) callback(musicList);    // 調用回呼函數

        // // 改變前端列表
        // $(".sheet-item[data-no='" + id + "'] .sheet-cover").attr('src', tempList.cover);    // 專輯封面
        // $(".sheet-item[data-no='" + id + "'] .sheet-name").html(tempList.name);     // 專輯名字

        // 調試資訊輸出
        if (mkPlayer.debug) {
            console.debug("歌單 [" + tempList.name + "] 中的音樂獲取成功");
        }
    };
    xhr.send();
}

// 專輯收藏清單
function myAlbumsMusicList(callback) {

    var ids = getCookieByName('album');
    if (ids == '') {
        layer.msg('找不到專輯收藏清單');
        if (callback) { callback(HomeMusicList); }
        return;
    }
    ids = '0' + ids;
    // ids = '88730427,159400159,159967997';

    var sqlstring = "select * from vMusic where album_id in (" + ids + ") order by album_id,seq";
    // console.log(sqlstring);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', db_url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        if (typeof data[0] == "undefined") { data = []; } else { data = data[0].values; }

        var jsonData = [];
        var lastAlbum_id = 0;
        var item_no = 0;
        var tempList = {};
        for (var i = 0; i < data.length; i++) {
            // 存儲歌單資訊
            if (data[i][2] != lastAlbum_id) {
                if (i > 0) { jsonData = jsonData.concat(tempList); }
                lastAlbum_id = data[i][2];
                item_no = 0;
                tempList = {
                    id: data[i][2],    // 列表的網易雲 id
                    name: data[i][3],   // 列表名字
                    cover: data[i][7],   // 列表封面
                    creatorName: data[i][2],   // 列表創建者名字
                    creatorAvatar: data[i][2],   // 列表創建者頭像
                    item: []
                };
            } else {
                var kuwo_id = data[i][10];
                if (kuwo_id == null) {
                    kuwo_id = 0;
                    source = "netease";
                    var url = "https://link.hhtjim.com/163/" + data[i][4] + ".mp3"
                } else {
                    source = "kuwo";
                    var url = "https://link.hhtjim.com/kw/" + kuwo_id + ".mp3"
                }
                tempList.item[item_no] = {
                    id: data[i][4],  // 音樂ID
                    name: data[i][5],  // 音樂名字
                    artist: data[i][12], // 藝術家名字
                    album: data[i][3],    // 專輯名字
                    source: source,     // 音樂來源
                    url_id: kuwo_id,  // 連結ID
                    pic_id: data[i][7],  // 封面ID
                    lyric_id: data[i][4],  // 歌詞ID
                    pic: data[i][7] + "?param=300y300",    // 專輯圖片
                    url: url  // mp3連結
                };
                item_no += 1;
            }
        }
        // 存儲清單資訊
        jsonData = jsonData.concat(tempList);

        // console.log(jsonData);

        musicList = DefaultMusicList;
        musicList = musicList.concat(jsonData);

        if (callback) callback(musicList);    // 調用回呼函數

        // 調試資訊輸出
        if (mkPlayer.debug) {
            console.debug("歌單 [" + tempList.name + "] 中的音樂獲取成功");
        }
    };
    xhr.send();
}

// 滾石香港黃金十年
function RockGolden10MusicList(callback) {

    var sqlstring = "select * from vMusic where album_name like '%滾石香港黃金十年%' order by album_id,seq";
    // console.log(sqlstring);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', db_url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = e => {
        const uInt8Array = new Uint8Array(xhr.response);
        const db = new SQL.Database(uInt8Array);
        const contents = db.exec(sqlstring);
        var data = JSON.parse(JSON.stringify(contents));
        if (typeof data[0] == "undefined") { data = []; } else { data = data[0].values; }

        var jsonData = [];
        var lastAlbum_id = 0;
        var item_no = 0;
        var tempList = {};
        for (var i = 0; i < data.length; i++) {
            // 存儲歌單資訊
            if (data[i][2] != lastAlbum_id) {
                if (i > 0) { jsonData = jsonData.concat(tempList); }
                lastAlbum_id = data[i][2];
                item_no = 0;
                tempList = {
                    id: data[i][2],    // 列表的網易雲 id
                    name: data[i][1],   // 列表名字
                    cover: data[i][7],   // 列表封面
                    creatorName: data[i][2],   // 列表創建者名字
                    creatorAvatar: data[i][2],   // 列表創建者頭像
                    item: []
                };
            } else {
                var kuwo_id = data[i][10];
                if (kuwo_id == null) {
                    kuwo_id = 0;
                    source = "netease";
                    var url = "https://link.hhtjim.com/163/" + data[i][4] + ".mp3"   // mp3連結
                } else {
                    source = "kuwo";
                    var url = "https://link.hhtjim.com/kw/" + kuwo_id + ".mp3"   // mp3連結
                }
                tempList.item[item_no] = {
                    id: data[i][4],  // 音樂ID
                    name: data[i][5],  // 音樂名字
                    artist: data[i][12], // 藝術家名字
                    album: data[i][3],    // 專輯名字
                    source: source,     // 音樂來源
                    url_id: kuwo_id,  // 連結ID
                    pic_id: data[i][7],  // 封面ID
                    lyric_id: data[i][4],  // 歌詞ID
                    pic: data[i][7] + "?param=300y300",    // 專輯圖片
                    url: url   // mp3連結
                };
                item_no += 1;
            }
        }
        // 存儲清單資訊
        jsonData = jsonData.concat(tempList);

        // console.log(jsonData);

        musicList = DefaultMusicList;
        musicList = musicList.concat(jsonData);

        if (callback) callback(musicList);    // 調用回呼函數

        // 調試資訊輸出
        if (mkPlayer.debug) {
            console.debug("歌單 [" + tempList.name + "] 中的音樂獲取成功");
        }
    };
    xhr.send();
}


