import datetime
import requests
from bs4 import BeautifulSoup


headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'}

def save_artist(group_id, initial):
    params = {'id': group_id, 'initial': initial}
    print("== 爬取数据参数 ==", params)
    r = requests.get('https://music.163.com/discover/artist/cat', headers=headers, params=params)
    r.encoding = 'utf-8'
    soup = BeautifulSoup(r.text, 'html.parser')
    artists = soup.find_all('a', attrs={'class': 'nm nm-icn f-thide s-fc0'})

    for artist in artists:
        artist_id = artist['href'].replace('/artist?id=', '').strip()
        artist_name = artist['title'].replace('的音乐', '')
        if artist_name in singers:
            print(artist_id, artist_name)
            artistList.append(int(artist_id))

def artistSpider():
    print("======= 开始爬 歌手 信息 =======")
    startTime = datetime.datetime.now()
    print(startTime.strftime('%Y-%m-%d %H:%M:%S'))
    # save_artist(None, None)
    for i in labelList:
        for j in range(65, 91):
            save_artist(i, j)
    print("======= 结束爬 歌手 信息 =======")
    endTime = datetime.datetime.now()
    print(endTime.strftime('%Y-%m-%d %H:%M:%S'))
    print("耗时：", (endTime - startTime).seconds, "秒")

    print(artistList,len(artistList))


def playistSpider(order, cat):
    params = {'order': order, 'initial': cat}
    print("== 爬取数据参数 ==", params)
    r = requests.get('https://music.163.com/discover/playlist', headers=headers, params=params)
    r.encoding = 'utf-8'
    soup = BeautifulSoup(r.text, 'html.parser')
    playlists = soup.find_all('a', attrs={'class': 'msk'})

    for playlist in playlists:
        playlist_id = playlist['href'].replace('/playlist?id=', '').strip()
        playlist_name = playlist['title']
        print(playlist_id, playlist_name)
        artistList.append({'id':int(playlist_id)})

    print(artistList,len(artistList))


# labelList = set([1001,1002,1003,2001,2002,2003,6001,6002,6003,7001,7002,7003,4001,4002,4003])
labelList = [1001,1002,1003]
singers=['玖壹壹', '八三夭', '灭火器乐团', '卜学亮', '毕书尽', '潘美辰', '潘越云', '彭佳慧', '马兆骏', '凤飞飞', '方文琳', '戴佩妮', '邓妙华', '童安格', '李恕权', '李丽芬', '李炳辉', '林强', '林佳仪', '林子娟', '蓝心湄', '高慧君', '柯以敏', '况明洁', '康康', '黄大炜', '黄品源', '金瑞瑶', '曲佑良', '齐豫', '徐怀钰', '许景淳', '许茹芸', '谢金燕', '秀兰玛雅', '周传雄', '周蕙', '卓文萱', '张洪量', '陈小云', '陈艾湄', '陈势安', '陈雷', '沈文程', '沈雁', '任贤齐', '蔡小虎', '苏芮', '欧阳菲菲', '殷正洋', '叶瑷菱', '伊能静', '严爵', '王梦麟', '王馨平', '王海玲', '王芷蕾', '伍思凯', '巫启贤', '万芳', '金智娟', '于台烟', '黄嘉千', '方季惟', '刘文正', '城市少女', '南方二重唱', '丘丘合唱团', '动力火车', '无印良品', '苏打绿', '张学友', '周杰伦', '陈奕迅', '萧敬腾', '周华健', '伍佰', '五月天', '王杰', '吴青峰', '莫文蔚', '梁文音', '苏慧伦', '江蕙', '戴爱玲', '陈芳语', '潘嘉丽', '曾沛慈', '林凡', '周慧敏', '梁咏琪', '温岚', '李翊君', '蔡琴', '许美静', '范晓萱', '薛凯琪', '辛晓琪', '彭羚', '张艾嘉', '赵咏华', '蔡幸娟', '方大同', '郑中基', '游鸿明', '郭富城', '罗志祥', '苏永康', '范逸臣', '杜德伟', '曹格', '洪荣宏', '赵传', '江美琪', '郭采洁', '林志炫', '张清芳', '范玮琪', '林隆璇', '黄舒骏', '黄乙玲', '林慧萍', '杨林', '施文彬', '吴宗宪', '杨宗纬', '林俊杰', '李宗盛', '齐秦', '罗大佑', '庾澄庆', '周兴哲', '瘦子', '任然', '萧煌奇', '黄明志', '胡彦斌', '吴克群', '韦礼安', '周汤豪', '张宇', '刘德华', '李圣杰', '张信哲', '陈雪燃', '陶喆', '张雨生', '邓丽君', '邓紫棋', '黄小琥', '张韶涵', '刘若英', '孟庭苇', '艾薇', '陈零九', '汪苏泷', '谢和弦', '朱俐静', '苏盈之', '李佳薇', '符琼音', '倪安东', '阿杜', '张栋梁', '光良', '品冠', '蔡依林', '梁静茹', '田馥甄', '张惠妹', '萧亚轩', '阎奕格', '徐佳莹', '丁当', '李千那', '茄子蛋', '告五人', '阿冗', '家家', '蔡健雅', '郁可唯', '孙燕姿', '王心凌', '徐若瑄', '郭静', '孙盛希']
artistList=[]

if __name__ == '__main__':
    # artistSpider()
    playistSpider('hot','流行')
