## JADE

HTML -> JADE
how?

###tags
2格缩进
```
body
  h2
    section 
      div
```

###属性
```
.title //<div class="title">
h2#title.title // <h2 id="title" class="title">
a(href="#" class="target")
```

###模版继承与包含
我们可以设定一个模版，再让基础页面 extend 模版，让基础页面拥有模版的内容，这个叫做模版的继承。
每个 .jade 都可以 include 别的 .jade 文件，一般用于父子 jade 之间的嵌套，include 之后，父模版就拥有子模版的所有内容。
