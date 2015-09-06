var g_groupidquery = ""; 
var g_usernamequery = "";
var g_dispname;


function ghostsearch(value, p, record){
	var str = Ext.String.format('<a href="#" style="color:blue" onclick="jmpPage(\'{1}\')">{0}</a>', value, value);
	//alert(str);
	return str;
}

/* ��ʷssid�б� */
function ghostsearchssid(value, p, record){
	var str = Ext.String.format('<a href="#" style="color:blue" onclick="searchssid(\'{1}\')">{0}</a>', '��ʷssid�б�', '��ʷssid�б�');
	//alert(str);
	return str;
}


function searchssid(){
	var rows = Ext.getCmp('id_maclogtable').getSelectionModel();
	var macvalue = [];
	for(var i = 0; i <rows.selected.items.length;i++){											
			macvalue.push([rows.selected.items[i].data.mac]);			
	}
	
	var tabPaneledit = new Ext.Panel({
			frame: true,
      layout: 'form',
      activeTab: 0,
			items:[{
				html: '<iframe src="/mac/infoquery/macterm/historyssid/historyssid.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
			}]			
		});
		
	var win7 = Ext.widget('window', {
  	title: '��ǰmac��' + macvalue ,    
    x:20,
    y:80,
    width: 940,
		height: 490,
		id: 'id_historyssid',
    resizable: false,
    draggable:true,
    modal:true,
    items: tabPaneledit
  });
       
	win7.show();			
}	


/* �����ֻ������� */
function setFieldVname(vname){
	Ext.getCmp("keyword_mobileaccount").setValue(vname);
	var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
	store.load({params:{vname:vname}});
} 
 
 
/* ���ó������ƣ�ֱ�ӿ��ں�̨��ѯ ncsuser ���е� username */
function setSearchValue(typename, dispname){
	
	g_dispname = dispname;
	
  /* ������ mac ���õ������ */
	Ext.getCmp("keyword_mobileaccount").setValue( '@' + dispname + '@');			
	if(typename == '0'){		
		try{
			
			g_groupidquery = parent.getGlobalGroupId();	
						
		}
		catch(e){
			alert(e.message);
		}		
	}
	else{		
		try{
									
			g_usernamequery = parent.getGlobalUserName();
						
		}
		catch(e){
			alert(e.message);
		}		
	}	
				
	var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
	
	// ��� callback ��ȡjson��ȥ������������дԭ���� tbar �е� displayMsg  
	store.load({callback : function(r, option, success) {   
            	 var responseText =  eval("("+option.response.responseText+")");        		                
               var g_distinctCount = "";
               g_distinctCount = responseText.distinctCount;
              
               var playInfo = Ext.getCmp('id_tbar_paging');
               playInfo.displayMsg = '��ʾ{0} - {1}����¼ ��{2}����¼,ȥ�غ�<span style="color:red;font-size:1.5em">' + g_distinctCount + '</span>����¼';
              
               playInfo.doRefresh();	
               
   }}); 
}
  
 
function setFieldMac(mac){
	Ext.getCmp("keyword_mobileaccount").setValue(mac);
	
	var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
	store.load({params:{mac:mac}});	
}


function copy_to_clipboard(text) {
    try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    } catch (e) {
        alert('����Firefox��ȫ���������������м�������������"about:config"��"signed.applets.codebase_principal_support"����Ϊ"true"֮�����ԡ�');
        return false;
    }
    var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
    if (!clip)
        return;
    var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
    if (!trans)
        return;
    trans.addDataFlavor('text/unicode');
    var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
    str.data = text;
    trans.setTransferData("text/unicode", str, text.length * 2);
    var clipid = Components.interfaces.nsIClipboard;
    if (!clip)
        return false;
    clip.setData(trans, null, clipid.kGlobalClipboard);
}

function jmpPage(mac){
	
	
	
	Ext.getCmp("keyword_mobileaccount").setValue(mac);
  var timeFlag = Ext.getCmp('time_flag').value;  
  parent.showMacWindow(mac, timeFlag);
  
	window.clipboardData.setData('text', mac);				
	copyToClipboard(mac);
	//copy_to_clipboard(mac);
	
	Ext.getCmp("keyword_mobileaccount").setValue(mac);	
				
	//parent.jumpToDestPage('itm_infoquery_mac', "ncViewer.mac_infoquery_mac","MAC��־��ѯ");
	//mac;
}

Ext.define('proauthRzAuthlog.view.list.List1', {
	extend:'Ext.panel.Panel',
    alias : 'widget.myselfPanel',
    tbar: [
		{
			fieldLabel:'��ѡ��ʱ��',
			labelWidth: 70,
			xtype:'combo',mode:'local',                          
            triggerAction:  'all',
            forceSelection: true,
            width:170,
            editable:       false,   
            id:             'time_flag',                           
            name:           'time_flag',
            displayField:   'name',
            valueField:     'value',
            queryMode:     'local',
            store: Ext.create('Ext.data.Store', 
            {
                fields : ['name', 'value'],
                data   : 
                [
                    {name : '����',   value: '1'},
                    {name : '�������',  value: '2'},
                    {name : '���һ��',  value: '3'},
                    {name : '���һ��',   value: '4'},
                    {name : '�������',  value: '5'},
                    {name : '�������',  value: '6'}
                ]
            }),
            emptyText:'����',allowBlank:true
        },
		'-',
		{
			fieldLabel:'������ؼ���',
			labelWidth: 80,	
            xtype:'textfield',
            id:'keyword_mobileaccount',
            width:260,
            name:'export',
            //style:'color:#7aa7d5',             
            emptyText:'������MAC��Ϣ: XX-XX-XX-XX-XX-XX',
						//value: '64-27-37-23-5B-7C',			
						value: '',
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
        },'-',{
            text:'��ѯ',
            iconCls:'accept',
            action:'keycx'
        },'-',{
            text:'�߼�',
            anchor: 'right',
            action:'advancecx',
            iconCls:'option'
       }     
    ]
});

Ext.define('proauthRzAuthlog.view.list.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.authloglist',
    store : 'List', 
    height:parent.grid_height+25,
    width:parent.grid_width,	
    id:'id_maclogtable',
		//renderTo: 'contenttbar',
    autoScroll: true,    
		//forceFit: true,
		scrollOffset: 0,
    title:'',
    columnLines: true,
    initComponent: function() {	
		var sm = Ext.create('Ext.selection.CheckboxModel',{
            listeners: {
                selectionchange: function(sm, selections) {  
                    var grid=Ext.ComponentQuery.query('authloglist')[0];
                }
            }
    });
    this.selModel=sm;
		
		this.tbar = Ext.create('Ext.PagingToolbar',{
            store:'List',
            displayInfo: true,
            id:'id_tbar_paging',
            autoWidth:true,
            displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
            emptyMsg: "û�м�¼����ʾ",
            items:[
				'-',
				'-',
                {
                    text:'��������',
                    anchor: 'termacttrait',
                    action:'termac',
                    iconCls:'tezhengfenxi'
                },
				'-',
                {
                    text:'��Ա�켣',
                    anchor: 'termmap',
                    action:'termmacmap',
                    iconCls:'renyuanguiji'
                },
				'-',
                {
                    text:'��ݲ鿴',
                    anchor: 'idedit',
                    action:'idcheck',
                    iconCls:'shenfenchakan'
                },
				'-',
				{
                    text:'�������',
                    anchor: 'right',
                    action:'joingroup',
                    iconCls:'jiarufenzu',
                    //disabled:true
                    disabled:false
                },
				'-',
                {
                    text:'����',
                    anchor: 'termexport',
                    action: 'export',
                    iconCls: 'exportimg'          
					
                },
                {xtype:'label', html:'<span id="titledx"></span>'}
            ]
        });
						
        this.columns = [
        			
      {header: '�ն�MAC��ַ', dataIndex: 'mac', width:130,
				renderer: ghostsearch
			},
			{header: '������֤�˺�', dataIndex: 'vname',  flex: 1},
			{header: '�ɼ�ʱ��', dataIndex: 'stime',   flex: 1},			
			{header: '�ն˳�ǿ', dataIndex: 'rssi',   flex: 1},					
			{header: '��������', dataIndex: 'servicename', flex: 1},			
			{header: '�ɼ��豸����', dataIndex: 'dispname', flex: 1, hidden: true},								
			{header: '�������', dataIndex: 'servicecode',  flex: 1, hidden: true},            
      {header: '�ɼ��豸���', dataIndex: 'apname', flex: 1}, 
			{header: '�ɼ��豸����', dataIndex: 'longitude', flex: 1},
      {header: '�ɼ��豸γ��', dataIndex: 'latitude', flex: 1},			            
			{header: '�ն�Ʒ��', dataIndex: 'termtype', flex: 1},			              			
      //{header: '�ն���ʷSSID�б�', dataIndex: 'apssid', flex: 1, sortable: true, hidden: true},
			{header: '��Բɼ��豸X����', dataIndex: 'xpos', flex: 1, hidden: true},
      {header: '��Բɼ��豸Y����', dataIndex: 'ypos', flex: 1, hidden: true},
			{header: '�����ȵ�SSID', dataIndex: 'ssid', flex: 1},
			{header: '��ʷSSID�б�', dataIndex: 'historyssid', flex: 1,
				/*renderer:function(value,metaData,record){
					if(value == '0'){
						return '��ʷssid�б�'
					}
        	else {
						return '��ʷssid�б�'
					}				
				},*/ 
				renderer: ghostsearchssid
			},	
			{header: '�����ȵ�MAC', dataIndex: 'apmac', flex: 1, hidden: true,
				renderer: ghostsearch
			},
			{header: '�����ȵ�Ƶ��', dataIndex: 'channel', flex: 1},
			{header: '�����ȵ��������', dataIndex: 'security', flex: 1,
            	 renderer:function(value,metaData,record){
                    if(value=='01'){return 'WEP'}
                    else if(value=='02'){return 'WPA'}
                    else if(value=='03'){return 'WPA2'}
                    else if(value=='04'){return 'PSK'}
                    else if(value=='99'){return '����'}
                    else {return ''}
                }            	
            }			            
        ];	
		
		this.callParent(arguments);	
    }	
});



