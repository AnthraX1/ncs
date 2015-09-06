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
            //  grid.down('#shButton').setDisabled(selections.length == 0);
                
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
               emptyText:'����/��������/��ϵ�绰',
               enableKeyEvents:true,
               listeners:{
                 'focus':function(){
                 },
                 'keydown' : function(i,e){
                var aae=e.getKey() ; 
				var store = Ext.ComponentQuery.query('apsetlist')[0].getStore();
                if(aae==13){
				 var aa=Ext.getCmp('keyword_dwgl').value;
					//alert(aa);
                    store.load({params:{keyword:aa}});  
                }
               }
               }
             },
             {
                text:'��ѯ',
                iconCls:'accept',
               // action:'keycx'
			    handler: function(){
					//alert("��ѯ");
					var store = Ext.ComponentQuery.query('apsetlist')[0].getStore();
                 var aa=Ext.getCmp('keyword_dwgl').value;              
                if(aa!='����/��������/��ϵ�绰'){
                	store.load({params:{keyword:aa}});					
                 }
                }
   
            },
         '-',
     	 {
     	 	text:'����',
     	 	iconCls:'add',
     	 	action:'add'
     	},'-',
     	 {
     	 	text:'ɾ��',
     	 	itemId: 'removeButton',
     	 	iconCls:'remove',
     	 	disabled: true,
     	 	action:'del'
     	},'-',{
     	 	text:'����',
     	 	itemId: 'export',
     	 	iconCls:'exportimg',
     	 	disabled: true,
     	 	action:'del'
     	},'-',
		/*,'-',
     	 {
     	 	text:'���',
     	 	itemId: 'shButton',
     	 	iconCls:'add',
     	 	disabled: true,
     	 	action:'sh'
     	}*/
     	 {xtype:'label', html:'<span id="titledx"></span>'}
     	],
    }
    );
    
    
   
  	
    this.columns = [
     {
          header: '�༭',
            xtype: 'actioncolumn',
            dataIndex: 'sid',
             icon: '/images/v4/edit_task.png',
            tooltip: '������б༭��',
            width: 40,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                proauthApset.controller.Procy.show_add(record,record.get('gwid'));
          }

        },
        {header: '����',dataIndex: 'name',width:120, sortable: true},
		 {header: '��������',dataIndex: 'department',width:120, sortable: false},
          {header: '��ϵ�˵绰',dataIndex: 'phone', width:160,sortable: true},
		{header: '��ϵ����',dataIndex: 'email',  width:80},
         {header: '���½Ӿ�ʱ��',dataIndex: 'calledtime',   width:80},
	     {header: '������Ӿ���',dataIndex: 'dealcount',   width:80},
	    {header: '�Ӿ�����',dataIndex: 'calledcount',width:120, sortable: false},
	     {
          header: '�澯����',
            xtype: 'actioncolumn',
            dataIndex: 'userid',
             icon: '/images/v4/edit_task.png',
            tooltip: '�����ͼ������޸�AP��Ϣ���档',
            width:80,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
				//alert('������������');
               // proauthApset.controller.Procy.show_add(record,record.get('gwid'));
          }

        } 
    ];

    this.callParent(arguments);
  }
    
});