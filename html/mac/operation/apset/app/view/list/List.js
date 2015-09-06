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
      displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
     emptyMsg: "û�м�¼����ʾ",
     items:[
                  {
               xtype:'textfield',
               id:'keyword_dwgl',
               width:160,
               name:'keyword5',
               style:'color:#7aa7d5',             
               emptyText:'�豸����/�豸��ַ/',
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
     	 	text:'�����豸',
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
     	 	text:'���',
     	 	itemId: 'shButton',
     	 	iconCls:'add',
     	 	disabled: true,
     	 	action:'sh'
     	},{
                text:'����',
             //   iconCls:'exp',
				iconCls:'exportimg',
                handler:function(){
                document.getElementById('form1').export2.value='exp';
                document.getElementById("form1").submit();
               document.getElementById("form1").export2.value="";
                }
            }
     	,{
     	 	text:'��λ��',
     	 	itemId: 'dwz',
     	 	iconCls:'add',
     	 	action:'add_group'
     	},
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
            tooltip: '�����ͼ������޸�AP��Ϣ���档',
            width: 40,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                proauthApset.controller.Procy.show_add(record,record.get('gwid'));
          }

        },{header: '�豸״̬', dataIndex: 'flags',   width:70,
      	 renderer:function(value,metaData,record){
          if(value=='1'){return '<font color=green>����</font>'}
          else {return '<font color=red>ά��</font>'};
          }
      	},{header: '���״̬', dataIndex: 'flags',   width:70,
      	 renderer:function(value,metaData,record){
          if(value=='1'){return '<font color=green>����</font>'}
          else if(value=='0'){return '<font color=red>δ��</font>'};
          }
      	}, 
		 {header: '�ɼ��豸���',     dataIndex: 'apname',width:120, sortable: true},
        {header: '�ɼ��豸����',     dataIndex: 'disname',width:120, sortable: true},
      {header: '�ɼ��豸����',     dataIndex: 'aptype',width:80, sortable: true,
      	  renderer:function(value,metaData,record){
          if(value=='1'){return '�̶��ɼ��豸'}
          else if(value=='2'){return '�ƶ������豸'}
          else if(value=='3'){return '�����ɼ��豸'}
          else {return '����'}
          }
      	
      	},
		 {header: '��������',       dataIndex: 'servicename',width:120, sortable: false},
          {header: '�豸��ַ', dataIndex: 'address', width:160,sortable: true},
		   {header: '�ɼ��豸����', dataIndex: 'longitude',  width:80},
      {header: '�ɼ��豸γ��', dataIndex: 'latitude',   width:80},
	   {header: '��ȫ��������',       dataIndex: 'fname',width:120, sortable: false},
	   {
          header: 'ά�޼�¼',
            xtype: 'actioncolumn',
            dataIndex: 'userid',
			 hidden:true,
             icon: '/images/v4/edit_task.png',
            tooltip: '�����ͼ��鿴ά�޼�¼���顣',
            width:80,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
				alert('������������');
                proauthApset.controller.Procy.show_add(record,record.get('gwid'));
          }

        },
	   {
          header: '����ά������',
            xtype: 'actioncolumn',
            dataIndex: 'userid',
             icon: '/images/v4/edit_task.png',
            tooltip: '�����ͼ������޸�AP��Ϣ���档',
            width:80,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
				alert('������������');
                proauthApset.controller.Procy.show_add(record,record.get('gwid'));
          }

        },
		 {header: '�ϴ����ݼ��ʱ��',       dataIndex: 'uptimesteps',width:120, sortable: false, hidden:true},
        {header: '�ɼ��뾶',       dataIndex: 'redius',width:120, hidden:true,  hidden:true,sortable: false}, 
		  {header: '���ƺ���', dataIndex: 'plate', hidden:true,   width:70},	 
        {header: '��·��Ϣ', dataIndex: 'line', hidden:true,   width:70},
		{header: '����������Ϣ', dataIndex: 'model',  hidden:true,  width:70},
		{header: '����������', dataIndex: 'number', hidden:true,   width:70}
    ];

    this.callParent(arguments);
  }
    
});