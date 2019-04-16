import Vue from 'vue'

// v-dialogDrag:弹出框拖动功能
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode){
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    const dialogFooterEl = el.querySelector('.el-dialog__footer');
    const dragDom = el.querySelector('.el-dialog');
    
    //获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

    if(dialogHeaderEl){
      dialogHeaderEl.style.cursor = 'move';
       //弹出框头部触发拖动
      dialogHeaderEl.onmousedown = function(e) {
        //鼠标按下，计算当前元素距离可视区域的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft;
        const disY = e.clientY - dialogHeaderEl.offsetTop;

        //获取到的值带px，正则匹配替换
        let styL, styT;

        // 注意在IE中，第一次获取到的值为组件自带50%   移动之后赋值为px
        if( sty.left.includes("%") ){
          styL = +document.body.clientWidth * ( +sty.left.replace(/\%/g, '')/100 );
          styT = +document.body.clientHeight * ( +sty.top.replace(/\%/g, '')/100 );
        }else{
          styL = +sty.left.replace(/\px/g, '');
          styT = +sty.top.replace(/\px/g, '');
        };

        document.onmousemove = function(e) {
          //通过事件委托，计算移动距离
          const l = e.clientX - disX;
          const t = e.clientY - disY;

          //移动当前元素
          dragDom.style.left = `${l + styL}px`;
          dragDom.style.top = `${t + styT}px`;
        };

        document.onmouseup = function(e){
          document.onmousemove = null;
          document.onmouseup = null;
        }
      }
    }
    
      //弹出框底部触发拖动
    if(dialogFooterEl){
      dialogFooterEl.style.cursor = 'move';

      dialogFooterEl.onmousedown = function(e) {
        //鼠标按下，计算当前元素距离可视区域的距离
        const disX = e.clientX;
        const disY = e.clientY;

        //获取到的值带px，正则匹配替换
        let styL, styT;

        // 注意在IE中，第一次获取到的值为组件自带50%   移动之后赋值为px
        if( sty.left.includes("%") ){
          styL = +document.body.clientWidth * ( +sty.left.replace(/\%/g, '')/100 );
          styT = +document.body.clientHeight * ( +sty.top.replace(/\%/g, '')/100 );
        }else{
          styL = +sty.left.replace(/\px/g, '');
          styT = +sty.top.replace(/\px/g, '');
        };

        document.onmousemove = function(e) {
          //通过事件委托，计算移动距离
          const l = e.clientX - disX;
          const t = e.clientY - disY;

          //移动当前元素
          dragDom.style.left = `${l + styL}px`;
          dragDom.style.top = `${t + styT}px`;
        };

        document.onmouseup = function(e){
          document.onmousemove = null;
          document.onmouseup = null;
        }

      }
    }
  }
});

Vue.directive('drag', {
  bind(el, binding, vnode, oldVnode) {
    let fistTime = "", lastTime = "",Main;
    setTimeout(() => {
      Main = document.getElementById("Main");
      Main.onmousedown = function (e) {
        Main.setAttribute("data-flag", false);
        fistTime = new Date().getTime();
        const disX = e.clientX - el.offsetLeft;
        const disY = e.clientY - el.offsetTop;
        document.onmousemove = function (e) {
          e.pageX - disX <= -828 ? el.style.left = '-828px' : el.style.left = e.pageX - disX + 'px';
          e.pageY - disY <= 0 ? el.style.top = '0px' : el.style.top = e.pageY - disY + 'px';
        };
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
          lastTime = new Date().getTime();
          if ((lastTime - fistTime) < 200) {
            Main.setAttribute("data-flag", true);
          }
        }
      }
    }, 10)
  }
});