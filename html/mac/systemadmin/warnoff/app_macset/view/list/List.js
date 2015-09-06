
  

Ext.define('proauthApMacset.view.list.List' ,{
 extend: 'Ext.Panel',
  alias : 'widget.apmacsetlist',
	title: ' �������߶��Ÿ澯����',
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
  	     xtype: 'form',frame:true,width:700, bodyPadding:5,margin: '50 0 0 0',
  	     id:'formmacset',
  	        items: [
  	                    {
  	           xtype: 'fieldcontainer',layout: 'vbox',            
               items:[			        
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {fieldLabel: '&nbsp;���ó������߶��Ÿ澯����',labelWidth: 170,width:240,afterLabelTextTpl:required,
                	             xtype:          'combo',
                                mode:           'local',
                              
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,                                
                                name:           'StartWarnOff',              
                                displayField:   'name',
                                valueField:     'value',
                                queryMode: 'local',
                                store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [ {name : '����',   value: 'Yes'}, {name : '������',   value: 'No'}]
                                })
                	
                	}   

			         ]
			         }		         
			       ]
			     },
           {
           	   xtype:'fieldset',
           title:'ѡ��澯����',
       //    layout: 'form',
        	 defaults: {
               labelStyle: 'padding-left:4px;'
        	 },
            collapsible: false,
            items: [{
              xtype: 'checkboxgroup',
                name:'rightgroup',
                columns: 1,
                items: [
                {boxLabel:'��λ������(��Ӧ������λ�еĵ�λ�����˵绰)',inputValue:'1',checked:true,name:'fzrmobno'},
                {boxLabel:'��λ��ȫԱ(��Ӧ������λ�е���Ϣ��ȫԱ�绰)',inputValue:'1',checked:true,name:'aqymobno'},
                {boxLabel:'���ฺ����(��Ӧ������λ�е����ฺ���˵绰)',inputValue:'1',checked:true,name:'wjmobno'},
                {boxLabel:'�ر��ֻ�',inputValue:'1',checked:true,name:'bbmobflag'},
                 {xtype:'textfield',fieldLabel: '&nbsp;����ֻ���֮�䣬�Զ��ŷָ�',labelWidth: 170,emptyText: '',width:450,name: 'bbmobno'}
              
                ]
            }]
            },
            { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '&nbsp;�澯����',labelWidth: 70,emptyText: '',width:350,name: 'warncont'}
                ,{
			            	  xtype     : 'displayfield',
			                value:'&nbsp;(�澯���ݲ�Ҫ����50���ַ�)'
			            }
			         ]
			         },
           
			     
			     
			     
			     	
			     
			     ],
			   	buttons:[			  
			   	 {xtype : 'displayfield',value:'&nbsp;&nbsp;'}
			   	,{text:'����',action: 'addsave'}
	   	,{text:'�鿴���Ÿ澯��־',handler: function() {
   		
                     window.open('/pronline/Msg?FunName@ncsShowOfflinelog');
                    }	
	
				 }
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