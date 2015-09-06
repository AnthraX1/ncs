

Ext.define('proauthMobileAccount.view.common.macLimBk' ,{
  extend: 'Ext.grid.Panel',
  alias : 'widget.maclimlist',
//  store : this.field2, 
  store:'MacLimStore',
  height: 900,
  title:'�ն˷�ֵ����',
  field1: this.field1,
  columnLines: true,
  initComponent: function() {
             var warnlimstore=Ext.data.StoreMgr.lookup('MacLimStore');   
             warnlimstore.load(); 

    var sm = Ext.create('Ext.selection.CheckboxModel',{
        listeners: {
            selectionchange: function(sm, selections) {  
          	var grid=Ext.ComponentQuery.query('maclimlist')[0];
                  
           grid.down('#removeButton4').setDisabled(selections.length == 0);
    //          grid.down('#moveGroupButton').setDisabled(selections.length == 0);
    
                
            }
        }
    
    });
    this.selModel=sm;

      var rowEditing1 = Ext.create('Ext.ux.grid.plugin.RowEditing', {
    	      pluginId:'rowEditing2', 
            saveBtnText: "����", 
            cancelBtnText: "ȡ��", 
            autoRecoverOnCancel:true,
            autoCancel: true,
            filed1:'sid',
            filed2:'level',
            filed3:'dateid',
            filed4:'countlimit',
            filed5:'apname',
            filed6:'flags'
 //       clicksToMoveEditor: 1,
 //       autoCancel: false
    });
    
   
    this.plugins=rowEditing1;
    this.tbar = Ext.create('Ext.PagingToolbar',{
    	store: 'MacLimStore',
      displayInfo: true,
      displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
     emptyMsg: "û�м�¼����ʾ",
     items:[
             
         '-',
     	 {
     	 	text:'����',
     	 	iconCls:'add',
     	 	 handler : function() {
                rowEditing1.cancelEdit();    
                  
                 var r = Ext.create('proauthMobileAccount.model.macModel', {  
                 	  level:'1',             	  
                    dateid: '1',
                    flags:'0'
                                      
                                   
                });
               var store = Ext.ComponentQuery.query('maclimlist')[0].getStore();

              store.insert(0, r);
               rowEditing1.startAdd1(0,0);
            
       //     rowEditing.startEdit(0, 0);
              }
     	 	
     	 	
//     	 	action:'add'
     	},'-',
     	 {
     	 	text:'ɾ��',
     	 	itemId: 'removeButton4',
     	 	iconCls:'remove',
     	 	disabled: true,
     	 	action:'del'
     	},'-'
     	]
    }
    );
    
    
   
  	
    this.columns = [
      {header: '�澯����', dataIndex: 'level', width:100, sortable: true,
      	renderer:function(value,metaData,record){
      		if(value=='1'){return '<font color=green>һ��</font>'}
          else if(value=='2'){return '<font color=blue>�ж�</font>'}
					else if(value=='3'){return '<font color=red>����</font>'}  
      	},
      	editor: {
          xtype: 'combo',
       
          store: Ext.create('Ext.data.Store', {
                                    fields : ['classname', 'classid'],
                                    data   : [
                                   {"classid":"1","classname":"һ��"},
                                   {"classid":"2","classname":"�ж�"},
                                    {"classid":"2","classname":"����"}                                                                    
                                    ]
            }),
           displayField: 'classname',
           valueField:'classid',
            queryMode: 'local',
				   value:'2',
           allowBlank: true
            
    
            }
      	
      	
      	},
      {header: 'ͳ��ʱ���',dataIndex: 'dateid',width:160, sortable: false,
      	  editor: {
      	 
      	  emptyText:'ѡ��ͳ��ʱ����',
          xtype: 'combo',
                 store: Ext.create('Ext.data.Store', {
                                    fields : ['classname', 'classid'],
                                    data   : [
                                   {"classid":"1","classname":"ÿ����"},
                                   {"classid":"2","classname":"ÿСʱ"},
                                    {"classid":"3","classname":"ÿ��"}                                                                    
                                    ]
            }),
           displayField: 'classname',
           valueField:'classid',
            queryMode: 'local',
				   value:'',
           allowBlank: true

    
            },
      	   renderer:function(value,metaData,record){
      		if(value=='1'){return '<font color=green>ÿ����</font>'}
          else if(value=='2'){return '<font color=blue>ÿСʱ</font>'}
					else if(value=='3'){return '<font color=red>ÿ��</font>'}  
      	}
      	
      	},
      {header: '�ն�����ֵ',dataIndex: 'countlimit',width:160, sortable: false,editor: {emptyText:'�����÷�ֵ���澯',allowBlank:true}},
       {header: 'AP���',dataIndex: 'apname',width:160, sortable: false,editor: {emptyText:'��Ϊȫ��',allowBlank:true}}
       ,{header: '״̬', dataIndex: 'flags', width:100, sortable: true,
      	renderer:function(value,metaData,record){
      		if(value=='0'){return '<font color=green>����</font>'}
					else if(value=='1'){return '<font color=red>ͣ��</font>'}  
      	},
      	editor: {
          xtype: 'combo',
       
          store: Ext.create('Ext.data.Store', {
                                    fields : ['classname', 'classid'],
                                    data   : [
                                   {"classid":"0","classname":"����"},
                                   {"classid":"1","classname":"ͣ��"}                                                                   
                                    ]
            }),
           displayField: 'classname',
           valueField:'classid',
            queryMode: 'local',
				   value:'2',
           allowBlank: true
            
    
            }
      	
      	
      	},
      	{flex:1}
      
      
    ];

    this.callParent(arguments);
  }
    
});