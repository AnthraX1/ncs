

Ext.define('proauthRzAuthlog.controller.Procy', {
    extend: 'Ext.app.Controller',  
    stores: ['List'],
    models: ['List'],  
    views: ['list.List'],
    servicecode:'',
    servicename:'',
    mac:'',
    apname:'',
    apmac:'',
    ssid:'',
    sdate:'',
    stime:'',
    edate:'',
    etime:'',
    searchtype:'',
  
    init: function() {
        this.control({
          'authloglist':{
  //         select: this.showTab,
            render: this.showRender
          },
          //�ؼ��ֲ�ѯ
          'authloglist button[action=keycx]':{
                click: this.dwglkeycx
          },
          //�߼���ѯ
          'authloglist button[action=advancecx]':{
                click: this.dwglavcx
          },
		  
		  /* ���ӹ��ܣ�Ǯ����2015/7/20/11:00 */
		  //��������
          'authloglist button[action=termac]':{
                click: this.infoquerymac
          },
		  
		  /* ���ӹ��ܣ�Ǯ����2015/7/20/15:00 */
		  //��Ա�켣
		  'authloglist button[action=termmacmap]':{
                click: this.infoquerymap
          },
		  
		  /* ���ӹ��ܣ�Ǯ����2015/7/20/15:00 */
		  //����
		  'authloglist button[action=export]':{
                click: this.infoqueryexport
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
//            var did = parent.corpdid;
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
            var searchtype = proauthRzAuthlog.controller.Procy.searchtype;
            var ssid = proauthRzAuthlog.controller.Procy.ssid;
            var apname = proauthRzAuthlog.controller.Procy.apname;
            var apmac = proauthRzAuthlog.controller.Procy.apmac;
         
			
       
            var new_params={groupid:groupid,did:did,keyword:keyword,time_flag:time_flag,servicecode:servicecode,mac:mac,ssid:ssid,servicename:servicename,sdate:sdate,stime:stime,edate:edate,etime:etime,searchtype:searchtype,apname:apname,apmac:apmac};
        
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
    dwglavcx: function(thisBtn){
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
 
        var fp2 = Ext.create('Ext.FormPanel', {         
            frame: true,
            layout: 'form',
            //width: 580,//parent.width,
            //height: 330,//parent.height,
            fieldDefaults: {
               labelWidth: 85,                        
               width: 250,
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
                            name:'safefactorycod'
                        },
                        {                        
                            fieldLabel:'&nbsp;&nbsp;��������',
                            xtype: 'textfield',
                            name:'vname'
                        }
                    ]
                },
                               
                {
                    layout: 'hbox',
                    xtype: 'container',
                    items:[
                        {                        
                            fieldLabel:'�����ȵ�sdid',
                            xtype: 'textfield',
                            name:'ssid'
                        }
                    ]
                }
                ,
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
                                proauthRzAuthlog.controller.Procy.mac = 
                                    fp2.getForm().getValues().mac;
                                    
                               proauthRzAuthlog.controller.Procy.ssid = 
                                    fp2.getForm().getValues().ssid; 
                                proauthRzAuthlog.controller.Procy.servicecode = 
                                    fp2.getForm().getValues().servicecode;
                                proauthRzAuthlog.controller.Procy.servicename = 
                                    fp2.getForm().getValues().servicename;
                                proauthRzAuthlog.controller.Procy.apname = 
                                    fp2.getForm().getValues().apname;
                                proauthRzAuthlog.controller.Procy.sdate = 
                                    fp2.getForm().getValues().sdate;
                                proauthRzAuthlog.controller.Procy.stime = 
                                    fp2.getForm().getValues().stime;
                                proauthRzAuthlog.controller.Procy.edate = 
                                    fp2.getForm().getValues().edate;
                                proauthRzAuthlog.controller.Procy.etime = 
                                    fp2.getForm().getValues().etime;
                                proauthRzAuthlog.controller.Procy.searchtype ='adv';
                          
                                proauthRzAuthlog.controller.Procy.apmac = 
                                    fp2.getForm().getValues().apmac;
                                                               

                                store.load();
                            }
                           
                        },
                        {
                            xtype: 'container',
                            columnWidth: .10
                        },
                        {
                         //   fieldLabel:'&nbsp;&nbsp;&nbsp;&nbsp;          ',
                            //labelWidth: 85,                        
                            text: '&nbsp;&nbsp;��&nbsp;&nbsp;�� &nbsp;&nbsp;',
                            //style : 'margin-left:50px',
                            xtype: 'button',
                            anchor: 'right',
                            columnWidth: .25, 
                            handler: function(){
                                fp2.getForm().reset();
                            }
                        },
                        {
                            xtype: 'container',
                            columnWidth: .20
                        }
                    ]
                }
                ],// items: [
        });// var fp2=Ext.create('Ext.FormPanel', {         
    
        var win3 = Ext.widget('window', {
            title: '�߼���ѯ',
//            closeAction: 'hide',
            x:200,
            y:32,
            width: 580,
//            height: 330,
            //minHeight: 330,
//            layout: 'fit',
            resizable: true,
            draggable:true,
            modal:false,
            items: fp2
        });
       
        win3.show();
    },// dwglavcx: function(thisBtn){
  
	/* ���ӹ��ܣ�Ǯ����2015/7/20/11:00 */
	//��������
	infoquerymac: function(thisBtn){
		var tabPanel = new Ext.TabPanel({
            //renderTo: "grid",
			frame: true,
            layout: 'form',
            activeTab: 0,
            items: [{
              title: 'Ƶ�����ֵ�ʱ��',
              html: '<iframe src="/mac/infoquery/macterm/zdxwtz/oftentime.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            },{
              title: 'Ƶ�����ֵĳ���',
              html: '<iframe src="/mac/infoquery/macterm/zdxwtz/oftenplace.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            },{
              title: 'Ƶ�����ֵĳ�������',
              html: ' '
            }]
        });
		
		var win4 = Ext.widget('window', {
            title: '��������',
//            closeAction: 'hide',
            x:150,
            y:60,
            width: 850,
			height: 530,
//            height: 330,
            //minHeight: 330,
//            layout: 'fit',
            resizable: true,
            draggable:true,
            modal:false,
            items: tabPanel
        });
       
        win4.show();
		
	},
	
	/* ���ӹ��ܣ�Ǯ����2015/7/20/15:00 */
	//�켣��ͼ
	infoquerymap: function(thisBtn){
		var tabPanelmap = new Ext.Panel({
            //renderTo: "grid",
			frame: true,
            layout: 'form',
            activeTab: 0,
            items: [{
              //title: '��Ա�켣',
              html: '<iframe src="/mac/infoquery/macterm/mackmap/proauth_macgj.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            }]
        });
		
		var win5 = Ext.widget('window', {
            title: '��Ա�켣',
//            closeAction: 'hide',
            x:150,
            y:60,
            width: 800,
			height: 500,
//            height: 330,
            //minHeight: 330,
//            layout: 'fit',
            resizable: true,
            draggable:true,
            modal:false,
            items: tabPanelmap
        });
       
        win5.show();
		
	},
	
	/* ���ӹ��ܣ�Ǯ����2015/7/20/16:45 */
	//����
	infoqueryexport: function(thisBtn){
		var tabPanelmap = new Ext.Panel({
            //renderTo: "grid",
			frame: true,
            layout: 'form',
            activeTab: 0,
            items: [{
              //title: '����',
              html: '<iframe src="/mac/infoquery/macterm/zdxwtz/oftentime.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            }]
        });
		
		var win6 = Ext.widget('window', {
            title: '����',
//            closeAction: 'hide',
            x:150,
            y:60,
            width: 800,
			height: 500,
//            height: 330,
            //minHeight: 330,
//            layout: 'fit',
            resizable: true,
            draggable:true,
            modal:false,
            items: tabPanelmap
        });
       
        win6.show();
		
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
         
            store.load();
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
