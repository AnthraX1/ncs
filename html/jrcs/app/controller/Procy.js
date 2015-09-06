Ext.define('proauthMobileAccount.controller.Procy', {
  extend: 'Ext.app.Controller',  
   stores: ['List'],
 	models: ['List'],  
  views: [ 'list.List'],
  init: function() {

		this.control({
		
		  'mobileaccountlist':{
	//	    select: this.showTab,
		    render: this.showRender
		  },
		  
		  //�ؼ��ֲ�ѯ
		  'mobileaccountlist button[action=keycx]':{
				click: this.dwglkeycx
			},
			//��ӵ�λ
		  'mobileaccountlist button[action=add]':{
				click: this.dwgladd
			},
			//�ƶ�����
		  'mobileaccountlist button[action=saveBtnText]':{
				click: this.movertogroup
			},
		  			//ɾ����λ
		  'mobileaccountlist button[action=del]':{
				click: this.dwgldel
			}
			,
			//�༭��λ
		  'mobileaccountlist button[action=edit]':{
				click: this.dwgledit
			}
			,
			//�߼���ѯ
		  'mobileaccountlist button[action=advancecx]':{
				click: this.dwglavcx
			}
			
		});
  }
 
  ,
  
  showRender: function(){
  
  var store = Ext.ComponentQuery.query('mobileaccountlist')[0].getStore();
  
  store.on('beforeload', function (store, options) {
	  var keyword=Ext.getCmp('keyword_mobileaccount').value;
	  var flag=Ext.getCmp('whflag').value;
	  var groupid=parent.ncsgroupid;
	  var did=parent.corpdid;
	    if(did){
       groupid = "";
     }
	  var new_params={groupid:groupid,did:did,keyword:keyword,flag:flag};
     Ext.apply(store.proxy.extraParams,new_params);
       });	

   proauthMobileAccount.controller.Procy.loadProcyListStore();
 //   proauthMobileAccount.controller.Procy.setTitle(parent.dxtitle);
  },
  //�ؼ��ֲ�ѯ
  dwglkeycx: function(thisBtn){
    proauthMobileAccount.controller.Procy.loadProcyListStore();
  },
  dwgldel: function(thisBtn){
  	var grid = Ext.ComponentQuery.query('mobileaccountlist')[0];
    var rows = grid.getSelectionModel().getSelection();

     if(rows){
     	           var selsid;
     	            selsid='';
     	            Ext.MessageBox.confirm('ȷ��', 'ȷ��ɾ���ü�¼��', function(btn){
     	            	if(btn=='yes'){
     	             var store = grid.getStore();
                  for(var i=0;i<rows.length;i++){
                  	if(i==0){
                  	 selsid=rows[i].get('sid');
                  	}
                  	else{
                       selsid=selsid+","+rows[i].get('sid');
                    }
                   
                   }
      
                   store.load({params:{del:"del",selsid:selsid}});
                  
                 }
     	        })
     }
    
    
  //  proauthMobileAccount.controller.Procy.loadProcyListStore();
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
      var store = Ext.ComponentQuery.query('mobileaccountlist')[0].getStore();
    
     var keyword=Ext.getCmp('keyword_mobileaccount').value;
   
      store.load();
    },
    SetPage:function(curpage){
      var store = Ext.ComponentQuery.query('mobileaccountlist')[0].getStore();
      store.currentPage=curpage;
       
    },
    showedit:function(userid){
       var htmlvar='<iframe src="/pronline/Msg?FunName@ncsWebDispClientAddForm_v4&groupid@'+parent.ncsgroupid+'&userid@'+userid+' " scrolling="yes" name="moduleIframe" frameborder="no" style="width:100%;height:600px;"></iframe>';      
       var win = new Ext.Window ({
                             id:"addwindow",
                             title:"���ӻ��޸ĵ�λ��Ϣ",
                             x:0,
                             y:0,
                             width:670,
                             height:700,
                             bodyPadding: 10,
                             modal:true,
  //                         headerPosition: 'bottom',
                             resizable:true,
                             draggable:true,
                             html:htmlvar
                                                
         }
        )
        win.show();
       
    },
    setTitle: function(title){
       document.getElementById("titledx").innerHTML='&nbsp'+title+'&nbsp;&nbsp;';   

    }
  }
 
 
 
});
