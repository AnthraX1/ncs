/**
 �������tab
 */
 
Ext.define('ncViewer.portalSysset',{
    extend: 'Ext.tab.Panel',

    initComponent : function(){

        Ext.apply(this,{
        layout : 'border',
        id:'lan_sysset',
        margins: '0 0 0 0',
 //       frames:true,
        forceFit: true,
        activeTab: 0,        
         defaults :{
 
            bodyPadding: 0
 
        },
        items: [{
            title: '״̬��������', 
            id:'statusset',           
            html: '<iframe  id="lan_sysset_statusset" name="lan_sysset_statusset" src="/systemset/status/proauth_statusset.htm" scrolling="no" width=100% height=900  FrameBorder=0 ></iframe>' 
           },
           {
            title: '��־��������', 
            id:'logsave',           
            html: '<iframe  id="lan_sysset_logsave" name="lan_sysset_logsave" src="/systemset/logsave/proauth_logsave.htm" scrolling="no" width=100% height=900  FrameBorder=0 ></iframe>' 
           }
           ,
           {
            title: '��־�ϴ�����', 
            id:'logftppar',           
            html: '<iframe  id="lan_sysset_logftppar" name="lan_sysset_logftppar" src="/systemset/logftp/proauth_logftp.htm" scrolling="no" width=100% height=900  FrameBorder=0 ></iframe>' 
           },
            {
            title: '�������߸澯����', 
            id:'warnoffpar',           
            html: '<iframe  id="lan_sysset_warnoffpar" name="lan_sysset_warnoffpar" src="/systemset/warnoff/proauth_warnoff.htm" scrolling="no" width=100% height=900  FrameBorder=0 ></iframe>' 
           }
           
          ,
           {
            title: 'ϵͳ��¼��������', 
            id:'loginpar',           
            html: '<iframe  id="lan_sysset_loginpar" name="lan_sysset_loginpar" src="/pronline/Msg?FunName@ncWebLogin_par" scrolling="no" width=100% height=900  FrameBorder=0 ></iframe>' 
           }
       
        ]
          
        });
        this.callParent(arguments);
    }
})