# Sth about RegExp
说今天的正题：正则表达式之前，我们先来聊一聊 HTML5 video api 和 flash
## Which one is better？
都说 HTML5 如何如何牛逼，可各大视频网站，优土，爱奇艺，斗鱼/熊猫等直播网站依然使用 flash 作为视频的播放源。经过了解，我想这里面有一下几点原因：

- IE 旧版的占有率

通过[百度流量研究院][6]的调查，当下（20160629）IE8 的占有率仍然高居不下，有 17% 之多。这也在很大程度上决定了视频网站不能抛弃 flash。（移动端土豆用上了 HTML5 也能从侧面解释这一点）

- flv 的高压缩率

我们都追求超清，追求 1080P，但低画质下，flash 亲儿子 flv 的压缩率远远甩开了 HTML5 普遍支持的 MP4，这一点是 flash 的天生优势。

- 广告问题

vedio api 要想屏蔽广告，那可比 flash 要容易得多，现在国内各大网站针对 Adblock 的攻防战可谓激烈，要是使用 vedio api，那被 Adblock 等软件拦截的可能性大大增加，钱~~怎么赚~~...

- HTML5 vedio api 还需要进步

vedio api 目前还不够完善，比如 HTML5 本身的占有率，支持的视频格式，能做的事，都需要一步一步推进，让我们静观其变吧！

## 谈回正则
今天和前辈聊了半个下午的正则，又巩固了一些正则的知识~

### 密码不允许有三个以上的相同字符
这题的重点应该是抓住**3**这个关键点，你猜我一开始怎么做？我竟然...

```javascript
function PWfilter(password){
  var PWarray = password.split("");
  for (var i = PWarray.length - 1; i >= 0; i--) {
    if(PWarray[i]&&PWarray[i-1]&&PWarray[i-2]){
      if (PWarray[i] == PWarray[i-1]&& PWarray[i-1] == PWarray[i-2]) {
        console.log("Error!");
        return;
      }
    }  
  }
  console.log("right!"); 
}
PWfilter("12346555");
```
你没看错！说好的正则，我却下意识想到数组去了~
接下来我回忆正则的用法，想找出字符串中每个字符，repeat 3次，再用 for 和原字符串进行匹配：
```javascript
function PWfilter(password){
  var PWarray = password.split("");
  for (var i = PWarray.length - 1; i >= 0; i--) {
    var str = new RegExp(PWarray[i].repeat(3));  
    if (str.test(password)) {
      console.log("Error!");
      return;
    }
  }
  console.log("right!"); 
}
PWfilter("12346555");
```
然而前辈告诉我，一句话就可以搞定~这时我才接触到**分组匹配**和**后向引用**这两个东西
简单来说，分组匹配就是 `{n}` 前面（相邻，而不是前面所有）的匹配重复 N 次
```javascript
/a-z{3}/ //a-z匹配3次
```
后向引用又是什么东西呢？网上的教程简直就是在咬文嚼字，把我都弄晕了..不如一个实例来得直观：
```javascript
<(\w+)>.*</\1> //可以用来匹配 HTML 闭合标签
//()里是一个分组，如果有多个()，则有多个分组
// \n代表前面的第n个分组，也就是后向引用（引用前面匹配到的内容）
```
那用后向匹配和分组匹配如何做这个需求？
```javascript
/(.)+\1{2}/.test("333");
// 首先 (.+) 的意思是第一个分组匹配任何内容，至少一次
// 接着，\1{2} 表示分组1（也就是前面唯一的分组）重复匹配2次
// 所以，总共匹配3次
```
### 密码须同时包含字母，数字
一开始我想的是：
```javascript
/\d+[a-zA-Z]+/
```
然而，如果字母在前，数字在后，这个匹配就废了。
思考良久，最终找到个妥协的办法：
```javascript
/\d+[a-zA-Z]+|[a-zA-Z+]\d+/
```
用 | 来匹配字母在前和数字在前的两种情况。
但是这样总有些投机取巧的感觉，我想你也肯定有这种感觉。然后我就卡住了...脑子转不过来
直到前辈点醒了我：**我们只要确保密码不是｛全都是非数字｝和｛全都是非字母｝就可以了。**
那么，`/[^\d+]/`和 `/[^a-zA-Z+]/`就出现了
接下来我们只需要将它们俩拼接在一起：
```javascript
/(^[^\d]+|[^a-zA-Z]+$)/ //这里需要注意括号
```
就大功告成了~

### 走进雪碧图
CSS雪碧图的原理就是把我们页面中需要的图片拼凑成一张图片，只发送这一张图片的http请求，达到优化的目的（减少服务器的压力/减少DNS请求所耗费的时间）。

雪碧图的使用场景是：需要用到各种数量多但较小的静态图片比如 banner 的图片，需要频繁更新的，尺寸大的图片反而不适合。

雪碧图的使用重点在于设置 background 的 src 和 bakcground-position 属性。通过 x轴和 y轴来控制显示的图片。

  [6]:http://tongji.baidu.com/data/browser
