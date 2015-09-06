
    		       			
Ext.define('proauthApset.view.common.AddGroup' ,{
  extend: 'Ext.window.Window',
  alias : 'widget.addgroup',
	title: '��λAP��Ϣ�༭',
	modal: true,
	field1: null,
	field2: null,
	value1:null,
  initComponent: function() {
  	  var required='<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
       
       var facCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: '��ȫ��������',
        labelWidth: 100,
        width: 320,
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
	title:'ϵͳ��Ϣ',
  	     xtype: 'fieldset',
		 frame:true,width:700, 
		 bodyPadding:5,
  	        items: [
  	        {xtype:'hidden',id:'groupid',name:'groupid',value:''},
            {
  	           xtype: 'fieldcontainer',layout: 'vbox',            
               items:[,{
						 xtype:'fieldcontainer',layout:'hbox',
						 items:[ 
						     ,{xtype:'textfield',fieldLabel: '�ɼ��豸����',labelWidth:100,emptyText: '�ɼ��豸����',width:320,name: 'gwid',afterLabelTextTpl:required}
						 ]
						 
					 },{
						 xtype:'fieldcontainer',layout:'hbox',
						 items:[ 
						    {
			            	 
			                fieldLabel: '&nbsp;�ɼ��豸����',
			                labelWidth:100,
			                width:320,
                                xtype:          'combo',
                                mode:           'local',
                                value:          '1',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,                                
                                name:           'aptype',              
                                displayField:   'name',
                                valueField:     'value',
                                queryMode: 'local',
                                store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : '�̶��ɼ�����',   value: '1'},
                                        {name : '�ƶ������豸',   value: '2'},
                                        {name : '�����ɼ�����',   value: '3'},
                                        {name : '����',   value: '9'}          
                                    ]
                                })
			                      
			            }  
						 ]
						 
					 },{
						 xtype:'fieldcontainer',layout:'hbox',
						 items:[
				,{xtype:'textfield',fieldLabel: '&nbsp;�豸��ַ',labelWidth:100,emptyText: '',width:320,name: 'address'}
						 ]
					 },{ xtype: 'fieldcontainer',layout: 'hbox',
                items:[
				//��ȫ��������
                ,facCombo
			         ]
			         },
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
               {xtype:'textfield',fieldLabel: '��ȫ�豸����',labelWidth:100,emptyText: '',width:320,name: 'longitude'}   
			         ]
			         },{
						  xtype:'fieldcontainer',layout:'hbox',
						  items:[
                          ,{xtype:'textfield',fieldLabel: '&nbsp;��ȫ�豸γ��',labelWidth:100,emptyText: '',width:320,name: 'latitude'}
						  ]
					 },{ xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                    {xtype:'textfield',fieldLabel: '&nbsp;�ɼ��뾶',labelWidth:100,emptyText: '',width:320,name: 'radius',afterLabelTextTpl:required}
			         ]
			         },
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '�ϴ����ݼ��ʱ��',labelWidth: 100,emptyText: '',width:320,name: 'uptimestep'}  
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
   
     },{
		 
  	     xtype: 'fieldset',
		 title:'�ƶ��ɼ��豸����',
		 frame:true,
		 width:700,
		 bodyPadding:5,
  	        items: [
  	        {xtype:'hidden',id:'groupid',name:'groupid',value:''},
            {
  	           xtype: 'fieldcontainer',layout: 'vbox',            
               items:[
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[, 
               ,{xtype:'textfield',fieldLabel: '���ƺ���',labelWidth: 70,emptyText: '',width:210,name: 'plate'}   
            	 ,{xtype:'textfield',fieldLabel: '&nbsp;��ͨ��·��Ϣ',labelWidth: 80,emptyText: '',width:220,name: 'line'}
			         ]
			         },
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
              ,{xtype:'textfield',fieldLabel: '������Ϣ',labelWidth: 70,emptyText: '',width:210,name: 'plate'}   
            	 ,{xtype:'textfield',fieldLabel: '&nbsp;������',labelWidth: 80,emptyText: '',width:220,name: 'line'}
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
