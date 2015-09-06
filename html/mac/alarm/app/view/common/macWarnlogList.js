var store_warninfo = Ext.create('Ext.data.Store',{pageSize: 40,fields: ['sid','servicecode', 'mac','flags','stime','msid','ruleid','message'],idProperty: 'userid',autoLoad: true,remoteSort: true,
        		proxy: {type: 'ajax',url: '/pronline/Msg?FunName@ncsSys_WarnLog',reader: {type:'json',root: 'eimdata',totalProperty: 'totalCount'},simpleSortMode: true
        		},sorters:[{property: '',direction: 'DESC'}]});

Ext.define('proauthMobileAccount.view.common.macWarnlogList' ,{
  extend: 'Ext.grid.Panel', 
  alias : 'widget.macwarnloglist',
//  store : this.field2, 
  store:'WarnLogStore',
  height: 500, 
  title:'',
  field1: this.field1,
  columnLines: true,
  initComponent: function() {


    var sm = Ext.create('Ext.selection.CheckboxModel',{
        listeners: {
            selectionchange: function(sm, selections) {  
          	var grid=Ext.ComponentQuery.query('macwarnloglist')[0];               
            grid.down('#setStatusButton').setDisabled(selections.length == 0);
             
            }
        }
    
    });
    this.selModel=sm;

   
    this.tbar = Ext.create('Ext.PagingToolbar',{
    	store: 'WarnLogStore',
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
                                    fields : ['classid','classname'],
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
				var store = Ext.ComponentQuery.query('macwarnloglist')[0].getStore();
                store.field3=this.value;
				store.load({params:{status:store.field3}});
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
		header:'sid',
		dataIndex:'sid',
		sortable:false,
		align:'center',
		hidden:true,
		width:80	
	},
      {header: '��������', dataIndex: 'servicecode', width:120, sortable: true, 
	   editor: {
          xtype: 'combo', 
          store:store_warninfo,
           displayField: 'servicecode',
           valueField:'servicecode',
            queryMode: 'local',
           allowBlank: true
          }
	  },
      {header: 'MAC��ַ',dataIndex: 'mac',width:130, sortable: false},
      {header: '״̬', dataIndex: 'flags',  width:60,
      	renderer:function(value,metaData,record){
      		if(value=='0'){return '<font  color=green>������</font'}
         else  if(value=='1'){return '<font color=red>�Ѵ���</font'}
					   
      }},         
      {header: '�澯ʱ��',dataIndex: 'stime',width:110, sortable: false},
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
            	var pname=record.get('casename');
              var ptitle=pname+'_���ظ澯��Ϣ';
              var win = Ext.create('proauthMobileAccount.view.common.WarnlogWin',{
					        title: ptitle,
					        field1: record
					      
					
					      });
					      win.showAt(50,20); 	
              
          }
        },
         {header: '��������',dataIndex: 'ruleid',width:90, sortable: false},
         {header: '�澯����',dataIndex: 'message',width:370, sortable: false}
      
    ];

    this.callParent(arguments);
  }
    
});