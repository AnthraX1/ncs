Ext.define('quickResarch.view.list.netidList' ,{
//  extend: 'Ext.panel.Panel',
extend: 'Ext.form.Panel',
  alias : 'widget.netidlog',
//  region:'center',
// height: 390,
  initComponent: function() {
  	var twidth=parent.Ext.getCmp('layout_center').getWidth()-250;
       var resultTpl = Ext.create('Ext.XTemplate',
       '<tbody>',
       '<div  class="tScroll" id="tC" > ',
       '<table cellspacing=0 bordercolor="#DFDFDF"  id="DataTable" class="listDataTable" border="0" align="center" heigth="400" width="'+twidth+'" >',
       '<tr bgcolor="#dfdfdf" height="18" class="tableHead">',
       '<td width="60" class="bord2" > ��������</td>',
       '<td width="110" class="bord2" > �����ʺ�</td>',
       '<td width="110" class="bord2" > ����</td>',
        '<td width="130" align="center" class="bord2">����ʱ��</td>',
       '<td width="130" align="center" class="bord2">��������</td>',
       '<td width="100" align="center" class="bord2">����IP</td>',
       '<td width="120" align="center" class="bord2">MAC��ַ</td>',
       '<td width="100" align="center" class="bord2">����λ��</td>',
       '<td width="130" align="center" class="bord2">֤������</td>',
      

       '</tr>',
        '<tpl for=".">',
        '<tr  height="18"  bgcolor="#ffffff">',
        '<td   class="bord1">{ntype}</td>',
        '<td   class="bord1">{nname}</td>',
        '<td   class="bord1">{dispname}</td>',
         '<td   class="bord1">{stime}</td>',
        '<td  class="bord1">{corpname}</td>',
        '<td   class="bord1">{sip}</td>',
        '<td  class="bord1">{mac}</td>',
        '<td   class="bord1">{position}</td>',
        '<td   class="bord1">{idno}</td>',
      
        '</tr>',
        '</tpl>',
        '</table>',
        '</div>',
        '</tbody>',
        {
        formatDate: function(value){
             var re=/&lt;/g;
             var dre="<";             
             var  aaaa=value.replace(re,dre);
             var re=/&gt;/g;
             var dre=">";  
             value=aaaa.replace(re,dre);  
             return value;
          }
        }
        
        );


    this.tbar = Ext.create('Ext.PagingToolbar',{
   	store:store_netidlog,
 
      displayInfo: true,
      displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
     emptyMsg: "û�м�¼����ʾ",
     items:[
           
         '-', 
     	 {xtype:'label', html:'<span id="titledx">���������־</span>', style : 'margin-top:10px;margin-left:70px'}
     	]
    }
    );
   this.items = [
    {
            autoScroll: true,
     //       height:350,
            xtype: 'dataview',           
            tpl: resultTpl,
            store: store_netidlog,
            itemSelector: 'div.search-item2'
        }
        
        
        ];
  	

  
 

    this.callParent(arguments);
  }
 
});                                                              