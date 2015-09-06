

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
				grid.down('#setStatusButton').setDisabled(selections.length == 0);             
            }
        }
    
    });
    this.selModel=sm;

      
   
    this.tbar = Ext.create('Ext.PagingToolbar',{
    	store: 'List',
      displayInfo: true,
      displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
      emptyMsg: "û�м�¼����ʾ",
     items:[
     
          {
          xtype: 'combo',
          fieldLabel: '����״̬',
          id:'clstate',
          labelWidth: 60,
          width: 160,
          store: Ext.create('Ext.data.Store', {
                                    fields : ['classname', 'classid'],
                                    data   : [
                                   {"classid":"","classname":"ȫ��"},
                                   {"classid":"0","classname":"������"},
                                    {"classid":"1","classname":"�Ѵ���"}                                                                    
                                    ]
            }),
             displayField: 'classname',
             valueField:'classid',
             queryMode: 'local',
				     value:'',
              allowBlank: true,
             listeners:{
           	"change":function(){
                var store = Ext.ComponentQuery.query('mobileaccountlist')[0].getStore();
                store.field3=this.value;
				store.currentPage = 1;
                store.load();
           	}
          }
            
    
            }
             ,   
              {
               xtype:'textfield',
               id:'keyword_warnlog',
               width:140,
               name:'keyword_warnlog',
               style:'color:#7aa7d5',             
               emptyText:'������MAC�澯���ݲ�ѯ',
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
                action:'keycx_warnlog'
   
            },
         '-',
         {
                text:'��Ϊ�Ѵ���',
                itemId: 'setStatusButton',
                iconCls:'fix',
                disabled: true,
                action:'setstatus'
   
            }
     	]
    }
    );
    
    
   
  	
    this.columns = [
	  {
        header: 'sid',
        dataIndex: 'sid',
		id:'sid',
        sortable: false,
        align:'center',
        hidden:true,
        width: 80	
      },
      {header: '��������', dataIndex: 'servicecode', width:120, sortable: true,
	   editor: {
          xtype: 'combo', 
          displayField: 'servicecode',
          valueField:'servicecode',
          queryMode: 'local',
          allowBlank: true
      }},
      {header: 'MAC��ַ',dataIndex: 'mac',width:130, sortable: false},
      {header: '״̬', dataIndex: 'flags',  width:60,
      	renderer:function(value,metaData,record){
      		if(value=='0'){return '<font  color=green>������</font'}
         else  if(value=='1'){return '<font color=red>�Ѵ���</font'}
					   
      }},         
      {header: '�澯ʱ��',dataIndex: 'stime',width:140, sortable: false},
      {
          header: '������־',
            xtype: 'actioncolumn',
            dataIndex: 'sid',
            icon: '/newver/resources/themes/images/share/List.png',
            tooltip: '�����ͼ��鿴�澯��Ϣ��',
            width: 60,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
              //����������
              var pname=record.get('ruleid');
              var ptitle=pname+'_������־��Ϣ';
			  var store = Ext.ComponentQuery.query('mobileaccountlist')[0].getStore();
			  store.field5 = record.get('sid');
			  store.field6 = record.get('stime');
			  
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
         {header: '��������',dataIndex: 'ruleid',width:90, sortable: false},
         {header: '�澯����',dataIndex: 'message',width:380, sortable: false}
      
    ];

    this.callParent(arguments);
  }
    
});