﻿$(function () {
    $.fn.fsrPMD = function (options) {
        var defaults = {
            Event: 'mouseover',       //事件
            Id: 'div',              //容器ID
            Bq: 'ul',               //标签
            Fx: "down",             //图片路径
            Time: 1000         //时间
        };
        var options = $.extend(defaults, options); //合并  将defaults 与 options合并
        //响应

        var me = $("#" + options.Id)[0]; //将jq对象转换成dom元素    $("#" + options.Id).get(0)
        var $me = $(me);
        if (options.Fx == "down") {
            $me.append("<" + options.Bq + "></" + options.Bq + ">");  //将标签添加进去
            var bq = me.children[0];				//找到第一个标签	
            var bq1 = me.children[1];				//找到第二个标签
            //将容器内滚动的内容复制一份
            bq1.innerHTML = bq.innerHTML;
            var pmdDown = setInterval(function () {
                //容器的滚动条自动滚动，因为设置了overflow:hidden,所以，它的内容会自动一点一点的从上到下的显示
                me.scrollTop++;
                if (me.scrollTop == bq.offsetHeight) {
                    me.scrollTop = 0;
                }
            }, options.Time)
            $(this).bind("mouseout", function () {
                pmdDown = setInterval(function () {

                    me.scrollTop++;
                    if (me.scrollTop == bq.offsetHeight) {
                        me.scrollTop = 0;
                    }
                }, options.Time)
            }).bind(options.Event, function () {
                clearTimeout(pmdDown);
            });
        }
        else if (options.Fx == "left") {
            //找到TR标签
            tr = $me.find(options.Bq).parent();
            //仍然是复制一份tr标签
            var bq = tr[0].innerHTML
            var bq1 = bq;
            tr.append(bq1);
            var pmdLeft = setInterval(function () {
                
                if (tr[0].offsetWidth/2 - me.scrollLeft <= 0)
                    me.scrollLeft -= tr[0].offsetWidth / 2
                else {
                    me.scrollLeft++;
                }
            }, options.Time)
        }
        $(this).bind("mouseout", function () {
            pmdLeft = setInterval(function () {
                if (tr[0].offsetWidth / 2 - me.scrollLeft <= 0)
                    me.scrollLeft -= tr[0].offsetWidth / 2
                else {
                    me.scrollLeft++;
                }
            }, options.Time)
        }).bind(options.Event, function () {
            clearTimeout(pmdLeft);
        });
    }
});