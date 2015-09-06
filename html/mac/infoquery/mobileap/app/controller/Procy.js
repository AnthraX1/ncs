

Ext.define('proauthRzAuthlog.controller.Procy', {
    extend: 'Ext.app.Controller',  
    stores: ['List'],
    models: ['List'],  
    views: ['list.List'],
    mac:'',
    apname:'',
    apmac:'',
          
    sdate:'',
    stime:'',
    edate:'',
    etime:'',    
    
    searchtype:'',          
    model:'',
    devid:'',
  	plate:'',
  	line:'',
  	aptype:'',
  
    init: function() {
        this.control({
          'authloglist':{
  				//select: this.showTab,
            render: this.showRender
          },
		  
          //�ؼ��ֲ�ѯ
          'myselfPanel button[action=keycx]':{
          	click: this.dwglkeycx
          },
          //�߼���ѯ
          'myselfPanel button[action=advancecx]':{
          	click: this.highquery
          },
		  
		  		/* ���ӹ��ܣ�Ǯ����2015/7/22/16:30 */
		  		//�켣��ͼ
		  		'authloglist button[action=termmacmap]':{
          	click: this.mobilemap
          },
		  
		  		//�鿴ͼ��
		  		'authloglist button[action=checkgraph]':{
          	click: this.placecheckgraph
          },
          
          //����
		  		'authloglist button[action=export]':{
        		click: this.infoexport
        	}
		  
        });
    },
    
    showRender: function(){
        var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
        store.on('beforeload', function (store, options) {
		//������ͼ�߶�
        var qgrid=Ext.ComponentQuery.query('authloglist')[0];
    	  parent.grid_height=parent.Ext.getCmp('layout_center').getHeight()-56;
        qgrid.setHeight(parseInt(parent.grid_height)+25);
        	
        var keyword = Ext.getCmp('keyword_mobileaccount').value;
				//ȡ�� combox ��ѡ���ʱ��
      	var time_flag = Ext.getCmp('time_flag').value;
        var groupid = parent.ncsgroupid;
				//var did = parent.corpdid;
        var did = parent.servicecode;
        if(did){
        	groupid = "";
        }
      
            var account = proauthRzAuthlog.controller.Procy.account;
            var servicecode;
            if(parent.servicecode!=''){
            	servicecode=parent.servicecode;
            }
            else{
              servicecode = proauthRzAuthlog.controller.Procy.servicecode;
            }
            var servicename = proauthRzAuthlog.controller.Procy.servicename;
            var mac = proauthRzAuthlog.controller.Procy.mac;
            var ssid = proauthRzAuthlog.controller.Procy.ssid;
            
            var sdate = proauthRzAuthlog.controller.Procy.sdate;
            var stime = proauthRzAuthlog.controller.Procy.stime;
            var edate = proauthRzAuthlog.controller.Procy.edate;
            var etime = proauthRzAuthlog.controller.Procy.etime;            
            
            var searchtype = proauthRzAuthlog.controller.Procy.searchtype;            
            var model = proauthRzAuthlog.controller.Procy.model;
            var devid = proauthRzAuthlog.controller.Procy.devid;         
						var plate = proauthRzAuthlog.controller.Procy.plate;
      			var line = proauthRzAuthlog.controller.Procy.line;
      			var aptype = proauthRzAuthlog.controller.Procy.aptype;
       
            var new_params={groupid:groupid,did:did,keyword:keyword, time_flag:time_flag, servicecode:servicecode,mac:mac,ssid:ssid,servicename:servicename,sdate:sdate,stime:stime,edate:edate,etime:etime,searchtype:searchtype, model:model, devid:devid, plate:plate, line:line, aptype:aptype};
        
             Ext.apply(store.proxy.extraParams,new_params);

        });//store.on('beforeload', function (store, options) {

        proauthRzAuthlog.controller.Procy.loadProcyListStore();
    },// showRender: function(){

    //�ؼ��ֲ�ѯ
		dwglkeycx: function(thisBtn){
    
    	
    	proauthRzAuthlog.controller.Procy.searchtype = ""; 
      proauthRzAuthlog.controller.Procy.SetPage(1);  
      proauthRzAuthlog.controller.Procy.loadProcyListStore();
    },
	
	//�߼���ѯ
    highquery: function(thisBtn){
		var myDate = new Date();
        var yy = ( myDate.getYear() < 1900 ) ? ( 1900 + myDate.getYear() ) : myDate.getYear();
        var mm = myDate.getMonth()+1;
        if(mm<10)
        {
            mm = '0'+mm;
        }
        var dd = myDate.getDate();
        if(dd<10)
        {
            dd = '0'+dd;
        }
        var today = yy+'/'+mm+'/'+dd;
        var startday = yy+'/'+mm+'/'+'01';
 
        var formquery = new Ext.FormPanel({         
            frame: true,
            layout: 'form',
            fieldDefaults: {
               labelWidth: 85,                        
               width: 250
            },
            collapsible: false,
            bodyPadding: 10,
                items: [
				{
                    layout: 'hbox',
                    xtype: 'container',  					
                    items:[
					{                        
						fieldLabel:'��ʼ����',
                        xtype: 'datefield',
                        format: "Y/m/d",
                        value:startday,
                        name:'sdate',
                        id:'sdate'
                    },{
                        fieldLabel:'&nbsp;&nbsp;��ʼʱ��',
                        xtype: 'textfield',
                        value:'00:00:00',
                        name:'stime',
                        regex :/^[0-2][0-9]:[0-6][0-9]:[0-6][0-9]$/,
                        regexText: "��ʽ��xx:xx:xx",
                        allowBlank  : false,
                        id:'stime'
                    }]
					
                },{					
					layout: 'hbox',
                    xtype: 'container',                   
                    items:[
                    {
						fieldLabel:'��������',
                        xtype: 'datefield',
                        id:'edate',
                        format: "Y/m/d",
                        value:today,
                        name:'edate'
                    },{
						fieldLabel:'&nbsp;&nbsp;����ʱ��',
                        xtype: 'textfield',
                        value:'23:59:59',
                        name:'etime',
                        regex :/^[0-2][0-9]:[0-6][0-9]:[0-6][0-9]$/,
                        regexText: "��ʽ��xx:xx:xx",
                        allowBlank  : false,
                        id:'etime'
                    }]
					
                },{					
                    layout: 'hbox',
                    xtype: 'container',                   
                    items:[
					{
                        fieldLabel:'������',
                        xtype: 'textfield',
                        name:'model'
                    },{
                        fieldLabel:'&nbsp;&nbsp;���ƺ���',
                        xtype: 'textfield',
                        name:'devid'
                    }]
					
                },{
                    layout: 'hbox',
                    xtype: 'container',
                    items:[
                    {
												fieldLabel:'վ������',
                        xtype: 'textfield',
                        name:'plate'
                    },{                        
                        fieldLabel:'&nbsp;&nbsp;��·����',
                        xtype: 'textfield',
                        name:'line'
										}]
					
                },{
                    layout: 'hbox',
                    xtype: 'container',
                    items:[
                    {
												fieldLabel:'�豸����',
                        xtype: 'textfield',
                        name:'aptype'
                    }
                    ]
                },{
                    layout: 'column',
                    xtype: 'container',                     
                    items:[
                    {
												xtype: 'container',
                        columnWidth: .20
                    },{                                              
                        xtype: 'button',
                        anchor: 'left',                        
                        text:'&nbsp;&nbsp;��&nbsp;&nbsp;ѯ &nbsp;&nbsp;',
                        columnWidth: .25, 
                        handler: function(){
							var grid = Ext.ComponentQuery.query('authloglist')[0];             
							var store = grid.getStore();
							
							proauthRzAuthlog.controller.Procy.searchtype ='adv';
							proauthRzAuthlog.controller.Procy.sdate = 
							formquery.getForm().getValues().sdate;
							
							proauthRzAuthlog.controller.Procy.stime = 
							formquery.getForm().getValues().stime;
							
							proauthRzAuthlog.controller.Procy.edate = 
							formquery.getForm().getValues().edate;
							
							proauthRzAuthlog.controller.Procy.etime = 
							formquery.getForm().getValues().etime;
							
							
							proauthRzAuthlog.controller.Procy.model = 
							formquery.getForm().getValues().model;
							
							proauthRzAuthlog.controller.Procy.devid = 
							formquery.getForm().getValues().devid;
							
														
													proauthRzAuthlog.controller.Procy.plate = 
													formquery.getForm().getValues().plate;
											
													proauthRzAuthlog.controller.Procy.line = 
													formquery.getForm().getValues().line;
										
													proauthRzAuthlog.controller.Procy.aptype = 
													formquery.getForm().getValues().aptype;

							store.load();
                        }
                           
                   }]
				   
                }]
        });    
    
        var win3 = Ext.widget('window', {
            title: '�߼���ѯ',
//            closeAction: 'hide',
            x:200,
            y:32,
            width: 580,
            resizable: true,
            draggable:true,
            modal:false,
            items: formquery
        });
       
        win3.show();
    },
	
	
  		
	/* ���ӹ��ܣ�Ǯ����2015/7/22/15:30 */
	//�ɼ��豸�ƶ��켣��ͼ
	mobilemap: function(thisBtn){
		var apValue = Ext.getCmp('keyword_mobileaccount').value;	
		if(apValue == ''){
			alert('��������MAC��Ϣ');
			return ;
		} 
		
		parent.setGlobalInfoTime(Ext.getCmp('time_flag').value);
		parent.setGlobalInfoMac(Ext.getCmp('keyword_mobileaccount').value);
		
		
		var tabPanelmap = new Ext.Panel({
            //renderTo: "grid",
			frame: true,
            layout: 'form',
            activeTab: 0,
            items: [{
              //title: '�ƶ��켣��ͼ',
              //html: '<iframe src="/mac/datamining/track/track.htm" frameborder="no" style="width:100%;height:1000px;"></iframe>'
              html: '<iframe src="/mac/infoquery/mobileap/peopletrack/track.htm" frameborder="no" style="width:100%;height:500px;"></iframe>'
              
            }]
        });
		
		var win4 = Ext.widget('window', {
            title: '�ɼ��豸�ƶ��켣',
//            closeAction: 'hide',
            x:50,
            y:80,
            width: 700,
						height: 480,
            resizable: false,
            draggable:true,
            modal:true,
            items: tabPanelmap
        });
       
        win4.show();
		
	},
	
	//�鿴ͼ��
	placecheckgraph: function(thisBtn){
		var macValue = Ext.getCmp('keyword_mobileaccount').value;
		if(macValue == ''){
			alert('���������ƶ��ɼ��豸���ƻ���');
			return ;
		} 
		
		var tabPanelchecktable = new Ext.TabPanel({
            //renderTo: "grid",
			frame: true,
            layout: 'form',
            activeTab: 0,
            items: [{   
			  			title: '����Ƶ�����ֵ��ն�TOP10',	
              html: '<iframe src="/mac/infoquery/mobileap/checkgraph/ChosenApTerminalmacTop.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            },{
              title: 'ָ���ƶ��豸�������ܼ�ʱ��',
              html: '<iframe src="/mac/infoquery/mobileap/checkgraph/ChosenApPeopleCrowedTime.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            },{
              title: 'ָ���������������',
              html: '<iframe src="/mac/infoquery/mobileap/checkgraph/ChosenApPeopleStreamTrend.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            }]
        });
		
		var win5 = Ext.widget('window', {
            title: '�鿴ͼ��',
            x:50,
            y:80,
            width: 950,
						height: 560,
            resizable: false,
            draggable:true,
            modal:true,
            items: tabPanelchecktable
        });
       
        win5.show();
		
	},
	
	infoexport: function(thisBtn){
		
		var form1 = document.getElementById('form1');	
		form1.mobileexport.value = 'export';
		form1.time_flag.value =  Ext.getCmp('time_flag').value;	
		form1.submit();
		
	},
  
    /**************************************
    * ���Ա�ǩ 
    ***************************************/  
    showTips: function( thisTV, eOpts ){
      thisTV.tip = Ext.create('Ext.tip.ToolTip', {
        target: thisTV.el,
        trackMouse: true,
        dismissDelay : 60000,
        html: '<p>���磺</p><p>&nbsp;&nbsp;&nbsp;�����˿ڣ�80,21</p><p>&nbsp;&nbsp;&nbsp;�˿ڶΣ�2000~3000</p><p>&nbsp;&nbsp;&nbsp;��ϣ�80,2000~3000,3005</p>'
      });
    },
    /**************************************
    * ȫ�ֺ��� 
    ***************************************/
    inheritableStatics:{
        loadProcyListStore:function(){
            var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
            var keyword = Ext.getCmp('keyword_mobileaccount').value;
         
            store.load({callback : function(r, option, success) {   
            	
            	 /* ��� callback ��ȡjson��ȥ������������дԭ���� tbar �е� displayMsg  */
            	 var responseText =  eval("("+option.response.responseText+")");        		                
               var g_distinctCount = "";
               g_distinctCount = responseText.distinctCount;
               //alert(g_distinctCount);
               var playInfo = Ext.getCmp('id_tbar_paging');
               playInfo.displayMsg = '��ʾ{0} - {1}����¼ ��{2}����¼,ȥ�غ�<span style="color:red;font-size:1.5em">' + g_distinctCount + '</span>����¼';
              
               playInfo.doRefresh();	
               //alert(Ext.getCmp('id_tbar_paging').displayMsg);
            }});
        },
        SetPage:function(curpage){
            var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
            store.currentPage = curpage;
        },
        setTitle: function(title){
             document.getElementById("titledx").innerHTML = 
                 '&nbsp'+ title +'&nbsp;&nbsp;';   
        }
    }
   
});

