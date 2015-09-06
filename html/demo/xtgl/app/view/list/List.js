Ext.define('proauthXtgl.view.list.List' ,{
  extend: 'Ext.grid.Panel',
  alias : 'widget.xtgllist',
  store : 'List', 
 height:parent.grid_height+5,
 autoScroll: true,
  title:'',
  columnLines: true,
  initComponent: function() {

    var sm = Ext.create('Ext.selection.CheckboxModel',{
        listeners: {
            selectionchange: function(sm, selections) {  
            	var grid=Ext.ComponentQuery.query('xtgllist')[0];
                  
              grid.down('#removeButton').setDisabled(selections.length == 0);
             
    
                
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
               id:'keyword',
               width:160,
               style:'color:#7aa7d5',             
               emptyText:'���¼��\������ѯ',
               enableKeyEvents:true,
               listeners:{
                 'focus':function(){
        
                 },
         
                 'keydown' : function(i,e){
                var aae=e.getKey() ; 
                if(aae==13){
                   proauthXtgl.controller.Procy.loadProcyListStore();
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
     	},'-',
     	 {
     	 	text:'Ȩ�޹���',
     	 	iconCls:'add',
     	 	action:'manager'
     	},'-',
		
     	 {xtype:'label', html:'<span id="titledx"></span>'}
     	]
    }
    );
    
    
   
  	
    this.columns = [
            {
          header: '�༭',
            xtype: 'actioncolumn',
            dataIndex: 'userid',
             icon: '/images/v4/edit_task.png',
            tooltip: '�����ͼ������޸ĵ�λ��Ϣ���档',
            width: 40,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
            
               proauthXtgl.controller.Procy.showedit(record.get('userid'),record);
          }

        },
      {header: '��¼��',     dataIndex: 'username', width:100, sortable: true},
      {header: '����',       dataIndex: 'dispname',width:110, sortable: false},
      {header: '��������',       dataIndex: 'groupname',width:110, sortable: false},
      {header: '��������', dataIndex: 'opt',flex:1,sortable: false        
      },
     {header: '������볧��', dataIndex: 'fac',flex:1,sortable: false},
      {header: 'Ȩ�޽�ɫ', dataIndex: 'role', flex:1,sortable: true},
      {header: '��ϵ��ʽ', dataIndex: 'email', flex:1,sortable: true},
      {header: '��ҳ��ʾ', dataIndex: 'levelname', flex:1,sortable: true}

      
    ];

    this.callParent(arguments);
  }
    
});