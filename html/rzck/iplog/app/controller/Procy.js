Ext.define('proauthRzSmslog.controller.Procy', {
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
    oprFlag:'',

    init: function() {
        this.control({
            'smsloglist':{
//                select: this.showTab,
                render: this.showRender
            },
            //�ؼ��ֲ�ѯ
            'smsloglist button[action=keycx]':{
                click: this.dwglkeycx
            },
            //�߼���ѯ
            'smsloglist button[action=advancecx]':{
                click: this.dwglavcx
            }
        });
    },
  
    showRender: function(){
        var store = Ext.ComponentQuery.query('smsloglist')[0].getStore();
        store.on('beforeload', function (store, options) {
            var keyword = Ext.getCmp('keyword_mobileaccount').value;
            var time_flag = Ext.getCmp('time_flag').value;
            var groupid = parent.ncsgroupid;
//            var did = parent.corpdid;
            var did = parent.servicecode;
            if(did){
                groupid = "";
            }
      
            var account = proauthRzSmslog.controller.Procy.account;
            var servicecode = proauthRzSmslog.controller.Procy.servicecode;
            var servicename = proauthRzSmslog.controller.Procy.servicename;
            var ip = proauthRzSmslog.controller.Procy.ip;
            var sdate = proauthRzSmslog.controller.Procy.sdate;
            var stime = proauthRzSmslog.controller.Procy.stime;
            var edate = proauthRzSmslog.controller.Procy.edate;
            var etime = proauthRzSmslog.controller.Procy.etime;
            var searchtype = proauthRzSmslog.controller.Procy.searchtype;
            var outIp = proauthRzSmslog.controller.Procy.outIp;
            var termMac = proauthRzSmslog.controller.Procy.termMac;
            var APName = proauthRzSmslog.controller.Procy.APName;
            var APMac = proauthRzSmslog.controller.Procy.APMac;
//            var oprFlag = proauthRzSmslog.controller.Procy.oprFlag;
            oprFlag = "";  
            var new_params={groupid:groupid,did:did,keyword:keyword,time_flag:time_flag,servicecode:servicecode,account:account,ip:ip,servicename:servicename,sdate:sdate,stime:stime,edate:edate,etime:etime,searchtype:searchtype,outIp:outIp,termMac:termMac,APName:APName,APMac:APMac,oprFlag:oprFlag};
        
             Ext.apply(store.proxy.extraParams,new_params);

             proauthRzSmslog.controller.Procy.account = "";
             proauthRzSmslog.controller.Procy.servicecode = "";
             proauthRzSmslog.controller.Procy.servicename = "";
             proauthRzSmslog.controller.Procy.ip = "";
             proauthRzSmslog.controller.Procy.sdate = "";
             proauthRzSmslog.controller.Procy.stime = "";
             proauthRzSmslog.controller.Procy.edate = "";
             proauthRzSmslog.controller.Procy.etime = "";
             proauthRzSmslog.controller.Procy.searchtype = "";
             proauthRzSmslog.controller.Procy.outIp = "";
             proauthRzSmslog.controller.Procy.termMac = "";
             proauthRzSmslog.controller.Procy.APName = "";
             proauthRzSmslog.controller.Procy.APMac = "";
//             proauthRzSmslog.controller.Procy.oprFlag = "";
 
        });//store.on('beforeload', function (store, options) {

        proauthRzSmslog.controller.Procy.loadProcyListStore();
    },// showRender: function(){
  //�ؼ��ֲ�ѯ
    dwglkeycx: function(thisBtn){
        proauthRzSmslog.controller.Procy.searchtype = ""; 
        proauthRzSmslog.controller.Procy.SetPage(1);
        proauthRzSmslog.controller.Procy.loadProcyListStore();
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
 /*                       {
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
                                        {name : '����',   value: '0'},
                                        {name : '����',   value: '1'},
                                        {name : '����',   value: '2'}
                                    ]
                                })
                        },
 */                       {
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
                                var grid = Ext.ComponentQuery.query('smsloglist')[0];             
                                var store = grid.getStore();
                                proauthRzSmslog.controller.Procy.account = 
                                    fp2.getForm().getValues().account;
                                proauthRzSmslog.controller.Procy.servicecode = 
                                    fp2.getForm().getValues().servicecode;
                                proauthRzSmslog.controller.Procy.servicename = 
                                    fp2.getForm().getValues().servicename;
                                proauthRzSmslog.controller.Procy.ip = 
                                    fp2.getForm().getValues().ip;
                                proauthRzSmslog.controller.Procy.sdate = 
                                    fp2.getForm().getValues().sdate;
                                proauthRzSmslog.controller.Procy.stime = 
                                    fp2.getForm().getValues().stime;
                                proauthRzSmslog.controller.Procy.edate = 
                                    fp2.getForm().getValues().edate;
                                proauthRzSmslog.controller.Procy.etime = 
                                    fp2.getForm().getValues().etime;
                                proauthRzSmslog.controller.Procy.searchtype = 
                                    fp2.getForm().getValues().searchtype;
                                proauthRzSmslog.controller.Procy.outIp = 
                                    fp2.getForm().getValues().outIp;
                                proauthRzSmslog.controller.Procy.termMac = 
                                    fp2.getForm().getValues().termMac;
                                proauthRzSmslog.controller.Procy.APName = 
                                    fp2.getForm().getValues().APName;
                                proauthRzSmslog.controller.Procy.APMac = 
                                    fp2.getForm().getValues().APMac;
//                                proauthRzSmslog.controller.Procy.oprFlag  = 
//                                    fp2.getForm().getValues().oprFlag ;

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
            modal:true,
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
            var store = Ext.ComponentQuery.query('smsloglist')[0].getStore();
            var keyword=Ext.getCmp('keyword_mobileaccount').value;
            store.load();
        },
        SetPage:function(curpage){
            var store = Ext.ComponentQuery.query('smsloglist')[0].getStore();
            store.currentPage=curpage;
        },
        setTitle: function(title){
            document.getElementById("titledx").innerHTML='&nbsp' 
                + title + '&nbsp;&nbsp;';   
        }
    }
});
