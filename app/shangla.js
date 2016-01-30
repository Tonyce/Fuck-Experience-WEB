
var data = []
var pageNo = 1;
var size = 8;

$(document).ready(function() {
    $("#groupList").empty();
    getdata(function () {
        freshMychatroom()
    });
}

function freshMychatroom (){
    var girdHtml = "<div class='ui-grid-a'>{chatroom}</div>";
    var chatroomListHtml = "";
    var chatroomHtml = "";
    // for(i in data){
    for (var i = 0; i < data.length; i++) {
        chatroomHtml +=  "<a class='ui-block-a groupBg' href='javascript:goTaskList("+data[i].chatroomId +")'>";
        chatroomHtml += "<img src='"+ data[i].headImgPath +"'>";
        chatroomHtml += "<div class='groupName'>"+data[i].ownerNickname +"</div>";
        chatroomHtml += "<div class='CoTeam'>"+data[i].nickname+"</div>"
        chatroomHtml += "<div class='groupMember'>"+data[i].memberCount+"</div></a>";
        if(i%2 == 1){
            chatroomListHtml += girdHtml.replace("{chatroom}",chatroomHtml);
            chatroomHtml = "";
        }
        // 如果data的长度不是偶数，则要加上最后一段
        if(data.length % 2 == 1 && i == data.length -1){
            chatroomListHtml += girdHtml.replace("{chatroom}",chatroomHtml);
        }
    }
    $("#groupList").html(chatroomListHtml);
    
}

//文档高度
function getDocumentTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

//可视窗口高度
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

//滚动条滚动高度
function getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

window.onscroll = function () {
    if(getDocumentTop() == getWindowHeight() + getScrollTop()){
        loadMore(function () {
            freshMychatroom()
        })
    }
}

function getdata(callback){
    $.ajax({
        url: "/taskclient/chatroominfo",
        type: 'GET',
        dataType: 'JSON',
        cache: false,
        data: {
         size:size,
         pageNo:getPageNum()
        },
        success: function(msg){          
            if(msg.suc !==200){
                
                alert(msg.msg);
                return;
            }
            data = msg.data;
            callback()
        }
    });
}

function loadMore(callback) {
    $.ajax({
        url: "/taskclient/chatroominfo",
        type: 'GET',
        dataType: 'JSON',
        cache: false,
        data: {
         size:size,
         pageNo:getPageNum()
        },
        success: function(msg){          
            if(msg.suc!==200){
                alert(msg.msg);
                return;
            }
            data = data.concat(msg.data);
            callback()
        }
    });   
}

function getPageNum () {
    var dataLen = data.length;
    var page = Math.ceil(dataLen / 8);
    var pageNum = (dataLen % 8 === 0 ) ? page + 1 : page;
    return pageNum;
}