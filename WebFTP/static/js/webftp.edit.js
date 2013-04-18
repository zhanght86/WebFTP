// +----------------------------------------------------------------------
// | Copyright (C) 浩天科技 www.ihotte.com admin@ihotte.com
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author   左手边的回忆 QQ:858908467 E-mail:858908467@qq.com
// +----------------------------------------------------------------------
//**/
//+------------------------------------------------------------------------------
//* 文件$ID ： webftp.edit.js
//+------------------------------------------------------------------------------
//* 路径$ID ： static/js/webftp.edit.js
//+------------------------------------------------------------------------------
//* 程序版本： 浩天 WebFTP V1.0.0 2011-10-01
//+------------------------------------------------------------------------------
//* 功能简介： 文件编辑操作API接口
//+------------------------------------------------------------------------------
//* 注意事项： 请勿私自删除此版权信息！
//+------------------------------------------------------------------------------

function startLoading(){
	$('#loading').css('left', mainwidth/2-60).css('top', mainheight/2);	
	$('#loading').show();
}
function endLoading() {
	$('#loading').hide();
}

//获取代码
function getcode(){
 alert(codepress2.getCode());
}

//预览文件
function view(){
	openwin(editfile,{});
}
function openwin(url, option){  
	if('' == $.trim(url)){ return;}
	var option  = option || {}
	var width   =   option.width || screen.availWidth;  //window.screen.height 
	var height  =   option.height || screen.availHeight;  
	window.open(url,"弹出窗口","height="+height+",top=0,left=0,width="+width+",status=no,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes");
}

//代码高亮
function highlight(){
	codepress2.toggleEditor();
}

//显示行号
function line(){
	codepress2.toggleLineNumbers();
}

//保存文件
function save(){
	startLoading();
	var szMsg  = '[\\/:*?"\'<>|：？“’《》]';
	var newname = $.trim($('#newname').val());
	var charset = $('#charset').val();
	for(i=1;i<szMsg.length+1;i++){
		if(newname.indexOf(szMsg.substring(i-1,i))>-1){
			asyncbox.tips('文件名不能包含非法字符如:'+szMsg,'error');return;
		}
	}
	$.ajax({
		type: "POST",url: 'do.php', timeout:10000,
		//contentType:'multipart/form-data',
        data: 'action=editfile&type=save&charset='+charset+'&newname='+newname+'&file='+ encodeURI($.trim(editfile))+'&code='+encodeURIComponent(codepress2.getCode()),
        success:function(data){
	        var json = parseJson(data);
	        if(200 == json.statusCode){	
				endLoading();
				asyncbox.alert(json.message, '代码保存-文件编辑');			
				setTimeout(function(){
					window.location.href = 'do.php?action=editfile&type=show&file='+encodeURI($.trim(editfile));				
				}, 2000);										
	        }else{					    
	            asyncbox.error(json.message, '代码保存-文件编辑');
	        }
		},
        error: ajaxErrorMsg
    });
}
//解析JSON字符串成JSON对象
function parseJson(str){
 var str = str || '';
 if($.isPlainObject(str)){return str}
 return eval("("+str+")");
}
function ajaxErrorMsg(xhr, textStatus, thrownError){
    var $option = this;
    var msg = '';
	waitmeoff();
	if('timeout' == textStatus){
	    msg += '<div>Http status: AJAX请求超时</div>';
	}else if('error' == textStatus){
	    msg += '<div>Http status:  '+xhr.status+' '+xhr.statusText+'</div>';
		msg += '<div>Http readyState:  '+xhr.readyState+'</div>';	    
        msg += '<div>thrownError:  '+thrownError+'</div>';	
        msg += '<div>responseText: '+xhr.responseText+'</div>';		
	}else{
	    msg += xhr;
	}	
    asyncbox.error(msg, '请求出错-'+window.poweredby);
}

//自动完成
function autoComplete(){
	codepress2.toggleAutoComplete();
}
//代码只读
function readOnly(){
	codepress2.toggleReadOnly();
}






function reloadEditFile(){
    $charset = $('#reloadCharSet').val();
	alert('强制编码重载'+$charset);
}


