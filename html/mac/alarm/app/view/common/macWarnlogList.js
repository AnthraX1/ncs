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
      displayMsg: '显示{0} - {1}条记录 共{2}条记录',
     emptyMsg: "没有记录可显示",
     items:[
     
          {
          xtype: 'combo',
          fieldLabel: '处理状态',
          id:'clstate',
          labelWidth: 60,
          width: 160,
          store: Ext.create('Ext.data.Store', {
                                    fields : ['classid','classname'],
                                    data   : [
                                   {"classid":"","classname":"全部"},
                                   {"classid":"0","classname":"待处理"},
                                    {"classid":"1","classname":"已处理"}                                                                    
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
               emptyText:'请输入MAC告警内容查询',
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
                text:'查询',
                iconCls:'accept',
                action:'keycx_warnlog'
   
            },
         '-',
         {
                text:'设为已处理',
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
      {header: '上网场所', dataIndex: 'servicecode', width:120, sortable: true, 
	   editor: {
          xtype: 'combo', 
          store:store_warninfo,
           displayField: 'servicecode',
           valueField:'servicecode',
            queryMode: 'local',
           allowBlank: true
          }
	  },
      {header: 'MAC地址',dataIndex: 'mac',width:130, sortable: false},
      {header: '状态', dataIndex: 'flags',  width:60,
      	renderer:function(value,metaData,record){
      		if(value=='0'){return '<font  color=green>待处理</font'}
         else  if(value=='1'){return '<font color=red>已处理</font'}
					   
      }},         
      {header: '告警时间',dataIndex: 'stime',width:110, sortable: false},
       {
          header: '关联日志',
            xtype: 'actioncolumn',
            dataIndex: 'sid',
            icon: '/newver/resources/themes/images/share/List.png',
            tooltip: '点击该图标查看告警信息。',
            width: 60,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
            	var pname=record.get('casename');
              var ptitle=pname+'_布控告警信息';
              var win = Ext.create('proauthMobileAccount.view.common.WarnlogWin',{
					        title: ptitle,
					        field1: record
					      
					
					      });
					      win.showAt(50,20); 	
              
          }
        },
         {header: '触发规则',dataIndex: 'ruleid',width:90, sortable: false},
         {header: '告警描述',dataIndex: 'message',width:370, sortable: false}
      
    ];

    this.callParent(arguments);
  }
    
});