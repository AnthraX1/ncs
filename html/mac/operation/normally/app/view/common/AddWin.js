
     
        			       			
Ext.define('proauthApset.view.common.AddWin' ,{
  extend: 'Ext.window.Window',
  alias : 'widget.addwin',

	title: '�Ϲ��ȵ���Ϣ����',
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
			{xtype:'hidden',id:'oldssid',name:'oldssid',value:''},
            {
  	           xtype: 'fieldcontainer',layout: 'vbox',            
               items:[
			   { xtype: 'fieldcontainer',
			   layout: 'hbox',			   
                items:[
					{xtype:'combo',
					fieldLabel: '�Ƿ�Ϲ�',
					labelWidth: 90,
					value:'1',
					width:300,
					name: 'authflag',
					valueField:'value',
					displayField: 'name',
					emptyText: '��ѡ��',
					store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : '�Ϲ�',   value:'1'},
                                        {name : '���Ϲ�',   value:'2'}                                             
                                    ]
                                })				
				 } 
			         ]
			         }
					 , { xtype: 'fieldcontainer',layout: 'hbox',
					items:[
                ,{
				xtype:'textfield',
				fieldLabel:'�ȵ�SSID',
				labelWidth:90,
				emptyText:'',
				width:300,
				name:'ssid',
				afterLabelTextTpl:required,
				allowBlank:false, //�Ƿ�����Ϊ��
				blankText:'SSID����Ϊ�գ�',	
				msgTarget:'qtip' //��ʾһ����������ʾ��Ϣ	
				}
			         ]
			         }, { xtype: 'fieldcontainer',layout: 'hbox',
                items:[ 
                ,{xtype:'combobox',
				fieldLabel: '�ȵ��������',
				labelWidth: 90,				
				width:300,
				value:'01',
				name: 'security',
				valueField:'value',
                displayField: 'name',
				emptyText: '��ѡ��',
				store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : 'WEB',   value: '01'},
                                        {name : 'WPA',   value: '02'},
                                        {name : 'WPA2',  value: '03'},
										{name : 'PSK',   value: '04'},
                                        {name : '����',  value: '99'}          
												]
                                })
				}   
               
			         ]
			         },
					 { xtype: 'fieldcontainer',layout: 'hbox',
                     items:[
					,{xtype:'combobox',
					fieldLabel: '&nbsp;������������',
					labelWidth: 90,
					width:300,
					value:'9',
					name: 'servicetype',
					valueField:'value',
					displayField: 'name',
					emptyText: '��ѡ��',
					store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : '�Ƶ����', value: '1'},
                                        {name : 'ͼ���������',value: '2'},
                                        {name : 'ѧУ',value: '3'},
										{name : '���ֳ���',value: '4'},
										{name : 'һ����ҵ',value: '5'},
                                        {name : '����',value: '9'}          
                                    ]
                                })
				 
				 }
			         ]
			         },{ xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                ,{
					xtype:'combobox',
					fieldLabel: '����������',
					labelWidth: 90,
					width:300,
					name: 'servicequlity',
					valueField:'value',
					value:'0',
					displayField: 'name',
					emptyText: '��ѡ��',
					store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : '��Ӫ',   value: '0'},
                                        {name : '�Ǿ�Ӫ',   value: '1'},           
                                        {name : '����',   value: '3'}          
                                    ]
                                })	
				}     
			         ]
			         },{
				xtype: 'fieldcontainer',
				layout: 'hbox',
                items:[
                ,{xtype:'textfield',
				fieldLabel: '�ȵ�MAC',
				labelWidth: 90,
				emptyText: '',
				width:300,
				name: 'mac'
				}           
			         ]
			         },
				{ xtype: 'fieldcontainer',
				layout: 'hbox',
                 items:[
				 ,{xtype:'textfield',
				 fieldLabel: '&nbsp;��ϵ��',
				 labelWidth: 90,
				 emptyText:'��������ϵ��',
				 width:300,
				 name: 'ISPname',
				 afterLabelTextTpl:required
				 }  
			         ]
				},{ xtype: 'fieldcontainer',layout: 'hbox',
                    items:[
                ,{xtype:'textfield',
				fieldLabel: '��ϵ�绰',
				labelWidth: 90,
				emptyText: '������',
				width:300,
				name: 'ISPphone',
				allowBlank:false,
				afterLabelTextTpl:required,
				 msgTarget:'qtip'
				}      
			         ]
			         },{ xtype: 'fieldcontainer',layout: 'hbox',
                    items:[
                ,{xtype:'textfield',
				fieldLabel: '��Ӫ��������',
				labelWidth: 90,
				name: 'ISPemail',
				emptyText: '����������',
				regex: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
����			regexText:'��������ȷ������',
				afterLabelTextTpl:required,
				 msgTarget:'qtip',
				width:300
				}   
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
	 
	 if(this.field2&&this.field2!=''){ 
		tform.getForm().findField('oldssid').setValue(this.field2);
	}
    
     if(this.field1&&this.field1!=''){    	
        tform.getForm().loadRecord(this.field1);          
     }

  }
});  
