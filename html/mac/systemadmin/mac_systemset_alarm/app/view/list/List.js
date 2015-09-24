Ext.define('proauthApset.view.list.List' ,{
  extend: 'Ext.grid.Panel',
  alias : 'widget.apsetlist',
  store : 'List', 
  height:parent.grid_height,
  width:parent.grid_width,
  autoScroll: true,
  title:'',
  id:'id_store_list',
  columnLines: true,
  initComponent: function() {
    var sm = Ext.create('Ext.selection.CheckboxModel',{
        listeners: {
            selectionchange: function(sm, selections) {  
            	var grid=Ext.ComponentQuery.query('apsetlist')[0];
                  
             // grid.down('#removeButton').setDisabled(selections.length == 0);
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
                  {xtype:'combo',
					mode:'local',                          
                    triggerAction:  'all',
                    forceSelection: true,
					fieldLabel:'�ϱ�ʱ��',
					labelWidth: 60,
                    width:120,
                    editable:       false,   
                    id:'time_flag',                           
                    name:'time_flag',
                    displayField:'name',
                    valueField:'value',
                    queryMode:'local',
                    store: Ext.create('Ext.data.Store', 
                    {
                        fields : ['name', 'value'],
                        data   : 
                        [   {name:'ȫ��',value:'100'},
                            {name : '����',   value: '1'},
                            {name : '�������',  value: '2'},
                            {name : '���һ��',  value: '3'},
                            {name : '���һ��',   value: '4'},
                            {name : '�������',  value: '5'},
                            {name : '�������',  value: '6'}
                        ]
                    }),
                    emptyText:'ȫ��',allowBlank:true,
					listeners: {
					'change':function(){
			        document.getElementById('form1').time_flag.value=this.value;
					reflash();
					}
					}
                },'-',
				{
					xtype:'combo',
					mode:'local',                          
                    triggerAction:  'all',
                    forceSelection: true,
					fieldLabel:'�澯����',
					labelWidth: 58,
                    width:140,
                    editable:false,   
                    id:'Alarm_reason',                           
                    name:'Alarm_reason',
                    displayField:'name',
                    valueField:'value',
                    queryMode:'local',
					typeAhead: true,
                    store: Ext.create('Ext.data.Store', 
                    {
                        fields : ['name', 'value'],
                        data   : 
                        [
						    {name : 'ȫ��',  value: '3'},  
                            {name : '�豸����',  value: '1'},
                            {name : '��������',  value: '2'}
                           
                        ]
                    }),
                    emptyText:'ȫ��',
					allowBlank:true,
					listeners: {
					'change':function(){
						document.getElementById('form1').Alarm_reason.value=this.value;
						SetPage();
						reflash();
					}
					}
                },'-',
				{
					xtype:'combo',
					mode:'local',                          
                    triggerAction:'all',
                    forceSelection: true,
					fieldLabel:'�澯״̬',
					labelWidth: 58,
                    width:140,
                    editable:false,   
                    id:'isAlarm',                           
                    name:'isAlarm',
                    displayField:'name',
                    valueField:'value',
                    queryMode:'local',
					typeAhead: true,
                    store: Ext.create('Ext.data.Store', 
                    {
                        fields : ['name', 'value'],
                        data   : 
                        [
							{name : 'ȫ��',  value: '3'}, 
                            {name : '��ȷ��',  value:'0'},
                            {name : '��ȷ��',  value:'1'}
                            
                        ]
                    }),
                    emptyText:'ȫ��',
					allowBlank:true,
					listeners: {
						'change':function(){
							document.getElementById('form1').isAlarm.value=this.value;
							reflash();
						}
					}
                }, {
               xtype:'textfield',
               id:'keyword_ywgj',
               width:160,
               name:'keyword_ywgj',
               style:'color:#7aa7d5',             
               emptyText:'�澯����/����',
               enableKeyEvents:true,
               listeners:{
                 'focus':function(){
                 },
                 'keydown' : function(i,e){
                var aae=e.getKey() ; 
				var store = Ext.ComponentQuery.query('apsetlist')[0].getStore();
                if(aae==13){
					 var aa=Ext.getCmp('keyword_ywgj').value;
					document.getElementById('form1').keyword.value=aa;
                      reflash();
                }
               }
               }
             },
             {
                text:'��ѯ',
                iconCls:'accept',
				handler:function(){
				var aa=Ext.getCmp('keyword_ywgj').value;
                if(aa!='�澯����/����'){
					document.getElementById('form1').keyword.value=aa;
					 reflash();
				}				
					
				}
            },'-',{
                text:'����ȷ��',
                iconCls:'all_accept',
				handler:function(){
					var store = Ext.ComponentQuery.query('apsetlist')[0].getStore();
					 if(confirm('���Ҫִ������ȷ�ϲ�����')){                  
                 var selsid;  
                 var rows=sm.getSelection();
                   selsid='';
                  for(var i=0;i<rows.length;i++){
                  	if(i==0){
                  	// selsid=rows[i].getId();
					 selsid="\'" + rows[i].get('sid') + "\'";
                  	}
                  	else{
                      selsid="\'" + rows[i].get('sid') + "\'"+ ","+selsid;
                    }
                   
                   }
                
                    var aa=Ext.getCmp('keyword_ywgj').value;
                     if(aa=='�߼�����/����'){
                     		aa='';
                     }
					 //alert(selsid);
                      store.load({params: {handle:"handle",sid:selsid,keyword:aa,status:1}});
					   reflash();
					
              }
					
				}
            },
 
     	 {xtype:'label', html:'<span id="titledx"></span>'}
     	]
    }
    );
    
    
   
  	
    this.columns = [
         {
			header: 'sid', 
			dataIndex: 'sid',
			width:170,
			sortable:true,
			hidden:true,
			//value:'��ʱΪ��'
		},{
			header:"�Ƿ�ȷ�ϸ澯",
			dataIndex: 'status',
			icon:'/newver/resources/themes/images/share/queren.jpg',
			renderer: function (value, metaData, record){
				var sid=record.get('sid');
				if (value ==0){ 
					return '<input type="button"  value="ȷ��" style="background:#00B1F1; color:#FFF; width:60px;" onclick="status_change('+sid+')"/>'
				}else{ 
					return  '<input disabled="disabled" type="button" value="ȷ��" style="background:#CBDBEF; color:#FFF; width:60px;" />' 
				}					
            }			
		},
	/*�޸�ʱ�䣺2015-9-15 10:16:31			
		{
			header: '�澯����', 
			dataIndex: 'alarmcode',
			width:170,sortable: true,
			value:'��ʱΪ��'
		},
		*/
		{header: '�澯����',	//�澯����
		dataIndex: 'alarmcode',
		width:170, 
		sortable: true,
		renderer:function(value,metaData,record)
			{
				if(value=='10007'){return '<font color=black>�������߸澯</font>'}
				else if(value=='10008'){return '<font color=black>�������߸澯���</font>'}
				else if(value=="10011"){return '<font color=black>�豸���߸澯</font>'}
				else if(value=="10012"){return '<font color=black>�豸���߸澯���</font>'}
				else {return '<font color=black>����</font>'}
			}
		},
		{
			header: '�澯����',   
			dataIndex: 'alarmlevel',
			width:170, 
			sortable: true,
			renderer:function(value,metaData,record)
			{
				if(value=='1'){return '<font color=black>����</font>'}
				else if(value=='2'){return '<font color=black>��֤</font>'}
				else {return '<font color=black>һ��</font>'}
			}
		},
		/*
		{
			header: '�澯��Դ',  		
			dataIndex: 'devtype',
			width:170, 
			sortable: false,
			renderer:function(value,metaData,record)
			{
				if(value=='1'){return '<font color=black>AP</font>'}
				else if(value=='2'){return '<font color=black>����</font>'}
				else if(value=='3'){return '<font color=black>��������</font>'}
				else if(value=='4'){return '<font color=black>�ϼ�ƽ̨</font>'}
				else {return '<font color=black>����</font>'}
			}		
		},*/
		
	    {header: '�澯��Դ', dataIndex: 'description',  width:170,renderer:descripwin1},		//�澯����
       {header: '�澯�ϱ�ʱ��', dataIndex: 'alarmtime',   width:170},
       {header: '�澯����ʱ��',dataIndex: 'updatetime',width:170, sortable: false}
		
    ];

    this.callParent(arguments);
  }
});  

function descripwin1(value, p, record){
	//var sid=record.get('sid');
	var str = Ext.String.format('<a href="#" style="color:blue" onclick="detailWin(\'{1}\')">{0}</a>',value,value);
	
	return str;
}

function detailWin(value){
	//��ȡ������
	//var rows = Ext.getCmp('id_store_list').getSelectionModel();
	//var sid = rows.selected.items[0].data.sid;

	
	var itemRush=[];
	var username = "";			//��������
	var userDispname = "" ;		//������
	var groupname = "";			//��������
	var address = "";			//������ַ
	var totalCount = 0;			//�豸����
	var data =[] ;
	var jyxz;					//��Ӫ����
	var groupcode ="";			//1->��Ӫ�ԡ� 2->�Ǿ�Ӫ�ԡ� 3->���߲ɼ�ǰ��
	var status;					//���ߡ�����
	var statuscode;				//1->���ߡ� 2->����

	Ext.Ajax.request({
			url: '/pronline/Msg?FunName@ncsSysystem_alarmOne&dispname@'+value, 
			method: 'GET',
			success: function(resp,opts) {
				try{
					var respRecord =  resp.responseText;
					var record = eval("("+respRecord+")");	//�ַ���ת�ɽṹ��	
									
					
					username = record.username;
					userDispname = record.userDispname;
					groupname = record.groupname;
					address = record.address;
					groupcode = username[6];
					
					totalCount = record.totalCount;
					data = record.data;
					//�жϾ�Ӫ����
					
					switch(groupcode){
						case "1":
							jyxz = "��Ӫ��";
							break;
						case "2":
							jyxz = "�Ǿ�Ӫ��";
							break;
						case "3":
							jyxz = "���߲ɼ�ǰ��";
							break;
						default:
							jyxz = "����";
							break;
					}
					if(address==""){
						address='��';
					}
					
					itemRush.push(
						{html:'<a align="left"><b>��������</b></a>' + '<a align="right">'+ groupname+'</a>'},
						{html:'<a align="left"><b>��Ӫ���ʣ�</b></a>' + '<a align="right">' + jyxz+'</a>'},
						{html:'<a align="left"><b>�������ƣ�</b></a>' + '<a align="right">'+ userDispname+'</a>'},
						{html:'<a align="left"><b>�������룺</b></a>' + '<a align="right">' + username+'</a>'},
						{html:'<a align="left"><b>������ַ��</b></a>'},{html:'<a align="left">'+address+'</a>'},
						{html:'<a align="left"><b>�����豸�б�</b></a>'},{html:'<a align="left">'+totalCount+'</a>'}
					);
		
					for( var i=0; i< totalCount; i++){
						statuscode = data[i].statuscode;
						if(statuscode =='1'){
							status ='<font color=green>����</font>';
						}else if(statuscode =='2'){
							status ='<font color=red>����</font>';
						}
						itemRush.push({html:'<a align="left">'+data[i]['aplistDispname']+'</a>'}, 		//�豸����
							{html:'<a align="left">'+status+'</a>'}
						);
					}
					createDetailWin(itemRush);
				}catch(e){
					//console.log(e.message);
				}	
			},   
			failure: function(resp,opts) {   
				var respText = eval("("+respText+")");
				alert('����', respText.error);   
			}   				 
		});
	function createDetailWin(itemRush){	
		//��������
		var mytable = Ext.create('Ext.panel.Panel', {
			//title: '������Ϣ',
			layout: {
				type: 'table',
				columns: 2,		//����
				tableAttrs:{
					width:'100%'
				}
			},
			defaults: {
				bodyStyle: 'padding:5px',			
			},
			items:itemRush
		});
		
		var mywin = Ext.create('Ext.window.Window',{
			title:'������Ϣ',
			height:mytable.height,
			width:350,
			x:30,
			y:30,
			resizable:false,
			items:mytable
		});
		mywin.show();
	}
}
	

   
