-- �����������ݽṹ
drop table if exists ncsuser;
create table ncsuser (
    userid      int   primary key,              -- ��λID
    username    char(16),                       -- ��¼��, ��λ���� ����������
    password    char(32) default ' ',                       -- ����
    groupid     int    default 0,               -- ��ID
    dispname    varchar(256) default ' ',                      -- ��������
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
    servernum    char(2)   default '0',           --  ��������
    jointype     char(2)  default '99',          -- ���뷽ʽ���� 01-ר����ʵip��ַ 02-ר�� 03-ADSL���� 04-ISDN 05-��ͨ���� 06-Cable moden���� 07-������ 08-�������� 99-����
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


-- AP��Ϣ����, ��ԭ�л����������޸� 2015/04
drop table if exists ncaplist;
create table if not exists ncaplist (
    apname      char(21)      primary key,                 -- AP�豸���
    servicecode char(32)      default ' ',                 -- �����˱���
    servicename varchar(256)     default ' ',                 -- ����������
    did         int  unsigned default 0,                   -- ������ID
    version     char(16)      default ' ',                 -- �汾��
    model       varchar(256)     default ' ',                 -- �豸�ͺ�, �ƶ�AP,��ֵ��ʾ������Ϣ
    devid       char(64)      default ' ',                 -- �豸ID, �ƶ��� �ƶ�AP,��ֵ��ʾ���ƺ���
    ip          char(16)      default ' ',                 -- IP��ַ
    mac         char(64)      default ' ',                 -- AP MAC��ַ,������ö��ŷָ�,һ��AP���ܻ��Ӧ���MAC��ַ
    ssid        char(64)      default ' ',                 -- SSID,������ö��ŷָ�    
    address     char(64)      default ' ',                 -- ��װλ��
    plate       char(128)     default ' ',                 -- �ƶ�APʱ����ֵΪվ����Ϣ
    line        varchar(256)     default ' ',                 -- �ƶ�APʱ����ֵΪ��·��Ϣ
    mapid       varchar(256)     default ' ',                 -- ���̶�APʱ����ֵ����Ϊ¥��   �ƶ�APʱ����ֵΪ����������
    longitude   char(11)      default ' ',                 -- ����
    latitude    char(11)      default ' ',                 -- ά��
    starttime   int unsigned  default 0,                   -- ��ʼʱ��
    lasttime    int unsigned  default 0,                   -- ���ʹ��ʱ��
    bpflasttime int unsigned  default 0,                   -- Bpf���ʱ��
    cursrvbpfrule varchar(256)   default 0,                   -- Bpf���ͬ������
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
    moditime    bigint  default 0,
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
    stime           bigint,                        -- ��ʼʱ��
    etime           bigint,                        -- ����ʱ�� 
    sip             int unsigned,                   -- ԴIP  
    oip             int unsigned,                   -- Դ����IP��ַ
    sport           int,                            -- Դ��ʼ�˿�
    eport           int,                            -- Դ�����˿�
    sipv6           char(64),                       -- Դ����IPV6��ַ
    sportv6         int,                            -- Դ��ʼ�˿�
    eportv6         int,                            -- Դ�����˿�
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
    stime           bigint,                         -- ��־��¼ʱ��
    nettype         int,                            -- ����Ӧ�����
    sip             int unsigned,                    -- ԴIP  
    sport           int,                            -- Դ��ʼ�˿�
    oip             int unsigned,                   -- Դ����IP��ַ
    osport          int,
    oeport          int,                            -- Դ�����˿�
    dip             int unsigned,                    -- ԴIP  
    dport           int,                            -- Դ��ʼ�˿�
    oipv6           char(64),                       -- Դ����IPV6��ַ
    sportv6         int,                            -- Դ��ʼ�˿�
    eportv6         int,                            -- Դ�����˿�
    dipv6           char(64),                       -- Դ����IPV6��ַ
    dportv6         int,                            -- Դ��ʼ�˿�
    sumflow         bigint,                         -- ������
    fcode           char(10),                       -- ��ȫ���̴���
    sid             bigint default 0                -- ��¼���к�      
)  max_rows=1000000000 avg_row_length=1500;
