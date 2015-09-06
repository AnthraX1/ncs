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
               emptyText:'�ȵ�SSID/��ϵ��',
               enableKeyEvents:true,
               listeners:{
                 'focus':function(){
                
                 },
                 'keydown' : function(i,e){
                var aae=e.getKey() ; 
                if(aae==13){
                    var aa=Ext.getCmp('keyword_dwgl').value;
					var store = Ext.ComponentQuery.query('apsetlist')[0].getStore();
					store.load({params:{keyword:aa}});  
                }
               }
               }
             },
             {
                text:'��ѯ',
                iconCls:'accept',
                action:'keycx'
            },'-',{
     	 	text:'����',
     	 	itemId: 'importButton',
     	 	iconCls:'exp',
     	 	action:'import'
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
                text:'����',
				iconCls:'exportimg',
                handler:function(){
                document.getElementById('form1').export2.value='exp';
				document.getElementById('form1').limit.value='40';
				//document.getElementById('form1').page.value=Ext.getCmp("pagtool").store.currentPage;
				document.getElementById('form1').keyword.value=Ext.getCmp('keyword_dwgl').value;  
                document.getElementById("form1").submit();
               document.getElementById("form1").export2.value="";
                }
            }
     	,
     	 {xtype:'label', html:'<span id="titledx"></span>'}
     	]
    }
    );
    
    
   
  	
    this.columns = [
	
     {
          header: '�༭',
            xtype: 'actioncolumn',
            dataIndex: 'hotspotid',
            icon: '/images/v4/edit_task.png',
            tooltip: '�����ͼ���޸��ȵ���Ϣ��',
            width: 40,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                proauthApset.controller.Procy.show_add(record,record.get('ssid'));
          }
    
        },{	
			header: '�Ƿ�Ϲ�',
            flex:1, 			
			dataIndex: 'authflag',
			width:80, 
			sortable: true,
			renderer:function(value,metaData,record){
			if(value=='1'){return '�Ϲ�'}
			else {return '���Ϲ�'}
          }     	
      	},
		{header: '�ȵ�SSID', dataIndex:'ssid',width:100,sortable: true},			
		{
			header: '�ȵ��������',
			dataIndex: 'security',
			flex:1, 
			width:120, 
			sortable: false,
			renderer:function(value,metaData,record)
			{
				if(value=='01'){return '<font color=black>WEB</font>'}
				else if(value=='02'){return '<font color=black>WPA</font>'}
				else if(value=='03'){return '<font color=black>WPA2</font>'}
				else if(value=='04'){return '<font color=black>PSK</font>'}
				else   {return '<font color=black>����</font>'}
			}
		},
		{
			header: '������������',  
			dataIndex: 'servicetype',
			flex:1, 
			width:120, 
			sortable: true,
			renderer:function(value,metaData,record)
			{
				if(value=='1'){return '<font color=green>�Ƶ����</font>'}
				else if(value=='2'){return '<font color=green>ͼ���������</font>'}
				else  if(value=='3') {return '<font color=green>ѧУ</font>'}
				else  if(value=='4') {return '<font color=green>���ֳ���</font>'}
				else  if(value=='5') {return '<font color=green>һ����ҵ</font>'}
				else   {return '<font color=green>����</font>'}
			}
		},
		{
			header: '������Ӫ����',
			dataIndex: 'servicequlity',
			flex:1,
			width:100,
			renderer:function(value,metaData,record)
			{
				if(value=='0'){return '<font color=green>��Ӫ</font>'}
				else if(value=='1'){return '<font color=red>�Ǿ�Ӫ</font>'}
				else   {return '<font color=red>����</font>'}
			}
      	},  
			{
			header: '�ȵ�MAC', 
			dataIndex: 'mac',
			flex:1,
			width:80,
			renderer:proauthApset.controller.Procy.mac_search
			},
			{header: '��ϵ��', dataIndex: 'ISPname',  flex:1,  width:80},
			{header: '��ϵ�绰',dataIndex: 'ISPphone',flex:1, width:120, sortable: false},  
			{header: '��Ӫ��������',dataIndex: 'ISPemail',width:120, flex:1, sortable: false}  
    ];

    this.callParent(arguments);
  }
    
});