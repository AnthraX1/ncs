-- ����������Ϣ

drop table if exists  ncgroup;
create table ncgroup (
    groupid     int  unsigned   primary key,                     -- ��ID
    groupname   char(32) NOT NULL,                        -- ��������
    flags       int    default 0  NOT NULL,
    limitunit   int    default  9,                      --  �������� 1--ÿ�� 2--ÿ��   3--ÿ��  4--ȫ��
    flowlimit   int unsigned  default 0,                --  ��������  MB   
    timelimit   int unsigned  default 0,                --  ʱ������  ���� 
    overctl     int    default  0,                      --  ������Ŀ��Ʒ�ʽ 0-����  ������� ID 
    thistime    int unsigned  default  0,               --  ��ǰʱ��
    thisflow    bigint  unsigned default 0,             --  ��ǰ����
    resettime   int unsigned default 0,                 --  ������ʱ������ʱ��(ϵͳ�ڲ�ʹ��)
    lasttime    int unsigned  default 10,               --  ������ʱ��
    addtime     int unsigned  default 10,               --  ��¼����ʱ��
    pid int unsigned default 0,                         --  ��һ������
    status      int unsigned default  10,               --  2008��12��31���޸� ���״̬  0 ����  1 ����  4 �����վ   3 ���IP����  9 ���� 10 δ����
    dispname    char(255) default ' ',                   --  ��������
    level int unsigned default 0
);

create UNIQUE index ncgroup_index on ncgroup (groupname,level);
-- ����������Ϣ���ӱ�
drop table if exists ncgroupatt;
create table ncgroupatt (
    groupid        int unsigned  primary key,
    address        char(255) default '',            --  ��ַ
    longitude      char(11) default '',             --  ����
    latitude       char(11) default '',             --  γ��
    gtype          char(2) default '',              --  ��������  1:�ù��� 2��ͼ��������� 3��������ѵ���� 4�����ֳ����� 5����ͨ��Ŧ 6��������ͨ���� 7������������ 8�����ڷ����� A���ﳡ�� B ���������� C �Ļ������� D�������г��� 9����
    jytype         int default 9,                   --  ��Ӫ   0 ��Ӫ 1���Ǿ�Ӫ 3 ����
    ceoname        char(64) default '',             --  ��������
    ceoidtype      char(3) default '111',           --  ֤������
    ceoidno        char(128)  default '',            --  ֤������
    ceotel         char(128)  default '',            --  ��ϵ��ʽ
    sdate          char(20)  default '08:00',              --  Ӫҵ��ʼʱ��
    edate          char(20)  default '18:00',              --  Ӫҵ����ʱ��
    jointype       char(4) ,                         --  ���뷽ʽ
    joincode       char(4) default '01',             --  ���������
    ip             char(64) default '',              --  ����IP
    scode          char(10) default '',              --  ��ȫ������֯��������
    sname         char(128) default '',              --  ��ȫ��������
    slink         char(128) default '',              --  ��ȫ������ϵ��
    saddress      char(128) default '',             --  ��ȫ���̵�ַ
    stel          char(16) default '',              --  ��ϵ�绰
    smail         char(128) default '',              --  �ʼ���ַ
    port_start       char(20),                       --  ����������ʼ�˿�
    port_end         char(20)                        --  ����������ֹ�˿�
);


-- AP��Ϣ����, ��ԭ�л����������޸� 2015/04
drop table if exists ncaplist;
create table if not exists ncaplist (
    apname      char(21)      primary key,                 -- AP�豸���
    servicecode char(32)      default ' ',                 -- �����˱���
    servicename char(255)     default ' ',                 -- ����������
    did         int  unsigned default 0,                   -- ������ID
    version     char(16)      default ' ',                 -- �汾��
    model       char(255)     default ' ',                 -- �豸�ͺ�, �ƶ�AP,��ֵ��ʾ������Ϣ
    devid       char(64)      default ' ',                 -- �豸ID, �ƶ��� �ƶ�AP,��ֵ��ʾ���ƺ���
    ip          char(16)      default ' ',                 -- IP��ַ
    mac         char(64)      default ' ',                 -- AP MAC��ַ,������ö��ŷָ�,һ��AP���ܻ��Ӧ���MAC��ַ
    ssid        char(64)      default ' ',                 -- SSID,������ö��ŷָ�    
    address     char(64)      default ' ',                 -- ��װλ��
    plate       char(128)     default ' ',                 -- �ƶ�APʱ����ֵΪվ����Ϣ
    line        char(255)     default ' ',                 -- �ƶ�APʱ����ֵΪ��·��Ϣ
    mapid       char(255)     default ' ',                 -- ���̶�APʱ����ֵ����Ϊ¥��   �ƶ�APʱ����ֵΪ����������
    longitude   char(11)      default ' ',                 -- ����
    latitude    char(11)      default ' ',                 -- ά��
    starttime   int unsigned  default 0,                   -- ��ʼʱ��
    lasttime    int unsigned  default 0,                   -- ���ʹ��ʱ��
    bpflasttime int unsigned  default 0,                   -- Bpf���ʱ��
    cursrvbpfrule char(255)   default 0,                   -- Bpf���ͬ������
    aptype      int           default 0,                   -- AP��� 0--�̶�  1--�ƶ�
    flags       int default 0                              -- 0--δ���  1--����
);

--  ��ȫ������Ϣ
drop table if exists ncsfactorycod;
create table ncsfactorycod (
    sid          int unsigned   primary key, --  ����
    code         char(10),                   --  ����
    name         char(128),                  --  ��������
    slink        char(128) default '',       --  ��ȫ������ϵ��
    saddress     char(128) default '',       --  ��ȫ���̵�ַ
    stel         char(32) default '',        --  ��ϵ�绰
    smail        char(128) default '',         --  �ʼ���ַ
    flags        int default 0               -- 0-δ��� 1-�����
)engine=MyISAM;
create unique index ncsfactory_ind1 on ncsfactorycod(code);


-- ������������־  2015/04�޸�
drop table if exists nctermlog_if_201505;
create table if not exists nctermlog_if_201505 (
    sessionid       char(64),                       -- SessionID  ServiceCode+Mac+Starttime
    authtype        char(7),                        -- ��֤���
    servicecode     char(14),                       -- �����˱���
    servicetype     char(2),                        -- �������
    username        char(64),                       -- �û���¼��
    dispname        char(64),                       -- ����
    mac             char(18),                       -- �ն�mac��ַ
    apmac           char(18),                       -- AP MAC��ַ
    apname          char(21),                       -- AP ����
    longitude       char(11),                       -- �ƶ��ն˾���
    latitude        char(11),                       -- �ƶ��ն�ά��
    rssi            char(8),                        -- ��ǿ
    xposition       char(8),                        -- λ�� X
    yposition       char(8),                        -- λ�� Y
    idno            char(128),                       -- ֤����
    idtype          char(3),                        -- ֤������
    appsrc          char(128),                       -- APP����
    appname         char(128),                       -- APP����
    appversion      char(16),                       -- APP�汾��
    appid           char(128),                       -- APP ID
    stime           int unsigned,                   -- ��ʼʱ��
    etime           int unsigned,                   -- ����ʱ�� 
    sip             int unsigned,                   -- ԴIP  
    oip             int unsigned,                   -- Դ����IP��ַ
    sport           int,                            -- Դ��ʼ�˿�
    eport           int,                            -- Դ�����˿�
    imsi            char(64),                       -- IMSI
    imei            char(64),                       -- Imei
    termname        char(128),                       -- �ն�Ʒ��
    termos          char(64),                       -- �ն�ϵͳ
    termtype        char(128),                       -- �ն�����
    conntime        int,                            -- ����ʱ��
    sumflow         bigint,                         -- ������
    flags           smallint,                       -- �����߱�ʶ 1--����  --2����
    fcode           char(10),                       -- ��ȫ���̴���
    sid             bigint default 0                -- ��¼���к�      
)   max_rows=1000000000 avg_row_length=1500;

create index nctermlog_if_201505_i1 on nctermlog_if_201505 (sessionid);
create index nctermlog_if_201505_i2 on nctermlog_if_201505 (servicecode);
create index nctermlog_if_201505_i3 on nctermlog_if_201505 (stime);



-- ������־
drop table if exists nctermiplog_if_201505;
create table if not exists nctermiplog_if_201505 (
    sessionid       char(64),                       -- SessionID
    servicecode     char(14),                      -- �����˱���
    servicetype     char(2),                        -- �������
    username        char(64),                      -- �û���¼��
    dispname        char(64),                    -- ����
    mac             char(18),                       -- �ն�mac��ַ
    apmac           char(18),                       -- AP MAC��ַ
    apname          char(21),                       -- AP ����
    longitude       char(11),                       -- �ƶ��ն˾���
    latitude        char(11),                       -- �ƶ��ն�ά��
    stime           int unsigned,                   -- ��־��¼ʱ��
    nettype         int,                            -- ����Ӧ�����
    sip             int unsigned,                    -- ԴIP  
    sport           int,                            -- Դ��ʼ�˿�
    oip             int unsigned,                   -- Դ����IP��ַ
    osport          int,
    oeport          int,                            -- Դ�����˿�
    dip             int unsigned,                    -- ԴIP  
    dport           int,                            -- Դ��ʼ�˿�
    sumflow         bigint,                         -- ������
    fcode           char(10),                       -- ��ȫ���̴���
    sid             bigint default 0                -- ��¼���к�      

)  max_rows=1000000000 avg_row_length=1500;

create index nctermiplog_if_201505_1 on nctermiplog_if_201505 (sessionid);
create index nctermiplog_if_201505_2 on nctermiplog_if_201505 (stime,servicecode);


-- �����������ݽṹ

-- ��ص�λ��Ϣ
drop table if exists ncsuser;
create table ncsuser (
    userid      int   primary key,              -- ��λID
    username    char(16),                       -- ��¼��, ��λ���� ����������
    password    char(32) default ' ',                       -- ����
    groupid     int    default 0,               -- ��ID
    dispname    char(255) default ' ',                      -- ��������
    address     char(255) default ' ',                      -- ������ַ
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
    gtype       int     default 9,              -- ��λ���  M20061001
                                                --  1-�Ƶ���� 2-ͼ��������� 3-ѧУ 4-���ֳ��� 5-һ����ҵ 
                                                --  9-����
    useflags    int     default 0,              -- ״̬ 0 ����
    moditime    int  unsigned default 0,
    version     char(16) default 0,             -- �汾��
    lasttime    char(16) default ' ',                       -- ������ʱ��
    longitude   char(11)  default ' ',          -- ����
    latitude    char(11)  default 0,            -- γ��
    monflag     int     default 0,              -- ��ؼ��� 0-������� 1-�ص��� 2-һ����
    fcode    char(10)  default '',              -- ���̴���
    dateid     int default 0,                   -- Ӫҵʱ��ID
    jytype     int default 1,                   -- ������Ӫ���� 0--��Ӫ 1--�Ǿ�Ӫ 3--����
    ceoidtype char(4) default ' ',              -- ���˴�����Ч֤�����
    ceocardid   char(128) default ' ',          -- ���˴�����Ч֤��
    ceotel         char(64)  default  '',            --   ��ϵ��ʽ
    sdate   char(20)  default '08:00',              --  Ӫҵ��ʼʱ��
    edate   char(20)  default '18:00',              --  Ӫҵ����ʱ��
    port_start       char(20)  default ' ',                      --  ����������ʼ�˿�
    port_end         char(20)  default ' ',                       --  ����������ֹ�˿�
    shflag          int default 0,                  -- 0 δ�� 1 ����
    workflag        int default 0,                  -- 0 ���� 1 ά��
    yyflag          int default 0                  -- 0 Ӫҵ 1 ͣҵ
) ENGINE=MyISAM;

create unique index ncsuser_ind1 on ncsuser(username);
create index ncsuser_ind2 on ncsuser(groupid);
