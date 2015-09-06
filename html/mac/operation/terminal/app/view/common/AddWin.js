 			       			
Ext.define('proauthApset.view.common.AddWin' ,{
  extend: 'Ext.window.Window',
  alias : 'widget.addwin',

	title: '�ն���Ϣ����',
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
     
     
   
    
  	this.items = [
  	{
  	     xtype: 'form',frame:true,width:400, bodyPadding:5,
  	        items: [
  	        {xtype:'hidden',id:'groupid',name:'groupid',value:''},
            {
  	           xtype: 'fieldcontainer',layout: 'vbox',            
               items:[
			    { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '�ն˷�������',labelWidth: 110,emptyText: '�ն˷�������',width:260,name: 'groupname',afterLabelTextTpl:required}   
			         ]
			         }
			         ,{ xtype: 'fieldcontainer',layout: 'hbox',
                items:[
				,{xtype:'textfield',fieldLabel: '&nbsp;����������Ϣ',labelWidth: 110,emptyText: '�������������',width:260,name: 'groupdesc'}
			         ]
			         }
			         

			       ]
			     }
			     ],
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
