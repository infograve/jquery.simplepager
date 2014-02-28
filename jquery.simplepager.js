/*
*        ÅQÅMÇ±ÅrÅQ_          simple pager plugin v0.9.0
*      /.:/éO===éO—:.ÅR       http://infograve.github.io/jquery.simplepager/
* --Ç≠7.:/:.:.:.:Én';.:œ>Å]-§
*L.ÅQ({j|{Å».:.:/ÅLÇu;.:VÅQ_Åvfor jQuery
*  (:./.:ò∏Åú∞ ' Åú |.';.ÅR)  http://jquery.com/
*   ÅMÇ≠{ÅΩ       Åº|:.{ÅÑ'
*      jò¢:.ÅQÅ ÅQ ≤.:/.',    by Ko1.Imamura 2014
*    VÉt7Å_/|ÉgòªÇ≠_ÅÑ-f_Ét   Released under the MIT license
*    ==ß}  /||Y||_/§  Å…r==   http://sourceforge.jp/projects/opensource/wiki/licenses/MIT_license
*   ÅuìÒ>-Ç≠/ ë¸ VÅrÅÑ<ìÒÃ
*     Å_ìÒ Åq/∆∆∆∆VÅrìÒÅ^
*         ÅP Lj~~Lj ÅP
*/
;(function($){
  $.fn.sPager =function(argOptions){
    var spContainer =this;
    
    var spNumArray =[
      '<span class="spn0">0</span>',
      '<span class="spn1">1</span>',
      '<span class="spn2">2</span>',
      '<span class="spn3">3</span>',
      '<span class="spn4">4</span>',
      '<span class="spn5">5</span>',
      '<span class="spn6">6</span>',
      '<span class="spn7">7</span>',
      '<span class="spn8">8</span>',
      '<span class="spn9">9</span>',
      '<span class="spdot">...</span>'
    ];
    
    var defaultSetting ={
      pages:0,
      items:6,
      showEdge:true,
      onPageChange:function(){}
    };
    var setting =$.extend(defaultSetting, argOptions);
    
    var currentPage =0;
    
    var tmpCode ='';
    for(var count=0,cmax=(setting.items+4); count<cmax; count++){
      switch(true){
        case count==0:
          tmpCode +=setting.showEdge ? '<li><span class="container" page="1">'+fnMakeNum(1)+'</span></li>': '<li class="disable"><span class="container" page="1">'+fnMakeNum(1)+'</span></li>';
          break;
        case count==1:
          tmpCode +=setting.showEdge ? '<li class="dot"><span class="container">'+spNumArray[10]+'</span></li>': '<li class="disable dot"><span class="container">'+spNumArray[10]+'</span></li>';
          break;
        case count==(setting.items+2):
          tmpCode +=setting.showEdge ? '<li class="dot"><span class="container">'+spNumArray[10]+'</span></li>': '<li class="disable dot"><span class="container">'+spNumArray[10]+'</span></li>';
          break;
        case count==(setting.items+3):
          tmpCode +=setting.showEdge ? '<li><span class="container" page="'+setting.pages+'">'+fnMakeNum(setting.pages)+'</span></li>': '<li class="disable"><span class="container" page="'+setting.pages+'">'+fnMakeNum(setting.pages)+'</span></li>';
          break;
        default:
          tmpCode +='<li><span class="container"></span></li>';
          break;
      }
    }
    $(spContainer).html(tmpCode);
    fnMakePager(1);
    
    function fnMakePager(argPage){
      $(spContainer).find('li').removeClass('active');
      
      var tmpPage =parseInt(argPage);
      tmpPage =tmpPage<1 ? 1: tmpPage;
      tmpPage =tmpPage>setting.pages ? setting.pages: tmpPage;
      var tmpCenterColumn =Math.ceil(setting.items/2);
      var tmpColumnSurplus =setting.items%2 ? tmpCenterColumn-1: tmpCenterColumn;
      var tmpCenterNum =tmpPage<tmpCenterColumn ? tmpCenterColumn: tmpPage;
      tmpCenterNum =tmpCenterNum+tmpColumnSurplus<setting.pages ? tmpCenterNum: setting.pages-tmpColumnSurplus;
      
      for(var counter=2,cmax=(setting.items+2); counter<cmax; counter++){
        var shotPage =tmpCenterNum-tmpCenterColumn+counter-1;
        $(spContainer).find('li').eq(counter).find('span.container').attr({page:shotPage}).html(fnMakeNum(shotPage));
        if(tmpPage==shotPage) $(spContainer).find('li').eq(counter).addClass('active');
      }
      
      if(setting.showEdge){
        if(tmpCenterNum>tmpCenterColumn){
          $(spContainer).find('li').eq(0).removeClass('disable');
          $(spContainer).find('li').eq(1).removeClass('disable');
        }else{
          $(spContainer).find('li').eq(0).addClass('disable');
          $(spContainer).find('li').eq(1).addClass('disable');
        }
        if((tmpCenterNum+tmpColumnSurplus)<setting.pages){
          $(spContainer).find('li').eq(setting.items+2).removeClass('disable');
          $(spContainer).find('li').eq(setting.items+3).removeClass('disable');
        }else{
          $(spContainer).find('li').eq(setting.items+2).addClass('disable');
          $(spContainer).find('li').eq(setting.items+3).addClass('disable');
        }
      }
      
      currentPage =tmpPage;
      
      setting.onPageChange({currentPage:tmpPage});
    }

    function fnMakeNum(argNum){
      var tmpNum =String(argNum);
      var retuenVal ='';
      for(var counter=0, maximum=tmpNum.length; counter<maximum; counter++){
        retuenVal +=spNumArray[parseInt(tmpNum[counter])];
      }
      return retuenVal;
    }

    var fnForward =function(){ fnMakePager(currentPage+1); }
    var fnRewind =function(){ fnMakePager(currentPage-1); }
    var fnCurrentPage =function(){ return currentPage; }
    
    $(spContainer).find('li').on('click', function(argEvent){
      if(!$(this).hasClass('disable')&&$(this).find('span.container').attr('page')){
        fnMakePager($(this).find('span.container').attr('page'));
      }
      argEvent.preventDefault();
    });
    
    return { forward:fnForward, rewind:fnRewind, pageTo:fnMakePager, getCurrentPage:fnCurrentPage };
  }
})(jQuery);
