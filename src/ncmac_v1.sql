-- ����޸�ʱ��  2015/06/21     By Liyunming
-- MAC��ַ�ɼ���׼
-- 
-- ����Ϣ


-- �ն������ɼ��豸������Ϣ
drop table if exists ncaplist;
create table if not exists ncaplist (
    apname          char(21)      primary key,                 -- AP�豸���(��ȫ������֯����+MAC��ַ) 9 + 12
    servicecode     char(14)      NOT NULL,                    -- �����˱���
    dispname        char(128)     NOT NULL,                    -- �ɼ��豸���ƣ�����)
    servicename     char(255)     default ' ',                 -- ����������
    did             int  unsigned default 0,                   -- ������ID
    version         char(16)      default ' ',                 -- �汾��
    model           varchar(255)     default ' ',              -- �豸�ͺ�, �ƶ�AP,��ֵ��ʾ������Ϣ
    devid           char(64)      default ' ',                 -- �豸ID, �ƶ��� �ƶ�AP,��ֵ��ʾ���ƺ���
    ip              char(16)      default ' ',                 -- IP��ַ
    mac             char(64)      default ' ',                 -- AP MAC��ַ,������ö��ŷָ�,һ��AP���ܻ��Ӧ���MAC��ַ
    ssid            char(64)      default ' ',                 -- SSID,������ö��ŷָ�    
    address         char(255)     NOT NULL,                    -- ��װλ��
    plate           char(128)     default ' ',                 -- �ƶ�APʱ����ֵΪվ����Ϣ
    line            varchar(255)     default ' ',              -- �ƶ�APʱ����ֵΪ��·��Ϣ
    mapid           varchar(255)     default ' ',              -- ���̶�APʱ����ֵ����Ϊ¥��   �ƶ�APʱ����ֵΪ����������
    longitude       char(11)      default ' ',                 -- ����
    latitude        char(11)      default ' ',                 -- ά��
    starttime       int unsigned  default 0,                   -- ��ʼʱ��
    lasttime        int unsigned  default 0,                   -- ���ʹ��ʱ��
    bpflasttime     int unsigned  default 0,                   -- Bpf���ʱ��
    cursrvbpfrule   varchar(255)   default 0,                  -- Bpf���ͬ������
    aptype          int(1)           NOT NULL,                 -- AP��� 1--�̶��ɼ��豸  2--�ƶ����زɼ��豸  3--�����ɼ��豸 9--���� 
    fcode           char(9)          NOT NULL,                 -- ��ȫ���̴���
    radius          int(4)          NOT NULL,                  -- ���ݲɼ��뾶���ɼ��豸��)
    uptimestep      int(8)          NOT NULL,                  -- �����ϴ�ʱ����
    flags           int(1) default 0,                           -- 0--δ���  1--����
    moditime        bigint(20)
) ENGINE=MyISAM;



-- ����������Ϣ(�������Ķ�)
drop table if exists ncsuser;
create table ncsuser (
    userid      int   primary key,              -- ��λID md5(username)
    username    char(14)            NOT NULL,   -- ��¼��, ��λ���� ����������
    password    char(32) default ' ',           -- ����
    groupid     int      default 0,               -- ��ID
    dispname    char(255)           NOT NULL,   -- ��������
    address     char(255)           NOT NULL,   -- ������ַ
    telphone    char(64) default ' ',                       -- ��ȫ����ϵ�绰
    contact     char(32) default ' ',                       -- ��Ϣ��ȫԱ
    handphone   char(32) default ' ',                       -- ���˴���(������)�绰
    email       char(128) default ' ',          -- ��Ϣ��ȫԱE-Mail��ַ
    ceoname     char(32) default ' ',           -- ���˴���(������)
    postcode     char(6) default ' ',           -- �ʱ�
    servicestate char(1) default '9',           -- ����״̬ 1-װ����ʼ���� 2-װ��ֹͣ���� 3-δװ����ʼ���� 4-δװ��ֹͣ���� 9-����
    joincode     char(6) default ' ',           -- ��������̴���
    endnum       char(6) default '0',           -- �ն���
    servernum  char(2)   default '0',           --  ��������
    jointype    char(2)  default '99',          -- ���뷽ʽ���� 01-ר����ʵip��ַ 02-ר�� 03-ADSL���� 04-ISDN 05-��ͨ���� 06-Cable moden���� 07-������ 08-�������� 99-����
    empnum      char(6)  default '0',           -- ��ҵ����
    area        char(70) default ' ',           -- ��������
    areaman     char(30) default ' ',           -- ����λ������
    areatel     char(30) default ' ',           -- ����λ�����˵绰
    demo        char(255) default ' ',          -- ��ע
    ip          char(64) default ' ',           -- ����IP��ַ
    addtime     char(16) default ' ',           -- ����ʱ��
    gtype       char(1)  NOT NULL,              -- ��λ���  M20061001
                                                --  1-�Ƶ���� 2-ͼ��������� 3-ѧУ 4-���ֳ��� 5-һ����ҵ 
                                                --  9-����
    useflags    int     default 0,              -- ״̬ 0 ����
    moditime    bigint  default 0,              -- ��¼����޸�ʱ��
    version     char(16) default 0,             -- �汾��
    lasttime    char(16) default ' ',                       -- ������ʱ��
    longitude   char(11)  default ' ',          -- ����
    latitude    char(11)  default ' ',            -- γ��
    monflag     int     default 0,              -- ��ؼ��� 0-������� 1-�ص��� 2-һ����
    fcode       char(9)  NOT NULL,              -- ���̴���
    dateid     int default 0,                   -- Ӫҵʱ��ID
    jytype     int default 1,                   -- ������Ӫ���� 0--��Ӫ 1--�Ǿ�Ӫ 3--����
    ceoidtype   char(3) default ' ',              -- ���˴�����Ч֤�����
    ceocardid   char(128) default ' ',          -- ���˴�����Ч֤��
    ceotel      char(128) default  '',            --   ��ϵ��ʽ
    sdate   char(5)  default '08:00',              --  Ӫҵ��ʼʱ��
    edate   char(5)  default '18:00',              --  Ӫҵ����ʱ��
    port_start       char(20)  default ' ',                      --  ����������ʼ�˿�
    port_end         char(20)  default ' ',                       --  ����������ֹ�˿�
    shflag          int default 0,                  -- 0 δ�� 1 ����
    workflag        int default 0,                  -- 0 ���� 1 ά��
    yyflag          int default 0                  -- 0 Ӫҵ 1 ͣҵ
) ENGINE=MyISAM;

create unique index ncsuser_ind1 on ncsuser(username);
create index ncsuser_ind2 on ncsuser(groupid);



--  ��ȫ������Ϣ
   
drop table if exists ncsfactorycod;
create table ncsfactorycod (
    sid          int unsigned   primary key, --  ����
    code         char(9)   NOT NULL,                   --  ����
    name         char(70)  NOT NULL,                  --  ��������
    slink        char(128) NOT NULL,       --  ��ȫ������ϵ��
    saddress     char(255)  NOT NULL,       --  ��ȫ���̵�ַ
    stel         char(128)  NOT NULL,        --  ��ϵ�绰
    smail        char(32)  NOT NULL,       --  �ʼ���ַ
    flags        int default 0,              -- 0-δ��� 1-�����
    moditime     bigint default 0            -- ����������ʱ�� 
) engine=MyISAM;

create unique index ncsfactory_ind1 on ncsfactorycod(code);



-- �ն�������Ϣ
drop table if exists ncmactermatt_if_201506;
create table ncmactermatt_if_201506 (
    mac         char(17)      NOT NULL,                    -- Mac��ַ
    termtype    char(128)     default ' ',                 -- �ն�Ʒ��
    servicecode char(14)      NOT NULL,                    -- �����˱��
    servicename char(128)     default ' ',                 -- ����������
    address     char(128)     default ' ',                 -- ��װλ��
    stime       bigint        NOT NULL,                    -- �ɼ�ʱ��
    rssi        char(8)       NOT NULL,                    -- ��ǿ
    vtype       int(1)        default 0,                   -- �������
    vname       char(64)      default ' ',                 -- �������
    ssid        char(255)     default ' ',                 -- SSID,������ö��ŷָ�    
    apname      char(21)      NOT NULL,                    -- AP����
    apmac       char(17)      NOT NULL,                    -- APMac��ַ
    channel     char(2)       default ' ',                 -- �����ȵ�Ƶ��
    security    char(2)       default ' ',                 -- ��������
    xpos        char(8)       default ' ',                 -- X����
    ypos        char(8)       default ' ',                 -- Y����
    longitude   char(11)      NOT NULL,                    -- ����
    latitude    char(11)      NOT NULL,                    -- ά��
    flags       int(1)        default 0,                   -- �����߱�ʶ 0--����  1--�뿪  2--Update
    sid         bigint        default 0                    -- ��¼���к�
);




-- �ȵ���Ϣ
drop table if exists ncmachotinfo_if_201605;
create table ncmachotinfo_if_201605 (
    mac         char(17)      NOT NULL,                  -- Mac��ַ
    ssid        char(64)      default ' ',               -- �ȵ�SSID
    channel     char(2)       NOT NULL,                  -- �����ȵ�Ƶ��
    servicecode char(14)      NOT NULL,                 -- �����˱��
    servicename char(128)     default ' ',              -- ����������
    address     char(128)     default ' ',              -- ��װλ��
    stime       bigint        NOT NULL,                 -- �ɼ�ʱ��
    rssi        char(8)       NOT NULL,                 -- ��ǿ
    apname      char(21)      NOT NULL,                    -- AP����
    apmac       char(17)      NOT NULL,                    -- APMac��ַ
    security    char(2)       default ' ',                 -- ��������
    xpos        char(8)       default ' ',                 -- X����
    ypos        char(8)       default ' ',                 -- Y����
    longitude   char(11)      NOT NULL,                    -- ����
    latitude    char(11)      NOT NULL,                    -- ά��
    flags       int(1)        default 0,                   -- �����߱�ʶ 0--����  1--�뿪  2--Update
    sid         bigint        default 0                    -- ��¼���к�
);

-- ��־�ͣ�ÿ�±���һ����
drop table if exists ncmacmobileap_if_201506;
create table if not exists ncmacmobileap_if_201506 (
    apname      char(21)      primary key,              -- AP�豸���
    servicecode char(14)      NOT NULL,                 -- �����˱���
    servicename char(255)     default ' ',              -- ��������
    longitude   char(11)      NOT NULL,                 -- ����
    latitude    char(11)      NOT NULL,                 -- ά��
    stime       bigint        NOT NULL,                 -- ʱ��
    sid         bigint        NOT NULL                  -- ���к�
    );
    
    
    
--  �ȵ���Ϣ��

drop table if exists nchotspotinfo;
create table nchotspotinfo (
    hotspotid          int unsigned  auto_increment primary key,  --  ����
    ssid         char(64)   NOT NULL,               --  �ȵ�SSID
    security     char(2)    ,                       --  ��������
    authflag     char(128) default 2,               --  �Ϲ��ж� 0--�ǺϹ�  1--�Ϲ�  2--����
    isp          char(255)  default '' ,            --  �ȵ���Ӫ��
    servicetype	  char(2)	  default ' ',            --   ��������������  ��Ӧncsuser_lb�еĴ���
    servicequlity  int default 1,                   --  ������Ӫ���� 0--��Ӫ 1--�Ǿ�Ӫ 3--����
	  ISPname	     char(30) default ' ',              -- ��Ӫ����ϵ��
	  ISPphone     char(64),                          -- ��Ӫ����ϵ�绰
	  ISPemail	   char(32)  	,                       -- ��Ӫ����ϵ����
	  Regtime      int unsigned,                      -- ����ʱ��
	  note        text                                -- ��ע      
) engine=MyISAM;
create unique index nchotspotinfo_ind1 on nchotspotinfo(ssid); 

--  �ȵ�mac��

drop table if exists nchotmacgroup;
create table nchotmacgroup (
    ssid         char(64)   NOT NULL,               --  �ȵ�SSID
    mac          char(20)    ,                       --  �ȵ�MAC
    sitename    char(128) default 2               --  ��λ����
) engine=MyISAM;
create index nchotmacgroup_ind1 on nchotmacgroup(ssid); 

--  �ȵ�mac��

drop table if exists nchotmacgroup;
create table nchotmacgroup (
    ssid         char(64)   NOT NULL,               --  �ȵ�SSID
    mac          char(20)    ,                       --  �ȵ�MAC
    sitename    char(128) default 2               --  ��λ����
) engine=MyISAM;
create index nchotmacgroup_ind1 on nchotmacgroup(ssid); 

-- �ն�MAC��
drop table if exists nctermmacgroup; 
create table nctermmacgroup (
    groupid      int unsigned  auto_increment primary key,  --  ����
    groupname    char(32),                         -- ����
    groupdesc    char(255)                         -- ����
) engine=MyISAM;

-- �ն�MAC������
drop table if exists nctermmacgroupinfo;
create table nctermmacgroupinfo (
    sid          int unsigned  auto_increment primary key,  --  ����
    mac          char(20) ,  --  
    groupid      int unsigned   ,  --  ��ID
    modtime      int unsigned      -- �޸�ʱ�� 
) engine=MyISAM;
create index nctermmacgroupinfo_ind1 on nctermmacgroupinfo(groupid); 

-- �ն˰�����Ϊ���������
drop table if exists nctermtask;
create table nctermtask (
    cid          int unsigned  auto_increment primary key,  --  ����
    groupid      int unsigned,     -- ������ID,�����û�Ȩ��
    starttime    int unsigned,     -- ��ʼʱ��
    endtime        int unsigned,     --  ����ʱ��
    taskname     char(64),           -- ��������
    taskdesc     char(255),          -- ��������
    dids         char(255) default '', -- ��������ĳ���ID�����Զ��,���ŷָ� ��Ϊȫ��
    mac          char(20),             -- ��MAC
    maccount     int unsigned,      -- ��ͬ����MAC��������
    servcount    int unsigned,      -- ��ͬ�������ִ���
    macgroups    char(255) default '', -- ����mac��
    opname       char(32),           -- ����Ա
    optime       int unsigned,        -- ����ʱ��
    modtime      int unsigned,        -- �޸�ʱ��
    reoporttime  int unsigned  default 0,     -- �����¼����ʱ��
    updatetime   int unsigned  default 0,      -- ״̬����ʱ��
    result       int unsigned default 0     -- ����״̬ 0-���� 1-ʧЧ 2-����
) engine=MyISAM;


-- �ն˰�����Ϊ���������
drop table if exists nctermtasklog;
create table nctermtasklog (
    sid          int unsigned  auto_increment primary key,  --  ����
    cid          int unsigned  ,  --  ����ID ��nctermtask ���е�CID����
    mac         char(17)      NOT NULL,                    -- Mac��ַ
    servicecode char(14)      NOT NULL,                    -- �����˱��
    servicename char(128)     default ' ',                 -- ����������
    address     char(128)     default ' ',                 -- ��װλ��
    stime       bigint        NOT NULL,                    -- �ɼ�ʱ��
    vtype       int(1)        default 0,                   -- �������
    vname       char(64)      default ' ',                 -- �������
    ssid        char(255)     default ' ',                 -- SSID,������ö��ŷָ�    
    apname      char(21)      NOT NULL,                    -- AP����
    apmac       char(17)      NOT NULL,                    -- APMac��ַ
    longitude   char(11)      NOT NULL,                    -- ����
    latitude    char(11)      NOT NULL                    -- ά��
) engine=MyISAM;
create index nctermtasklog_ind1 on nctermtasklog(cid); 


-- �ն�MAC���ز��Ա�    Ϊ�˺�ԭ�������ļ��ݱ����Ժ���ֲ�����ӹ�������ԭ��������Ϣ��
drop table if exists ncscaseinfo;
create table ncscaseinfo (
        sid      int   unsigned auto_increment primary key,
        casecode   char(20),             -- �������
        casename   char(32),             -- ��������
        casetype   int,                  -- ��������
        caseclass  int,                  -- ��Ƽ���
        groupid    int unsigned,         -- ��������
        casedept   char(64),             -- ������λ
        casedate   int unsigned,         -- ����ʱ��
        addby      char(16),             -- ������Ա
        cmemo      text,                 -- ��������
        lasttime   int unsigned,         -- ��¼�޸�ʱ��
        expiretime int unsigned default 0,    -- ��Чʱ��
        flags      int  default 0        -- 1--�Ѳ���  0--δ����   8--ɾ��  9--����
) engine=MyISAM;


-- �ն˲���MAC����

drop table if exists ncscasmac;
create table ncscasmac (
    sid      int   unsigned auto_increment primary key,
    cid      int   unsigned,          -- �������к�
    macgroupid  int,                  -- MAC��ַ��
    mac     char(20),                 -- mac��ַ
    flags    int  default 0,          -- 0--����  1--ͣ��
    lasttime int  unsigned
) engine=MyISAM;
-- �ն˷�ֵ���ز���
drop table if exists ncscasetermlim;
create table ncscasetermlim (
    sid      int   unsigned auto_increment primary key,
    cid      int   unsigned,                    -- �������к�
    level    int   unsigned default 1,          -- ��ؼ���   1-һ�� 2-�ж� 3-����
    dateid   int,                               -- ͳ��ʱ��Ƶ��  1-���� 2-Сʱ 3-ÿ��
    countlimit     int unsigned default 0,      -- ��ֵ
    apname     varchar(21),                     -- AP���
    flags    int  default 0,          -- 0--����  1--ͣ��
    lasttime int  unsigned
) engine=MyISAM;

-- �澯����
drop table if exists ncscasewarn;
create table ncscasewarn (
        sid      int   unsigned auto_increment primary key,
        cid      int   unsigned,         -- �������к�
        uid      int   unsigned,         -- ������ID
        name      char(32),              -- ����
        wtype    int,                    -- �澯��ʽ 1-�ʼ� 2-����
        waddr    char(64),               -- ��ַ
        flags    int  default 0,         
        lasttime int  unsigned
) engine=MyISAM;

-- ��������
drop table if exists ncscaseobj;
create table ncscaseobj (
        sid      int   unsigned auto_increment primary key,
        cid      int   unsigned,         -- �������к�
        ctype    int   default 0,        -- ��� 0-��λ 1-��λ���  2-��λ��
        did      int   unsigned,         -- ��������ǵ�λid,��λ������
        lasttime int   unsigned,         -- ��¼����ʱ��
        flags    int   default 0         -- 0--����  1--ͣ��
) engine=MyISAM;

-- ���ظ澯��־  
drop  table if exists ncscasemacwarnlog;
create   table ncscasemacwarnlog (
    sid    int   unsigned auto_increment primary key,
    servicecode char(14),     -- ��������
    udisp  char(32),           -- �û���
    mac    char(20), 
    stime  int unsigned,       -- ʱ��
    ruleid  int unsigned,      -- ����ID
    msid    bigint default 0,      -- ��־ID ����ncmactermatt_if �е�SID
    cid    int unsigned,       -- MAC���ز��Ա�ID
    message  char(255),        -- ��Ϣ����
    flags  int default 0,       --     0 ������ 1-�Ѵ���
    opname char(32),            -- ������Ա
    optime int default 0       -- ����ʱ��  
    ) engine=MyISAM;
create index ncscasemacwarnlog_ind1 on ncscasemacwarnlog(stime); 
create index ncscasemacwarnlog_ind2 on ncscasemacwarnlog(cid); 
create index ncscasemacwarnlog_ind3 on ncscasemacwarnlog(mac); 

--  ͳ�����ݱ� ÿ���ncmactermatt_if_ ͳ��  
drop  table if exists ncmactermcount;
create   table ncmactermcount (
    sid    int   unsigned auto_increment primary key,
    servicecode char(14),     -- ��������
    apname     char(24),       -- apname
    lcount    int unsigned default 0,    -- mac����
    sdate     char(10)               -- ���� ��ʽ2014/01/01 
    ) engine=MyISAM;
create index ncmactermcount_ind1 on ncmactermcount(sdate); 

--  ͳ�����ݱ� �Ӿ���Ա
drop  table if exists stafinfo;
create   table stafinfo (
    sid    int   unsigned auto_increment primary key,
    name  char(16),                -- ����
    department     char(64),       -- ����
    phone    char(20),             -- �ֻ�
    email     char(64)               -- ����
    ) engine=MyISAM;
    
    
    -- ���������־
drop table if exists nctermnetlog_if_201508;
create table if not exists nctermnetlog_if_201508 (
    sessionid       char(64)  NOT NULL,                      -- SessionID
    servicecode     char(14) NOT NULL,                       -- �����˱���
    username        char(64) NOT NULL,                       -- �û���¼��
    mac             char(17) NOT NULL,                       -- �ն�mac��ַ
    apname          char(21) NOT NULL,                       -- AP ����
    longitude       char(11) NOT NULL,                       -- �ƶ��ն˾���
    latitude        char(11) NOT NULL,                       -- �ƶ��ն�ά��
    stime           bigint NOT NULL,                         -- ��־��¼ʱ��
    etime           bigint NOT NULL,                         -- ��־����ʱ��
    nettype         int(2) NOT NULL,                         -- ����Ӧ�����
    vname           char(64) NOT NULL,                       -- ��������˺�
    vdisp           char(64) NOT NULL,                       -- ��������ǳ�
    sip             int unsigned NOT NULL,                   -- ԴIP  
    dip             int unsigned NOT NULL,                   -- Ŀ��IP  
    oip             int unsigned NOT NULL,                   -- Դ����IP��ַ
    fcode           char(10) NOT NULL,                       -- ��ȫ���̴���
    flags           int(1)  NOT NULL,                        -- 0--����  1--�뿪
    sid             bigint default 0                         -- ��¼���к�      
)  max_rows=1000000000 avg_row_length=1500;


--- ������ݿ�
drop table if exists nctermnetlog;
create table if not exists nctermnetlog (
    mac             char(17) NOT NULL,                       -- �ն�mac��ַ
    nettype         int    NOT NULL,                         -- ����Ӧ����� ��ncsnettype ���е�nettype����
    vname           char(32) NOT NULL,                       -- ��������˺�
    vdisp           char(32) default ' ',                    -- ��������ǳ�
    username        char(32) default ' ',                    -- �����˺�
    starttime       bigint NOT NULL,                         -- �ɼ�ʱ��
    moditime        bigint NOT NULL,                         -- ������ʱ��
    UNIQUE INDEX   nctermnetlog_ind1 (mac,nettype,vname),
    INDEX          nctermnetlog_ind2 (nettype,vname)
)  max_rows=1000000000 avg_row_length=1500;

--- Mac��ַ��_����
drop table if exists nctermmacs;
create table if not exists nctermmacs (
    mac             char(17) NOT NULL,                       -- �ն�mac��ַ
    servicecode     char(14),                                -- ����
    username        char(32) default ' ',                    -- �����˺�
    starttime       bigint NOT NULL,                         -- �ɼ�ʱ��
    moditime        bigint NOT NULL,                         -- ������ʱ��
    UNIQUE INDEX   nctermmacs_ind1 (mac,servicecode),
    INDEX          nctermmacs_ind2 (moditime)
)  max_rows=1000000000 avg_row_length=1500;

--- ϵͳ��ά�澯��־
drop table if exists nctermsysalarm;
create table if not exists nctermsysalarm (
    sid    int   unsigned auto_increment primary key,
    alarmcode     char(14),                                -- �澯�����
    alarmlevel    char(32) default ' ',                -- �澯���� 1-���� 2-��֤ 3-һ��
    devtype       char(4),                             -- 01 -AP 02-���� 03-�������� 04-�ϼ�ƽ̨
    alarmtime          int default 0,                         -- �澯ʱ��
    updatetime         int default 0,                  -- �澯�ϱ�ʱ��
    description          char(128),                          -- �澯����
    status           int default 0,                    -- 0δȷ�� 1-��ȷ��                 
    INDEX          nctermsysalarm_ind1 (alarmtime)
)  max_rows=1000000000 avg_row_length=1500;

--- Mac��ַ��_AP
drop table if exists nctermmacs_ap;
create table if not exists nctermmacs_ap (
    mac             char(17) NOT NULL,                       -- �ն�mac��ַ
    apname          char(22),                                -- ap
    starttime       bigint NOT NULL,                         -- �ɼ�ʱ��
    moditime        bigint NOT NULL,                         -- ������ʱ��
    UNIQUE INDEX   nctermmacsap_ind1 (apname,mac),
    INDEX          nctermmacsap_ind2 (moditime)
)  max_rows=1000000000 avg_row_length=1500;

