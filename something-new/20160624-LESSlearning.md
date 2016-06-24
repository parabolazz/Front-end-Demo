# LESS
通过跟在 segmentfault 认识的一位前辈的请教，“前端的自动化工程” 开始进入我的视野，他建议我使用这一套 Gulpjs+jade+less 的架构来进行这个项目的开发，尝试一下手握工具的感觉。我也开始学习这些看起来高大上的工具。
## 认识一下 LESS
我们通过编写 LESS ，再编译成 .CSS 文件来进行 CSS 的编写。就像 LESS 自己说的 *Write less, do more*，通过 LESS 的混合，嵌套，变量等等特性，我们能更方便地书写我们的 CSS 代码。
### 变量
```CSS
@box_width:50px;
.box{
    width:@box_width;
}
```
### 混合
- 我们可以将一个选择器混进另一个选择器里
```CSS
.border{
    border: 1px solid #000;
}
.box{
    margin:0 auto;
    .border;
}
```
- 我们也可以选择带参数的混合
```CSS
//类似函数参数的概念（带默认值）
.border(@width:5px){
    border: @width solid #000;
}

.box{
    //使用实参代替了默认值
    .border(10px);
}
```
嵌套模式
```HTML
<ul>
    <li><span></span></li>
</ul>

.ul{
    
    li{
    
    }
    //避免多级嵌套
    span{
        //自身hover
        &:hover{
        
        }
    }
}
```
### 注释
/**/ 会被编译为 .CSS 的注释
// 不会被编译 
