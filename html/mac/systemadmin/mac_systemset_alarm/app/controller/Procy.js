  Ext.define('State', {
        extend: 'Ext.data.Model',
        fields: [
            {type: 'string', name: 'groupid'},
            {type: 'string', name: 'groupname'}
        ]
    });
   
  var store_fac = Ext.create('Ext.data.Store', {
        model: 'State',
        remoteSort: true,
         proxy: {
            type: 'ajax',
            url: '/pronline/Msg?FunName@ncsWebFacComp',
            reader: {
                type:'json',
                root: 'corpclassdata'              
            },         
            simpleSortMode: true
        }
    });
    
Ext.define('proauthApset.controller.Procy', {
	extend: 'Ext.app.Controller',  
	stores: ['List'],
	models: ['List'],  
  views: ['list.List','common.AddWin'],
  init: function() {
 
		this.control({
		
		  'apsetlist':{

		    render: this.showRender
		  }
	

		});
  },
  
  showRender: function(){
	var store = Ext.ComponentQuery.query('apsetlist')[0].getStore();
	
	store.on('beforeload', function (store, options) {
  	//������ͼ�߶�
        var qgrid=Ext.ComponentQuery.query('apsetlist')[0];
    	parent.grid_height=parent.Ext.getCmp('layout_center').getHeight()-56;
    	qgrid.setHeight(parent.grid_height);
    	/*
		var id_operation_status = parent.macGlobalCtx.getIdOperationStatus();
    	if (id_operation_status != '-1') {
    	    Ext.getCmp('keyword_ywgj').setValue(id_operation_status);
    	}
		*/
    	var keyword = Ext.getCmp('keyword_ywgj').value;
		var groupid=parent.ncsgroupid;
		var did=parent.corpdid;
	    if(did){
			groupid = "";
		}
//    var mark=parent.gmark;
		store_fac.load();
		var TTAlarm_reason=3;
		if(parent.macGlobalCtx.getAlarmReason()!=-1){
			TTAlarm_reason = parent.macGlobalCtx.getAlarmReason();
		}			
		else
			TTAlarm_reason=document.getElementById("form1").Alarm_reason.value;
		var new_params = { groupid: groupid, did: did, keyword: keyword, Alarm_reason:TTAlarm_reason};
		Ext.apply(store.proxy.extraParams,new_params);
	});
	store.on('load', function (store, options) {
		parent.macGlobalCtx.setAlarmReason(-1);
		/*
		var id_operation_status = parent.macGlobalCtx.getIdOperationStatus();
		if (id_operation_status != '-1') {
			Ext.getCmp('keyword_ywgj').setValue(id_operation_status);
            parent.macGlobalCtx.setIdOperationStatus('-1');
		}*/
	});
   
	proauthApset.controller.Procy.loadProcyListStore();
 //   proauthApset.controller.Procy.setTitle(parent.dxtitle);
  },
  //�ؼ��ֲ�ѯ
 /* dwglkeycx: function(thisBtn){
    proauthApset.controller.Procy.loadProcyListStore();
  },
  dwgldel: function(thisBtn){
  	var grid = Ext.ComponentQuery.query('apsetlist')[0];
    var rows = grid.getSelectionModel().getSelection();

     if(rows){
     	           var selsid;
     	            selsid='';
     	            Ext.MessageBox.confirm('ȷ��', 'ȷ��ɾ���ü�¼��', function(btn){
     	            	if(btn=='yes'){
     	             var store = grid.getStore();
                  for(var i=0;i<rows.length;i++){
                  	if(i==0){
                  		selsid="\'";
                  	  selsid=selsid+rows[i].get('gwid');
                  	  selsid=selsid+"\'";
                  	}
                  	else{
                       selsid=selsid+","+"\'"+rows[i].get('gwid')+"\'";
                    }
                   
                   }

                   store.load({params:{del:"del",selsid:selsid}});
                  
                 }
     	        })
     }
    
    
  //  proauthApset.controller.Procy.loadProcyListStore();
  },
  dwglsh: function(thisBtn){
  	var grid = Ext.ComponentQuery.query('apsetlist')[0];
    var rows = grid.getSelectionModel().getSelection();

     if(rows){
     	           var selsid;
     	            selsid='';
     	            Ext.MessageBox.confirm('ȷ��', 'ȷ����˸ü�¼��', function(btn){
     	            	if(btn=='yes'){
     	             var store = grid.getStore();
                  for(var i=0;i<rows.length;i++){
                  	if(i==0){
                  		selsid="\'";
                  	  selsid=selsid+rows[i].get('gwid');
                  	  selsid=selsid+"\'";
                  	}
                  	else{
                       selsid=selsid+","+"\'"+rows[i].get('gwid')+"\'";
                    }
                   
                   }

                   store.load({params:{sh:"sh",selsid:selsid}});
                  
                 }
     	        })
     }
    
    
  //  proauthApset.controller.Procy.loadProcyListStore();
  },
  dwgladd:function(thisBtn){
     
  	 proauthApset.controller.Procy.show_add('','');
    
  },
  addsave:function(thisBtn){

   	var tform=thisBtn.up('window').query('form')[0];   	

    var tgwid= tform.getForm().getValues().gwid;
    var tgroupid=tform.getForm().getValues().groupid;
    var tmac=tform.getForm().getValues().mac;
    var tssid=tform.getForm().getValues().ssid;
    if(tgwid==''||tgwid=='AP��Ż�AP��ʶ'){
    	alert('����дAP����');
    	return;
    }
    if(tgroupid==null||tgroupid==''){
    	alert('����ѡȡ��λ');
    	return;
    }
     if(tmac=='���Զ����֮���á�,���ָ�'||tmac==''){
    	alert('����дAP mac');
    	return;
    }
    if(tssid==null||tssid==''){
    	alert('����дSSID');
    	return;
    }
    tform.getForm().doAction('submit',{
                url:'/pronline/Msg',
                 method:'post',
                 waitMsg: '���ڱ���...',
                  params:{FunName:'proauth_apset_Save'},
                  success:function(form,action){

    //      tform.getForm().findField('sid').setValue(action.result.sid);  
    //      var store = Ext.ComponentQuery.query('resourcelist')[0].getStore();
         
         proauthApset.controller.Procy.loadProcyListStore();  
         thisBtn.up('window').close();
                  }
                  ,
                 failure:function(form,action){
                 	Ext.Msg.alert(action.result.msg);

                   }
                     
                 })
    	
  },*/
  
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
	  getStore:function(){
		  var store = Ext.ComponentQuery.query('apsetlist')[0].getStore();
          return store;		  
	  },
    loadProcyListStore:function(){
      var store = Ext.ComponentQuery.query('apsetlist')[0].getStore();
  //    var keyword=Ext.getCmp('keyword_dwgl').value;
      store.load();
    },
    SetPage:function(curpage){
      var store = Ext.ComponentQuery.query('apsetlist')[0].getStore();
      store.currentPage=curpage;
       
    },
    show_add:function(record,adsid){

    	var win = Ext.create('proauthApset.view.common.AddWin',{
      title: "�� �� AP �� Ϣ",
      field1: record,
      field2:adsid
    });
    win.showAt(50,20);

    },
    setTitle: function(title){
       document.getElementById("titledx").innerHTML='&nbsp'+title+'&nbsp;&nbsp;';   

    }
  }
});
