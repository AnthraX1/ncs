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
              grid.down('#shButton').setDisabled(selections.length == 0);
                
            }
        }
    
    });
    this.selModel=sm;
    this.tbar = Ext.create('Ext.PagingToolbar',{
    	store:'List',
      displayInfo: true,
      displayMsg: '显示{0} - {1}条记录 共{2}条记录',
     emptyMsg: "没有记录可显示",
     items:[
                  {
               xtype:'textfield',
               id:'keyword_dwgl',
               width:160,
               name:'keyword5',
               style:'color:#7aa7d5',             
               emptyText:'AP名称/Mac/安装地址/线路/车辆',
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
                action:'keycx'
   
            },
         '-',
   
     	 {
     	 	text:'增加',
     	 	iconCls:'add',
     	 	action:'add'
     	},'-',
     	 {
     	 	text:'删除',
     	 	itemId: 'removeButton',
     	 	iconCls:'remove',
     	 	disabled: true,
     	 	action:'del'
     	},'-',
     	 {
     	 	text:'审核',
     	 	itemId: 'shButton',
     	 	iconCls:'add',
     	 	disabled: true,
     	 	action:'sh'
     	}
     	,
     	 {xtype:'label', html:'<span id="titledx"></span>'}
     	]
    }
    );
    
    
   
  	
    this.columns = [
     {
          header: '编辑',
            xtype: 'actioncolumn',
            dataIndex: 'userid',
             icon: '/images/v4/edit_task.png',
            tooltip: '点击该图标进入修改AP信息界面。',
            width: 40,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                proauthApset.controller.Procy.show_add(record,record.get('gwid'));
          }
    
        },
		 {header: '设备状态', dataIndex: 'equipstatus', width:160,sortable: true,value:'暂时为空'}
		, {header: '审核状态', dataIndex: 'flags',   width:70,
      	 renderer:function(value,metaData,record){
          if(value=='1'){return '<font color=green>已审</font>'}
          else if(value=='0'){return '<font color=red>未审</font>'};
          }
      	}, {header: '采集设备名称',     dataIndex: 'gwid',width:120, sortable: true},
      {header: '采集设备类型',     dataIndex: 'aptype',width:80, sortable: true,
      	  renderer:function(value,metaData,record){
          if(value=='1'){return '固定采集设备'}
          else if(value=='2'){return '移动车载设备'}
          else if(value=='3'){return '单兵采集设备'}
          else {return '其它'}
          }
      	
      	},
        {header: '关联场所',       dataIndex: 'servicename',width:120, sortable: false},
	    {header: '采集设备经度', dataIndex: 'longitude',  width:80},
      {header: '采集设备纬度', dataIndex: 'latitude',   width:80},
    
      // {header: '场所代码',       dataIndex: 'servicecode',width:120, sortable: false},
       {header: '安全厂商名称',       dataIndex: 'fname',width:120, sortable: false},
     // {header: 'AP MAC', dataIndex: 'mac', width:170,sortable: false},
      {header: '安装地址', dataIndex: 'address', width:160,sortable: true},
	   {header: '维修记录', dataIndex: 'address', width:160,sortable: true}
     // {header: 'SSID', dataIndex: 'ssid',   width:70},
     // {header: '交通线路', dataIndex: 'line',   width:70},
     // {header: '车辆编号', dataIndex: 'plate',   width:70},
     // {header: '地图标识', hidden:true, dataIndex: 'mapid',   width:60},
     // {header: '软件版本', hidden:true, dataIndex: 'version',   width:60}
     
       
      
    ];

    this.callParent(arguments);
  }
    
});