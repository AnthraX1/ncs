
  

Ext.define('proauthApMacset.view.list.List' ,{
 extend: 'Ext.Panel',
  alias : 'widget.apmacsetlist',
	title: '�޸�����',
	modal: true,
	field1: null,
	field2: null,
	value1:null,
	frame:true,
	layout: { pack: 'center', type: 'hbox' } ,
	height:900,
	
  initComponent: function() {
  	  var required='<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
      
  	this.items = [
  	{
  	     xtype: 'form',frame:true,width:400, bodyPadding:5,margin: '20 0 0 0',
  	     id:'formmacset',
  	        items: [
            {
  	           xtype: 'fieldcontainer',layout: 'vbox',            
               items:[			        
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '&nbsp;�����������',labelWidth: 150,width:300,name: 'rname'}
                
                
              

			         ]
			         }
			         ,
			         
			          { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '&nbsp;������������',labelWidth: 150,width:300,name: 'password11'}
                
                
              

			         ]
			         },

{ xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '&nbsp;��ȷ��������',labelWidth: 150,width:300,name: 'password21'}
                 
                
              

			         ]
			         }						 
			         
			         
			         
			         
			         
			         	         
			       ]
			     }
			     
			     
			     
			     	
			     
			     ],
			   	buttons:[			  
			   	 {xtype : 'displayfield',value:'&nbsp;&nbsp;'}
			   	,{text:'����',action: 'addsave'}
	//	   	,{text:'ȡ��',handler: function() {
  //                     var tform=this.up('form').getForm().reset();
	//                    }	
	
	//				 }
	       ]		  
   
     }
    ];
 
    this.callParent(arguments);
     var tform=this.query('form')[0];
   store_logsave.load({callback:function(r,options,success){
	  if(success){          
	     tform.getForm().loadRecord(r[0]); 
	  }
    }
    });
  }    
});