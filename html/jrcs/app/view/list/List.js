Ext.define('proauthMobileAccount.view.list.List' ,{
  extend: 'Ext.grid.Panel',
  alias : 'widget.mobileaccountlist',
  store : 'List', 
  height: 650,
  title:'',
  columnLines: true,
  initComponent: function() {
    var sm = Ext.create('Ext.selection.CheckboxModel',{
        listeners: {
            selectionchange: function(sm, selections) {  
            	var grid=Ext.ComponentQuery.query('mobileaccountlist')[0];
                  
              grid.down('#removeButton').setDisabled(selections.length == 0);
    //          grid.down('#moveGroupButton').setDisabled(selections.length == 0);
    
                
            }
        }
    
    });
    this.selModel=sm;

        var whCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: '��������',
        labelWidth: 60,
        width:170,
        valueField:'value',
        displayField: 'name',
        id:'whflag',
        name : 'flag',      
        value:'',
        allowBlank: true,
        forceSelection: false,
                                    store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                     {name:"ѡ���������",value:""},
                                        {name : 'ά��',   value: '1'},
                                        {name : 'ȡ��ά��',   value: '0'}
                                                                      
                                    ]
                                })
                                ,
        queryMode: 'local',
        typeAhead: true,
                listeners: {
			          'change':function(){
			             proauthMobileAccount.controller.Procy.loadProcyListStore();
			            }
			        }
    });
    
  //  this.plugins=rowEditing;
    this.tbar = Ext.create('Ext.PagingToolbar',{
    	store:'List',
      displayInfo: true,
      displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
     emptyMsg: "û�м�¼����ʾ",
     items:[
              whCombo,
              {
               xtype:'textfield',
               id:'keyword_mobileaccount',
               width:160,
               name:'keyword5',
               style:'color:#7aa7d5',             
               emptyText:'ά������/��������/��������',
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
         '-'
     ,
     	 {xtype:'label', html:'<span id="titledx"></span>'}
     	]
    }
    );
    
    
   
  	
    this.columns = [
      {header: '��������', dataIndex: 'fname', width:120, sortable: false},
        {header: '��������', dataIndex: 'flag',  width:80,
      	         renderer:function(value,metaData,record){
                    if(value=='1'){return '<font color=red>ά��</font>'}
                  
                    else {return '<font color=green>ȡ��ά��</font>'}
                }
      	
      	},
      {header: 'ʱ��',dataIndex: 'stime',width:120, sortable: false},
      {header: '��������', dataIndex: 'servicecode', width:120,sortable: false},
      {header: '��������', dataIndex: 'servicename', width:120,sortable: false},
      {header: 'ά������', dataIndex: 'desc', flex:1},

      {header: 'ά����', dataIndex: 'wman',  width:60}
     

      
    ];

    this.callParent(arguments);
  }
    
});