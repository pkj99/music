
    let pagename = window.location.pathname.split('/').slice(-1);
    var db_url = 'https://pkj99.github.io/music/db/music.db';
    var pagecount;
    var urlParams;
    

    // create artist list 
    function artistlists(sqlstring){
        console.log(sqlstring);
        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = e => {
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            
            const contents = db.exec(sqlstring);
            var data = JSON.parse(JSON.stringify(contents));
            
            let htmlString = '<ul>';
            
            if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }

            for (var i = 0; i < data.length; i++) {
                var artist_id = data[i][0];
                var artist_name = data[i][1];
                var artist_img = data[i][2]+"?param=146y220";
                var group_id = data[i][3];

                htmlString += '<li class="col-lg-10 col-md-8 col-sm-5 col-xs-3">';
                htmlString += '<div class="myui-vodlist__box">';
                htmlString += '<a class="myui-vodlist__thumb lazyload" href="artist.html?artist_id='+artist_id+'" ';
                htmlString += 'title="' + artist_name +'" ';
                htmlString += 'data-original="' + artist_img + '" ';
                htmlString += 'style="background-image: url(' + artist_img +')"';

                htmlString += '<span class="play hidden-xs"></span>';
                // htmlString += '<span class="pic-text text-left">'+group_id+'</span>';

                htmlString += '</a>';
                htmlString += '</div>';
                htmlString += '<div class="myui-vodlist__detail">';
                htmlString += '<h4 class="title text-overflow"><a href="artist.html?artist_id='+artist_id+'">'+artist_name+'</a></h4>';
                htmlString += '</div>';
                htmlString += '</li>';
            }

            htmlString += '</ul>';

            document.getElementById('myui-panel').innerHTML = htmlString;

        };
        xhr.send();
    }

    // create album list 
    function albumlists(sqlstring){
        console.log(sqlstring);
        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = e => {
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            
            const contents = db.exec(sqlstring);
            var data = JSON.parse(JSON.stringify(contents));
            
            let htmlString = '<ul>';
            
            if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }

            for (var i = 0; i < data.length; i++) {
                var album_id = data[i][0];
                var artist_id = data[i][1];
                var title = data[i][2];
                var album_img = data[i][3]+"?param=146y220";
                var qty = data[i][4];
                var release_date = data[i][6];

                htmlString += '<li class="col-lg-10 col-md-8 col-sm-5 col-xs-3">';
                htmlString += '<div class="myui-vodlist__box">';
                htmlString += '<a class="myui-vodlist__thumb lazyload" href="index.html?album_id='+album_id+'" ';
                htmlString += 'title="' + title +'" ';
                htmlString += 'data-original="' + album_img + '" ';
                htmlString += 'style="background-image: url(' + album_img +')"';

                htmlString += '<span class="play hidden-xs"></span>';
                htmlString += '<span class="pic-text text-right">'+qty+'</span>';
                htmlString += '<span class="pic-text text-left">'+release_date+'</span>';

                htmlString += '</a>';
                htmlString += '</div>';
                htmlString += '<div class="myui-vodlist__detail">';
                htmlString += '<h4 class="title text-overflow"><a href="index.html?album_id='+album_id+'">'+title+'</a></h4>';
                htmlString += '</div>';
                htmlString += '</li>';
            }

            htmlString += '</ul>';

            document.getElementById('myui-panel').innerHTML = htmlString;

        };
        xhr.send();
    }

    // create music list 
    function musiclists(sqlstring){
        console.log(sqlstring);
        const xhr = new XMLHttpRequest();
        xhr.open('GET', db_url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = e => {
            const uInt8Array = new Uint8Array(xhr.response);
            const db = new SQL.Database(uInt8Array);
            
            const contents = db.exec(sqlstring);
            var data = JSON.parse(JSON.stringify(contents));
            
            let htmlString = '<ul>';
            
            if (typeof data[0] == "undefined" ) { data = [];} else { data = data[0].values; }

            for (var i = 0; i < data.length; i++) {
                var music_id = data[i][0];
                var music_name = data[i][1];
                var fee = data[i][2];

                htmlString += '<li class="col-lg-1 col-md-8 col-sm-5 col-xs-3">';
                // htmlString += '<div class="myui-vodlist__box">';
                // htmlString += '<a class="myui-vodlist__thumb lazyload" href="'+music_id+'" ';
                // htmlString += 'title="' + music_name +'" ';
                // htmlString += 'data-original="' + album_img + '" ';
                // htmlString += 'style="background-image: url(' + album_img +')"';

                // htmlString += '<span class="play hidden-xs"></span>';
                // htmlString += '<span class="pic-text text-right">'+qty+'</span>';
                // htmlString += '<span class="pic-text text-left">'+release_date+'</span>';

                // htmlString += '</a>';
                // htmlString += '</div>';
                htmlString += '<div class="myui-vodlist__detail">';
                htmlString += '<h4 class="title text-overflow"><a href="'+music_id+'">'+music_name+'</a></h4>';
                htmlString += '</div>';
                htmlString += '</li>';
            }

            htmlString += '</ul>';

            document.getElementById('myui-panel').innerHTML = htmlString;

        };
        xhr.send();
    }











    // get params
    (window.onpopstate = function () {
        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
    })();
    
    var bypass = false;

    if (urlParams["t"] == null){ var t = "0"; } else { var t = urlParams["t"];}
    if (urlParams["artist_id"] != null){
        var artist_id = urlParams["artist_id"];
        var sqlstring = "select * from albums where qty>3 and qty-free<3 and artist_id="+artist_id;
        albumlists(sqlstring);
        bypass = true;
    }
    if (urlParams["album_id"] != null){
         var album_id = urlParams["album_id"];
         var sqlstring = "select * from musics where url=1 and album_id="+album_id;
         musiclists(sqlstring);
         bypass = true;
     }
        
    if (!bypass) {
        if (urlParams["id"] == null) {
            if (urlParams["wd"] == null) {
                if (t != "0") {
                    // submenuByTypeId(); // 動態產生子選單
                    var sqlstring = "select * from artists where group_id="+t;
                    if (t=="6001"){
                        sqlstring = "select * from artists where group_id in (6001,7001)";
                    } 
                    if (t=="6002"){
                        sqlstring = "select * from artists where group_id in (6002,7002)";
                    }
                    if (t=="6003"){
                        sqlstring = "select * from artists where group_id in (6003,7003)";
                    }
                    artistlists(sqlstring);
                } else {
                    var sqlstring = "select * from artists";
                    artistlists(sqlstring);
                }
            } else {
                var keyword_cn = Simplized(urlParams["wd"])  // 繁轉簡
                // var sqlstring = "select * from movie where name like '%"+keyword_cn+"%' order by year desc";
                // movielists(sqlstring);

                var keyword_tw = Traditionalized(urlParams["wd"])  // 簡轉繁
                // var sqlstring = "select * from tmdb where title_tw like '%"+keyword_tw+"%' or title_cn like '%"+keyword_cn+"%' order by release_date desc";
                // tmdblists(sqlstring);
            }
        } else {
            // submenuByTypeId(); // 動態產生子選單
            var id = urlParams["id"];
            // var sqlstring = "select * from movie where id = "+id;
            // movieById(sqlstring);
        }
    }
    if (t==1001){ document.getElementById('menu-1001').classList.add("active"); } 
    if (t==1002){ document.getElementById('menu-1002').classList.add("active"); } 
    if (t==1003){ document.getElementById('menu-1003').classList.add("active"); } 
    if (t==2001){ document.getElementById('menu-2001').classList.add("active"); } 
    if (t==2002){ document.getElementById('menu-2002').classList.add("active"); } 
    if (t==2003){ document.getElementById('menu-2003').classList.add("active"); } 
    if (t==6001){ document.getElementById('menu-6001').classList.add("active"); } 
    if (t==6002){ document.getElementById('menu-6002').classList.add("active"); } 
    if (t==6003){ document.getElementById('menu-6003').classList.add("active"); } 


 
