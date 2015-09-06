Ext.define('proauthApset.view.list.List' ,{
  extend: 'Ext.grid.Panel',
  alias : 'widget.apsetlist',
  store : 'List', 
  height:parent.grid_height,
  width:parent.grid_width,
  autoScroll: true,
  title:'',
  columnLines: true,
  initComponent: function() {
    var sm = Ext.create('Ext.selection.CheckboxModel',{
        listeners: {
            selectionchange: function(sm, selections) {  
            	var grid=Ext.ComponentQuery.query('apsetlist')[0];
              grid.down('#removeButton').setDisabled(selections.length == 0);
             // grid.down('#shButton').setDisabled(selections.length == 0);
                
            }
        }
    
    });
    this.selModel=sm;
    this.tbar = Ext.create('Ext.PagingToolbar',{
    	store:'List',
      displayInfo: true,
      displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
     emptyMsg: "û�м�¼����ʾ",
     items:[
                  {
               xtype:'textfield',
               id:'keyword_dwgl',
               width:160,
               name:'keyword5',
               style:'color:#7aa7d5',             
               emptyText:'����������',
               enableKeyEvents:true,
               listeners:{
                 'focus':function(){
                 },
         
                 'keydown' : function(i,e){
                var aae=e.getKey(); 
                if(aae==13){
                   proauthApset.controller.Procy.loadProcyListStore();
			//	var  store=Ext.ComponentQuery.query('apsetlist')[0].getStore();
				var   keyword=Ext.getCmp('keyword_dwgl').value;
				store.load({params:{keyword:keyword}});       
                }
               }
               }
             },
             {
                text:'��ѯ',
                iconCls:'accept',
                action:'keycx'
   
            },
         '-',{
     	 	text:'ɾ��',
     	 	itemId: 'removeButton',
     	 	iconCls:'remove',
     	 	disabled: true,
     	 	action:'del'
     	},'-',
     	 {
     	 	text:'���ӷ���',
     	 	iconCls:'add',
     	 	action:'add'
     	},
     	 '-',{
     	 	text:'�������Ա',
     	 	iconCls:'add',
     	 	action:'addgroup'
     	},
     	 /*{
     	 	text:'���',
     	 	itemId: 'shButton',
     	 	iconCls:'add',
     	 	disabled: true,
     	 	action:'sh'
     	}
     	,*/
     	 {xtype:'label', html:'<span id="titledx"></span>'}
     	]
    }
    );
    
    
   
  	
    this.columns = [
     {
          header: '�༭',
            xtype: 'actioncolumn',
            dataIndex: 'groupid',
             icon: '/images/v4/edit_task.png',
            tooltip: '�����ͼ������޸��ն���Ϣ��',
            width: 40,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                proauthApset.controller.Procy.show_add(record,record.get('gwid'));
          }
    
        },{header: '�ն˷�������',     dataIndex: 'groupname',width:150, sortable: true,flex:1},
        {header: '�ն˷����Ա��Ϣ',       dataIndex: 'mac',width:150, sortable: false,flex:1},
	    {header: '��������', dataIndex: 'groupdesc',  width:150,flex:1},
	   {
          header: '������������',
            xtype: 'actioncolumn',
            dataIndex: 'glfxtask',
             icon: '/images/v4/edit_task.png',
            tooltip: '�����ͼ������޸��ն���Ϣ��',
            width: 80,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                proauthApset.controller.Procy.show_add(record,record.get('gwid'));
          }
    
        }
    ];

    this.callParent(arguments);
  }
    
});