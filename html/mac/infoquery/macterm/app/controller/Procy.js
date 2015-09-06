


Ext.define('proauthRzAuthlog.controller.Procy', {
    extend: 'Ext.app.Controller',  
    stores: ['List'],
    models: ['List'],  
    views: ['list.List'],    
    mac:'',    
    apmac:'',
          
    sdate:'',
    stime:'',
    edate:'',
    etime:'',
    searchtype:'', 
         
    servicecode:'',
    servicename:'',    
    sname:'',
    ssid:'',
    apname:'',	
    vname:'',      
  	
    init: function() {
    	this.control({
    		
    		//�ؼ��ֲ�ѯ
        'myselfPanel button[action=keycx]':{
        		click: this.dwglkeycx
        },
    		
      	//�߼���ѯ	
		  	'myselfPanel button[action=advancecx]':{
						click:this.highquery  
		  	},
       
       	//select: this.showTab, 	
      	'authloglist':{ 				
      			render: this.showRender
      	},		        	
		            		  
		  	/* ���Ӱ�ť��Ǯ����2015/7/20/11:00 */
		  	//��������
        'authloglist button[action=termac]':{
        		click: this.infoquerymac
        },
		  
		  	/* ���Ӱ�ť��Ǯ����2015/7/20/15:00 */
		  	//��Ա�켣
		  	'authloglist button[action=termmacmap]':{
        		click: this.infoquerymap
        },
		  
		  	/* ���Ӱ�ť��Ǯ����2015/7/22/15:30 */
		  	//��ݲ鿴
		  	'authloglist button[action=idcheck]':{
        		click: this.infoidcheck
        },
		  
		  	/* ���Ӱ�ť��2015/7/26 10:55  Ǯ���� */
		  	//�������
		  	'authloglist button[action=joingroup]':{
        		click: this.infojoingroup
        },
        
        //����
		  	'authloglist button[action=export]':{
        		click: this.infoexport
        }
		  		 		 
      });
    },
    
    showRender: function(){
			var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
			
			var groupid="";
			var username="";
						
			store.on('beforeload', function (store, options) {				
				//������ͼ�߶�
				var qgrid=Ext.ComponentQuery.query('authloglist')[0];
				parent.grid_height=parent.Ext.getCmp('layout_center').getHeight()-56;
				qgrid.setHeight(parseInt(parent.grid_height)+25-100);
     	 	var keyword = Ext.getCmp('keyword_mobileaccount').value;
      
				//ȡ�� combox ��ѡ���ʱ��
      	var time_flag = Ext.getCmp('time_flag').value;			
      	//var groupid = parent.ncsgroupid;
				
				var bRet = false;
				
				//���� g_dispname �Ƿ�Ϊ�����жϣ��û��Ƿ�����ೡ����				
				if(g_dispname != null){									
					
					//groupid��username��Ϊ��ʱ��Ĭ�ϲ�ѯ���г���
					if(g_groupidquery != ''){					
						groupid = g_groupidquery;			
						bRet = true;							
					}
					else{
						username = g_usernamequery;					
						if(username != '')
							bRet = true;		
					}	
					if(bRet == false){
						groupid = "all";
					}	
				}		
								
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
            	
      	var mac = proauthRzAuthlog.controller.Procy.mac;      	      	      	      	
      	var apmac = proauthRzAuthlog.controller.Procy.apmac;
      	
      	
      	var sdate = proauthRzAuthlog.controller.Procy.sdate;
      	var stime = proauthRzAuthlog.controller.Procy.stime;
      	var edate = proauthRzAuthlog.controller.Procy.edate;
      	var etime = proauthRzAuthlog.controller.Procy.etime;
      	
      	var searchtype = proauthRzAuthlog.controller.Procy.searchtype;         			       
      	var servicename = proauthRzAuthlog.controller.Procy.servicename;
      	
      	var sname = proauthRzAuthlog.controller.Procy.sname;
      	var ssid = proauthRzAuthlog.controller.Procy.ssid;  
      	var apname = proauthRzAuthlog.controller.Procy.apname;    	
      	var vname = proauthRzAuthlog.controller.Procy.vname;      	     	
      
      	var new_params={groupid:groupid,username:username, /*did:did,*/ keyword:keyword,time_flag:time_flag, mac:mac, apmac:apmac, sdate:sdate,stime:stime,edate:edate,etime:etime, servicecode:servicecode, servicename:servicename, searchtype:searchtype, sname:sname, ssid:ssid, apname:apname, vname:vname};
        
      	Ext.apply(store.proxy.extraParams,new_params);

   		});
			//alert("showRender");
    	proauthRzAuthlog.controller.Procy.loadProcyListStore();
    },

    //�ؼ��ֲ�ѯ
    dwglkeycx: function(thisBtn){    
    	
    	//g_groupidquery = ""; 
			//g_usernamequery = "";
		
			/* ͨ������ @ �����ж�������������ͣ�����ؼ��� ������ೡ���˵�ѡ�� */		
			var tempvalue = Ext.getCmp("keyword_mobileaccount").value;	
			var tempvalue2 = tempvalue.substr(0, 1);
			var tempvalue3 = tempvalue.substr(tempvalue.length - 1, 1);
				
			if(tempvalue2 == '@' && tempvalue3 != '@'){
				Ext.getCmp("keyword_mobileaccount").setValue(tempvalue);	
				//alert(Ext.getCmp("keyword_mobileaccount").value);		
			}
    	
    	//alert("��ѯ");	 
    	proauthRzAuthlog.controller.Procy.searchtype = ""; 
      //proauthRzAuthlog.controller.Procy.SetPage(1);  
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
          				},
          				{
            				fieldLabel:'&nbsp;&nbsp;��ʼʱ��',
            				xtype: 'textfield',
            				value:'00:00:00',
            				name:'stime',
            				regex :/^[0-2][0-9]:[0-6][0-9]:[0-6][0-9]$/,
            				regexText: "��ʽ��xx:xx:xx",
            				allowBlank  : false,
            				id:'stime'
          				}
          		]
          					
        		},
        		{					
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
          				},
          				{
										fieldLabel:'&nbsp;&nbsp;����ʱ��',
            				xtype: 'textfield',
            				value:'23:59:59',
            				name:'etime',
            				regex :/^[0-2][0-9]:[0-6][0-9]:[0-6][0-9]$/,
            				regexText: "��ʽ��xx:xx:xx",
            				allowBlank  : false,
            				id:'etime'
          				}
          		]					
        		},
        		{					
        			layout: 'hbox',
          		xtype: 'container',                   
          		items:[
									{
          					fieldLabel:'�������',
            				xtype: 'textfield',
            				name:'servicecode'
          				},
          				{
            				fieldLabel:'&nbsp;&nbsp;��������',
            				xtype: 'textfield',
            				name:'servicename'
          				}
          		]					
       			},
       			{
        				layout: 'hbox',
          			xtype: 'container',
          			items:[
          					{
											fieldLabel:'��ȫ��������',
            					xtype: 'textfield',
            					name:'sname'
          					},
          					{ 
          						fieldLabel:'&nbsp;&nbsp;�����ȵ�ssid',
                      xtype: 'textfield',
                      name:'ssid'                                 						
										}
								]					
        		},
        		{
          			layout: 'hbox',
          			xtype: 'container',
          			items:[
          					{                        
                    	fieldLabel:'�ɼ��豸���',
            					xtype: 'textfield',
            					name:'apname'
                    },
                    {                        
                    	fieldLabel:'&nbsp;&nbsp;������֤�˺�',
            					xtype: 'textfield',
            					name:'vname'
                    }
                ]
            },
            {
                layout: 'hbox',
                xtype: 'container',
                height:20
            },
            {
            	  layout: 'column',
                xtype: 'container',                     
                items:[
                    {
											xtype: 'container',
                      columnWidth: .20
                    },
                    {                    	                        
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
																	
																	
																	
												proauthRzAuthlog.controller.Procy.servicecode = 
												formquery.getForm().getValues().servicecode;
							
												proauthRzAuthlog.controller.Procy.servicename = 
												formquery.getForm().getValues().servicename;
																																																											
												proauthRzAuthlog.controller.Procy.sname = 
												formquery.getForm().getValues().sname;
																																	
												proauthRzAuthlog.controller.Procy.ssid = 
												formquery.getForm().getValues().ssid; 																					
																																																				
												proauthRzAuthlog.controller.Procy.apname = 
												formquery.getForm().getValues().apname;
																	
												proauthRzAuthlog.controller.Procy.vname = 
												formquery.getForm().getValues().vname;		
															
												store.load();
                      }
                           
                   	},
                   	{
                   		xtype: 'container',
                      columnWidth: .10
                   	}
               	]
				   
            }
       	]
           
      });    
    
      var win3 = Ext.widget('window', {
      	title: '�߼���ѯ',
				//closeAction: 'hide',
        x:200,
        y:32,
        width: 580,
        resizable: false,
        draggable:true,
        modal:false,
        items: formquery
      });
       
      win3.show();
    },
	
	//��������
	infoquerymac: function(thisBtn){
		var macValue = Ext.getCmp('keyword_mobileaccount').value;
		if(macValue == ''){
			alert('��������MAC��Ϣ');
			return ;
		} 
		
		parent.setGlobalInfoTime(Ext.getCmp('time_flag').value);
		parent.setGlobalInfoMac(Ext.getCmp('keyword_mobileaccount').value);		
		var tabPanel = new Ext.TabPanel({
            //renderTo: "grid",
			frame: true,
            layout: 'form',
            activeTab: 0,
            items: [{
              title: 'Ƶ�����ֵ�ʱ��',
              html: '<iframe src="/mac/infoquery/macterm/featureanalysis/ChosenMacTimeOftenCount.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            },{
              title: 'Ƶ�����ֵĳ���',
              html: '<iframe src="/mac/infoquery/macterm/featureanalysis/ChosenMacPlaceOftenCount.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            },{
              title: 'Ƶ�����ֵĳ�������',
              html: '<iframe src="/mac/infoquery/macterm/featureanalysis/ChosenMacPlaceTypeOftenCount.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            }]
        });
		
		var win4 = Ext.widget('window', {
            title: '��������',
			//closeAction: 'hide',
            x:50,
            y:80,
            width: 950,
			height: 540,
            resizable: false,
            draggable:true,
            modal:true,
            items: tabPanel
        });
       
        win4.show();
		
	},
	
	
	/* ���Ӱ�ť��Ǯ����2015/7/20/15:00 */
	//��Ա�켣
	infoquerymap: function(thisBtn){
		var macValue = Ext.getCmp('keyword_mobileaccount').value;	
		if(macValue == ''){
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
              //title: '��Ա�켣',
              //html: '<iframe src="/mac/infoquery/macterm/peopletrack/peopletrack.htm" frameborder="no" style="width:100%;height:500px;"></iframe>'
              html: '<iframe src="/mac/infoquery/macterm/peopletrack/track.htm" frameborder="no" style="width:100%;height:500px;"></iframe>'
              
            }]
        });
		
		var win5 = Ext.widget('window', {
            title: '��Ա�켣',			
            x:50,
            y:80,
            width: 700,
						height: 480,
            resizable: false,
            draggable:true,
            modal:true,
            items: tabPanelmap
        });
       
        win5.show();
		
	},
		
	//�������
	infojoingroup: function(thisBtn){
		
		//�ж��û��Ƿ���ѡ���
		if(!(Ext.getCmp('id_maclogtable').getSelectionModel().selected.length)){
			alert("��ѡ����Ҫ��������mac");
			return;
		}	
		
		var tabPanelchecktable = new Ext.Panel({
            //renderTo: "grid",
						frame: true,
            layout: 'form',
            activeTab: 0,
            items: [{             
              html: '<iframe src="/mac/infoquery/macterm/joingroup/joingroup.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            }]
        });
		
		var win6 = Ext.widget('window', {
            title: '�������',			
            x:50,
            y:80,
            width: 600,
						height: 400,
            resizable: false,
            draggable:true,
            modal:true,
            items: tabPanelchecktable
        });
       
        win6.show();
		
	},	
				
	
	/* ���Ӱ�ť: Ǯ����2015/7/22/17:00 */
	//��ݲ鿴
	infoidcheck: function(thisBtn){
		
		var macValue = Ext.getCmp('keyword_mobileaccount').value;	
		if(macValue == ''){
			alert('��������MAC��Ϣ');
			return ;
		} 
		
		parent.setGlobalInfoMac(macValue);
		var tabPaneledit = new Ext.Panel({
			frame: true,
      layout: 'form',
      activeTab: 0,
			items:[{
				html: '<iframe src="/mac/infoquery/macterm/idcheck/idcheck.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
			}]			
		});
		
		var win7 = Ext.widget('window', {
            title: '��ݲ鿴MAC�� ' + parent.getGlobalInfoMac(),
            //closeAction: 'hide',
            x:20,
            y:80,
            width: 940,
						height: 490,
						id: 'idinfocheck',
            resizable: false,
            draggable:true,
            modal:true,
            items: tabPaneledit
        });
       
        win7.show();
	},
	
	infoexport: function(thisBtn){
		
		var form1 = document.getElementById('form1');	
		form1.macLogExport.value = 'macexport';
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
         
         	  /* ��� callback ��ȡjson��ȥ������������дԭ���� tbar �е� displayMsg  */
            store.load({callback : function(r, option, success) {   
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

