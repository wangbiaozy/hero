
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth /750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})
(document, window);

var imgPath = './images/';
$('body').on('click','a.btn-back,a.btn-confirm',function(){
    $(this).parents('.page').hide();
});
$('body').on('click','a.btn-x',function(){
    dialog.hide();
});
// 测试用js 测试完后删除
$('.test-box li').click(function(event) {
    var _index = $(this).index();
    if(_index==5){
        $('.page-subscribe').show();
    }else{
       var flow = parseInt($(this).attr('flow'));
       app_data.flow = flow;
       alert('已为你设置流量为:'+flow+'MB'); 
    }
    
});
var is_mobile = function(mobile){
    var preg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
    if (preg.test(mobile)) return true;
    return false;
};

$('a.btn-rule,a.btn-show-rule').click(function(event) {
    $('.page-rule').show();
});
$('.page-guide').click(function(event) {
    $('.page-guide').hide();
});
/**
 * [getFlowProfile description]
 * @param  {[type]} flow [返回用户流量档位 1=>1GB,2=>2GB,3=>5GB,4=>10GB,5=>流量争霸赛资格]
 * @return {[type]}      [description]
 */
function getFlowProfile(flow){
    var flow = app_data.flow/1024;
    if(flow <= 1) return 1;
    if(flow >1 && flow <= 2) return 2;
    if(flow > 2 && flow <= 5) return 3;
    if(flow > 5 && flow <= 20) return 4;
    if(flow > 20) return 5;
}
// 不同档位对应显示的进度数据(5档位直接显示流量争霸赛)
var flowItem = {
    1 : {
        name : '青铜',
        step : [    //档位，进度条
            {
                name : '0MB',
                flow : 0
            },
            {
                name : '500MB',
                flow : 500
            },
            {
                name : '1GB',
                flow : 1024
            }
        ],
        ext : "<p>3月流量使用总量大于<span class='red'>1GB</span><br/>4月还可再得<span class='red'>1GB全国流量</span></p>", 
        desc : "<p>3月流量使用总量大于<span class='red'>1GB</span><br />4月还可再得<span class='red'>1GB全国流量</span></p>",//任务描述
        btnS : '520MB',//按钮名称组
        target : 1*1024, //目标流量
        rule : ['520MB','520MB','1GB','1GB','520MB','520MB','1GB'],
        march_flow : '1GB',
        april_flow:'1GB',
        most : '2GB' //完成任务最高可获得
    },
    2 : {
        name : '白银',
        step : [
            {
                name : '0MB',
                flow : 0
            },
            {
                name : '1GB',
                flow : 1024
            },
            {
                name : '2GB',
                flow : 1024 *2
            }
        ],
        ext : "<p>3月流量使用总量大于<span class='red'>2GB</span><br/>4月还可再得<span class='red'>2GB全国流量</span></p>",
        desc : "<p>3月流量使用总量大于<span class='red'>2GB</span><br />4月还可再得<span class='red'>2GB全国流量</span></p>",
        btnS : '1GB',
        target : 2 *1024,
        rule : ['1GB','1GB','2GB','2GB','1GB','1GB','2GB'],
        march_flow : '2GB',
        april_flow:'2GB',
        most : '4GB'
    },
    3 : {
        name : '黄金',
        step : [
            {
                name : '0MB',
                flow : 0
            },
            {
                name : '3GB',
                flow : 1024 * 3
            },
            {
                name : '5GB',
                flow : 1024 *5
            }
        ],
        ext : "<p>3月流量使用总量大于<span class='red'>5GB</span><br />4月还可再得<span class='red'>5GB全国流量</span></p>",
        desc : "<p>3月流量使用总量大于<span class='red'>5GB</span><br />4月还可再得<span class='red'>5GB全国流量</span></p>",
        btnS : '2GB',
        target : 5 *1024,
        rule : ['2GB','2GB','5GB','5GB','2GB','2GB','5GB'],
        march_flow : '5GB',
        april_flow:'5GB',
        most : '9GB'
    },
    4 : {
        name : '铂金',
        step : [
            {
                name : '0MB',
                flow : 0
            },
            {
                name : '10GB',
                flow : 1024 * 10
            },
            {
                name : '20GB',
                flow : 1024 *20
            }
        ],
        ext : "<p>3月流量使用总量大于<span class='red'>20GB</span><br/>4月还可再得<span class='red'>20GB全国流量</span></p>",
        desc : "<p>3月流量使用总量大于<span class='red'>20GB</span><br />4月还可再得<span class='red'>20GB全国流量</span></p>",
        btnS : '5GB',
        target : 20 *1024,
        rule : ['5GB','5GB','20GB','20GB','5GB','5GB','20GB'],
        march_flow : '20GB',
        april_flow:'20GB',
        most : '30GB'
    },
    5 : {
        name : '王者',
        step : [
            {
                name : '0MB',
                flow : 0
            },
            {
                name : '15GB',
                flow : 1024 * 15
            },
            {
                name : '30GB',
                flow : 1024 *30
            }
        ],
        ext : "<p style='font-size:.3rem;'>3月流量使用越多<br />越有机会获得<span class='red'>500元话费</span></p>",
        desc : '<p style="font-size: .3rem;">3月使用流量排名前200名可获得话费奖励</p><ul id="_listtwo"><li>1-100名</li><li>500元话费</li><li>101-200名</li><li>200元话费</li></ul>',
        btnS : '10GB',
        target : 30 *1024,
        rule : ['10GB','10GB','30GB','30GB','10GB','10GB','30GB'],
        most : '50GB'
    }
};
// 令牌动画
function aniShareBox(){
    this.obj = $('.share-box img');
    this._i  = 0;
    this.timer = null;
}
aniShareBox.prototype = {
    ani : function(){
        var _this = this;
        clearInterval(this.timer);
        this.timer = setInterval(function(){
            var _t = _this._i % 2;
            _this.obj.attr('src',imgPath+'ani-'+_t+'.png');
            _this._i++;
        },1000);
        return this;
    },
    stop : function(){
        clearInterval(this.timer);
        return this;
    }
}
var myAniShareBox = new aniShareBox();
myAniShareBox.ani();
// 点开始按钮
$('.page-index a.btn-start').click(function(event) {
     $('.page-transtion').show();
     var _index = getFlowProfile(app_data.flow);
     lpTranstion(_index-1,function(){
        var d = flowItem[_index];
        if (_index != 5) {
            $('.page-modal.modal1').show().find('span.task-name').text(d.name);
            // $('.page-modal.modal1').find('.most-flow').html("现在完成任务<br/>即可领取最高<span class='red'>"+d.most+"全国流量</span>");
            $('.page-modal.modal1').find('.most-flow').html(`3月使用<span class='red'>${d.march_flow}</span>流量<br>4月返奖<span class='red'>${d.april_flow}</span>流量`);
        } else {
            $('.page-modal.modal1').show().find('span.task-name').text('王者');
            $('.page-modal.modal1').find('.most-flow').html("<p>3月流量使用越多<br />越有机会获得<span class='red'>500元话费</span></p>");
            $('.rule-bd').html(' <div class="item"><p>1、活动时间：即日起~3月31日</p></div><div class="item"><p>2、任务说明：活动期间用户通过北京移动微信公众号，即可参加“流量英雄令”活动。抽取到王者任务，用户3月流量用的越多，越有机会获得话费奖励</p></div><div class="item"> <p>1、排名规则：<br>（1）系统将根据报名用户微厅关注绑定手机号码3月全月流量使用情况，从高至低进行排名，前100名用户可获得500元奖励；101至200名用户可获得200元奖励；<br>（2）当客户流量使用数据相同时，系统将根据用户参与活动报名顺序进行排名，报名早的用户排名优先；<br>（3）最终前200名客户中奖数据，将于4月30日前公布；</p></div><div class="item"><p>2、话费奖品规则：<br>（1）	赠送话费将充入获胜用户的北京移动微信公众号关联手机号，奖品下发后会通过模板消息提示，请参赛客户活动期间注意保持号码的关注绑定状态及正常接收微厅消息通知设置；<br>（2）赠送的话费不可用于退费、不可共享、不可用于支付性业务、不可开发票等；<br>（3）	处于保留期、保号期、挂失、申停、欠停、转品牌过渡期的手机号无法领取奖励。</p></div><div class="item"><p>温馨提示：<br>1、活动流量使用总量指移动数据流量，不含wifi、宽带等非移动数据流量，具体流量消耗总量，以最终出账账单为准；<br><a href="javascript:;" class="btn btn-show-rule" id="a_rule">点我查看更多活动规则</a></p></div>')
            $('#a_rule').on('click',function(){
                $('.page-rule').show();
            })
        }
    });
});
/**
 * [lpTranstion 动画]
 * @param  {[type]}   index [用户所属档位 1-5]
 * @param  {Function} cb    [动画完成后回调]
 * @return {[type]}         [description]
 */ 
function lpTranstion(index,cb){
    var oParent = $('.page-transtion');
    var _index = 0;
    var lps =  oParent.find('.transtion-box .lp');
    lps.eq(0).addClass('active');
    var t = setInterval(function(){
        _index++;
        if(_index <=9 && _index > 4 && _index == index+5){
            lps.removeClass('active').eq(index).addClass('head active');
            clearInterval(t);
            setTimeout(function(){
                oParent.find('.transtion-box').addClass('ani2');
                setTimeout(function(){
                    oParent.find('.transtion-box').addClass('ani3');
                    setTimeout(function(){
                        typeof cb == 'function' && cb()
                    },1300)
                },600)
            },300);
            
        }else{
            var _c = _index % 5;
            lps.removeClass('active').eq(_c).addClass('active');
        }
    },400)
    
}
// 详细规则按钮
$('.detail-rule .rule-hd').click(function(event) {
    $('.detail-rule .rule-bd').toggle();
});

// 现在去完成按钮
$('.page.modal1 a.btn-do-finish').click(function(event) {
    app_data.isJoin = true;//设置为已参与
    showResult();
});
// 领取流量按钮
$('.page-flow .btn-get-flow-group a.btn-get-flow').click(function(event) {
    var _index = getFlowProfile(app_data.flow);
    var oParent = $('.page-modal.modal2');
    var flowDetail = flowItem[_index];
    oParent.find('.desc .fn').text(flowDetail.btnS);
    oParent.find('.desc .ext').html(flowDetail.ext);
    if(app_data.getFlow){
        // 已领取流量情况下将恭喜改成已领取
        // oParent.find('img.gx').attr('src',imgPath+'lq.png');
        oParent.find('.modal-box .hd h3').text('已领取');
    }
    oParent.show();
    // 新增
    $('.page-flow').css({
        'height' : '100%',
        'overflow-y' : 'hidden'
    });
    app_data.getFlow = true;//此处应在ajax请求返回后设置该用户已领取了流量
    var cn = app_data.getFlow ? 'disabled' : '';
    var imgSrc = cn ? imgPath+'btn-'+flowDetail.btnS+'-disabled.png' : imgPath+'btn-'+flowDetail.btnS+'.png';
    // $('.page-flow .btn-get-flow-group a img').attr('src',imgSrc);

    // 点击左边盒子后显示的图片（dong） 
    imgSrc = ['./images/1-2.png','./images/2-1.png','./images/2-2.png']
    $(this).find("img").attr('src',imgSrc[0]);
    $('.btn-get-flow-group a.btn-get-flow').removeClass('move_class');
    // var text = '恭喜';
    if(($('.modal-box .hd h3').text().indexOf('已领取')) ==-1){
        $(this).siblings().find("img").attr('src',imgSrc[1]);
        $('.btn-get-flow-group a.btn-get-flow-more').addClass('move_class'); 
        $('.page-flow .btn-get-flow-group a.btn-get-flow-more').click(function(event) {
            // $('.page-flow .btn-get-flow-group a.btn-get-flow-more').one('click',function(event) {
                var _index = getFlowProfile(app_data.flow);
                var flowDetail = flowItem[_index];
                // if(app_data.isShare){   //已分享
                //     $('.page-modal.modal3').show();
                //     $('.page-modal.modal3').find(".flow").text(flowDetail.btnS);
                // } else {    //未分享
                //     // app_data.isShare = true;
                //     $(".page-guide .flow").text(flowDetail.btnS);
                //     $('.page-guide').show();
                  
                // }
               
                // 新增分享
                if($('.btn-get-flow-group a.btn-get-flow-more').hasClass('move_class')){
                    console.log($('.btn-get-flow-group a.btn-get-flow-more').hasClass('move_class'));
                    // 默认出现蒙层即为分享
                    $(".page-guide .flow").text(flowDetail.btnS);
                    $('.page-guide').show();
                    $('.page-guide').one('click',function(){
                        var oParent = $('.page-modal.modal3');
                        oParent.find('.desc .fn').text(flowDetail.btnS);
                        $('.page-modal.modal3').show();
                    })
                }else{
                    // 已分享
                    $('.page-modal.modal3').show();
                    var oParent = $('.page-modal.modal3');
                    oParent.find('.desc .fn').text(flowDetail.btnS);
                }
               

                var cn = app_data.isShare ? 'disabled' : '';
                var imgSrc = cn ? imgPath+'btn-'+flowDetail.btnS+'-more-disabled.png' : imgPath+'btn-'+flowDetail.btnS+'-more.png';
                
                // 点击右边盒子后显示的图片（dong） 
                 imgSrc = './images/2-2.png'
                 $(this).find("img").attr('src',imgSrc);
                 $('.btn-get-flow-group a.btn-get-flow-more').removeClass('move_class'); 
                $('.page-flow').show().css({
                    'height' : '100%',
                    'overflow-y' : 'hidden'
                });
            });
    }
});
// $('.page-flow .btn-get-flow-group a.btn-get-flow-more').click(function(event) {
//     var _index = getFlowProfile(app_data.flow);
//     var flowDetail = flowItem[_index];
//     if(app_data.isShare){   //已分享
//         $('.page-modal.modal3').show();
//         $('.page-modal.modal3').find(".flow").text(flowDetail.btnS);
//     } else {    //未分享
//         // app_data.isShare = true;
//         $(".page-guide .flow").text(flowDetail.btnS);
//         $('.page-guide').show();
//     }
//     var cn = app_data.isShare ? 'disabled' : '';
//     var imgSrc = cn ? imgPath+'btn-'+flowDetail.btnS+'-more-disabled.png' : imgPath+'btn-'+flowDetail.btnS+'-more.png';
    
//     // 点击右边盒子后显示的图片（dong） 
//      imgSrc = './images/2-2.png'
//      $(this).find("img").attr('src',imgSrc);
//     $('.page-flow').show().css({
//         'height' : '100%',
//         'overflow-y' : 'hidden'
//     });
// });
function renderPageShare(){
    var _index = getFlowProfile(app_data.flow);
    var flowDetail = flowItem[_index];
    $(".page-guide .flow").text(flowDetail.btnS);
    $('.page-guide').show();
}
// 新增
$('a.btn-confirm-flow').click(function(event) {
    $('.page-modal.modal2').hide();
    $('.page-modal.modal3').hide();
    $('.page-flow').show().css({
        'height' : 'auto',
        'overflow-y' : 'auto'
    });
});
// 点击令牌弹出分享层
$('.share-box').click(function(event) {
    // if(app_data.isShare){
    //     $('.page-modal.modal3').show();
    //     // 新增
    //     $('.page-flow').show().css({
    //         'height' : '100%',
    //         'overflow-y' : 'hidden'
    //     });
    // }else{
    //     $('.page-guide').show();
    // }
});
function showResult(){
    var _index = getFlowProfile(app_data.flow);
    var oParent = $('.page-flow');
    var flowDetail = flowItem[_index];
    var btnS = flowDetail.btnS;
    oParent.find('.modal-box .hd h3').text(flowDetail.name+'英雄令');
    // oParent.find('.modal-box .title-pic').attr('src',imgPath+'t'+_index+'.png');
    // oParent.find('.modal-box .share-box .lp').attr('src',imgPath+'lp-'+_index+'.png');
    oParent.find('.modal-box .box .bd .task').html(flowDetail.desc);
    // 设置按钮
    var cn = app_data.getFlow ? 'disabled' : '';
    var cn2 = app_data.isShare ? 'disabled' : '';
    var imgSrc = cn ? [imgPath+'btn-'+btnS+'-disabled.png'] : [imgPath+'btn-'+btnS+'.png'];
    var imgSrc2 = cn2 ? imgPath+'btn-'+btnS+'-more-disabled.png' : imgPath+'btn-'+btnS+'-more.png';
    imgSrc.push(imgSrc2);

    // 领取盒子图片写死数据（dong）
    if(_index !=5){
        imgSrc = ['./images/1-1.png','./images/2-2.png']
        $('.btn-get-flow-group a.btn-get-flow').addClass('move_class');
        // $('.btn-get-flow-group a.btn-get-flow-more').removeClass('move_class'); 
    }else{
        // $('.paiming').show();
        $('.btn-get-flow').css({'display':'none'});
        $('.btn-get-flow-more').css({'display':'none'})
    } 
    // (dong)改变图片大小
    oParent.find('.btn-get-flow-group a.btn-get-flow img').css({'width':'2.09rem'});
    oParent.find('.btn-get-flow-group a.btn-get-flow-more img').css({'width':'2.09rem'});
    oParent.find('.btn-get-flow-group a.btn-get-flow img').attr('src',imgSrc[0]);
    oParent.find('.btn-get-flow-group a.btn-get-flow-more img').attr('src',imgSrc[1]);
    oParent.find('.progress-box .lp img').attr('src',imgPath+'lp-'+_index+'.png');
    // 设置档位
    var steps =  flowDetail.step;
    var span = '';
    for(var i=0;i<steps.length;i++){
        var className = steps[i].flow < app_data.flow ? '' : 'disabled';
        span+= "<span class='"+className+"'>"+steps[i].name+"</span>";
    }
    oParent.find('.progress-step').html(span);
    // 设置活动规则
    oParent.find('.rule-bd').find('span.fx-name').text(flowDetail.name);
    for(var i=0;i<flowDetail.rule.length;i++){
        oParent.find('.rule-bd').find('span.fx'+(i)).text(flowDetail.rule[i]);
    }
    $('.page.modal1').hide();
    // 设置链接
    var link = "";
    var linkImgSrc = imgPath+'30GB.png';
    // var rnx = "2、30GB定向流量免费2个月用户流量使用标准详见不限量办理页；王者粉色";
    rnx = "2、流量放心用套餐用户流量使用标准详见不限量办理页；"
    if(_index < 5){
        link = "https://mp.weixin.qq.com/s/K6W3CaZajWdDb4WgBxJUXQ";
        linkImgSrc = imgPath+'more.png?v=1';
        // rnx = "2、流量放心用套餐用户流量使用标准详见不限量办理页；";
    }
    oParent.find('.link a').attr('href',link);
    oParent.find('.link a img').attr('src',linkImgSrc);
    // oParent.find('span.rnx').text(rnx);
    oParent.show();
    // 设置进度
    setTimeout(function(){
        var percent = app_data.flow/flowDetail.target;
        if(percent > 100) percent = 100;
        percent = percent *100 + '%';
        oParent.find('.progress-box .lp').css({
            left : percent
        });
        oParent.find('.progress-box .mask').addClass('mask'+_index).css({
            width : percent
        });
    },100)
}
// 设置用户手机号
$('.mobileNo').text(app_data.mobileNo);
// 对已参与用户直接显示结果页并初始化数据
if(app_data.isJoin){
    showResult();
    
}

