Ext.define('proauthRzAuthlog.controller.Procy', {
    extend: 'Ext.app.Controller',  
    stores: ['List'],
    models: ['List'],  
    views: ['list.List'],
    servicecode:'',
    servicename:'',
    account:'',
    ip:'',
    sdate:'',
    stime:'',
    edate:'',
    etime:'',
    searchtype:'',
    outIp:'',
    termMac:'',
    APName:'',
    APMac:'',
    oprFlag:'2',
  
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
          }
        });
    },
    
    showRender: function(){
        var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
        store.on('beforeload', function (store, options) {
            var keyword = Ext.getCmp('keyword_mobileaccount').value;
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
            var ip = proauthRzAuthlog.controller.Procy.ip;
            var sdate = proauthRzAuthlog.controller.Procy.sdate;
            var stime = proauthRzAuthlog.controller.Procy.stime;
            var edate = proauthRzAuthlog.controller.Procy.edate;
            var etime = proauthRzAuthlog.controller.Procy.etime;
            var searchtype = proauthRzAuthlog.controller.Procy.searchtype;
            var outIp = proauthRzAuthlog.controller.Procy.outIp;
            var termMac = proauthRzAuthlog.controller.Procy.termMac;
            var APName = proauthRzAuthlog.controller.Procy.APName;
            var APMac = proauthRzAuthlog.controller.Procy.APMac;
           
            var oprFlag = proauthRzAuthlog.controller.Procy.oprFlag;
          
            if(!oprFlag){oprFlag='2';};
            var new_params={groupid:groupid,did:did,keyword:keyword,time_flag:time_flag,servicecode:servicecode,account:account,ip:ip,servicename:servicename,sdate:sdate,stime:stime,edate:edate,etime:etime,searchtype:searchtype,outIp:outIp,termMac:termMac,APName:APName,APMac:APMac,oprFlag:oprFlag};
        
             Ext.apply(store.proxy.extraParams,new_params);
/*
             proauthRzAuthlog.controller.Procy.account = "";
             proauthRzAuthlog.controller.Procy.servicecode = "";
             proauthRzAuthlog.controller.Procy.servicename = "";
             proauthRzAuthlog.controller.Procy.ip = "";
             proauthRzAuthlog.controller.Procy.sdate = "";
             proauthRzAuthlog.controller.Procy.stime = "";
             proauthRzAuthlog.controller.Procy.edate = "";
             proauthRzAuthlog.controller.Procy.etime = "";
             proauthRzAuthlog.controller.Procy.searchtype = "";
             proauthRzAuthlog.controller.Procy.outIp = "";
             proauthRzAuthlog.controller.Procy.termMac = "";
             proauthRzAuthlog.controller.Procy.APName = "";
             proauthRzAuthlog.controller.Procy.APMac = "";
             proauthRzAuthlog.controller.Procy.oprFlag = "";
 */
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
                            fieldLabel:'�˺�',
                            xtype: 'textfield',
                            name:'account'
                        },
                        {                        
                            fieldLabel:'&nbsp;&nbsp;��������',
                            xtype: 'textfield',
                            name:'servicecode'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    xtype: 'container',
                   
                    items:[
                        {
                            fieldLabel:'��������',
                            xtype: 'textfield',
                            name:'servicename'
                        },
                        {
                            fieldLabel:'&nbsp;&nbsp;����IP',
                            xtype: 'textfield',
                            name:'outIp'
                        }
                    ]
                },

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
                            fieldLabel:'�ն�IP��ַ',
                            xtype: 'textfield',
                            name:'ip'
                        },
                        {
                            fieldLabel:'&nbsp;&nbsp;�ն�Mac��ַ',
                            xtype: 'textfield',
                            name:'termMac'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    xtype: 'container',
                    items:[
                        {
                            fieldLabel:'AP���',
                            xtype: 'textfield',
                            name:'APName'
                        },
                        {                        
                            fieldLabel:'&nbsp;&nbsp;AP Mac��ַ',
                            xtype: 'textfield',
                            name:'APMac'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    xtype: 'container',
                    items:[
                        {
                            fieldLabel: '��Ϊ',
                            xtype: 'combo',
                            mode: 'local',
                            value: '0',
                            triggerAction:  'all',
                            forceSelection: true,
                            editable: false,
                            name: 'oprFlag',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value'],
                                    data : [
                                        {name : '����',   value: ''},
                                        {name : '����',   value: '1'},
                                        {name : '����',   value: '2'}
                                    ]
                                })
                        },
                        {
                            xtype: 'hidden',
                            value:'adv',
                            name:'searchtype',
                            id:'searchtype'
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
                                proauthRzAuthlog.controller.Procy.account = 
                                    fp2.getForm().getValues().account;
                                proauthRzAuthlog.controller.Procy.servicecode = 
                                    fp2.getForm().getValues().servicecode;
                                proauthRzAuthlog.controller.Procy.servicename = 
                                    fp2.getForm().getValues().servicename;
                                proauthRzAuthlog.controller.Procy.ip = 
                                    fp2.getForm().getValues().ip;
                                proauthRzAuthlog.controller.Procy.sdate = 
                                    fp2.getForm().getValues().sdate;
                                proauthRzAuthlog.controller.Procy.stime = 
                                    fp2.getForm().getValues().stime;
                                proauthRzAuthlog.controller.Procy.edate = 
                                    fp2.getForm().getValues().edate;
                                proauthRzAuthlog.controller.Procy.etime = 
                                    fp2.getForm().getValues().etime;
                                proauthRzAuthlog.controller.Procy.searchtype = 
                                    fp2.getForm().getValues().searchtype;
                                proauthRzAuthlog.controller.Procy.outIp = 
                                    fp2.getForm().getValues().outIp;
                                proauthRzAuthlog.controller.Procy.termMac = 
                                    fp2.getForm().getValues().termMac;
                                proauthRzAuthlog.controller.Procy.APName = 
                                    fp2.getForm().getValues().APName;
                                proauthRzAuthlog.controller.Procy.APMac = 
                                    fp2.getForm().getValues().APMac;
                                proauthRzAuthlog.controller.Procy.oprFlag  = 
                                    fp2.getForm().getValues().oprFlag ;

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
            x:400,
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

