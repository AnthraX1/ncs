

Ext.define('proauthMobileAccount.view.list.List' ,{
  extend: 'Ext.grid.Panel',
  alias : 'widget.mobileaccountlist',
  store : 'List', 
  height: 900,
  title:'',
  columnLines: true,
  initComponent: function() {
    var sm = Ext.create('Ext.selection.CheckboxModel',{
        listeners: {
            selectionchange: function(sm, selections) {  
            	var grid=Ext.ComponentQuery.query('mobileaccountlist')[0];
                  
              grid.down('#removeButton').setDisabled(selections.length == 0);
			  grid.down('#ckEmployee1').setDisabled(selections.length == 0);
			  grid.down('#ckEmployee').setDisabled(selections.length == 0);
    //          grid.down('#moveGroupButton').setDisabled(selections.length == 0);
    
                
            }
        }
    
    });
    this.selModel=sm;

      var rowEditing = Ext.create('Ext.ux.grid.plugin.RowEditing', {
    	      pluginId:'rowEditing', 
            saveBtnText: "����", 
            cancelBtnText: "ȡ��", 
            autoRecoverOnCancel:true,
            autoCancel: true,
            filed1:'casename',
            filed2:'expiretime',
            filed3:'cobj',
            filed4:'cmemo',
            filed5:'cobjid',
            filed6:'sid'
          
 //       clicksToMoveEditor: 1,
 //       autoCancel: false
    });
    
   
    this.plugins=rowEditing;
    this.tbar = Ext.create('Ext.PagingToolbar',{
    	store:'List',
		id:"pagtool",
      displayInfo: true,
      displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
     emptyMsg: "û�м�¼����ʾ",
     items:[
              {
               xtype:'textfield',
               id:'keyword_mobileaccount',
               width:140,
               name:'keyword5',
               style:'color:#7aa7d5',             
               emptyText:'������������Ʋ�ѯ',
               enableKeyEvents:true,
               listeners:{
                 'focus':function(){
        
                 },
         
                 'keydown' : function(i,e){
                var aae=e.getKey() ; 
                if(aae==13){
                     
                }
               }
               }
             },
             {
                text:'��ѯ',
                iconCls:'accept',
                action:'keycx'
   
            },
         '-',
     	 {
     	 	text:'��Ӳ���',
     	 	iconCls:'add',
     	 	 handler : function() {
                rowEditing.cancelEdit();    
                 var expirtime=Ext.Date.add(new Date(), Ext.Date.DAY, 90);       
                 var r = Ext.create('proauthMobileAccount.model.List', {  
                 	  flags:'1',             	  
                    expiretime: expirtime                  
                                   
                });
               var store = Ext.ComponentQuery.query('mobileaccountlist')[0].getStore();
    
               store.insert(0, r);
               rowEditing.startAdd1(0,0);
            
       //     rowEditing.startEdit(0, 0);
              }
     	 	
     	 	
//     	 	action:'add'
     	},'-',
     	 {
     	 	text:'ɾ��',
     	 	itemId: 'removeButton',
     	 	iconCls:'remove',
     	 	disabled: true,
     	 	action:'del'
     	},'-',
     	
     	{
            itemId: 'ckEmployee',
            text: '��Ϊ��Ч',
            iconCls: 'fix',
                handler:function(){
							   if(confirm('�����Ҫִ�иò�����')){                  
                 var selsid;  
                 var rows=sm.getSelection();
                   selsid='';
                  for(var i=0;i<rows.length;i++){
                  	if(i==0){
                  selsid="'" + rows[i].get('sid') + "'";
                  	}
                  	else{
                     selsid=selsid + "," + "'" + rows[i].get('sid') + "'";
                    }
                   
                   }
                   var grid = Ext.ComponentQuery.query('mobileaccountlist')[0];
                   var store = grid.getStore();
                      store.load({params: {setflag: "1",selsid:selsid}});              
              }
                
            },
            disabled: true
        } ,'-',
        {
            itemId: 'ckEmployee1',
            text: '��������',
            iconCls: 'forbid',
                handler:function(){
             
							   if(confirm('�����Ҫ����ѡ��Ĳ�����')){                  
                 var selsid;  
                 var rows=sm.getSelection();
                   selsid='';
                  for(var i=0;i<rows.length;i++){
                  	if(i==0){
                  	 selsid="'" + rows[i].get('sid') + "'";
                  	}
                  	else{
                      selsid=selsid + "," + "'" + rows[i].get('sid') + "'";
                    }
                   
                   }
                    var grid = Ext.ComponentQuery.query('mobileaccountlist')[0];
                    var store = grid.getStore();
                      store.load({params: {setflag: "9",selsid:selsid}});
                  
                
              }
                 
            },
            disabled: true
        },
        '-',
        {
     	 	text:'Ӧ��',
     	 	iconCls:'accept',
     	 	 handler : function() {
                  var grid = Ext.ComponentQuery.query('mobileaccountlist')[0];
                  var store = grid.getStore();
                  store.load({params: {app: "reload"}});
              }
     	 	
     	 	
//     	 	action:'add'
     	}
     	
     	,
     	'-',
     	 {xtype:'label', html:'<span id="titledx"></span>'}
     	]
    }
    );
    
    
   
  	
    this.columns = [
		{
        	  header: 'sid',
            dataIndex: 'sid',
            sortable: false,
            align:'center',
            hidden:true,
            width: 80
			
        },
      {header: '����״̬', dataIndex: 'flags', width:60, sortable: true,
      	renderer:function(value,metaData,record){
			   if(value=='0'){return '<font  color=red>δ��Ч</font'}
                  else  if(value=='1'){return '<font color=green>����Ч</font'}
					 else   {return '<font  color=red>��ʧЧ</font'}
					<!--  -->
                }
      	
      	
      	},
      {header: '��������',dataIndex: 'casename',width:140, sortable: false,editor: {emptyText:'�������������',allowBlank:true}},
      {header: '����ʧЧ����', dataIndex: 'expiretime', format: "Y/m/d",width:110,sortable: true,editor: { xtype:'datefield',emptyText:'���������ʧЧʱ��',allowBlank:true}},
      {header: '������Ч��Χ', dataIndex: 'cobj',   flex:1,editor: {xtype: 'treecomboxcheck',displayField:'text',valueField:'id',value : '',store:store_groupcheck,emptyText:'��ѡ�������Ч��Χ',id:'opt',optid:'optid',opname:'opt',allowBlank:true}},
      {header: '��������', dataIndex: 'cmemo',flex:1,editor: { emptyText:'�������������',allowBlank:true}},      
      {header: '�����޸�ʱ��', dataIndex: 'lasttime', width:120,sortable: false},
      {header: '��ΧID', hidden:true,dataIndex: 'cobjid', width:0,editor: {id:'optid',allowBlank:true}},
      {header: '�澯��', dataIndex: 'wcount', width:50},
      {header: '����澯ʱ��', dataIndex: 'warnlasttime', width:120},
     
        {
          header: '�������',
    //        xtype: 'actioncolumn',
            dataIndex: 'pcount',
             icon: '/images/v4/edit_task.png',
            tooltip: '�����ͼ������޸ĵ�λ��Ϣ���档',
            width: 100,
            align: 'center',
            sortable: false,
            listeners:{
            	click:function(grid, rowIndex, colIndex, actionItem, event, record, row) {
           
        		var macstore=Ext.data.StoreMgr.lookup('MacStore');     
        			new_params={cid:record.get('sid')};
            macstore.on('beforeload', function (store, options) {
		        Ext.apply(store.proxy.extraParams, new_params);
		       }); 
		       
		       var warnstore=Ext.data.StoreMgr.lookup('WarnStore');     
        			new_params={cid:record.get('sid')};
             warnstore.on('beforeload', function (store, options) {
		        Ext.apply(store.proxy.extraParams, new_params);
		       }); 
		       
		      var warnlimstore=Ext.data.StoreMgr.lookup('MacLimStore');     
        			new_params={cid:record.get('sid')};
             warnlimstore.on('beforeload', function (store, options) {
		        Ext.apply(store.proxy.extraParams, new_params);
		       }); 
		       
            macstore.load();
            var pname=record.get('casename');
            var ptitle=pname+'_���ز��Ա༭';
            		  var win = Ext.create('proauthMobileAccount.view.common.AddWin',{
					        title: ptitle,
					        field1: record
					      });
					      win.showAt(50,20); 	  	
              
          }
            }
           ,
          renderer:function(value,metaData,record){
          	  var temp_disp=record.data.pcount;
				      if(temp_disp=='0'){
				      	       return Ext.String.format( '<img src="/v4/images/edit_task.png">&nbsp;<font color=red>(������)</font>&nbsp;');
				      }
				    else{
				       return Ext.String.format( '<img src="/v4/images/edit_task.png">&nbsp;({0}������)&nbsp;',temp_disp);
				      }
      

          }

        },
          {
          header: '�澯��Ϣ',
            xtype: 'actioncolumn',
            dataIndex: 'sid',
            icon: '/newver/resources/themes/images/share/List.png',
            tooltip: '�����ͼ��鿴�澯��Ϣ��',
            width: 60,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
            	var pname=record.get('casename');
              var ptitle=pname+'_���ظ澯��Ϣ';
            
              var warnlogstore=Ext.data.StoreMgr.lookup('WarnLogStore');  
              var keyword=document.getElementById("form1").keyword_warnlog.value;
              var state=document.getElementById("form1").clstate.value;
               
        			new_params={cid:record.get('sid'),keyword:keyword,state:state};
              warnlogstore.on('beforeload', function (store, options) {
		        Ext.apply(store.proxy.extraParams, new_params);
		       });
              warnlogstore.load();
			
              var win = Ext.create('proauthMobileAccount.view.common.WarnlogWin',{
					        title: ptitle,
					        field1: record,
							layout:'fit',
							viewConfig:{
								forceFit:true,
								scrollOffset:0
							}
					
					      });
						
					      win.showAt(50,20); 	
      
          }
        },
          {
          	width:20
          }

      
      
    ];

    this.callParent(arguments);
  }
    
});