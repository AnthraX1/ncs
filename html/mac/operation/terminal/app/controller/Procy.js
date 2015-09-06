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
	//	    select: this.showTab,
		    render: this.showRender
		  },
		  
		  //�ؼ��ֲ�ѯ
		  'apsetlist button[action=keycx]':{
				click: this.dwglkeycx
			},
			//��ӷ�����Ϣ
		  'apsetlist button[action=add]':{
				click: this.dwgladd
			},
			//������Ա
		  'apsetlist button[action=addgroup]':{
				click: this.dwgladdgroup
			},
			//����
		  'addwin button[action=addsave]':{
				click: this.addsave
			},
		  			//ɾ����λ
		  'apsetlist button[action=del]':{
				click: this.dwgldel
			},
			 'apsetlist button[action=sh]':{
				click: this.dwglsh
			}
			,
			//�༭��λ
		  'apsetlist button[action=edit]':{
				click: this.dwgledit
			}
			,
			//�߼���ѯ
		  'apsetlist button[action=advancecx]':{
				click: this.dwglavcx
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
	  var keyword=Ext.getCmp('keyword_dwgl').value;
	  var groupid=parent.ncsgroupid;
	  var did=parent.corpdid;
	
	    if(did){
       groupid = "";
     }
//    var mark=parent.gmark;

     store_fac.load();

	  var new_params={groupid:groupid,did:did,keyword:keyword};
     Ext.apply(store.proxy.extraParams,new_params);
       });	
   
   proauthApset.controller.Procy.loadProcyListStore();
 //   proauthApset.controller.Procy.setTitle(parent.dxtitle);
  },
  //�ؼ��ֲ�ѯ
  dwglkeycx: function(thisBtn){
    proauthApset.controller.Procy.loadProcyListStore();
	var  store=Ext.ComponentQuery.query('apsetlist')[0].getStore();
	var   keyword=Ext.getCmp('keyword_dwgl').value;
	store.load({params:{keyword:keyword}});
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
                  	  selsid=selsid+rows[i].get('groupid');
                  	  selsid=selsid+"\'";
                  	}
                  	else{
                       selsid=selsid+","+"\'"+rows[i].get('groupid')+"\'";
                    }
                   
                   }
                       
                   store.load({params:{del:"del",groupid:selsid}});
                  
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
  dwgladdgroup:function(thisBtn){
     
  	 proauthApset.controller.Procy.show_addgroup('','');
    
  },
  addsave:function(thisBtn){
		
		var win =thisBtn.up('window');
		var store = Ext.ComponentQuery.query('apsetlist')[0].getStore();
   	var tform=win.query('form')[0];   	
	 var groupname= tform.getForm().getValues().groupname;
	 var groupdesc= tform.getForm().getValues().groupdesc;
	
	store.load({params:{add:'add',groupname:groupname,groupdesc:groupdesc}});
	win.close();  	
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
      title: "�� �� �� Ϣ �� ��"
      
    });
    win.showAt(50,20);

    },
	show_addgroup:function(record,adsid){
    	var win = Ext.create('proauthApset.view.common.AddgroupWin',{
      title: "�� �� �� Ա"
      
    });
    win.showAt(50,20);
    },
	
	
	
    setTitle: function(title){
       document.getElementById("titledx").innerHTML='&nbsp'+title+'&nbsp;&nbsp;';   

    }
  }
});
