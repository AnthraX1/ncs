
 
Ext.define('proauthMobileAccount.view.common.WarnlogWin' ,{
	extend: 'Ext.window.Window',
	alias : 'widget.warnlogstore',
	store: 'WarnLogStore',
	width:600,
	//height:800,
  initComponent: function() {
	 
  	this.items = [
  	{
  	        items: [{
				xtype: 'form',
				frame:true,
				bodyPadding:5,
				defaults:{xtype:"textfield"},
				items:[
  	        {fieldLabel:'�ն�MAC��ַ',id:'mac',name:'mac',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{fieldLabel:'�ն�Ʒ��',id:'termtype',name:'termtype',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{fieldLabel:'��������',id:'servicename',name:'servicename',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{fieldLabel:'��װλ��',id:'address',name:'address',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{fieldLabel:'�ɼ�ʱ��',id:'stime',name:'stime',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{fieldLabel:'�ն˳�ǿ',id:'rssi',name:'rssi',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{xtype:'combo',fieldLabel:'�������',id:'vtype',name:'vtype',valueField:'value',displayField:'name',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;',
				store:Ext.create('Ext.data.Store',{
					fields:['name','value'],
					data:[
						{name:'��ʵ���',value:'0'},
						{name:'�������',value:'1'}
					]
				}),
				queryMode:'local'
			},
			{fieldLabel:'�������',id:'vname',name:'vname',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{fieldLabel:'�����ȵ�MAC',id:'apmac',name:'apmac',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{fieldLabel:'�����ȵ�SSID',id:'ssid',name:'ssid',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{fieldLabel:'�����ȵ�Ƶ��',id:'channel',name:'channel',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{xtype:'combo',fieldLabel:'�����ȵ��������',id:'security',name:'security',valueField:'value',displayField:'name',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;',
				store:Ext.create('Ext.data.Store',{
					fields:['name','value'],
					data:[
						{name:'WEP',value:'01'},
						{name:'WPA',value:'02'},
						{name:'WPA2',value:'03'},
						{name:'PSK',value:'04'},
						{name:'����',value:'99'}
					]
				}),
				queryMode:'local'
			},	
			{fieldLabel:'�ɼ��豸���',id:'apname',name:'apname',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{fieldLabel:'�ɼ��豸����',id:'longitude',name:'longitude',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{fieldLabel:'�ɼ��豸γ��',id:'latitude',name:'latitude',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{fieldLabel:'�ɼ��豸X����',id:'xpos',name:'xpos',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{fieldLabel:'�ɼ��豸Y����',id:'ypos',name:'ypos',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;'},
			{xtype:'combo',fieldLabel:'�����߱�ʶ',id:'flags',name:'flags',valueField:'value',displayField:'name',value:'',readOnly:true,fieldStyle:'background-color: #DFE9F6;border-color: #DFE9F6; background-image: none;',
				store:Ext.create('Ext.data.Store',{
					fields:['name','value'],
					data:[
						{name:'����',value:'0'},
						{name:'�뿪',value:'1'},
						{name:'����',value:'2'}
					]
				}),
				queryMode:'local'
			}
			]}
			]
	}];
    this.callParent(arguments);
		 
	var store = Ext.ComponentQuery.query('mobileaccountlist')[0].getStore();	
		
	var warnlogstore=Ext.data.StoreMgr.lookup('WarnLogsStore');
		new_params={sid:store.field5,stime:store.field6};
		warnlogstore.on('beforeload', function (store, options) {
		Ext.apply(store.proxy.extraParams, new_params);
		});
	var tform=this.query('form')[0];
        warnlogstore.load({
			callback:function(records,options,success){
				if(success){     
						tform.getForm().loadRecord(records[0]); 
				}
			} 		  
	})
  }   
});