/**
 �������tab
 */
 
Ext.define('ncViewer.portalJrcs',{
    extend: 'Ext.tab.Panel',

    initComponent : function(){

        Ext.apply(this,{
        layout : 'border',
        id:'lan_jrcs',
        margins: '0 0 0 0',
 //       frames:true,
        forceFit: true,
        activeTab: 0,        
         defaults :{
 
            bodyPadding: 0
 
        },
        items: [{
            title: '������Ϣά��', 
            id:'fac_s',           
            html: '<iframe  id="lan_jrcs_fac_s" name="lan_jrcs_fac_s" src="/v4/ncs_joinuser_list.htm" scrolling="no" width=100% height=900  FrameBorder=0 ></iframe>' 
           },
           {
            title: '��������״̬', 
            id:'csyxzt',           
            html: '<iframe  id="lan_jrcs_csyxzt" name="lan_jrcs_csyxzt" src="/v4/ncs_csyxzt_list.htm" scrolling="no" width=100% height=900  FrameBorder=0 ></iframe>' 
           }
           ,
           {
            title: '����ά����־', 
            id:'whlog',           
            html: '<iframe  id="lan_jrcs_whlog" name="lan_jrcs_whlog" src="/jrcs/proauth_whlog.html" scrolling="no" width=100% height=900  FrameBorder=0 ></iframe>' 
           }
            ,
           {
            title: '��Ϣ����', 
            id:'mesglog',           
            html: '<iframe  id="lan_jrcs_mesglog" name="lan_jrcs_mesglog" src="/jrcs/mesg/proauth_mesg.html" scrolling="no" width=100% height=900  FrameBorder=0 ></iframe>' 
           }
        ]
          
        });
        this.callParent(arguments);
    }
})