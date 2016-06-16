###学习 Web 阅读器开发
今天开始学习 Web 阅读器的开发，首先碰到的是一些 CSS 布局的问题。
###display: inline-block  你别跑
我想要让子元素水平分别占据父元素的50%，我可能会选择：
```
.father{
    width: 200px;
    height: 30px;
}
.son{
    display: inline-block;
    width: 50%;
}
```
然后你会发现虽然子元素宽度是父元素的一半，但却分隔了两行显示！一开始我尝试使用`box-sizing: border-box`，但显然失败了。因为原因在于`inline-block`水平呈现的元素间，换行显示或空格分隔的情况下会有间距。

####background-size 可以用来设置背景图片的尺寸
```
background-size: length|percentage|cover|contain;
        length: 50px 30px; //宽 高
        percentage: 50% 30% //父元素的百分比
        cover: //缩放背景图片以完全覆盖背景区，可能背景图片部分看不见
        contain: //缩放背景图片以完全装入背景区，可能背景区部分空白
```

####display:none 和 visibility: hidden 的差异

- 占据空间
`display: none` 的元素，失去宽高等所有属性，相当于脱离了布局，周围元素将并拢。
`visibility: hidden` 相当于给元素加了完全透明效果，高度宽度，占据的空间还在。
- 性能
`display:none` 会造成 reflow 和 repaint，而 `visibility: hidden` 因为位置没有移动，只引发了repaint.
- 诛连
`display: none` 之后，其子元素设置 `display` 属性将失效，而 `visibility: hidden` 的子元素设置 `visibility` 仍然有效。

####CSS样式失效？
设置 `display` 的过程中，发现了开发者工具里出现**样式被划横线**的问题，一开始不得其解，后来搜索了之后发现，这其实是样式属性被覆盖了。而 CSS 样式被覆盖是因为**被覆盖者的优先级不如覆盖者的优先级高**，这就涉及到了 CSS 样式优先级的问题了。