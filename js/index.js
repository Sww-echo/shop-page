window.addEventListener('load', function() {
    var zuo = document.querySelector('.arrow-zuo');
    var you = document.querySelector('.arrow-you');
    var focus = document.querySelector('.focus');
    var ff = document.querySelector('.focus-floor');
    var f_ul = ff.querySelector('ul');
    var ul = focus.querySelector('ul');
    //鼠标放上，左右按钮显示
    focus.addEventListener('mouseover', function() {
        zuo.style.display = 'block';
        you.style.display = 'block';
        clearInterval(timer); //定时器清除
        timer = null;
    })
    //鼠标离开，左右按钮消失
    focus.addEventListener('mouseout', function() {
        zuo.style.display = 'none';
        you.style.display = 'none';
        timer = setInterval(function() {//定时器，开始
            you.click();
        }, 2000)
    })
    zuo.addEventListener('mouseover', function() {
        this.style.cursor = 'pointer';
    })
    you.addEventListener('mouseover', function() {
        this.style.cursor = 'pointer';
    })
    var focusWidth = focus.offsetWidth;
    var index = ul.children.length;
    var num = 0;
    var circle = 0;
    for (var i =0;i < index; i++) {
        //动态创建li
        var li = document.createElement('li');
        f_ul.appendChild(li);
        //鼠标在li上时是小手的形状
        li.addEventListener('mouseover', function() {
            this.style.cursor = 'pointer';
        })
        li.setAttribute('index', i);
        
        //排他思想，点击改变li颜色
        li.addEventListener('click', function() {
            for (var i =0; i < f_ul.children.length;i++) {
                f_ul.children[i].className = '';
            }
            this.className = 'current';
        //移动图片 ul
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul ,-index*focusWidth);
        })
    }
    f_ul.children[0].className = 'current';
    //克隆第一张
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮，走一张
    var flag = true; //节流阀
    you.addEventListener('click', function() {
        if(flag) {
            flag = false;
            if (num == ul.children.length -1) {
                ul.style.left = 0;
                num = 0;
            }
            circle++;
            num++;
            animate(ul,-num*focusWidth,function(){
                flag = true;
            });
            if (circle == f_ul.children.length){
                circle = 0;
            }
            for (var i = 0;i < f_ul.children.length;i++) {
                f_ul.children[i].className = '';
            }
            f_ul.children[circle].className = 'current';
        }
        
    })

    //点击左侧按钮，走一张

    zuo.addEventListener('click', function() {
        if (num == 0) {
            ul.style.left = -(ul.children.length - 1)*focusWidth + 'px';
            num = ul.children.length - 1;
        }
        circle--;
        num--;
        animate(ul,-num*focusWidth);
        if (circle < 0){
            circle = f_ul.children.length - 1;
        }
        for (var i = 0;i < f_ul.children.length;i++) {
            f_ul.children[i].className = '';
        }
        f_ul.children[circle].className = 'current';
    })
    //自动轮播
    var timer = setInterval(function() {
        you.click();
    }, 2000)

})