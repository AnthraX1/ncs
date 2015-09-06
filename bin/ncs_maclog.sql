-- �ն�������Ϣ
drop table if exists ncmactermatt_if_201507;
create table ncmactermatt_if_201507 (
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
    assid       char(255)     default ' ',                 -- �����ȵ�SSID
    sid         bigint        default 0                    -- ��¼���к�
);




-- �ȵ���Ϣ
drop table if exists ncmachotinfo_if_201507;
create table ncmachotinfo_if_201507 (
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

-- �ն������ƶ��ɼ��豸
drop table if exists ncmacmobileap_if_201507;
create table if not exists ncmacmobileap_if_201507 (
    apname      char(21)      primary key,              -- AP�豸���
    servicecode char(14)      NOT NULL,                 -- �����˱���
    servicename char(255)     default ' ',              -- ��������
    longitude   char(11)      NOT NULL,                 -- ����
    latitude    char(11)      NOT NULL,                 -- ά��
    stime       bigint        NOT NULL,                 -- ʱ��
    sid         bigint        NOT NULL                  -- ���к�
    );
    


