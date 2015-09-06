Ext.define('proauthMac.controller.Procy', {
  extend: 'Ext.app.Controller',  
  stores: ['List'],
 	models: ['List'],  
  views: [ 'list.List'],
  init: function() {

		this.control({
		
		  'maclist':{
	//	    select: this.showTab,
		    render: this.showRender
		  },
		  
		  //�ؼ��ֲ�ѯ
		  'maclist button[action=keycx]':{
				click: this.dwglkeycx
			}
		});
  }
 
  ,
  
  showRender: function(){
  
  var store = Ext.ComponentQuery.query('maclist')[0].getStore();
  
  store.on('beforeload', function (store, options) {
	  var keyword=Ext.getCmp('keyword_mobileaccount').value;
	  var time_flag=Ext.getCmp('time_flag').value;
	  var groupid=parent.ncsgroupid;
	  var did=parent.corpdid;
	    if(did){
       groupid = "";
     }
	  var new_params={groupid:groupid,did:did,keyword:keyword,time_flag:time_flag};
     Ext.apply(store.proxy.extraParams,new_params);
       });	

   proauthMac.controller.Procy.loadProcyListStore();
 //   proauthMac.controller.Procy.setTitle(parent.dxtitle);
  },
  //�ؼ��ֲ�ѯ
  dwglkeycx: function(thisBtn){
    proauthMac.controller.Procy.loadProcyListStore();
  },

  
  /**************************************
  * ���Ա�ǩ 
  ***************************************/  
  showTips: function( thisTV, eOpts ){
    thisTV.tip = Ext.create('Ext.tip.ToolTip', {
      target: thisTV.el,
      trackMouse: true,
      dismissDelay : 60000,
      html: '<p>���磺</p><p>&nbsp;&nbsp;&nbsp;�����˿ڣ�80,21</p><p>&nbsp;&nbsp;&nbsp;�˿ڶΣ�2000~3000</p><p>&nbsp;&nbsp;&nbsp;��ϣ�80,2000~3000,3005</p>'
    });
  },
  /**************************************
  * ȫ�ֺ��� 
  ***************************************/
  inheritableStatics:{
    loadProcyListStore:function(){
      var store = Ext.ComponentQuery.query('maclist')[0].getStore();
    
     var keyword=Ext.getCmp('keyword_mobileaccount').value;
   
      store.load();
    },
    SetPage:function(curpage){
      var store = Ext.ComponentQuery.query('maclist')[0].getStore();
      store.currentPage=curpage;
       
    },
    setTitle: function(title){
       document.getElementById("titledx").innerHTML='&nbsp'+title+'&nbsp;&nbsp;';   

    }
  }
 
 
 
});
