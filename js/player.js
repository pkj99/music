
// 播放器功能配置
var mkPlayer = {
    api: "https://duonaovod.com/music/api.php", // api地址
    // api: "https://music.163.com/api", // api地址
    loadcount: 20,  // 搜索结果一次加载多少条
    method: "POST",     // 数据传输方式(POST/GET)
    defaultlist: 3,    // 默认要显示的播放列表编号
    autoplay: false,    // 是否自动播放(true/false) *此选项在移动端可能无效
    coverbg: true,      // 是否开启封面背景(true/false) *开启后会有些卡
    mcoverbg: true,     // 是否开启[移动端]封面背景(true/false)
    dotshine: true,    // 是否开启播放进度条的小点闪动效果[不支持IE](true/false) *开启后会有些卡
    mdotshine: false,   // 是否开启[移动端]播放进度条的小点闪动效果[不支持IE](true/false)
    volume: 0.6,        // 默认音量值(0~1之间)
    version: "v2.41",    // 播放器当前版本号(仅供调试)
    debug: false   // 是否开启调试模式(true/false)
};

/*******************************************************
 * 以下内容是播放器核心文件，不建议进行修改，否则可能导致播放器无法正常使用!
 * 
 * 哈哈，吓唬你的！想改就改呗！不过建议修改之前先【备份】,要不然改坏了弄不好了。
 ******************************************************/

// 存储全局变量
var rem = [];
var myMusic = [];
var db_url = 'https://pkj99.github.io/music/db/music.db';



function JTPYStr() 
{
    return '万与丑专业丛东丝丢两严丧个丬丰临为丽举么义乌乐乔习乡书买乱争于亏云亘亚产亩亲亵亸亿仅从仑仓仪们价众优伙会伛伞伟传伤伥伦伧伪伫体余佣佥侠侣侥侦侧侨侩侪侬俣俦俨俩俪俭债倾偬偻偾偿傥傧储傩儿兑兖党兰关兴兹养兽冁内冈册写军农冢冯冲决况冻净凄凉凌减凑凛几凤凫凭凯击凼凿刍划刘则刚创删别刬刭刽刿剀剂剐剑剥剧劝办务劢动励劲劳势勋勐勚匀匦匮区医华协单卖卢卤卧卫却卺厂厅历厉压厌厍厕厢厣厦厨厩厮县参叆叇双发变叙叠叶号叹叽吁后吓吕吗吣吨听启吴呒呓呕呖呗员呙呛呜咏咔咙咛咝咤咴咸哌响哑哒哓哔哕哗哙哜哝哟唛唝唠唡唢唣唤唿啧啬啭啮啰啴啸喷喽喾嗫呵嗳嘘嘤嘱噜噼嚣嚯团园囱围囵国图圆圣圹场坂坏块坚坛坜坝坞坟坠垄垅垆垒垦垧垩垫垭垯垱垲垴埘埙埚埝埯堑堕塆墙壮声壳壶壸处备复够头夸夹夺奁奂奋奖奥妆妇妈妩妪妫姗姜娄娅娆娇娈娱娲娴婳婴婵婶媪嫒嫔嫱嬷孙学孪宁宝实宠审宪宫宽宾寝对寻导寿将尔尘尧尴尸尽层屃屉届属屡屦屿岁岂岖岗岘岙岚岛岭岳岽岿峃峄峡峣峤峥峦崂崃崄崭嵘嵚嵛嵝嵴巅巩巯币帅师帏帐帘帜带帧帮帱帻帼幂幞干并广庄庆庐庑库应庙庞废庼廪开异弃张弥弪弯弹强归当录彟彦彻径徕御忆忏忧忾怀态怂怃怄怅怆怜总怼怿恋恳恶恸恹恺恻恼恽悦悫悬悭悯惊惧惨惩惫惬惭惮惯愍愠愤愦愿慑慭憷懑懒懔戆戋戏戗战戬户扎扑扦执扩扪扫扬扰抚抛抟抠抡抢护报担拟拢拣拥拦拧拨择挂挚挛挜挝挞挟挠挡挢挣挤挥挦捞损捡换捣据捻掳掴掷掸掺掼揸揽揿搀搁搂搅携摄摅摆摇摈摊撄撑撵撷撸撺擞攒敌敛数斋斓斗斩断无旧时旷旸昙昼昽显晋晒晓晔晕晖暂暧札术朴机杀杂权条来杨杩杰极构枞枢枣枥枧枨枪枫枭柜柠柽栀栅标栈栉栊栋栌栎栏树栖样栾桊桠桡桢档桤桥桦桧桨桩梦梼梾检棂椁椟椠椤椭楼榄榇榈榉槚槛槟槠横樯樱橥橱橹橼檐檩欢欤欧歼殁殇残殒殓殚殡殴毁毂毕毙毡毵氇气氢氩氲汇汉污汤汹沓沟没沣沤沥沦沧沨沩沪沵泞泪泶泷泸泺泻泼泽泾洁洒洼浃浅浆浇浈浉浊测浍济浏浐浑浒浓浔浕涂涌涛涝涞涟涠涡涢涣涤润涧涨涩淀渊渌渍渎渐渑渔渖渗温游湾湿溃溅溆溇滗滚滞滟滠满滢滤滥滦滨滩滪漤潆潇潋潍潜潴澜濑濒灏灭灯灵灾灿炀炉炖炜炝点炼炽烁烂烃烛烟烦烧烨烩烫烬热焕焖焘煅煳熘爱爷牍牦牵牺犊犟状犷犸犹狈狍狝狞独狭狮狯狰狱狲猃猎猕猡猪猫猬献獭玑玙玚玛玮环现玱玺珉珏珐珑珰珲琎琏琐琼瑶瑷璇璎瓒瓮瓯电画畅畲畴疖疗疟疠疡疬疮疯疱疴痈痉痒痖痨痪痫痴瘅瘆瘗瘘瘪瘫瘾瘿癞癣癫癯皑皱皲盏盐监盖盗盘眍眦眬着睁睐睑瞒瞩矫矶矾矿砀码砖砗砚砜砺砻砾础硁硅硕硖硗硙硚确硷碍碛碜碱碹磙礼祎祢祯祷祸禀禄禅离秃秆种积称秽秾稆税稣稳穑穷窃窍窑窜窝窥窦窭竖竞笃笋笔笕笺笼笾筑筚筛筜筝筹签简箓箦箧箨箩箪箫篑篓篮篱簖籁籴类籼粜粝粤粪粮糁糇紧絷纟纠纡红纣纤纥约级纨纩纪纫纬纭纮纯纰纱纲纳纴纵纶纷纸纹纺纻纼纽纾线绀绁绂练组绅细织终绉绊绋绌绍绎经绐绑绒结绔绕绖绗绘给绚绛络绝绞统绠绡绢绣绤绥绦继绨绩绪绫绬续绮绯绰绱绲绳维绵绶绷绸绹绺绻综绽绾绿缀缁缂缃缄缅缆缇缈缉缊缋缌缍缎缏缐缑缒缓缔缕编缗缘缙缚缛缜缝缞缟缠缡缢缣缤缥缦缧缨缩缪缫缬缭缮缯缰缱缲缳缴缵罂网罗罚罢罴羁羟羡翘翙翚耢耧耸耻聂聋职聍联聩聪肃肠肤肷肾肿胀胁胆胜胧胨胪胫胶脉脍脏脐脑脓脔脚脱脶脸腊腌腘腭腻腼腽腾膑臜舆舣舰舱舻艰艳艹艺节芈芗芜芦苁苇苈苋苌苍苎苏苘苹茎茏茑茔茕茧荆荐荙荚荛荜荞荟荠荡荣荤荥荦荧荨荩荪荫荬荭荮药莅莜莱莲莳莴莶获莸莹莺莼萚萝萤营萦萧萨葱蒇蒉蒋蒌蓝蓟蓠蓣蓥蓦蔷蔹蔺蔼蕲蕴薮藁藓虏虑虚虫虬虮虽虾虿蚀蚁蚂蚕蚝蚬蛊蛎蛏蛮蛰蛱蛲蛳蛴蜕蜗蜡蝇蝈蝉蝎蝼蝾螀螨蟏衅衔补衬衮袄袅袆袜袭袯装裆裈裢裣裤裥褛褴襁襕见观觃规觅视觇览觉觊觋觌觍觎觏觐觑觞触觯詟誉誊讠计订讣认讥讦讧讨让讪讫训议讯记讱讲讳讴讵讶讷许讹论讻讼讽设访诀证诂诃评诅识诇诈诉诊诋诌词诎诏诐译诒诓诔试诖诗诘诙诚诛诜话诞诟诠诡询诣诤该详诧诨诩诪诫诬语诮误诰诱诲诳说诵诶请诸诹诺读诼诽课诿谀谁谂调谄谅谆谇谈谊谋谌谍谎谏谐谑谒谓谔谕谖谗谘谙谚谛谜谝谞谟谠谡谢谣谤谥谦谧谨谩谪谫谬谭谮谯谰谱谲谳谴谵谶谷豮贝贞负贠贡财责贤败账货质贩贪贫贬购贮贯贰贱贲贳贴贵贶贷贸费贺贻贼贽贾贿赀赁赂赃资赅赆赇赈赉赊赋赌赍赎赏赐赑赒赓赔赕赖赗赘赙赚赛赜赝赞赟赠赡赢赣赪赵赶趋趱趸跃跄跖跞践跶跷跸跹跻踊踌踪踬踯蹑蹒蹰蹿躏躜躯车轧轨轩轪轫转轭轮软轰轱轲轳轴轵轶轷轸轹轺轻轼载轾轿辀辁辂较辄辅辆辇辈辉辊辋辌辍辎辏辐辑辒输辔辕辖辗辘辙辚辞辩辫边辽达迁过迈运还这进远违连迟迩迳迹适选逊递逦逻遗遥邓邝邬邮邹邺邻郁郄郏郐郑郓郦郧郸酝酦酱酽酾酿释里鉅鉴銮錾钆钇针钉钊钋钌钍钎钏钐钑钒钓钔钕钖钗钘钙钚钛钝钞钟钠钡钢钣钤钥钦钧钨钩钪钫钬钭钮钯钰钱钲钳钴钵钶钷钸钹钺钻钼钽钾钿铀铁铂铃铄铅铆铈铉铊铋铍铎铏铐铑铒铕铗铘铙铚铛铜铝铞铟铠铡铢铣铤铥铦铧铨铪铫铬铭铮铯铰铱铲铳铴铵银铷铸铹铺铻铼铽链铿销锁锂锃锄锅锆锇锈锉锊锋锌锍锎锏锐锑锒锓锔锕锖锗错锚锜锞锟锠锡锢锣锤锥锦锨锩锫锬锭键锯锰锱锲锳锴锵锶锷锸锹锺锻锼锽锾锿镀镁镂镃镆镇镈镉镊镌镍镎镏镐镑镒镕镖镗镙镚镛镜镝镞镟镠镡镢镣镤镥镦镧镨镩镪镫镬镭镮镯镰镱镲镳镴镶长门闩闪闫闬闭问闯闰闱闲闳间闵闶闷闸闹闺闻闼闽闾闿阀阁阂阃阄阅阆阇阈阉阊阋阌阍阎阏阐阑阒阓阔阕阖阗阘阙阚阛队阳阴阵阶际陆陇陈陉陕陧陨险随隐隶隽难雏雠雳雾霁霉霭靓静靥鞑鞒鞯鞴韦韧韨韩韪韫韬韵页顶顷顸项顺须顼顽顾顿颀颁颂颃预颅领颇颈颉颊颋颌颍颎颏颐频颒颓颔颕颖颗题颙颚颛颜额颞颟颠颡颢颣颤颥颦颧风飏飐飑飒飓飔飕飖飗飘飙飚飞飨餍饤饥饦饧饨饩饪饫饬饭饮饯饰饱饲饳饴饵饶饷饸饹饺饻饼饽饾饿馀馁馂馃馄馅馆馇馈馉馊馋馌馍馎馏馐馑馒馓馔馕马驭驮驯驰驱驲驳驴驵驶驷驸驹驺驻驼驽驾驿骀骁骂骃骄骅骆骇骈骉骊骋验骍骎骏骐骑骒骓骔骕骖骗骘骙骚骛骜骝骞骟骠骡骢骣骤骥骦骧髅髋髌鬓魇魉鱼鱽鱾鱿鲀鲁鲂鲄鲅鲆鲇鲈鲉鲊鲋鲌鲍鲎鲏鲐鲑鲒鲓鲔鲕鲖鲗鲘鲙鲚鲛鲜鲝鲞鲟鲠鲡鲢鲣鲤鲥鲦鲧鲨鲩鲪鲫鲬鲭鲮鲯鲰鲱鲲鲳鲴鲵鲶鲷鲸鲹鲺鲻鲼鲽鲾鲿鳀鳁鳂鳃鳄鳅鳆鳇鳈鳉鳊鳋鳌鳍鳎鳏鳐鳑鳒鳓鳔鳕鳖鳗鳘鳙鳛鳜鳝鳞鳟鳠鳡鳢鳣鸟鸠鸡鸢鸣鸤鸥鸦鸧鸨鸩鸪鸫鸬鸭鸮鸯鸰鸱鸲鸳鸴鸵鸶鸷鸸鸹鸺鸻鸼鸽鸾鸿鹀鹁鹂鹃鹄鹅鹆鹇鹈鹉鹊鹋鹌鹍鹎鹏鹐鹑鹒鹓鹔鹕鹖鹗鹘鹚鹛鹜鹝鹞鹟鹠鹡鹢鹣鹤鹥鹦鹧鹨鹩鹪鹫鹬鹭鹯鹰鹱鹲鹳鹴鹾麦麸黄黉黡黩黪黾鼋鼌鼍鼗鼹齄齐齑齿龀龁龂龃龄龅龆龇龈龉龊龋龌龙龚龛龟志制咨只里系范松没尝尝闹面准钟别闲干尽脏拼';
} 

function FTPYStr()
{
	return '萬與醜專業叢東絲丟兩嚴喪個爿豐臨為麗舉麼義烏樂喬習鄉書買亂爭於虧雲亙亞產畝親褻嚲億僅從侖倉儀們價眾優夥會傴傘偉傳傷倀倫傖偽佇體餘傭僉俠侶僥偵側僑儈儕儂俁儔儼倆儷儉債傾傯僂僨償儻儐儲儺兒兌兗黨蘭關興茲養獸囅內岡冊寫軍農塚馮衝決況凍淨淒涼淩減湊凜幾鳳鳧憑凱擊氹鑿芻劃劉則剛創刪別剗剄劊劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勳猛勩勻匭匱區醫華協單賣盧鹵臥衛卻巹廠廳曆厲壓厭厙廁廂厴廈廚廄廝縣參靉靆雙發變敘疊葉號歎嘰籲後嚇呂嗎唚噸聽啟吳嘸囈嘔嚦唄員咼嗆嗚詠哢嚨嚀噝吒噅鹹呱響啞噠嘵嗶噦嘩噲嚌噥喲嘜嗊嘮啢嗩唕喚呼嘖嗇囀齧囉嘽嘯噴嘍嚳囁嗬噯噓嚶囑嚕劈囂謔團園囪圍圇國圖圓聖壙場阪壞塊堅壇壢壩塢墳墜壟壟壚壘墾坰堊墊埡墶壋塏堖塒塤堝墊垵塹墮壪牆壯聲殼壺壼處備複夠頭誇夾奪奩奐奮獎奧妝婦媽嫵嫗媯姍薑婁婭嬈嬌孌娛媧嫻嫿嬰嬋嬸媼嬡嬪嬙嬤孫學孿寧寶實寵審憲宮寬賓寢對尋導壽將爾塵堯尷屍盡層屭屜屆屬屢屨嶼歲豈嶇崗峴嶴嵐島嶺嶽崠巋嶨嶧峽嶢嶠崢巒嶗崍嶮嶄嶸嶔崳嶁脊巔鞏巰幣帥師幃帳簾幟帶幀幫幬幘幗冪襆幹並廣莊慶廬廡庫應廟龐廢廎廩開異棄張彌弳彎彈強歸當錄彠彥徹徑徠禦憶懺憂愾懷態慫憮慪悵愴憐總懟懌戀懇惡慟懨愷惻惱惲悅愨懸慳憫驚懼慘懲憊愜慚憚慣湣慍憤憒願懾憖怵懣懶懍戇戔戲戧戰戩戶紮撲扡執擴捫掃揚擾撫拋摶摳掄搶護報擔擬攏揀擁攔擰撥擇掛摯攣掗撾撻挾撓擋撟掙擠揮撏撈損撿換搗據撚擄摑擲撣摻摜摣攬撳攙擱摟攪攜攝攄擺搖擯攤攖撐攆擷擼攛擻攢敵斂數齋斕鬥斬斷無舊時曠暘曇晝曨顯晉曬曉曄暈暉暫曖劄術樸機殺雜權條來楊榪傑極構樅樞棗櫪梘棖槍楓梟櫃檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲樣欒棬椏橈楨檔榿橋樺檜槳樁夢檮棶檢欞槨櫝槧欏橢樓欖櫬櫚櫸檟檻檳櫧橫檣櫻櫫櫥櫓櫞簷檁歡歟歐殲歿殤殘殞殮殫殯毆毀轂畢斃氈毿氌氣氫氬氳彙漢汙湯洶遝溝沒灃漚瀝淪滄渢溈滬濔濘淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞溮濁測澮濟瀏滻渾滸濃潯濜塗湧濤澇淶漣潿渦溳渙滌潤澗漲澀澱淵淥漬瀆漸澠漁瀋滲溫遊灣濕潰濺漵漊潷滾滯灩灄滿瀅濾濫灤濱灘澦濫瀠瀟瀲濰潛瀦瀾瀨瀕灝滅燈靈災燦煬爐燉煒熗點煉熾爍爛烴燭煙煩燒燁燴燙燼熱煥燜燾煆糊溜愛爺牘犛牽犧犢強狀獷獁猶狽麅獮獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣璵瑒瑪瑋環現瑲璽瑉玨琺瓏璫琿璡璉瑣瓊瑤璦璿瓔瓚甕甌電畫暢佘疇癤療瘧癘瘍鬁瘡瘋皰屙癰痙癢瘂癆瘓癇癡癉瘮瘞瘺癟癱癮癭癩癬癲臒皚皺皸盞鹽監蓋盜盤瞘眥矓著睜睞瞼瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎硜矽碩硤磽磑礄確鹼礙磧磣堿镟滾禮禕禰禎禱禍稟祿禪離禿稈種積稱穢穠穭稅穌穩穡窮竊竅窯竄窩窺竇窶豎競篤筍筆筧箋籠籩築篳篩簹箏籌簽簡籙簀篋籜籮簞簫簣簍籃籬籪籟糴類秈糶糲粵糞糧糝餱緊縶糸糾紆紅紂纖紇約級紈纊紀紉緯紜紘純紕紗綱納紝縱綸紛紙紋紡紵紖紐紓線紺絏紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絰絎繪給絢絳絡絕絞統綆綃絹繡綌綏絛繼綈績緒綾緓續綺緋綽緔緄繩維綿綬繃綢綯綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝縕繢緦綞緞緶線緱縋緩締縷編緡緣縉縛縟縝縫縗縞纏縭縊縑繽縹縵縲纓縮繆繅纈繚繕繒韁繾繰繯繳纘罌網羅罰罷羆羈羥羨翹翽翬耮耬聳恥聶聾職聹聯聵聰肅腸膚膁腎腫脹脅膽勝朧腖臚脛膠脈膾髒臍腦膿臠腳脫腡臉臘醃膕齶膩靦膃騰臏臢輿艤艦艙艫艱豔艸藝節羋薌蕪蘆蓯葦藶莧萇蒼苧蘇檾蘋莖蘢蔦塋煢繭荊薦薘莢蕘蓽蕎薈薺蕩榮葷滎犖熒蕁藎蓀蔭蕒葒葤藥蒞蓧萊蓮蒔萵薟獲蕕瑩鶯蓴蘀蘿螢營縈蕭薩蔥蕆蕢蔣蔞藍薊蘺蕷鎣驀薔蘞藺藹蘄蘊藪槁蘚虜慮虛蟲虯蟣雖蝦蠆蝕蟻螞蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬蠍螻蠑螿蟎蠨釁銜補襯袞襖嫋褘襪襲襏裝襠褌褳襝褲襇褸襤繈襴見觀覎規覓視覘覽覺覬覡覿覥覦覯覲覷觴觸觶讋譽謄訁計訂訃認譏訐訌討讓訕訖訓議訊記訒講諱謳詎訝訥許訛論訩訟諷設訪訣證詁訶評詛識詗詐訴診詆謅詞詘詔詖譯詒誆誄試詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡譸誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談誼謀諶諜謊諫諧謔謁謂諤諭諼讒諮諳諺諦謎諞諝謨讜謖謝謠謗諡謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖穀豶貝貞負貟貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜贔賙賡賠賧賴賵贅賻賺賽賾贗讚贇贈贍贏贛赬趙趕趨趲躉躍蹌蹠躒踐躂蹺蹕躚躋踴躊蹤躓躑躡蹣躕躥躪躦軀車軋軌軒軑軔轉軛輪軟轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輈輇輅較輒輔輛輦輩輝輥輞輬輟輜輳輻輯轀輸轡轅轄輾轆轍轔辭辯辮邊遼達遷過邁運還這進遠違連遲邇逕跡適選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰鬱郤郟鄶鄭鄆酈鄖鄲醞醱醬釅釃釀釋裏钜鑒鑾鏨釓釔針釘釗釙釕釷釺釧釤鈒釩釣鍆釹鍚釵鈃鈣鈈鈦鈍鈔鍾鈉鋇鋼鈑鈐鑰欽鈞鎢鉤鈧鈁鈥鈄鈕鈀鈺錢鉦鉗鈷缽鈳鉕鈽鈸鉞鑽鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鈰鉉鉈鉍鈹鐸鉶銬銠鉺銪鋏鋣鐃銍鐺銅鋁銱銦鎧鍘銖銑鋌銩銛鏵銓鉿銚鉻銘錚銫鉸銥鏟銃鐋銨銀銣鑄鐒鋪鋙錸鋱鏈鏗銷鎖鋰鋥鋤鍋鋯鋨鏽銼鋝鋒鋅鋶鐦鐧銳銻鋃鋟鋦錒錆鍺錯錨錡錁錕錩錫錮鑼錘錐錦鍁錈錇錟錠鍵鋸錳錙鍥鍈鍇鏘鍶鍔鍤鍬鍾鍛鎪鍠鍰鎄鍍鎂鏤鎡鏌鎮鎛鎘鑷鐫鎳鎿鎦鎬鎊鎰鎔鏢鏜鏍鏰鏞鏡鏑鏃鏇鏐鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐶鐲鐮鐿鑔鑣鑞鑲長門閂閃閆閈閉問闖閏闈閑閎間閔閌悶閘鬧閨聞闥閩閭闓閥閣閡閫鬮閱閬闍閾閹閶鬩閿閽閻閼闡闌闃闠闊闋闔闐闒闕闞闤隊陽陰陣階際陸隴陳陘陝隉隕險隨隱隸雋難雛讎靂霧霽黴靄靚靜靨韃鞽韉韝韋韌韍韓韙韞韜韻頁頂頃頇項順須頊頑顧頓頎頒頌頏預顱領頗頸頡頰頲頜潁熲頦頤頻頮頹頷頴穎顆題顒顎顓顏額顳顢顛顙顥纇顫顬顰顴風颺颭颮颯颶颸颼颻飀飄飆飆飛饗饜飣饑飥餳飩餼飪飫飭飯飲餞飾飽飼飿飴餌饒餉餄餎餃餏餅餑餖餓餘餒餕餜餛餡館餷饋餶餿饞饁饃餺餾饈饉饅饊饌饢馬馭馱馴馳驅馹駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵駰驕驊駱駭駢驫驪騁驗騂駸駿騏騎騍騅騌驌驂騙騭騤騷騖驁騮騫騸驃騾驄驏驟驥驦驤髏髖髕鬢魘魎魚魛魢魷魨魯魴魺鮁鮃鯰鱸鮋鮓鮒鮊鮑鱟鮍鮐鮭鮚鮳鮪鮞鮦鰂鮜鱠鱭鮫鮮鮺鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鮶鯽鯒鯖鯪鯕鯫鯡鯤鯧鯝鯢鯰鯛鯨鯵鯴鯔鱝鰈鰏鱨鯷鰮鰃鰓鱷鰍鰒鰉鰁鱂鯿鰠鼇鰭鰨鰥鰩鰟鰜鰳鰾鱈鱉鰻鰵鱅鰼鱖鱔鱗鱒鱯鱤鱧鱣鳥鳩雞鳶鳴鳲鷗鴉鶬鴇鴆鴣鶇鸕鴨鴞鴦鴒鴟鴝鴛鴬鴕鷥鷙鴯鴰鵂鴴鵃鴿鸞鴻鵐鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鶤鵯鵬鵮鶉鶊鵷鷫鶘鶡鶚鶻鶿鶥鶩鷊鷂鶲鶹鶺鷁鶼鶴鷖鸚鷓鷚鷯鷦鷲鷸鷺鸇鷹鸌鸏鸛鸘鹺麥麩黃黌黶黷黲黽黿鼂鼉鞀鼴齇齊齏齒齔齕齗齟齡齙齠齜齦齬齪齲齷龍龔龕龜誌製谘隻裡係範鬆冇嚐嘗鬨麵準鐘彆閒乾儘臟拚';
} 

function Traditionalized( cc )
{
	var str = '';
	var ss = JTPYStr();
	var tt = FTPYStr();

	for(var i = 0 ; i < cc.length ; i++ )
	{
		if( cc.charCodeAt(i) > 10000 && ss.indexOf( cc.charAt(i) ) != -1 )
			str += tt.charAt( ss.indexOf( cc.charAt(i) ) );
  		else 
  			str += cc.charAt(i);
	}
	return str;
}

function Simplized(cc){
	var str = '';
	var ss = JTPYStr();
	var tt = FTPYStr();

	for( var i=0 ; i < cc.length ; i++)
	{
		if( cc.charCodeAt(i) > 10000 && tt.indexOf( cc.charAt(i) ) != -1 )
			str += ss.charAt( tt.indexOf( cc.charAt(i) ) );
  		else 
  			str += cc.charAt(i);
	}
	return str;
}



// 音频错误处理函数
function audioErr() {
    // 没播放过，直接跳过
    if(rem.playlist === undefined) return true;
   

	// var music = musicList[rem.playlist].item[rem.playid];
	// if(music.url_id !=0){
	// 	music.url = 'https://link.hhtjim.com/kw/'+music.url_id+'.mp3';
	// 	layer.msg('試聽連結, 切換到 KUWO 播放 ...');
	// 	try {
	// 		rem.audio[0].pause();
	// 		rem.audio.attr('src', music.url);
	// 		rem.audio[0].play();
    //         rem.errCount++; 
	// 		return;
	// 	} catch(e) {
    //         layer.msg('当前歌曲播放失败，自动播放下一首');
    //         nextMusic();    // 切换下一首歌
	// 	}
	// } 
	

    if(rem.errCount > 10) { // 连续播放失败的歌曲过多
        layer.msg('似乎出了点问题~播放已停止');
        rem.errCount = 0;
    } else {
        rem.errCount++;     // 记录连续播放失败的歌曲数目
        layer.msg('当前歌曲播放失败，自动播放下一首');
        nextMusic();    // 切换下一首歌
    } 
}

// 点击暂停按钮的事件
function pause() {
    if(rem.paused === false) {  // 之前是播放状态
        rem.audio[0].pause();  // 暂停
    } else {
        // 第一次点播放
        if(rem.playlist === undefined) {
            rem.playlist = rem.dislist;
            
            musicList[1].item = musicList[rem.playlist].item; // 更新正在播放列表中音乐
            
            // 正在播放 列表项已发生变更，进行保存
            playerSavedata('playing', musicList[1].item);   // 保存正在播放列表
            
            listClick(0);
        }
        rem.audio[0].play();
    }
}

// 循环顺序
function orderChange() {
    var orderDiv = $(".btn-order");
    orderDiv.removeClass();
    switch(rem.order) {
        case 1:     // 单曲循环 -> 列表循环
            orderDiv.addClass("player-btn btn-order btn-order-list");
            orderDiv.attr("title", "列表循环");
            layer.msg("列表循环");
            rem.order = 2;
            break;
            
        case 3:     // 随机播放 -> 单曲循环
            orderDiv.addClass("player-btn btn-order btn-order-single");
            orderDiv.attr("title", "单曲循环");
            layer.msg("单曲循环");
            rem.order = 1;
            break;
            
        // case 2:
        default:    // 列表循环(其它) -> 随机播放
            orderDiv.addClass("player-btn btn-order btn-order-random");
            orderDiv.attr("title", "随机播放");
            layer.msg("随机播放");
            rem.order = 3;
    }
}

// 播放
function audioPlay() {

    rem.paused = false;     // 更新状态（未暂停）
    refreshList();      // 刷新状态，显示播放的波浪
    $(".btn-play").addClass("btn-state-paused");        // 恢复暂停
    
    if((mkPlayer.dotshine === true && !rem.isMobile) || (mkPlayer.mdotshine === true && rem.isMobile)) {
        $("#music-progress .mkpgb-dot").addClass("dot-move");   // 小点闪烁效果
    }
    
    var music = musicList[rem.playlist].item[rem.playid];   // 获取当前播放的歌曲信息
    var msg = " 正在播放: " + music.name + " - " + music.artist;  // 改变浏览器标题

    // 清除定时器
    if (rem.titflash !== undefined ) 
    {
        clearInterval(rem.titflash);
    }
    // 标题滚动
    titleFlash(msg);
}
// 标题滚动
function titleFlash(msg) {

    // 截取字符
    var tit = function() {
        msg = msg.substring(1,msg.length)+ msg.substring(0,1);
        document.title = msg;
    };
    // 设置定时间 300ms滚动
    rem.titflash = setInterval(function(){tit()}, 300);
}
// 暂停
function audioPause() {
    rem.paused = true;      // 更新状态（已暂停）
    
    $(".list-playing").removeClass("list-playing");        // 移除其它的正在播放
    
    $(".btn-play").removeClass("btn-state-paused");     // 取消暂停
    
    $("#music-progress .dot-move").removeClass("dot-move");   // 小点闪烁效果

     // 清除定时器
    if (rem.titflash !== undefined ) 
    {
        clearInterval(rem.titflash);
    }
    document.title = rem.webTitle;    // 改变浏览器标题
}

// 播放上一首歌
function prevMusic() {
    playList(rem.playid - 1);
}

// 播放下一首歌
function nextMusic() {
    switch (rem.order ? rem.order : 1) {
        case 1,2: 
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
// 自动播放时的下一首歌
function autoNextMusic() {
    if(rem.order && rem.order === 1) {
        playList(rem.playid);
    } else {
        nextMusic();
    }
}

// 歌曲时间变动回调函数
function updateProgress(){
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
    //                 audioErr(); // 调用错误处理函数
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


    // 暂停状态不管
    if(rem.paused !== false) return true;
    // 同步进度条
	music_bar.goto(rem.audio[0].currentTime / rem.audio[0].duration);
    // 同步歌词显示	
	scrollLyric(rem.audio[0].currentTime);
}

// 显示的列表中的某一项点击后的处理函数
// 参数：歌曲在列表中的编号
function listClick(no) {
    // 记录要播放的歌曲的id
    var tmpid = no;
    
    // 调试信息输出
    if(mkPlayer.debug) {
        console.log("点播了列表中的第 " + (no + 1) + " 首歌 " + musicList[rem.dislist].item[no].name);
    }
    
    // 搜索列表的歌曲要额外处理
    if(rem.dislist === 0) {
        
        // 没播放过
        if(rem.playlist === undefined) {
            rem.playlist = 1;   // 设置播放列表为 正在播放 列表
            rem.playid = musicList[1].item.length - 1;  // 临时设置正在播放的曲目为 正在播放 列表的最后一首
        }
        
        // 获取选定歌曲的信息
        var tmpMusic = musicList[0].item[no];
        
        
        // 查找当前的播放列表中是否已经存在这首歌
        for(var i=0; i<musicList[1].item.length; i++) {
            if(musicList[1].item[i].id == tmpMusic.id && musicList[1].item[i].source == tmpMusic.source) {
                tmpid = i;
                playList(tmpid);    // 找到了直接播放
                return true;    // 退出函数
            }
        }
        
        
        // 将点击的这项追加到正在播放的条目的下方
        musicList[1].item.splice(rem.playid + 1, 0, tmpMusic);
        tmpid = rem.playid + 1;
        
        // 正在播放 列表项已发生变更，进行保存
        playerSavedata('playing', musicList[1].item);   // 保存正在播放列表

    } else {    // 普通列表
        // 与之前不是同一个列表了（在播放别的列表的歌曲）或者是首次播放

        // if((rem.dislist !== rem.playlist && rem.dislist !== 1) || rem.playlist === undefined) {
            
            rem.playlist = rem.dislist;     // 记录正在播放的列表
            musicList[1].item = musicList[rem.playlist].item; // 更新正在播放列表中音乐
            
            // 正在播放 列表项已发生变更，进行保存
            playerSavedata('playing', musicList[1].item);   // 保存正在播放列表
            
            // 刷新正在播放的列表的动画
            refreshSheet();     // 更改正在播放的列表的显示
        // }
    }
    
    playList(tmpid);
    
    return true;
}

// 播放正在播放列表中的歌曲
// 参数：歌曲在列表中的ID
function playList(id) {
    // 第一次播放
    if(rem.playlist === undefined) {
        pause();
        return true;
    }
    
    // 没有歌曲，跳出
    if(musicList[1].item.length <= 0) return true;
    
    // ID 范围限定
    if(id >= musicList[1].item.length) id = 0;
    if(id < 0) id = musicList[1].item.length - 1;
    
    // 记录正在播放的歌曲在正在播放列表中的 id
    rem.playid = id;
    
    // 如果链接为空，则 ajax 获取数据后再播放
    if(musicList[1].item[id].url === null || musicList[1].item[id].url === "") {
        console.log(id,musicList[1].item[id].url)
        console.log(musicList);
        // ajaxUrl(musicList[1].item[id], play);
    } else {
        play(musicList[1].item[id]);
    }
}

// 初始化 Audio
function initAudio() {
    rem.audio = $('<audio id="myAudio"></audio>').appendTo('body');
    
    // 应用初始音量
    rem.audio[0].volume = volume_bar.percent;
    // 绑定歌曲进度变化事件
    rem.audio[0].addEventListener('timeupdate', updateProgress);   // 更新进度
    rem.audio[0].addEventListener('play', audioPlay); // 开始播放了
    rem.audio[0].addEventListener('pause', audioPause);   // 暂停
    $(rem.audio[0]).on('ended', autoNextMusic);   // 播放结束
    rem.audio[0].addEventListener('error', audioErr);   // 播放器错误处理
}

function KuwoError()
{
    layer.msg('受限於CORS Policy，嘗試 <a style="background-color:green;color:white" href="https://cors-anywhere.herokuapp.com/corsdemo">啟用</a> 暫時釋放功能');
}

function KuwoUrl(id,callback)
{
    var x = new XMLHttpRequest();
    x.open('GET', 'https://cors-anywhere.herokuapp.com/https://www.kuwo.cn/api/v1/www/music/playUrl?type=convert_url&mid='+id);
    // x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    // x.addEventListener('error', KuwoError());
    x.onload = () => {
        // console.log(x.status,x.readyState);
        // console.log(x.responseText);
        var j = JSON.parse(x.responseText);
        if (j.success){
            // console.log(j.data.url);
            mp3Url = j.data.url;
            if(callback) callback(mp3Url);
        }
    }
    // x.onreadystatechange = () => {
    //     if (x.status == 0)   {  KuwoError();  }
    // }
    x.send();
}


// 播放音乐
// 参数：要播放的音乐数组
function play(music) {
    // 调试信息输出
    if(mkPlayer.debug) {
        console.log('开始播放 - ' + music.name);
        
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
    // 遇到错误播放下一首歌
    if(music.url == "err") {
        audioErr(); // 调用错误处理函数
        return false;
    }
    
    addHis(music);  // 添加到播放历史
    
    // 如果当前主界面显示的是播放历史，那么还需要刷新列表显示
    if(rem.dislist == 2 && rem.playlist !== 2) {
        loadList(2);
    } else {
        refreshList();  // 更新列表显示
    }
    
    if (music.url.includes('/kw/')){
        KuwoUrl(music.url_id,function(mp3Url){
            // alert(mp3Url);
            try {
                rem.audio[0].pause();
                rem.audio.attr('src', mp3Url);
                rem.audio[0].play();
            } catch(e) {
                audioErr(); // 调用错误处理函数
                return;
            }
        })
    } else {
        try {
            rem.audio[0].pause();
            rem.audio.attr('src', music.url);
            rem.audio[0].play();
        } catch(e) {
            // window.location.href = music.url;
            audioErr(); // 调用错误处理函数
            return;
        }
    }


    
    // rem.errCount = 0;   // 连续播放失败的歌曲数归零
    music_bar.goto(0);  // 进度条强制归零
    changeCover(music);    // 更新封面展示
    ajaxLyric(music, lyricCallback);     // ajax加载歌词
    music_bar.lock(false);  // 取消进度条锁定
}


// 我的要求并不高，保留这一句版权信息可好？
// 保留了，你不会损失什么；而保留版权，是对作者最大的尊重。
// console.info('欢迎使用 MKOnlinePlayer!\n当前版本：'+mkPlayer.version+' \n作者：mengkun(https://mkblog.cn)\n歌曲来源于各大音乐平台\nGithub：https://github.com/mengkunsoft/MKOnlineMusicPlayer');

// 音乐进度条拖动回调函数
function mBcallback(newVal) {
    var newTime = rem.audio[0].duration * newVal;
    // 应用新的进度
    rem.audio[0].currentTime = newTime;
    refreshLyric(newTime);  // 强制滚动歌词到当前进度
}

// 音量条变动回调函数
// 参数：新的值
function vBcallback(newVal) {
    if(rem.audio[0] !== undefined) {   // 音频对象已加载则立即改变音量
        rem.audio[0].volume = newVal;
    }
    
    if($(".btn-quiet").is('.btn-state-quiet')) {
        $(".btn-quiet").removeClass("btn-state-quiet");     // 取消静音
    }
    
    if(newVal === 0) $(".btn-quiet").addClass("btn-state-quiet");
    
    playerSavedata('volume', newVal); // 存储音量信息
}

// 下面是进度条处理
var initProgress = function(){  
    // 初始化播放进度条
    music_bar = new mkpgb("#music-progress", 0, mBcallback);
    music_bar.lock(true);   // 未播放时锁定不让拖动
    // 初始化音量设定
    var tmp_vol = playerReaddata('volume');
    tmp_vol = (tmp_vol != null)? tmp_vol: (rem.isMobile? 1: mkPlayer.volume);
    if(tmp_vol < 0) tmp_vol = 0;    // 范围限定
    if(tmp_vol > 1) tmp_vol = 1;
    if(tmp_vol == 0) $(".btn-quiet").addClass("btn-state-quiet"); // 添加静音样式
    volume_bar = new mkpgb("#volume-progress", tmp_vol, vBcallback);
};  

// mk进度条插件
// 进度条框 id，初始量，回调函数
mkpgb = function(bar, percent, callback){  
    this.bar = bar;
    this.percent = percent;
    this.callback = callback;
    this.locked = false;
    this.init();  
};

mkpgb.prototype = {
    // 进度条初始化
    init : function(){  
        var mk = this,mdown = false;
        // 加载进度条html元素
        $(mk.bar).html('<div class="mkpgb-bar"></div><div class="mkpgb-cur"></div><div class="mkpgb-dot"></div>');
        // 获取偏移量
        mk.minLength = $(mk.bar).offset().left; 
        mk.maxLength = $(mk.bar).width() + mk.minLength;
        // 窗口大小改变偏移量重置
        $(window).resize(function(){
            mk.minLength = $(mk.bar).offset().left; 
            mk.maxLength = $(mk.bar).width() + mk.minLength;
        });
        // 监听小点的鼠标按下事件
        $(mk.bar + " .mkpgb-dot").mousedown(function(e){
            e.preventDefault();    // 取消原有事件的默认动作
        });
        // 监听进度条整体的鼠标按下事件
        $(mk.bar).mousedown(function(e){
            if(!mk.locked) mdown = true;
            barMove(e);
        });
        // 监听鼠标移动事件，用于拖动
        $("html").mousemove(function(e){
            barMove(e);
        });
        // 监听鼠标弹起事件，用于释放拖动
        $("html").mouseup(function(e){
            mdown = false;
        });
        
        function barMove(e) {
            if(!mdown) return;
            var percent = 0;
            if(e.clientX < mk.minLength){ 
                percent = 0; 
            }else if(e.clientX > mk.maxLength){ 
                percent = 1;
            }else{  
                percent = (e.clientX - mk.minLength) / (mk.maxLength - mk.minLength);
            }
            mk.callback(percent);
            mk.goto(percent);
            return true;
        }
        
        mk.goto(mk.percent);
        
        return true;
    },
    // 跳转至某处
    goto : function(percent) {
        if(percent > 1) percent = 1;
        if(percent < 0) percent = 0;
        this.percent = percent;
        $(this.bar + " .mkpgb-dot").css("left", (percent*100) +"%"); 
        $(this.bar + " .mkpgb-cur").css("width", (percent*100)+"%");
        return true;
    },
    // 锁定进度条
    lock : function(islock) {
        if(islock) {
            this.locked = true;
            $(this.bar).addClass("mkpgb-locked");
        } else {
            this.locked = false;
            $(this.bar).removeClass("mkpgb-locked");
        }
        return true;
    }
};  

// 快捷键切歌，代码来自 @茗血(https://www.52benxi.cn/)
document.onkeydown = function showkey(e) {
    var key = e.keyCode || e.which || e.charCode;
    var ctrl = e.ctrlKey || e.metaKey;
    var isFocus = $('input').is(":focus");  
    if (ctrl && key == 37) playList(rem.playid - 1);    // Ctrl+左方向键 切换上一首歌
    if (ctrl && key == 39) playList(rem.playid + 1);    // Ctrl+右方向键 切换下一首歌
    if (key == 32 && isFocus == false) pause();         // 空格键 播放/暂停歌曲
}