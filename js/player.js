
// 播放機功能配置
var mkPlayer = {
    api: "https://dnvods.com/music/api.php", // api地址
    // api: "https://duonaovod.com/music/api.php", // api地址
    // api: "https://music.163.com/api", // api地址
    // api: "https://api.zcentury.top/163/", // api地址
    loadcount: 20,  // 搜索結果一次載入多少條
    method: "POST",     // 資料傳輸方式(POST/GET)
    defaultlist: 3,    // 預設要顯示的播放清單編號
    autoplay: false,    // 是否自動播放(true/false) *此選項在移動端可能無效
    coverbg: true,      // 是否開啟封面背景(true/false) *開啟後會有些卡
    mcoverbg: true,     // 是否開啟[移動端]封面背景(true/false)
    dotshine: true,    // 是否開啟播放進度條的小點閃動效果[不支持IE](true/false) *開啟後會有些卡
    mdotshine: false,   // 是否開啟[移動端]播放進度條的小點閃動效果[不支持IE](true/false)
    volume: 0.6,        // 預設音量值(0~1之間)
    version: "v2.41",    // 播放機當前版本號(僅供調試)
    debug: true   // 是否開啟調試模式(true/false)
};

// 存儲全域變數
var rem = [];
var myMusic = [];
var db_url = 'https://pkj99.github.io/music/db/music.db';

if (mkPlayer.debug == false) {
    var loginStatus = sessionStorage.getItem('loginStatus');
    if (loginStatus != 'success') { window.location = 'index.html' }
}

function JTPYStr() {
    return '萬與醜專業叢東絲丟兩嚴喪個爿豐臨為麗舉麼義烏樂喬習鄉書買亂爭於虧雲亙亞產畝親褻嚲億僅從侖倉儀們價眾優夥會傴傘偉傳傷倀倫傖偽佇體余傭僉俠侶僥偵側僑儈儕儂俁儔儼倆儷儉債傾傯僂僨償儻儐儲儺兒兌兗党蘭關興茲養獸囅內岡冊寫軍農塚馮沖決況凍淨淒涼淩減湊凜幾鳳鳧憑凱擊氹鑿芻劃劉則剛創刪別剗剄劊劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勳猛勩勻匭匱區醫華協單賣盧鹵臥衛卻巹廠廳曆厲壓厭厙廁廂厴廈廚廄廝縣參靉靆雙發變敘疊葉號歎嘰籲後嚇呂嗎唚噸聽啟吳嘸囈嘔嚦唄員咼嗆嗚詠哢嚨嚀噝吒噅鹹呱響啞噠嘵嗶噦嘩噲嚌噥喲嘜嗊嘮啢嗩唕喚呼嘖嗇囀齧囉嘽嘯噴嘍嚳囁呵噯噓嚶囑嚕劈囂謔團園囪圍圇國圖圓聖壙場阪壞塊堅壇壢壩塢墳墜壟壟壚壘墾坰堊墊埡墶壋塏堖塒塤堝墊垵塹墮壪牆壯聲殼壺壼處備複夠頭誇夾奪奩奐奮獎奧妝婦媽嫵嫗媯姍姜婁婭嬈嬌孌娛媧嫻嫿嬰嬋嬸媼嬡嬪嬙嬤孫學孿甯寶實寵審憲宮寬賓寢對尋導壽將爾塵堯尷屍盡層屭屜屆屬屢屨嶼歲豈嶇崗峴嶴嵐島嶺嶽崠巋嶨嶧峽嶢嶠崢巒嶗崍嶮嶄嶸嶔崳嶁脊巔鞏巰幣帥師幃帳簾幟帶幀幫幬幘幗冪襆幹並廣莊慶廬廡庫應廟龐廢廎廩開異棄張彌弳彎彈強歸當錄彠彥徹徑徠禦憶懺憂愾懷態慫憮慪悵愴憐總懟懌戀懇惡慟懨愷惻惱惲悅愨懸慳憫驚懼慘懲憊愜慚憚慣湣慍憤憒願懾憖怵懣懶懍戇戔戲戧戰戩戶紮撲扡執擴捫掃揚擾撫拋摶摳掄搶護報擔擬攏揀擁攔擰撥擇掛摯攣掗撾撻挾撓擋撟掙擠揮撏撈損撿換搗據撚擄摑擲撣摻摜摣攬撳攙擱摟攪攜攝攄擺搖擯攤攖撐攆擷擼攛擻攢敵斂數齋斕鬥斬斷無舊時曠暘曇晝曨顯晉曬曉曄暈暉暫曖劄術樸機殺雜權條來楊榪傑極構樅樞棗櫪梘棖槍楓梟櫃檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲樣欒棬椏橈楨檔榿橋樺檜槳樁夢檮棶檢欞槨櫝槧欏橢樓欖櫬櫚櫸檟檻檳櫧橫檣櫻櫫櫥櫓櫞簷檁歡歟歐殲歿殤殘殞殮殫殯毆毀轂畢斃氈毿氌氣氫氬氳匯漢汙湯洶遝溝沒灃漚瀝淪滄渢溈滬濔濘淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞溮濁測澮濟瀏滻渾滸濃潯濜塗湧濤澇淶漣潿渦溳渙滌潤澗漲澀澱淵淥漬瀆漸澠漁瀋滲溫遊灣濕潰濺漵漊潷滾滯灩灄滿瀅濾濫灤濱灘澦濫瀠瀟瀲濰潛瀦瀾瀨瀕灝滅燈靈災燦煬爐燉煒熗點煉熾爍爛烴燭煙煩燒燁燴燙燼熱煥燜燾煆糊溜愛爺牘犛牽犧犢強狀獷獁猶狽麅獮獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣璵瑒瑪瑋環現瑲璽瑉玨琺瓏璫琿璡璉瑣瓊瑤璦璿瓔瓚甕甌電畫暢佘疇癤療瘧癘瘍鬁瘡瘋皰屙癰痙癢瘂癆瘓癇癡癉瘮瘞瘺癟癱癮癭癩癬癲臒皚皺皸盞鹽監蓋盜盤瞘眥矓著睜睞瞼瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎硜矽碩硤磽磑礄確鹼礙磧磣堿镟滾禮禕禰禎禱禍稟祿禪離禿稈種積稱穢穠穭稅穌穩穡窮竊竅窯竄窩窺竇窶豎競篤筍筆筧箋籠籩築篳篩簹箏籌簽簡籙簀篋籜籮簞簫簣簍籃籬籪籟糴類秈糶糲粵糞糧糝餱緊縶糸糾紆紅紂纖紇約級紈纊紀紉緯紜紘純紕紗綱納紝縱綸紛紙紋紡紵紖紐紓線紺絏紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絰絎繪給絢絳絡絕絞統綆綃絹繡綌綏絛繼綈績緒綾緓續綺緋綽緔緄繩維綿綬繃綢綯綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝縕繢緦綞緞緶線緱縋緩締縷編緡緣縉縛縟縝縫縗縞纏縭縊縑繽縹縵縲纓縮繆繅纈繚繕繒韁繾繰繯繳纘罌網羅罰罷羆羈羥羨翹翽翬耮耬聳恥聶聾職聹聯聵聰肅腸膚膁腎腫脹脅膽勝朧腖臚脛膠脈膾髒臍腦膿臠腳脫腡臉臘醃膕齶膩靦膃騰臏臢輿艤艦艙艫艱豔艸藝節羋薌蕪蘆蓯葦藶莧萇蒼苧蘇檾蘋莖蘢蔦塋煢繭荊薦薘莢蕘蓽蕎薈薺蕩榮葷滎犖熒蕁藎蓀蔭蕒葒葤藥蒞蓧萊蓮蒔萵薟獲蕕瑩鶯蓴蘀蘿螢營縈蕭薩蔥蕆蕢蔣蔞藍薊蘺蕷鎣驀薔蘞藺藹蘄蘊藪槁蘚虜慮虛蟲虯蟣雖蝦蠆蝕蟻螞蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬蠍螻蠑螿蟎蠨釁銜補襯袞襖嫋褘襪襲襏裝襠褌褳襝褲襇褸襤繈襴見觀覎規覓視覘覽覺覬覡覿覥覦覯覲覷觴觸觶讋譽謄訁計訂訃認譏訐訌討讓訕訖訓議訊記訒講諱謳詎訝訥許訛論訩訟諷設訪訣證詁訶評詛識詗詐訴診詆謅詞詘詔詖譯詒誆誄試詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡譸誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談誼謀諶諜謊諫諧謔謁謂諤諭諼讒諮諳諺諦謎諞諝謨讜謖謝謠謗諡謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖谷豶貝貞負貟貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜贔賙賡賠賧賴賵贅賻賺賽賾贗贊贇贈贍贏贛赬趙趕趨趲躉躍蹌蹠躒踐躂蹺蹕躚躋踴躊蹤躓躑躡蹣躕躥躪躦軀車軋軌軒軑軔轉軛輪軟轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輈輇輅較輒輔輛輦輩輝輥輞輬輟輜輳輻輯轀輸轡轅轄輾轆轍轔辭辯辮邊遼達遷過邁運還這進遠違連遲邇逕跡適選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰鬱郤郟鄶鄭鄆酈鄖鄲醞醱醬釅釃釀釋裡钜鑒鑾鏨釓釔針釘釗釙釕釷釺釧釤鈒釩釣鍆釹鍚釵鈃鈣鈈鈦鈍鈔鐘鈉鋇鋼鈑鈐鑰欽鈞鎢鉤鈧鈁鈥鈄鈕鈀鈺錢鉦鉗鈷缽鈳鉕鈽鈸鉞鑽鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鈰鉉鉈鉍鈹鐸鉶銬銠鉺銪鋏鋣鐃銍鐺銅鋁銱銦鎧鍘銖銑鋌銩銛鏵銓鉿銚鉻銘錚銫鉸銥鏟銃鐋銨銀銣鑄鐒鋪鋙錸鋱鏈鏗銷鎖鋰鋥鋤鍋鋯鋨鏽銼鋝鋒鋅鋶鉲鐧銳銻鋃鋟鋦錒錆鍺錯錨錡錁錕錩錫錮鑼錘錐錦鍁錈錇錟錠鍵鋸錳錙鍥鍈鍇鏘鍶鍔鍤鍬鍾鍛鎪鍠鍰鎄鍍鎂鏤鎡鏌鎮鎛鎘鑷鐫鎳錼鎦鎬鎊鎰鎔鏢鏜鏍鏰鏞鏡鏑鏃鏇鏐鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐶鐲鐮鐿鑔鑣鑞鑲長門閂閃閆閈閉問闖閏闈閑閎間閔閌悶閘鬧閨聞闥閩閭闓閥閣閡閫鬮閱閬闍閾閹閶鬩閿閽閻閼闡闌闃闠闊闋闔闐闒闕闞闤隊陽陰陣階際陸隴陳陘陝隉隕險隨隱隸雋難雛讎靂霧霽黴靄靚靜靨韃鞽韉韝韋韌韍韓韙韞韜韻頁頂頃頇項順須頊頑顧頓頎頒頌頏預顱領頗頸頡頰頲頜潁熲頦頤頻頮頹頷頴穎顆題顒顎顓顏額顳顢顛顙顥纇顫顬顰顴風颺颭颮颯颶颸颼颻飀飄飆飆飛饗饜飣饑飥餳飩餼飪飫飭飯飲餞飾飽飼飿飴餌饒餉餄餎餃餏餅餑餖餓餘餒餕餜餛餡館餷饋餶餿饞饁饃餺餾饈饉饅饊饌饢馬馭馱馴馳驅馹駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵駰驕驊駱駭駢驫驪騁驗騂駸駿騏騎騍騅騌驌驂騙騭騤騷騖驁騮騫騸驃騾驄驏驟驥驦驤髏髖髕鬢魘魎魚魛魢魷魨魯魴魺鮁鮃鯰鱸鮋鮓鮒鮊鮑鱟鮍鮐鮭鮚鮳鮪鮞鮦鰂鮜鱠鱭鮫鮮鮺鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鮶鯽鯒鯖鯪鯕鯫鯡鯤鯧鯝鯢鯰鯛鯨鯵鯴鯔鱝鰈鰏鱨鯷鰮鰃鰓鱷鰍鰒鰉鰁鱂鯿鰠鼇鰭鰨鰥鰩鰟鰜鰳鰾鱈鱉鰻鰵鱅鰼鱖鱔鱗鱒鱯鱤鱧鱣鳥鳩雞鳶鳴鳲鷗鴉鶬鴇鴆鴣鶇鸕鴨鴞鴦鴒鴟鴝鴛鴬鴕鷥鷙鴯鴰鵂鴴鵃鴿鸞鴻鵐鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鶤鵯鵬鵮鶉鶊鵷鷫鶘鶡鶚鶻鶿鶥鶩鷊鷂鶲鶹鶺鷁鶼鶴鷖鸚鷓鷚鷯鷦鷲鷸鷺鸇鷹鸌鸏鸛鸘鹺麥麩黃黌黶黷黲黽黿鼂鼉鞀鼴齇齊齏齒齔齕齗齟齡齙齠齜齦齬齪齲齷龍龔龕龜志制諮只裡系範松沒嘗嘗鬧面准鐘別閑幹盡髒拼';
}

function FTPYStr() {
    return '萬與醜專業叢東絲丟兩嚴喪個爿豐臨為麗舉麼義烏樂喬習鄉書買亂爭於虧雲亙亞產畝親褻嚲億僅從侖倉儀們價眾優夥會傴傘偉傳傷倀倫傖偽佇體餘傭僉俠侶僥偵側僑儈儕儂俁儔儼倆儷儉債傾傯僂僨償儻儐儲儺兒兌兗黨蘭關興茲養獸囅內岡冊寫軍農塚馮衝決況凍淨淒涼淩減湊凜幾鳳鳧憑凱擊氹鑿芻劃劉則剛創刪別剗剄劊劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勳猛勩勻匭匱區醫華協單賣盧鹵臥衛卻巹廠廳曆厲壓厭厙廁廂厴廈廚廄廝縣參靉靆雙發變敘疊葉號歎嘰籲後嚇呂嗎唚噸聽啟吳嘸囈嘔嚦唄員咼嗆嗚詠哢嚨嚀噝吒噅鹹呱響啞噠嘵嗶噦嘩噲嚌噥喲嘜嗊嘮啢嗩唕喚呼嘖嗇囀齧囉嘽嘯噴嘍嚳囁呵噯噓嚶囑嚕劈囂謔團園囪圍圇國圖圓聖壙場阪壞塊堅壇壢壩塢墳墜壟壟壚壘墾坰堊墊埡墶壋塏堖塒塤堝墊垵塹墮壪牆壯聲殼壺壼處備複夠頭誇夾奪奩奐奮獎奧妝婦媽嫵嫗媯姍薑婁婭嬈嬌孌娛媧嫻嫿嬰嬋嬸媼嬡嬪嬙嬤孫學孿寧寶實寵審憲宮寬賓寢對尋導壽將爾塵堯尷屍盡層屭屜屆屬屢屨嶼歲豈嶇崗峴嶴嵐島嶺嶽崠巋嶨嶧峽嶢嶠崢巒嶗崍嶮嶄嶸嶔崳嶁脊巔鞏巰幣帥師幃帳簾幟帶幀幫幬幘幗冪襆幹並廣莊慶廬廡庫應廟龐廢廎廩開異棄張彌弳彎彈強歸當錄彠彥徹徑徠禦憶懺憂愾懷態慫憮慪悵愴憐總懟懌戀懇惡慟懨愷惻惱惲悅愨懸慳憫驚懼慘懲憊愜慚憚慣湣慍憤憒願懾憖怵懣懶懍戇戔戲戧戰戩戶紮撲扡執擴捫掃揚擾撫拋摶摳掄搶護報擔擬攏揀擁攔擰撥擇掛摯攣掗撾撻挾撓擋撟掙擠揮撏撈損撿換搗據撚擄摑擲撣摻摜摣攬撳攙擱摟攪攜攝攄擺搖擯攤攖撐攆擷擼攛擻攢敵斂數齋斕鬥斬斷無舊時曠暘曇晝曨顯晉曬曉曄暈暉暫曖劄術樸機殺雜權條來楊榪傑極構樅樞棗櫪梘棖槍楓梟櫃檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲樣欒棬椏橈楨檔榿橋樺檜槳樁夢檮棶檢欞槨櫝槧欏橢樓欖櫬櫚櫸檟檻檳櫧橫檣櫻櫫櫥櫓櫞簷檁歡歟歐殲歿殤殘殞殮殫殯毆毀轂畢斃氈毿氌氣氫氬氳彙漢汙湯洶遝溝沒灃漚瀝淪滄渢溈滬濔濘淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞溮濁測澮濟瀏滻渾滸濃潯濜塗湧濤澇淶漣潿渦溳渙滌潤澗漲澀澱淵淥漬瀆漸澠漁瀋滲溫遊灣濕潰濺漵漊潷滾滯灩灄滿瀅濾濫灤濱灘澦濫瀠瀟瀲濰潛瀦瀾瀨瀕灝滅燈靈災燦煬爐燉煒熗點煉熾爍爛烴燭煙煩燒燁燴燙燼熱煥燜燾煆糊溜愛爺牘犛牽犧犢強狀獷獁猶狽麅獮獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣璵瑒瑪瑋環現瑲璽瑉玨琺瓏璫琿璡璉瑣瓊瑤璦璿瓔瓚甕甌電畫暢佘疇癤療瘧癘瘍鬁瘡瘋皰屙癰痙癢瘂癆瘓癇癡癉瘮瘞瘺癟癱癮癭癩癬癲臒皚皺皸盞鹽監蓋盜盤瞘眥矓著睜睞瞼瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎硜矽碩硤磽磑礄確鹼礙磧磣堿鏇滾禮禕禰禎禱禍稟祿禪離禿稈種積稱穢穠穭稅穌穩穡窮竊竅窯竄窩窺竇窶豎競篤筍筆筧箋籠籩築篳篩簹箏籌簽簡籙簀篋籜籮簞簫簣簍籃籬籪籟糴類秈糶糲粵糞糧糝餱緊縶糸糾紆紅紂纖紇約級紈纊紀紉緯紜紘純紕紗綱納紝縱綸紛紙紋紡紵紖紐紓線紺絏紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絰絎繪給絢絳絡絕絞統綆綃絹繡綌綏絛繼綈績緒綾緓續綺緋綽緔緄繩維綿綬繃綢綯綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝縕繢緦綞緞緶線緱縋緩締縷編緡緣縉縛縟縝縫縗縞纏縭縊縑繽縹縵縲纓縮繆繅纈繚繕繒韁繾繰繯繳纘罌網羅罰罷羆羈羥羨翹翽翬耮耬聳恥聶聾職聹聯聵聰肅腸膚膁腎腫脹脅膽勝朧腖臚脛膠脈膾髒臍腦膿臠腳脫腡臉臘醃膕齶膩靦膃騰臏臢輿艤艦艙艫艱豔艸藝節羋薌蕪蘆蓯葦藶莧萇蒼苧蘇檾蘋莖蘢蔦塋煢繭荊薦薘莢蕘蓽蕎薈薺蕩榮葷滎犖熒蕁藎蓀蔭蕒葒葤藥蒞蓧萊蓮蒔萵薟獲蕕瑩鶯蓴蘀蘿螢營縈蕭薩蔥蕆蕢蔣蔞藍薊蘺蕷鎣驀薔蘞藺藹蘄蘊藪槁蘚虜慮虛蟲虯蟣雖蝦蠆蝕蟻螞蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬蠍螻蠑螿蟎蠨釁銜補襯袞襖嫋褘襪襲襏裝襠褌褳襝褲襇褸襤繈襴見觀覎規覓視覘覽覺覬覡覿覥覦覯覲覷觴觸觶讋譽謄訁計訂訃認譏訐訌討讓訕訖訓議訊記訒講諱謳詎訝訥許訛論訩訟諷設訪訣證詁訶評詛識詗詐訴診詆謅詞詘詔詖譯詒誆誄試詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡譸誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談誼謀諶諜謊諫諧謔謁謂諤諭諼讒諮諳諺諦謎諞諝謨讜謖謝謠謗諡謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖穀豶貝貞負貟貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜贔賙賡賠賧賴賵贅賻賺賽賾贗讚贇贈贍贏贛赬趙趕趨趲躉躍蹌蹠躒踐躂蹺蹕躚躋踴躊蹤躓躑躡蹣躕躥躪躦軀車軋軌軒軑軔轉軛輪軟轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輈輇輅較輒輔輛輦輩輝輥輞輬輟輜輳輻輯轀輸轡轅轄輾轆轍轔辭辯辮邊遼達遷過邁運還這進遠違連遲邇逕跡適選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰鬱郤郟鄶鄭鄆酈鄖鄲醞醱醬釅釃釀釋裏钜鑒鑾鏨釓釔針釘釗釙釕釷釺釧釤鈒釩釣鍆釹鍚釵鈃鈣鈈鈦鈍鈔鍾鈉鋇鋼鈑鈐鑰欽鈞鎢鉤鈧鈁鈥鈄鈕鈀鈺錢鉦鉗鈷缽鈳鉕鈽鈸鉞鑽鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鈰鉉鉈鉍鈹鐸鉶銬銠鉺銪鋏鋣鐃銍鐺銅鋁銱銦鎧鍘銖銑鋌銩銛鏵銓鉿銚鉻銘錚銫鉸銥鏟銃鐋銨銀銣鑄鐒鋪鋙錸鋱鏈鏗銷鎖鋰鋥鋤鍋鋯鋨鏽銼鋝鋒鋅鋶鐦鐧銳銻鋃鋟鋦錒錆鍺錯錨錡錁錕錩錫錮鑼錘錐錦鍁錈錇錟錠鍵鋸錳錙鍥鍈鍇鏘鍶鍔鍤鍬鍾鍛鎪鍠鍰鎄鍍鎂鏤鎡鏌鎮鎛鎘鑷鐫鎳鎿鎦鎬鎊鎰鎔鏢鏜鏍鏰鏞鏡鏑鏃鏇鏐鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐶鐲鐮鐿鑔鑣鑞鑲長門閂閃閆閈閉問闖閏闈閑閎間閔閌悶閘鬧閨聞闥閩閭闓閥閣閡閫鬮閱閬闍閾閹閶鬩閿閽閻閼闡闌闃闠闊闋闔闐闒闕闞闤隊陽陰陣階際陸隴陳陘陝隉隕險隨隱隸雋難雛讎靂霧霽黴靄靚靜靨韃鞽韉韝韋韌韍韓韙韞韜韻頁頂頃頇項順須頊頑顧頓頎頒頌頏預顱領頗頸頡頰頲頜潁熲頦頤頻頮頹頷頴穎顆題顒顎顓顏額顳顢顛顙顥纇顫顬顰顴風颺颭颮颯颶颸颼颻飀飄飆飆飛饗饜飣饑飥餳飩餼飪飫飭飯飲餞飾飽飼飿飴餌饒餉餄餎餃餏餅餑餖餓餘餒餕餜餛餡館餷饋餶餿饞饁饃餺餾饈饉饅饊饌饢馬馭馱馴馳驅馹駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵駰驕驊駱駭駢驫驪騁驗騂駸駿騏騎騍騅騌驌驂騙騭騤騷騖驁騮騫騸驃騾驄驏驟驥驦驤髏髖髕鬢魘魎魚魛魢魷魨魯魴魺鮁鮃鯰鱸鮋鮓鮒鮊鮑鱟鮍鮐鮭鮚鮳鮪鮞鮦鰂鮜鱠鱭鮫鮮鮺鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鮶鯽鯒鯖鯪鯕鯫鯡鯤鯧鯝鯢鯰鯛鯨鯵鯴鯔鱝鰈鰏鱨鯷鰮鰃鰓鱷鰍鰒鰉鰁鱂鯿鰠鼇鰭鰨鰥鰩鰟鰜鰳鰾鱈鱉鰻鰵鱅鰼鱖鱔鱗鱒鱯鱤鱧鱣鳥鳩雞鳶鳴鳲鷗鴉鶬鴇鴆鴣鶇鸕鴨鴞鴦鴒鴟鴝鴛鴬鴕鷥鷙鴯鴰鵂鴴鵃鴿鸞鴻鵐鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鶤鵯鵬鵮鶉鶊鵷鷫鶘鶡鶚鶻鶿鶥鶩鷊鷂鶲鶹鶺鷁鶼鶴鷖鸚鷓鷚鷯鷦鷲鷸鷺鸇鷹鸌鸏鸛鸘鹺麥麩黃黌黶黷黲黽黿鼂鼉鞀鼴齇齊齏齒齔齕齗齟齡齙齠齜齦齬齪齲齷龍龔龕龜誌製諮隻裡係範鬆冇嚐嘗鬨麵準鐘彆閒乾儘臟拚';
}

function Traditionalized(cc) {
    var str = '';
    var ss = JTPYStr();
    var tt = FTPYStr();

    for (var i = 0; i < cc.length; i++) {
        if (cc.charCodeAt(i) > 10000 && ss.indexOf(cc.charAt(i)) != -1)
            str += tt.charAt(ss.indexOf(cc.charAt(i)));
        else
            str += cc.charAt(i);
    }
    return str;
}

function Simplized(cc) {
    var str = '';
    var ss = JTPYStr();
    var tt = FTPYStr();

    for (var i = 0; i < cc.length; i++) {
        if (cc.charCodeAt(i) > 10000 && tt.indexOf(cc.charAt(i)) != -1)
            str += ss.charAt(tt.indexOf(cc.charAt(i)));
        else
            str += cc.charAt(i);
    }
    return str;
}


// 音訊錯誤處理函數
function audioErr() {
    // 沒播放過，直接跳過
    if (rem.playlist === undefined) return true;

    if (rem.errCount > 10) { // 連續播放失敗的歌曲過多
        layer.msg('似乎出了點問題~播放已停止');
        rem.errCount = 0;
    } else {
        rem.errCount++;     // 記錄連續播放失敗的歌曲數目
        layer.msg('當前歌曲播放失敗，自動播放下一首');
        nextMusic();    // 切換下一首歌
    }
}

// 點擊暫停按鈕的事件
function pause() {
    if (rem.paused === false) {  // 之前是播放狀態
        rem.audio[0].pause();  // 暫停
    } else {
        // 第一次點播放
        if (rem.playlist === undefined) {
            rem.playlist = rem.dislist;

            musicList[1].item = musicList[rem.playlist].item; // 更新正在播放清單中音樂

            // 正在播放 列表項已發生變更，進行保存
            playerSavedata('playing', musicList[1].item);   // 保存正在播放清單

            listClick(0);
        }
        rem.audio[0].play();
    }
}

// 迴圈順序
function orderChange() {
    var orderDiv = $(".btn-order");
    orderDiv.removeClass();
    switch (rem.order) {
        case 1:     // 單曲迴圈 -> 列表迴圈
            orderDiv.addClass("player-btn btn-order btn-order-list");
            orderDiv.attr("title", "列表迴圈");
            layer.msg("列表迴圈");
            rem.order = 2;
            break;

        case 3:     // 隨機播放 -> 單曲迴圈
            orderDiv.addClass("player-btn btn-order btn-order-single");
            orderDiv.attr("title", "單曲迴圈");
            layer.msg("單曲迴圈");
            rem.order = 1;
            break;

        // case 2:
        default:    // 列表迴圈(其它) -> 隨機播放
            orderDiv.addClass("player-btn btn-order btn-order-random");
            orderDiv.attr("title", "隨機播放");
            layer.msg("隨機播放");
            rem.order = 3;
    }
}

// 播放
function audioPlay() {

    rem.paused = false;     // 更新狀態（未暫停）
    refreshList();      // 刷新狀態，顯示播放的波浪
    $(".btn-play").addClass("btn-state-paused");        // 恢復暫停

    if ((mkPlayer.dotshine === true && !rem.isMobile) || (mkPlayer.mdotshine === true && rem.isMobile)) {
        $("#music-progress .mkpgb-dot").addClass("dot-move");   // 小點閃爍效果
    }

    var music = musicList[rem.playlist].item[rem.playid];   // 獲取當前播放的歌曲資訊
    var msg = " 正在播放: " + music.name + " - " + music.artist;  // 改變流覽器標題

    // 清除計時器
    if (rem.titflash !== undefined) {
        clearInterval(rem.titflash);
    }
    // 標題滾動
    titleFlash(msg);
}
// 標題滾動
function titleFlash(msg) {

    // 截取字元
    var tit = function () {
        msg = msg.substring(1, msg.length) + msg.substring(0, 1);
        document.title = msg;
    };
    // 設置定時間 300ms滾動
    rem.titflash = setInterval(function () { tit() }, 300);
}
// 暫停
function audioPause() {
    rem.paused = true;      // 更新狀態（已暫停）

    $(".list-playing").removeClass("list-playing");        // 移除其它的正在播放

    $(".btn-play").removeClass("btn-state-paused");     // 取消暫停

    $("#music-progress .dot-move").removeClass("dot-move");   // 小點閃爍效果

    // 清除計時器
    if (rem.titflash !== undefined) {
        clearInterval(rem.titflash);
    }
    document.title = rem.webTitle;    // 改變流覽器標題
}

// 播放上一首歌
function prevMusic() {
    playList(rem.playid - 1);
}

// 播放下一首歌
function nextMusic() {
    switch (rem.order ? rem.order : 1) {
        case 1, 2:
            playList(rem.playid + 1);
            break;
        case 3:
            if (musicList[1] && musicList[1].item.length) {
                var id = parseInt(Math.random() * musicList[1].item.length);
                playList(id);
            }
            break;
        default:
            playList(rem.playid + 1);
            break;
    }
}
// 自動播放時的下一首歌
function autoNextMusic() {
    if (rem.order && rem.order === 1) {
        playList(rem.playid);
    } else {
        nextMusic();
    }
}

// 歌曲時間變動回呼函數
function updateProgress() {
    // var music = musicList[rem.playlist].item[rem.playid]

    // if (music != undefined){
    //     // console.log(music.url,rem.audio[0].duration,music.url_id);
    //     if ( music.url.includes('/163/') & rem.audio[0].duration<50 ){
    //         if(music.url_id !=0){
    //             music.url = 'https://link.hhtjim.com/kw/'+music.url_id+'.mp3';
    //             layer.msg('試聽連結, 切換到 KUWO 播放 ...');

    //             try {
    //                 rem.audio[0].pause();
    //                 rem.audio.attr('src', music.url);
    //                 rem.audio[0].play(); 
    //                 return;
    //             } catch(e) {
    //                 // window.location.href = music.url;
    //                 audioErr(); // 調用錯誤處理函數
    //                 return;
    //             }
    //         } 
    //     }

    //     if ( music.url.includes('/kw/') & rem.audio[0].duration<50 ){
    //         layer.msg('連結失效, 播放下一首');
    //         nextMusic();
    //         return;
    //     }
    // }

    // 暫停狀態不管
    if (rem.paused !== false) return true;
    // 同步進度條
    music_bar.goto(rem.audio[0].currentTime / rem.audio[0].duration);
    // 同步歌詞顯示   
    scrollLyric(rem.audio[0].currentTime);
}

// 顯示的清單中的某一項點擊後的處理函數
// 參數：歌曲在列表中的編號
function listClick(no) {
    // 記錄要播放的歌曲的id
    var tmpid = no;

    // 調試資訊輸出
    if (mkPlayer.debug) {
        console.log("點播了列表中的第 " + (no + 1) + " 首歌 " + musicList[rem.dislist].item[no].name);
    }

    // 搜索列表的歌曲要額外處理
    if (rem.dislist === 0) {

        // 沒播放過
        if (rem.playlist === undefined) {
            rem.playlist = 1;   // 設置播放清單為 正在播放 列表
            rem.playid = musicList[1].item.length - 1;  // 臨時設置正在播放的曲目為 正在播放 列表的最後一首
        }

        // 獲取選定歌曲的資訊
        var tmpMusic = musicList[0].item[no];


        // 查找當前的播放清單中是否已經存在這首歌
        for (var i = 0; i < musicList[1].item.length; i++) {
            if (musicList[1].item[i].id == tmpMusic.id && musicList[1].item[i].source == tmpMusic.source) {
                tmpid = i;
                playList(tmpid);    // 找到了直接播放
                return true;    // 退出函數
            }
        }


        // 將點擊的這項追加到正在播放的條目的下方
        musicList[1].item.splice(rem.playid + 1, 0, tmpMusic);
        tmpid = rem.playid + 1;

        // 正在播放 列表項已發生變更，進行保存
        playerSavedata('playing', musicList[1].item);   // 保存正在播放清單

    } else {    // 普通列表
        // 與之前不是同一個列表了（在播放別的列表的歌曲）或者是首次播放

        // if((rem.dislist !== rem.playlist && rem.dislist !== 1) || rem.playlist === undefined) {

        rem.playlist = rem.dislist;     // 記錄正在播放的清單
        musicList[1].item = musicList[rem.playlist].item; // 更新正在播放清單中音樂

        // 正在播放 列表項已發生變更，進行保存
        playerSavedata('playing', musicList[1].item);   // 保存正在播放清單

        // 刷新正在播放的列表的動畫
        refreshSheet();     // 更改正在播放的清單的顯示
        // }
    }

    playList(tmpid);

    return true;
}

// 播放正在播放清單中的歌曲
// 參數：歌曲在列表中的ID
function playList(id) {
    // 第一次播放
    if (rem.playlist === undefined) {
        pause();
        return true;
    }

    // 沒有歌曲，跳出
    if (musicList[1].item.length <= 0) return true;

    // ID 範圍限定
    if (id >= musicList[1].item.length) id = 0;
    if (id < 0) id = musicList[1].item.length - 1;

    // 記錄正在播放的歌曲在正在播放清單中的 id
    rem.playid = id;

    // 如果連結為空，則 ajax 獲取資料後再播放
    if (musicList[1].item[id].url === null || musicList[1].item[id].url === "") {
        console.log(id, musicList[1].item[id].url)
        console.log(musicList);
        // ajaxUrl(musicList[1].item[id], play);
    } else {
        play(musicList[1].item[id]);
    }
}

// 初始化 Audio
function initAudio() {
    rem.audio = $('<audio id="myAudio"></audio>').appendTo('body');

    // 應用初始音量
    rem.audio[0].volume = volume_bar.percent;
    // 綁定歌曲進度變化事件
    rem.audio[0].addEventListener('timeupdate', updateProgress);   // 更新進度
    rem.audio[0].addEventListener('play', audioPlay); // 開始播放了
    rem.audio[0].addEventListener('pause', audioPause);   // 暫停
    $(rem.audio[0]).on('ended', autoNextMusic);   // 播放結束
    rem.audio[0].addEventListener('error', audioErr);   // 播放機錯誤處理
}

function KuwoError() {
    layer.msg('受限於CORS Policy，嘗試 <a style="background-color:green;color:white" href="https://cors-anywhere.herokuapp.com/corsdemo">啟用</a> 暫時釋放功能');
}

function KuwoUrl(id, callback) {
    var x = new XMLHttpRequest();
    x.open('GET', 'https://cors-anywhere.herokuapp.com/https://www.kuwo.cn/api/v1/www/music/playUrl?type=convert_url&mid=' + id);
    x.onload = () => {
        var j = JSON.parse(x.responseText);
        if (j.success) {
            mp3Url = j.data.url;
            console.log(mp3Url);
            if (callback) callback(mp3Url);
        }
    }
    x.send();
}

function KuwoUrl2(id, callback) {

    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.kuwo.cn/api/v1/www/music/playUrl?type=convert_url&mid=' + id)}`)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then(data => {
            // console.log(data.contents);
            var j = JSON.parse(data.contents);
            if (j.success) {
                mp3Url = j.data.url;
                console.log(mp3Url);
                if (callback) callback(mp3Url);
            }
        });
}

function KuwoUrl3(id, callback) {
    mp3Url = 'https://link.hhtjim.com/kw/' + id + '.mp3';
    if (callback) callback(mp3Url);
}

function KuwoUrl4(id, callback) {

    fetch(`https://apis.jxcxin.cn/api/kuwo?apiKey=bae6f64104fa4900a5cae8e76ba90ceb&type=json&id=` + id)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then(data => {
            var j = data;
            if (j.code == 200) {
                mp3Url = j.data.url;
                // console.log(mp3Url);
                if (callback) callback(mp3Url);
            }
        });
}

function NeteaseUrl(id, callback) {

    // var fetchOptions = { redirect: 'manual' };
    // // fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://apis.jxcxin.cn/api/163music?id='+id)}`, fetchOptions)
    // fetch(`https://apis.jxcxin.cn/api/163music?id=`+id, fetchOptions)
    // .then(response => {
    //     console.log( response.headers);
    //     var mp3Url = response.headers.get('Location');
    //     if (callback) callback(mp3Url);
    //     if (response.ok) return mp3Url
    //     throw new Error('Network response was not ok.')
    // });

    fetch(`https://lzw.me/x/iapi/163music/api.php?type=mp3&id=${id}`)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then(jsonData => {
            // var jsonData = data;
            // var jsonData = JSON.parse(data.contents);
            if (jsonData.data) {
                callback(jsonData.data[0].url);    // 回呼函數
            } else {
                callback('');
            }
        });

}


// 播放音樂
// 參數：要播放的音樂陣列
function play(music) {
    // 調試資訊輸出
    if (mkPlayer.debug) {
        console.log('開始播放 - ' + music.name);

        console.info('id: "' + music.id + '",\n' +
            'name: "' + music.name + '",\n' +
            'artist: "' + music.artist + '",\n' +
            'album: "' + music.album + '",\n' +
            'source: "' + music.source + '",\n' +
            'url_id: "' + music.url_id + '",\n' +
            'pic_id: "' + music.pic_id + '",\n' +
            'lyric_id: "' + music.lyric_id + '",\n' +
            'pic: "' + music.pic + '",\n' +
            'url: "' + music.url + '"');
    }
    // 遇到錯誤播放下一首歌
    if (music.url == "err") {
        audioErr(); // 調用錯誤處理函數
        return false;
    }

    addHis(music);  // 添加到播放歷史

    // 如果當前主介面顯示的是播放歷史，那麼還需要刷新清單顯示
    if (rem.dislist == 2 && rem.playlist !== 2) {
        loadList(2);
    } else {
        refreshList();  // 更新清單顯示
    }

    if (music.url.includes('/kw/')) {
        // KuwoUrl4(music.url_id,function(mp3Url){
        //     try {
        //         rem.audio[0].pause();
        //         rem.audio.attr('src', mp3Url);
        //         rem.audio[0].play();
        //     } catch(e) {
        //         audioErr(); // 調用錯誤處理函數
        //         return;
        //     }
        // })
        var mp3Url = `https://apis.jxcxin.cn/api/kuwo?apiKey=bae6f64104fa4900a5cae8e76ba90ceb&type=mp3&id=` + music.url_id;
        // console.log(mp3Url);
        try {
            rem.audio[0].pause();
            rem.audio.attr('src', mp3Url);
            rem.audio[0].play();
        } catch (e) {
            audioErr(); // 調用錯誤處理函數
            return;
        }

    } else if (music.url.includes('/163/')) {
        NeteaseUrl(music.id, function (mp3Url) {
            try {
                rem.audio[0].pause();
                rem.audio.attr('src', mp3Url);
                rem.audio[0].play();
            } catch (e) {
                audioErr(); // 調用錯誤處理函數
                return;
            }
        })

        // var mp3Url = `https://apis.jxcxin.cn/api/163music?id=`+music.id;
        // // console.log(mp3Url);
        // try {
        //     rem.audio[0].pause();
        //     rem.audio.attr('src', mp3Url);
        //     rem.audio[0].play();
        // } catch(e) {
        //     audioErr(); // 調用錯誤處理函數
        //     return;
        // }
    } else {
        try {
            rem.audio[0].pause();
            rem.audio.attr('src', music.url);
            rem.audio[0].play();
        } catch (e) {
            // window.location.href = music.url;
            audioErr(); // 調用錯誤處理函數
            return;
        }
    }


    // rem.errCount = 0;   // 連續播放失敗的歌曲數歸零
    music_bar.goto(0);  // 進度條強制歸零
    changeCover(music);    // 更新封面展示
    if (music.lyric_id != '0') {
        ajaxLyric(music, lyricCallback);     // ajax載入歌詞
    }
    music_bar.lock(false);  // 取消進度條鎖定
}


// 音樂進度條拖動回呼函數
function mBcallback(newVal) {
    var newTime = rem.audio[0].duration * newVal;
    // 應用新的進度
    rem.audio[0].currentTime = newTime;
    refreshLyric(newTime);  // 強制滾動歌詞到當前進度
}

// 音量條變動回呼函數
// 參數：新的值
function vBcallback(newVal) {
    if (rem.audio[0] !== undefined) {   // 音訊物件已載入則立即改變音量
        rem.audio[0].volume = newVal;
    }

    if ($(".btn-quiet").is('.btn-state-quiet')) {
        $(".btn-quiet").removeClass("btn-state-quiet");     // 取消靜音
    }

    if (newVal === 0) $(".btn-quiet").addClass("btn-state-quiet");

    playerSavedata('volume', newVal); // 存儲音量資訊
}

// 下面是進度條處理
var initProgress = function () {
    // 初始化播放進度條
    music_bar = new mkpgb("#music-progress", 0, mBcallback);
    music_bar.lock(true);   // 未播放時鎖定不讓拖動
    // 初始化音量設定
    var tmp_vol = playerReaddata('volume');
    tmp_vol = (tmp_vol != null) ? tmp_vol : (rem.isMobile ? 1 : mkPlayer.volume);
    if (tmp_vol < 0) tmp_vol = 0;    // 範圍限定
    if (tmp_vol > 1) tmp_vol = 1;
    if (tmp_vol == 0) $(".btn-quiet").addClass("btn-state-quiet"); // 添加靜音樣式
    volume_bar = new mkpgb("#volume-progress", tmp_vol, vBcallback);
};

// mk進度條外掛程式
// 進度條框 id，初始量，回呼函數
mkpgb = function (bar, percent, callback) {
    this.bar = bar;
    this.percent = percent;
    this.callback = callback;
    this.locked = false;
    this.init();
};

mkpgb.prototype = {
    // 進度條初始化
    init: function () {
        var mk = this, mdown = false;
        // 載入進度條html元素
        $(mk.bar).html('<div class="mkpgb-bar"></div><div class="mkpgb-cur"></div><div class="mkpgb-dot"></div>');
        // 獲取偏移量
        mk.minLength = $(mk.bar).offset().left;
        mk.maxLength = $(mk.bar).width() + mk.minLength;
        // 視窗大小改變偏移量重置
        $(window).resize(function () {
            mk.minLength = $(mk.bar).offset().left;
            mk.maxLength = $(mk.bar).width() + mk.minLength;
        });
        // 監聽小點的滑鼠按下事件
        $(mk.bar + " .mkpgb-dot").mousedown(function (e) {
            e.preventDefault();    // 取消原有事件的默認動作
        });
        // 監聽進度條整體的滑鼠按下事件
        $(mk.bar).mousedown(function (e) {
            if (!mk.locked) mdown = true;
            barMove(e);
        });
        // 監聽滑鼠移動事件，用於拖動
        $("html").mousemove(function (e) {
            barMove(e);
        });
        // 監聽滑鼠彈起事件，用於釋放拖動
        $("html").mouseup(function (e) {
            mdown = false;
        });

        function barMove(e) {
            if (!mdown) return;
            var percent = 0;
            if (e.clientX < mk.minLength) {
                percent = 0;
            } else if (e.clientX > mk.maxLength) {
                percent = 1;
            } else {
                percent = (e.clientX - mk.minLength) / (mk.maxLength - mk.minLength);
            }
            mk.callback(percent);
            mk.goto(percent);
            return true;
        }

        mk.goto(mk.percent);

        return true;
    },
    // 跳轉至某處
    goto: function (percent) {
        if (percent > 1) percent = 1;
        if (percent < 0) percent = 0;
        this.percent = percent;
        $(this.bar + " .mkpgb-dot").css("left", (percent * 100) + "%");
        $(this.bar + " .mkpgb-cur").css("width", (percent * 100) + "%");
        return true;
    },
    // 鎖定進度條
    lock: function (islock) {
        if (islock) {
            this.locked = true;
            $(this.bar).addClass("mkpgb-locked");
        } else {
            this.locked = false;
            $(this.bar).removeClass("mkpgb-locked");
        }
        return true;
    }
};

// 快速鍵切歌，代碼來自 @茗血(https://www.52benxi.cn/)
document.onkeydown = function showkey(e) {
    var key = e.keyCode || e.which || e.charCode;
    var ctrl = e.ctrlKey || e.metaKey;
    var isFocus = $('input').is(":focus");
    if (ctrl && key == 37) playList(rem.playid - 1);    // Ctrl+左方向鍵 切換上一首歌
    if (ctrl && key == 39) playList(rem.playid + 1);    // Ctrl+右方向鍵 切換下一首歌
    if (key == 32 && isFocus == false) pause();         // 空白鍵 播放/暫停歌曲
}

