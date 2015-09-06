
     
 
    
        			
        			       			
Ext.define('proauthApset.view.common.AddWin' ,{
  extend: 'Ext.window.Window',
  alias : 'widget.addwin',

	title: '�Ӿ��˹���༭',
	modal: true,
	field1: null,
	field2: null,
	value1:null,
  initComponent: function() {
  	  var required='<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
       
       var facCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: '���볧��',
        labelWidth: 70,
        width: 220,
        valueField:'groupid',
        value:'',
        displayField: 'groupname',
        name : 'fcode',      
        allowBlank: false,
        afterLabelTextTpl:required,
//        forceSelection: true,
        store: store_fac,
        triggerAction: 'all',
//      queryMode:'remote',
         queryMode: 'local',
         typeAhead: true,
              listeners: {
			          'change':function(){
			           
			            }
			        }
    });
     
     
    
	
	
	
	 Ext.define('State', {
        extend: 'Ext.data.Model',
        fields: [
            {type: 'string', name: 'groupid'},
            {type: 'string', name: 'groupname'}
        ]
    });
	
	var store_fac = Ext.create('Ext.data.Store', {
        model: 'State',
        remoteSort: true,
         proxy: {
            type: 'ajax',
            url: '/pronline/Msg?FunName@ncsWebFacComp',
            reader: {
                type:'json',
                root: 'corpclassdata'              
            },         
            simpleSortMode: true
        }
    });
	
    
  	this.items = [
  	{
  	     xtype: 'form',frame:true,width:400, bodyPadding:5,
  	        items: [
  	        {xtype:'hidden',id:'sid',name:'sid',value:''},
            {
  	           xtype: 'fieldcontainer',layout: 'vbox',            
               items:[
			   { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '����',labelWidth: 90,emptyText:'��������',width:280,name: 'name',afterLabelTextTpl:required}   
			         ]
			         },
					 { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                ,{xtype:'textfield',fieldLabel: '��������',labelWidth: 90,emptyText:'���벿��',width:280,name: 'department'}   
			         ]
			         },{ xtype: 'fieldcontainer',layout: 'hbox',
                items:[
               
                ,{xtype:'textfield',fieldLabel: '&nbsp;��ϵ�˵绰',labelWidth: 90,emptyText:'����绰',width:280,name: 'phone'}
			         ]
			         },
					  { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '��ϵ����',labelWidth: 90,emptyText:'��������',width:280,name: 'email',afterLabelTextTpl:required}   
			         ]
			         }
			         
			       ]
			     }
			     ],
				buttonAlign:'center',
			   	buttons:[
			   	 {xtype : 'displayfield',value:'&nbsp;&nbsp;'}
			   	,{text:'����',action: 'addsave'}
			   	,{text:'�ر�',handler: function() {
                        var tform=this.up('window').close();
		                    }	
					 }
	       ]		  
   
     }
    ];
  
    this.callParent(arguments);

     var tform=this.query('form')[0];
    
     if(this.field1&&this.field1!=''){    	
        tform.getForm().loadRecord(this.field1);          
     }

  }
});  
