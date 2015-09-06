

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
		servicecode:'',
		
		searchtype:'',        
    sname:'',              
   	servicegtype:'', 
    servicearea:'',
    ceoname:'',
    jytype:'',
    
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
						click:this.highquery  
		  		},
		  
		  		/* ���Ӱ�ť��2015/7/26 10:29  Ǯ���� */
		  		//���ӵ�ͼ
		  		'authloglist button[action=electricmap]':{
          	click: this.placeelectricmap
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
        
        var groupid="";
				var username="";
                
        
        store.on('beforeload', function (store, options) {
        	
				//������ͼ�߶�
        var qgrid=Ext.ComponentQuery.query('authloglist')[0];
    	  parent.grid_height=parent.Ext.getCmp('layout_center').getHeight()-56;
        qgrid.setHeight(parseInt(parent.grid_height)+25);
        	
        var keyword = Ext.getCmp('keyword_mobileaccount').value;
				//ȡ�� combox ��ѡ���ʱ��
      	var time_flag = Ext.getCmp('time_flag').value;                        				
				
				
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
            var sdate = proauthRzAuthlog.controller.Procy.sdate;
            var stime = proauthRzAuthlog.controller.Procy.stime;
            var edate = proauthRzAuthlog.controller.Procy.edate;
            var etime = proauthRzAuthlog.controller.Procy.etime;
            var servicecode = proauthRzAuthlog.controller.Procy.servicecode;
            
            var searchtype = proauthRzAuthlog.controller.Procy.searchtype;                    
            var sname = proauthRzAuthlog.controller.Procy.sname;               
            var servicegtype = proauthRzAuthlog.controller.Procy.servicegtype;                                
						var servicearea = proauthRzAuthlog.controller.Procy.servicearea;
      			var ceoname = proauthRzAuthlog.controller.Procy.ceoname;
      			var jytype = proauthRzAuthlog.controller.Procy.jytype;
       
            var new_params={groupid:groupid,username:username,/* did:did,*/  keyword:keyword, time_flag:time_flag, mac:mac, servicename:servicename, sdate:sdate,stime:stime,edate:edate,etime:etime, servicecode:servicecode, searchtype:searchtype, sname:sname, servicegtype:servicegtype, servicearea:servicearea, ceoname:ceoname, jytype:jytype};
        
             Ext.apply(store.proxy.extraParams,new_params);

        });

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
											fieldLabel:'��ȫ��������',
                      xtype: 'textfield',
                      name:'sname'	                        
                    },
                    {
                    	fieldLabel:'&nbsp;&nbsp;�������',
                      xtype: 'textfield',
                      name:'servicecode'                    	                        
                    }]
					
                },{
                    layout: 'hbox',
                    xtype: 'container',
                    items:[
                    {
                    	fieldLabel:'������������',
                      xtype: 'textfield',
                      name:'servicegtype'
												
                    },{                        
                        fieldLabel:'&nbsp;&nbsp;������������',
                        xtype: 'textfield',
                        name:'servicearea'
										}]
					
                },{
                    layout: 'hbox',
                    xtype: 'container',
                    items:[
                    {                        
                        fieldLabel:'�������˻���������',
                        xtype: 'textfield',
                        name:'ceoname'
                    },{                        
                        fieldLabel:'&nbsp;&nbsp;������Ӫ����',
                        xtype: 'textfield',
                        name:'jytype'
										}]
                },{
                    layout: 'column',
                    xtype: 'container',                     
                    items:[
                    {
												xtype: 'container',
                        columnWidth: .20
                    },{
                        //fieldLabel:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;          ',
                        //labelWidth: 85,                        
                        xtype: 'button',
                        anchor: 'left',
                        //style : 'margin-left:80px',
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
							
							proauthRzAuthlog.controller.Procy.sname = 
							formquery.getForm().getValues().sname;
							
							
							
													proauthRzAuthlog.controller.Procy.servicegtype = 
													formquery.getForm().getValues().servicegtype;
											
													proauthRzAuthlog.controller.Procy.servicearea = 
													formquery.getForm().getValues().servicearea;
										
													proauthRzAuthlog.controller.Procy.ceoname = 
													formquery.getForm().getValues().ceoname;

													proauthRzAuthlog.controller.Procy.jytype = 
													formquery.getForm().getValues().jytype;
													
													store.load();
                        }
                           
                   },{
                        xtype: 'container',
                            columnWidth: .10
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
	
  		
	//���ӵ�ͼ
	placeelectricmap: function(thisBtn){
		var placeValue = Ext.getCmp('keyword_mobileaccount').value;
		if(placeValue == ''){
			alert('�����볡�����ƻ������');
			return ;
		} 
		
		var tabPanelelectricmap = new Ext.Panel({
            //renderTo: "grid",
			frame: true,
            layout: 'form',
            activeTab: 0,
            items: [{
              //title: '���ӵ�ͼ',
              html: '<iframe src="/mac/infoquery/place/crowd/crowd.htm" frameborder="no" style="width:100%;height:500px;"></iframe>'
              //html: '<iframe src="/mac/datamining/crowd/crowd.htm" frameborder="no" style="width:100%;height:640px;"></iframe>'
              
            }]
        });
		
		var win4 = Ext.widget('window', {
            title: '���ӵ�ͼ',
            //closeAction: 'hide',
            x:50,
            y:50,
            width: 750,
						height: 550,
            resizable: false,
            draggable:true,
            modal:true,
            items: tabPanelelectricmap
        });
       
        win4.show();
		
	},
	
	//�鿴ͼ��
	placecheckgraph: function(thisBtn){
		var placeValue = Ext.getCmp('keyword_mobileaccount').value;
		if(placeValue == ''){
			alert('�����볡�����ƻ������');
			return ;
		} 
		
		var tabPanelchecktable = new Ext.TabPanel({
            //renderTo: "grid",
			frame: true,
            layout: 'form',
            activeTab: 0,
            items: [{   
			  			title: '����Ƶ�����ֵ��ն�TOP10',	
              html: '<iframe src="/mac/infoquery/place/checkgraph/ChosenPlaceTerminalmacTop.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            },{
              title: 'ָ�������������ܼ�ʱ��',
              html: '<iframe src="/mac/infoquery/place/checkgraph/ChosenPlacePeopleCrowedTime.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            },{
              title: 'ָ���������������',
              html: '<iframe src="/mac/infoquery/place/checkgraph/ChosenAreaPeopleStreamTrend.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            }]
        });
		
		var win5 = Ext.widget('window', {
            title: '�鿴ͼ��',
            //closeAction: 'hide',
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
		form1.placeexport.value = 'export';
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

