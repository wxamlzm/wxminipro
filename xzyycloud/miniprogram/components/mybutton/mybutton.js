// components/mybutton/mybutton.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 在这里声明自定义属性名，然后再调用的wxml中使用该属性来进行传参
        color : {
            type: String,
            value: '#36D'
        },
        value: {
            type: String,
            value: '默认按钮'
        },
        type: {
            type: String,
            value: 'rect'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        last: 0, //存储上次点击时的时间戳,事件毫秒数
    },

    /**
     * 组件的方法列表
     */
    methods: {
        tapEvent(){
            // 判断当前这次点击是否触发了双击的场景
            let now = new Date().getTime();
            // 
            let last = this.data.last;
            if(now-last < 350) {
                // 触发了双击
                // 调用triggerEvent方法
                // 通知父组件，doubletap可以开始执行了
                this.triggerEvent('doubletap');
                now = 0; //一旦触发，下次点击从零开始算

                // 子组件会通过event.detail进行传参
            } 
            this.data.last = now;
        }
    }
})
