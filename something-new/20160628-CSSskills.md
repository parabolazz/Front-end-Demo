# CSS review
## 元素溢出
如何让元素里的文字溢出时显示`...`？这个小小的问题背后牵扯到几个 CSS 属性。
### white-space？
说到溢出的处理，我们可能会想到 white-space，我们来回顾一下 white-space 的值：
```javascript
white-space:
            normal //默认值，空白符合并，换行符 -> 空白符，遇到盒子边界换行
            nowrap //顾名思义“不包裹”，连续的换行符，空白符会合并，但遇到边界不换行
            pre // “格式化”，连续空白符会保留换行符与<br>会换行，遇到边界不换行
            pre-wrap // “格式化包裹”，连续空白符会保留,换行符与<br>会换行，但遇到边界换行
            pre-line // 连续空白符会合并, 换行符与<br>会换行，遇到边界换行
```
我们能发现，white-space 只是规定了元素遇到边界时换行与否。而真正规定元素溢出时如何操作的是它：

### overflow
规定子元素溢出时元素如何表现
```javascript
overflow:
        visible //默认值，溢出时不“修剪”，直接暴露内容
        hidden //溢出时直接修剪内容，不显示
        scroll //溢出时展示滚动条
        auto //必要时显示该方向的滚动条
        // hidden scroll auto 都属于溢出时“修剪”元素的属性值，而 visible 不是
```
讲完了 overflow，接下来到了真正控制文字溢出的属性登场了：

### text-overflow
为什么要先讲 overflow ，再来讲 text-overflow 呢，因为后者需要前者的**“修剪”属性值**，text-overflow 决定溢出时内容如何修剪，它的前提是 overflow 值设置为**可修剪的**
```javascript
//overflow设置为hidden
text-overflow:
             clip //直接修剪
             ellipsis //修剪后显示省略号
             string //修剪后显示给定的字符串来代替
```

## 我不知道的|| 和 &&
与一位前辈请教后，我更深入地理解了 || 和 &&，事情的起因是我遇到过很多次:
```javascript
var a = b || c
```
对于只知道`if(a||b)`的我来说，将布尔值赋给一个变量是奇怪的。
如果我们对其进行测试：
```javascript
var a = 3, b = 1, c = 0;
a||c //3  3 的值被转为 true，短路操作遇到 true 停止，返回 3
a&&c //0        
a||b //3  
a&&b //1
c||b //1  c 的值被转为 false，继续判断 b ，b 转为 true，返回 b 值，如果 b 转为 false，还是会返回 b ，因为操作符无论如何都会返回一个值
c&&b //0

知识点一： || 和 && 在进行判断的时候，是将值转为布尔值再进行判断的，null.NaN,boolean,undefined,0 , '' 会判断为 false，而 "0" 和其他（待定）会判断为 true

知识点二：
|| 的短路操作是针对 true 值的，遇到 true 则停止并取该值，否则继续运算，直到找到 true 或结束
&& 的短路操作是针对 false 值的，遇到 false 则停止并取该值，否则继续运算，直到找到 false 或结束
         
知识点三：|| 和 && 其实并不整体返回布尔值，而是在 if 中，if 将两者的返回值再进行布尔值转换，比如： a&&c === 0 -> if(a&&c) === false
```