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
 function  mac_jmpPage(ssid)
	{  
	parent.showOneMac(ssid);
	}
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
			//���AP
		  'apsetlist button[action=add]':{
				click: this.dwgladd
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
			, 'apsetlist button[action=import]':{
				click: this.openDr
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
   // proauthApset.controller.Procy.loadProcyListStore();
     var aa=Ext.getCmp('keyword_dwgl').value;
   var store = Ext.ComponentQuery.query('apsetlist')[0].getStore();
     store.load({params:{keyword:aa}});   
  },
  dwgldel: function(thisBtn){
		var store = Ext.ComponentQuery.query('apsetlist')[0].getStore(); 
		var grid = Ext.ComponentQuery.query('apsetlist')[0];
		var rows = grid.getSelectionModel().getSelection();

     if(rows){
     	           var selsid;
     	            selsid='';
     	            Ext.MessageBox.confirm('ȷ��', 'ȷ��ɾ���ü�¼��', function(btn){
     	            	if(btn=='yes'){
     	           
                  for(var i=0;i<rows.length;i++){
                  	if(i==0){
                  		selsid="\'";
                  	  selsid=selsid+rows[i].get('ssid');
                  	  selsid=selsid+"\'";
                  	}
                  	else{
                       selsid=selsid+","+"\'"+rows[i].get('ssid')+"\'";
                    }
                   
                   }
                 
                  store.load({params:{del:"del",ssid:selsid}});
				   
                  
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
		var win =thisBtn.up('window');
		var tform=win.query('form')[0]; 
	
	    var   store = Ext.ComponentQuery.query('apsetlist')[0].getStore();
		var   hotspotid= tform.getForm().getValues().hotspotid;
		var   ssid= tform.getForm().getValues().ssid;
		var   authflag= tform.getForm().getValues().authflag;
		var   security= tform.getForm().getValues().security;
		var   servicetype= tform.getForm().getValues().servicetype;
		var   servicequlity= tform.getForm().getValues().servicequlity;
		var   mac= tform.getForm().getValues().mac;
		var   ISPname= tform.getForm().getValues().ISPname;
		var   ISPphone = tform.getForm().getValues().ISPphone;
		var   ISPemail= tform.getForm().getValues().ISPemail;
		var   oldssid= tform.getForm().getValues().oldssid;
		//alert(oldssid);
		if(ssid==''||ssid=='AP��Ż�AP��ʶ'){
    	alert('����дssid');
    	return;
		}
		if(ISPname==''||ISPname=='������'){
			alert('����д��ϵ��');
			return;
		}
		if(ISPphone==''||ISPphone=='������'){
			alert('����д�绰');
			return;
		}
		if(ISPemail==''||ISPemail=='������'){
			alert('����д����');
			return;
		}
		store.load({params:{add:'add',hotspotid:hotspotid,
				  ssid:ssid,security:security,servicequlity:servicequlity,
				  MAC:mac,ISPname:ISPname,ISPphone:ISPphone,ISPemail:ISPemail,
				  servicetype:servicetype,authflag:authflag,
				  oldssid:oldssid
				  }});	
             win.close();			 
      store.load();
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
openDr:function()
{
var windr;
     var htmlvar='<iframe src="/pronline/Msg?FunName@ncsWebReplace&title_name@�ȵ���Ϣ����&funname@ncS_macUserDr_Next&plate@nc/cust_dr_first.htm'+' " scrolling="no" name="drIframe" frameborder="no" style="width:100%;height:100%;"></iframe>';      
      var windr = new Ext.Window ({
                             id:"windr",
                             title:"�ȵ���Ϣ����",
                             x:0,
                             y:0,
                             width:500,
                             height:260,
                             bodyPadding: 0,
                             modal:true,
//                         headerPosition: 'bottom',
                             resizable:true,
                             closable : true,
                             draggable:true,
                             html:htmlvar
                                                
         }
        )       

       windr.on("beforeclose", function() {
        	reflash();
        }
        )
         windr.show();
}, 
 
  /**************************************
  * ȫ�ֺ��� ����̬����
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
    show_add:function(record,oldsid){
    	var win = Ext.create('proauthApset.view.common.AddWin',{
      title: "�Ϲ��ȵ���Ϣ����",
      field1: record,
      field2:oldsid
    });
	Ext.QuickTips.init();
    win.showAt(50,20);

    },
	show_del:function(selsid)
	{
		var store = Ext.ComponentQuery.query('apsetlist')[0].getStore();
		store.load({params:{del:"del",ssid:selsid}});
	},
    setTitle: function(title)
	{
       document.getElementById("titledx").innerHTML='&nbsp'+title+'&nbsp;&nbsp;';   

    },
	mac_search:function (value, p, record)
	{
	  var str13 = Ext.String.format('<a href="#" style="color:blue" onclick="mac_jmpPage(\'{1}\')">{0}</a>',value,record.get('ssid'));
	 return 	str13;
	}
	
  }
});
