/* #include  "ncshmdebug.h"  */
#ifndef __NETCHARGDEF__
#define __NETCHARGDEF__
#define   NC_MAX_PROCESS        16   /* ����������  */
#define   NC_MAX_CONTROL        32   /* �����Ʊ���  */
#define   NC_MAX_ONTIMEDO       16   /* ���ʱ����  */
#define   NC_DEFAULT_IP_CHECK   20
#define   NC_DEFAULT_IP_TIMEOUT 30
#define   NC_MAX_USERNUM      257
#define   NC_MAX_IPPKG        9999
#define   NC_MAX_HTTPNUM      999
#define   NC_MAX_LIMITED      100
#define   NC_MAX_MONITOR      100
#define   NC_MAX_INTERNAL     100
#define   NC_MAX_LASTIP       1000
#define   NC_CONTENT_GET      10
#define   NC_CONTENT_POST1    11
#define   NC_CONTENT_POST2    12
#define   NC_CONTENT_POST3    13
#define   NC_CONTENT_SMTP1    21
#define   NC_CONTENT_SMTP2    22
#define   NC_CONTENT_POP3     23
#define   NC_MAX_NOMONWEB     50
#define   NC_PF_UNUSED        0
#define   NC_PF_INUSED        1
#define   NC_LNK_THIRDAUTH  25  /* ��������֤���û�  */
#define   NC_LNK_ALLUSER    26  /* ȫ���û���Ϣ      */
#define   NC_LNK_MAILCTL    27  /* �ʼ�����          */
#define   NC_LNK_CONTROL    28  /* ���ʿ���          */
#define   NC_LNK_IPFLOW     29  /* ������            */
#define   NC_LNK_MAIL       30  /* �ʼ����ݰ�        */
#define   NC_LNK_IPPKG      31  /* IP���ݰ�          */
#define   NC_LNK_WEB        32  /* http���ݰ�        */
#define   NC_LNK_IPLIMIT    33  /* ����ʹ�õ�IP��ַ  */
#define   NC_LNK_NETWORK    34  /* Ҫ��ص�IP��ַ  Add 2002/9/6 By Liyunming Replace
                                         NC_LNK_MONITOR NC_LNK_INTERNAL */

#define NC_LNK_PKGLOG       35  /* ����װ�ؿ���  */
#define NC_LNK_USERINFO     36  /* �û���Ϣ          */
#define NC_LNK_SERVICE      37  /* ������֪�Ķ˿�    */
#define NC_LNK_MMONFILTER   38  /* �ʼ���ط������      */
#define NC_LNK_WEBLIMIT     39  /* Web��������       */
#define NC_LNK_IPLIST       40  /* IP��ַ�б�        */
#define NC_LNK_IPPOL        41  /* ������ʲ���      */
#define NC_LNK_WEBLIST      42  /* Web��ַ�б�        */
#define NC_LNK_IPPOLINDEX   43  /* ������ʲ��Ե�����  */
#define NC_LNK_GROUPINFO    44  /* ������Ϣ           */
#define NC_LNK_SUMMARY      45  /* ������Ϣ           */
#define NC_LNK_ONTIME       46  /* ��ʱ����           */
#define NC_LNK_PROCESS      47  /* ���̹���           */
#define NC_LNK_WEBPOLINDEX  48  /* ��վ���ʲ���       */
#define NC_LNK_WEBPOL       49  /* ��վ���ʲ���       */
#define NC_LNK_NTAUTH       50  /* NT��֤             */
#define NC_LNK_FMONFILTER   51  /* ����ع���       */
#define NC_LNK_MCTLFILTER   52  /* �����ʼ��������   */
#define NC_LNK_MAILPROXY    53  /* �շ��ʼ���Ŀ��IP��ַ  */
#define FIRE_LNK_DEFINE     54  /* �����б�            */
#define FIRE_LNK_TABLES     55  /* ����               */
#define FIRE_LNK_PLATE      56     /* ģ��      */
#define FIRE_LNK_SUMMARY    57     /* ������Ϣ  */
#define NC_LNK_ICUSER       58     /* IC���û�  */
#define NC_LNK_HTTPPROXY    59     /* http proxy    */
#define NC_LNK_POP3PROXY    60     /* pop3 proxy    */
#define NC_LNK_NOMONWEB     61     /* ���ص���ַ  */
#define NC_LNK_MSNPKGBUF    62     /* MSN���ݽ���������,��̬����     */
#define NC_LNK_MSNUSRBUF    63     /* MSN�����û�������,Hash��       */
#define NC_LNK_CONTROLBUF   64     /* ���ʿ��ƻ�����                 */
#define NC_LNK_BANDWIDTH    65     /* �������                       */
#define NC_LNK_PKGBUF       66     /* ���ݰ�������                   */
#define NC_LNK_CONTBUF      67     /* ��һ����������ݻ�����         */
#define NC_LNK_IPUSER       68     /* �û���IP����                   */
#define NC_LNK_DNSCASH      69     /* DNS Cash                       */
#define NC_LNK_HTTPCACHE    70     /* http cache                              */
#define NC_LNK_HTTPCACHEC   71     /* http cache content                      */
#define NC_LNK_ADMIPLIST    72     /* ����ԱIP��ַ, ������¼��¼ʧ�ܵ�IP��ַ  */
#define NC_LNK_IPEXCEPT     73     /* �����й��������IP��ַ��                */
#define NC_LNK_IPCONTACT    74     /* TCP������Ϣ                             */
#define NC_LNK_LANG         75    /* ���Զ��ձ�   */
#define NC_LNK_PKGSEQ       76    /* ���кŶ��ձ�, Hash��  */
#define NC_LNK_NCSRVINFO    77    /* �������ĵ��й���Ϣ    */
#define NC_LNK_NCPOLINFO    78    /* ���ʿ��Ʋ�������      */
#define NC_LNK_MACLIST      79    /* ���ص�MAC��ַ       */
#define NC_LNK_BILLTYPE     80    /* �ƷѲ���              */
#define NC_LNK_BILLRATE     81    /* �Ż�����              */
#define NC_LNK_BILLTIME     82    /* ʱ�����              */
#define NC_LNK_BILLFLOW     83    /* ��������              */
#define NC_LNK_PROXYIP      84    /* Proxy�ĵ�ַ�б�       */
#define NC_LNK_LOCK         85    /* ����Ϣ                */
#define NC_LNK_WEBNAME      86    /* ��ַ���Ӧ������      */
#define NC_LNK_COMPUTE      87    /* ����������б�        */
#define NC_LNK_DEVINFO      88    /* �豸��Ϣ����          */
#define NC_LNK_IPMACLIST    89    /* IP��ַ��MAC��ַ���ձ�          */
#define NC_LNK_MACIPLIST    90    /* MAC��ַ��IP��ַ������������ձ�*/
#define NC_LNK_DBSYNCINFO   91    /* ����ͬ��������Ϣ               */
#define NC_LNK_ONLINECOMP   92    /* ���߼�������                 */
#define NC_LNK_NCMAILLIST   93    /* �ʼ���ַ�ڰ�����               */
#define NC_LNK_GROUPIPLST   94    /* ȱʡIP�Ͳ��Ŷ��ձ�             */


/* �첽��������                   */


#define NC_IPCONTROL_BY_ICMP      0
#define NC_IPCONTROL_BY_IPTABLES  1
#define NC_SERVICE_OTHER  0    /* δ֪����           */
#define NC_SERVICE_TELNET 1    /* Telnet ����        */
#define NC_SERVICE_FTP    2    /* Ftp    ����        */
#define NC_SERVICE_HTTP   3    /* Web����            */
#define NC_SERVICE_HTTP1  300  /* Web����            */
#define NC_SERVICE_SMTP   4    /* SMTP����           */
#define NC_SERVICE_POP    5    /* POP����            */
#define NC_SERVICE_QQ     6    /* QQ                */
#define NC_SERVICE_YHMSG  7    /* YHMSG               */
#define NC_SERVICE_IRC    8    /* IRC                */
#define NC_SERVICE_VIDEO  9    /* IRC                */
#define NC_SERVICE_MSN    10    /* ��Ƶ                */
#define NC_SERVICE_ICQ    11   /* ICQ                */
#define NC_SERVICE_P2P    12   /* P2P����             */
#define NC_SERVICE_P2P_BASE  1200
#define NC_SERVICE_SSH    15   /* ssh                */


#define NC_HTTP_GET       1
#define NC_HTTP_POST      2
#define NC_QQ_LOGIN       1
#define NC_QQ_LOGOUT      2
#define NC_QQ_SENDMSG     3

#define NC_IM_LOGIN       1
#define NC_IM_LOGOUT      2
#define NC_IM_SENDMSG     3



#define NC_PROTOCOL_ICMP  1
#define NC_PROTOCOL_IGMP  2
#define NC_PROTOCOL_TCP   6
#define NC_PROTOCOL_UDP   17

/*   Define the Debug Level   */
#define NC_DEBUG_SHOWTCP      1
#define NC_DEBUG_SHOWCONTROL  2
#define NC_DEBUG_SHOWUDP      3
#define NC_DEBUG_SHOWICMP     4
#define NC_DEBUG_SHOWIGMP     5
#define NC_DEBUG_SHOWCHECKMAC 6
#define NC_DEBUG_SHOWSMTP     7
#define NC_DEBUG_SHOWPOP      8
#define NC_DEBUG_NTAUTH       9
#define NC_DEBUG_UPLOAD       10
#define NC_DEBUG_IPCONTROL    11
#define NC_DEBUG_MAILAUDIT    12     /* �ʼ����  */
#define NC_DEBUG_MAILNON      13     /* �ʼ����  */
#define NC_DEBUG_TIMECTL      14     /* ʱ�����  */
#define NC_DEBUG_MSGINFO      15     /* ��ʾ���ݰ�   */
#define NC_DEBUG_CHECKNETIP   16     /* ���������� */
#define NC_DEBUG_THIRDAUTH    17     /* ��������֤   */
#define NC_DEBUG_SAVEIPBUF    18     /* ��ʱ���滺�����е�IP��Ϣ  */

/* �йش��󼶱�       */
#define NC_LOG_SUCESS          0      /* һ����־         */
#define NC_LOG_ERROR           1      /* ���ش���         */
#define NC_LOG_WARN            2      /* ������Ϣ         */
#define NC_LOG_EVENT           4      /* ��Ҫ�¼�         */
#define NC_LOG_DEBUG           8      /* ������Ϣ         */

#define NC_DEBUG_UPDATE       119     /* ���������ĵ�����Ϣ    */
#define NC_DEBUG_MAILCTL      120     /* �ʼ����              */

/* ��ֹԭ�����    */
#define NC_DENY_NONE           0    /* ֱ�ӽ�ֹ    */
#define NC_DENY_NORMAL         1    /* һ�����    */
#define NC_DENY_WEBPOL         2    /* ��ַ�����  */
#define NC_DENY_SERVICE        3    /* ��������    */
#define NC_DENY_SERVICEPOL     4    /* �������    */
#define NC_EXCEPT_FORBIT        1    /* һ���ֹ   */
#define NC_EXCEPT_IPPOL         2    /* IP��ַ     */
#define NC_EXCEPT_WEBPOL        3    /* ��ַ����� */
#define NC_EXCEPT_IPNET         4    /* IP��ֹ���� */
#define NC_EXCEPT_IPSERVICE     5    /* IP��������  */
#define NC_EXCEPT_IPPORT        6    /* ��ֹ����IP��ַ�Ͷ˿�  */
#define NC_EXCEPT_WEBURL        7    /* ��ֹ����ָ����URL */

/*���cStatus����, 0 ����,δ֪
                   1 �����������
                  >5 ��ֹ����
 */
#define NC_USER_NOUSE           0        /* Nouse                  */
#define NC_USER_NORMAL          1        /* Normal                 */
#define NC_USER_NOMON           2        /* �û�����             */

#define NC_USER_FORBIDCTL       5        /* ���ʿ��Ʊ���ֹ         */
#define NC_USER_FORBIDLIMIT     6        /* �û����ʳ�������       */
#define NC_USER_FORBIDNOUSER    7        /* �û�������             */
#define NC_USER_FORBIDMACERR    8        /* MAC��ַ��һ��          */
#define NC_USER_USRFORBID       9        /* �û�����               */
#define NC_USER_FORBIDAUTH      10       /* �û���֤               */
#define NC_USER_FORBIDNAMEERR   11       /* ���������һ��         */
#define NC_USER_FORBIDIPERR     12        /* MAC��ַ��һ��          */

/* ��ϼ���  */
#define NC_FORBID_USER       1        /* �û���ֹ���ʻ�����  */
#define NC_FORBID_SERVICE    2        /* �û���ֹ����ĳ������ */
#define NC_FORBID_IP         3        /* ��ֹ����ĳ��IP��ַ   */
#define NC_FORBID_IPPORT     4        /* ��ֹ����ĳ��IP��PORT */
#define NC_FORBID_IPCONTRACT 5        /* ���ĳ������         */

#define NC_DEF_IPADDRESS    1        /* ����IP��ַ���� */
#define NC_DEF_COMPUTER     2        /* ���ݼ������������  */
#define NC_DEF_RAND         0        /* �������            */

#define NC_MCTL_QMAIL       1        /* Qmail ת��          */
#define NC_MCTL_SMTPPROXY  2        /* Smtp Proxy          */
#define NC_MCTL_POP3PROXY  3        /* Pop3 Proxy          */

#define NC_MCTL_NONE       0
#define NC_MCTL_SEND       1
#define NC_MCTL_REJECT     2
#define NC_MCTL_FORWARD    3
#define NC_MCTL_WAIT       4

#define NC_NAT_NATIP         1        /* Ip��ַӳ��   */
#define NC_NAT_NATPORT       2        /* �˿��ض���   */
#define NC_NAT_NATSNAT       3        /* Դ��ַαװ   */
#define NC_NAT_NATNAP        4        /* Դ��ַαװ   */

#define NC_NAT_ROUTE         8        /* ·������     */

#define NC_DBCHK_EXTENDED    1
#define NC_DBCHK_CHANGED     2
#define NC_DBCHK_FAST        3

#define   NC_IPCONTROL_ID       918123123L
#define NC_TABLES_REMOTEFILE       6 

#define NC_SIGNAL_RESETPKG 0        /* ���³�ʼ�����ݰ�    */

#define nc_copt_default    '^'      /* ȱʡ��ƥ�䷽ʽ      */


/* �ۺϲ��� �ͱ� nclimsumm��Ӧ  */
typedef struct ncLimSummer_s {
    unsigned char ipaccess;
    unsigned char httpaccess;
    unsigned char postsend;
    unsigned char httpbyip;
    unsigned char limitunit;         /* ���Ƶ�λ  1--ÿ��  2--ÿ��  3--ÿ�� 4--ȫ��  */
    unsigned char overctl;           /* �������ƺ�Ĵ���ʽ                         */
    unsigned char ipbind;
    unsigned char macbind;
    unsigned char namebind;
    unsigned char onlyone;
    unsigned char cRev[2];
    unsigned long long flowlimit;    
    unsigned long timelimit;    
    unsigned long overid;    
    unsigned long feeid;  
    unsigned long polid;  
}  ncLimSummer;

typedef struct ncLimPolInfo_s {        /* ���ʿ��Ʋ�����Ϣ  */
    unsigned long lId;                 /* ����ID            */
    char           caName[16];          /* ��������          */
    ncLimSummer    sSumm;              /* �ۺϲ���          */
    unsigned short nLimIp;             /* Ip������ʼ���    */
    unsigned short nLimWeb;            /* Web������ʼ���   */
} ncLimPolInfo;

   

/* ��Ĺ���  ��С��������  */
typedef struct ncLimGroup_s {    /* ����Ϣ  */
    unsigned long  lId;
    char           groupname[16];
    ncLimSummer    sSumm;
    unsigned short nLimIp;
    unsigned short nLimWeb;
    ncLimPolInfo   *psMypol;
} ncLimGroup;


typedef struct ncUserCont_s {        /* �û���Ϣ       */
    unsigned long  userid;           /* 0--�û�������  */
    char           username[16];     /* �û���         */
    char           dispname[16];     /* ��ʾ��         */
    char           compname[16];     /* �������       */
    char           password[24];     /* ����           */
    unsigned long  groupid;          /* ��ID           */
    unsigned long  ip;               /* IP��ַ         */
    unsigned long  thistime;         /* ��ǰ����ʱ��   */
    unsigned long  resettime;        /* ��ʼ��ʱ��     */
    long  long thisflow;             /* ��ǰ����       */
    unsigned long  lasttime;         /* ����޸�ʱ��   */
    ncLimSummer    sSumm;            /* ���������Ϣ   */
    ncLimGroup     *psGroup;
    ncLimPolInfo   *psMypol;
    unsigned short nLimWeb;          /* ��վ���Ʒ���, ��Ŵ�1��ʼ   */
    unsigned short nLimIp;           /* IP���Ʒ���     */
    double         fee;              /* �˻����       */
    unsigned char  mac[6];
    unsigned char  useflags;         /* �û�״̬  0 ����   1 ����  9 ����            */
    unsigned char  modflags;         /* �޸ı�ʶ  0--û��  1--����   2--�޸�   9--ɾ��*/
    unsigned char  userbase;         /* �û�����ʽ                                  */
    unsigned char  rev[3];           /* ����                                          */
} ncUserCont;


#define NC_IPBASE_PRE    999
#define NC_MACBASE_PRE   111
#define NC_IDBASE_PRE    222

/* ͨ��Hash������������  */
typedef struct ncUserIpIndex_s {
    unsigned long pre;
    unsigned long ip;
    unsigned long lIndex;
} ncUserIpIndex;

typedef struct ncUserMacIndex_s {
    unsigned short pre;
    unsigned char  mac[6];
    unsigned long  lIndex;
} ncUserMacIndex;    

typedef struct ncUserIdIndex_s {
    unsigned long pre;
    unsigned long lId;
    unsigned long lIndex;
} ncUserIdIndex;    

typedef struct ncUserContHead_s {
    unsigned long lMaxUser;
    unsigned long lSumUser;
    unsigned long lHashPos;     /* Hash���ƫ����    */
    unsigned long lContPos;     /* �û����ݵ�ƫ����  */
    unsigned long lLasttime;    /* ����޸�ʱ��      */
    int           iModFlags;    /* �޸ı�ʶ 0--δ�Ĺ�  1--�����޸�  */
    ncUserCont    *psUser;
    char          *psHash;
} ncUserContHead;

#define NC_LOGIN_IP         2      /* ͨ��IP��ַ��������    */
#define NC_LOGIN_MAC        3      /* ͨ��MAC��ַ��������   */
#define NC_LOGIN_IC         4

#define NC_LOGIN_AUTH       3      /* ͨ��������֤��������  */
typedef struct ncUserInfo_s {      /* �û���Ϣ       */
    unsigned long  lIp;            /* 0 ��ʾû���û� */
    unsigned long  lId;            /* �û�Id  0--û��                          */
    unsigned long  lGid;           /* ��Id   groupid=0 δ֪�û�  1=������      */
    unsigned char  cUseflags;      /* ʹ��״̬0--���� 1--����  9--����            */
    unsigned char  cStatus;        /*                                               */
    unsigned char  mac[6];         /* MAC��ַ           */
    unsigned long  lStartTime;     /* ��ʼ����ʱ��      */
    unsigned long  lLastTime;      /* ������ʱ��      */
    unsigned long  lLastCountTime; /* ���һ�μ���ʱ��  */
    unsigned long  lConnTime;      /* ��������ʱ��,������ʱ������   */
    unsigned long  lSaveTime;      /* �ϴα��������ʱ��  */
    long8          lSaveBytes[2];  /* �ϴα�������� */
    long8          lBytes[2];      /* 0-�ܵ��������� 1--�������� ������ʱ�俪ʼ����     */
    long8          lSumflow;       /* �ӿ�ʼ��ʱ����ǰ��������                      */
    unsigned long  lSumtime;       /* �ӿ�ʼ��ʱ����ǰʱ������                       */
    long8          lSflow;         /* ��ʼ����             */
    unsigned long  lStime;         /* ��ʼʱ��             */
    unsigned long  lPkg[2];        /* ���ݰ����� 0:dat 1:syn  ���ݸ�ֵ���ж�TCP�����Ƿ����� */
    ncUserCont     *psUser;        /* ����û�����         */
    unsigned long  lCltLastTime;   /* �Ϳͻ�����󽻻���Ϣ     */
    unsigned long  lCltId;         /* �ͻ���ID                 */
    unsigned char  cLogin;         /* ��¼��ʽ    2 ����IP��ַ  3 ����MAC��ַ 4 ������֤ 5 ��������֤  6 �ͻ��˷�ʽ */
    unsigned char  cMacCheck;      /* 0--NoCheck 1--Check  */
    unsigned char  cRev[2];
} ncUserInfo;

/* ���ݵ�������Ϣ  */
typedef struct ncUserBack_s {      /* �û���Ϣ       */
    unsigned long  lIp;            /* 0 ��ʾû���û� */
    unsigned long  lId;            /* �û�Id  0--û��                          */
    unsigned long  lGid;           /* ��Id   groupid=0 δ֪�û�  1=������      */
    unsigned char  cUseflags;      /* ʹ��״̬0--���� 1--����  9--����            */
    unsigned char  cStatus;        /*                                               */
    unsigned char  mac[6];         /* MAC��ַ           */
    unsigned long  lStartTime;     /* ��ʼ����ʱ��      */
    unsigned long  lLastTime;      /* ������ʱ��      */
    unsigned long  lLastCountTime; /* ���һ�μ���ʱ��  */
    unsigned long  lConnTime;      /* ��������ʱ��,������ʱ������   */
    unsigned long  lSaveTime;      /* �ϴα��������ʱ��  */
    long8          lSaveBytes[2];  /* û�б�������� */
    long8          lBytes[2];      /* 0-�ܵ��������� 1--�������� ������ʱ�俪ʼ����     */
    long8          lSumflow;       /* �ӿ�ʼ��ʱ����ǰ��������                      */
    unsigned long  lSumtime;       /* �ӿ�ʼ��ʱ����ǰʱ������                       */
    long8          lSflow;         /* ��ʼ����     */
    unsigned long  lStime;         /* ��ʼʱ��     */
    unsigned long  lPkg[2];        /* ���ݰ����� 0:dat 1:syn  ���ݸ�ֵ���ж�TCP�����Ƿ����� */
    unsigned char  cLogin;         /* ��¼��ʽ    2 ����IP��ַ  3 ����MAC��ַ 4 ������֤ 5 ��������֤ */
    unsigned char  cRev[3];
    struct ncUserBack_s   *next;
} ncUserBack;

/* ϵͳ����Ϣ         */
#define NC_LOCK_SYSREFRESH       0       /* ϵͳˢ��     */
#define NC_LOCK_UPDATEURL        1       /* ��������URL  */
#define NC_LOCK_AUTOCLEAN        2       /* �Զ�����     */

/* ����¼            */
typedef struct ncLockInfo_s {
    int  iLock;                  /*  1--����    0--����  */
    unsigned long lTimeout;      /*  ��ʱʱ��            */
    unsigned long lLasttime;     /*  ����ʱ��            */
    int  iPid;                   /*  ���̺�              */
    char     caDesc[16];         /*  ����                */
    char     caMsg[128];         /*  ��ǰ��Ϣ            */
} ncLockInfo;    

/* 
    # --- ��ͷ
    ^ --- ����
    = --- ����
    ! --- ��
    $ --- ����    

 */
typedef struct ncUtlStrStr_hs {
    unsigned char        cMark;         /* ���ṹ     */
    unsigned char        cSum;          /* �ܸ���     */
    unsigned char        nLen;          /* ����       */
    unsigned char        cOpt;          /* 0--����  1--��      */
} ncUtlStrStr_h;

typedef struct ncUtlStrStr_cs {
    unsigned char        cOpt;          /*  0--����  1--��  */
    unsigned char        cFlags;        /*  ������  =#$^    */
    unsigned short       nLen;          /* ����             */
    char     caWord[256];                /* �ַ�������       */
} ncUtlStrStr_c;


typedef struct ncThreadInfo_s {
    int      iSumThread;                 /* �߳�����  */
    unsigned long lStartTime;            /* ������ʼʱ��  */
    unsigned long lLastTime;             /* ������ʱ��  */
    int      iPid;                       /* ����ID        */
} ncThreadInfo;

typedef struct ncProxyProcessInfo_s {
    int iMaxThread;            /* ÿ����������߳���  */
    int iMaxProcess;           /* ��������          */
    int iMinProcess;           /* ��С������          */
    int iSumProcess;           /* �ܼƽ�����          */
    ncThreadInfo *psThread;
} ncProxyProcessInfo;


typedef struct ncIcUserinfo_s {
    unsigned long  lSip;      /* ԴIP��ַ   */
    unsigned long  lUserid;   /* �û�ID     */
    unsigned long  lStartTime;
    unsigned long  lLastTime;
} ncIcUser;


typedef struct ncMailIpList_s {
    unsigned long  lSip;      /* ԴIP��ַ   */
    unsigned short nSport;    /* Դ�˿�     */
    unsigned short nDport;    /* Ŀ��˿�   */
    unsigned long  lDip;      /* Ŀ��IP��ַ */
    unsigned long  lLastTime;
    int            iFlags;    /* 0--����  1--����  */
} ncMailIpList;


/* Proxy��Ip��ַ�Ͷ˿�    */
typedef struct ncProxyIpList_s {
    unsigned long  lIp;       /* IP��ַ      */
    unsigned short nPort;     /* �˿�        */
    unsigned short nRecv;     /* ����        */
} ncProxyIpList;


typedef struct pasSearchHead_s {
    char caFname[32];        /* �ֶ���               */
    char caDispname[32];     /* ��ʾ��               */
    int  iSize;
    int  iMaxLen;
    int  iType;              /* ��������  1-�ı�  2-ѡ���  */
    char *pValue;
} pasSearchHead;

/* �ڴ��е��û���Ϣ  */
typedef struct ncUserBuf_s {       /* �û���Ϣ                */
    long     lUserid;              /* �û�Id  0--û��         */
    char     caUsername[16];       /* ����                    */
    char     caDispname[16];       /* ��ʾ��                  */
    long     lGroupid;             /* ����ID                  */
    char     caGroupname[16];      /* ��������                */
} ncUserBuf;

/* �û���Ϣ�Ļ���
         ���ṹ��Ҫ�����û���Ϣ��Case, ��ϵͳ�д����һ��Hash����
 */
typedef struct ncUserBufIp_s {
	unsigned long lSip;           /* IP��ַ  */
	int      iFlags;              /* ״̬ 0--δ��       1--������  2--�û���ʱ  3--�û�������
	                                      4--MAC��һ��  7--����    9--����
	                               */
	unsigned long lLastTime;      /* ������ʱ��  */
} ncUserBufIp;


/* ��������֤���û���Ϣ  */
typedef struct ncThirdAuth_s {
    char          caUsername[16];    /* �û���                */
    int           iIndex;            /* ���û���Ϣ�е�������  */
    unsigned long lIp;               /* IP��ַ 0 --��ʾû������ */
    unsigned long lLastTime;         /* ������ʱ��          */
} ncThirdAuth;

typedef struct ncNtAuth_s {
    unsigned long lIp;               /* IP��ַ             */
    char          caName[16];
    unsigned long lLastTime;         /* ������ʱ��       */
    char          caMd5[32];         /* ��ͻ��˷��ŵ�Key,16λ  */
} ncNtAuth;

typedef struct ncIcAuth_s {
    unsigned long lIp;               /* IP��ַ             */
    char          caName[16];
    unsigned long lLastTime;         /* ������ʱ��       */
} ncIcAuth;



/* �û�ͬ����Ϣ   */
typedef struct ncNtUser_s {        /* NT�û���Ϣ     */
    char          caName[32];      /* ����           */
    unsigned long lIp;             /* IP��ַ         */
    int           iStatus;        /* 1--��½  0--�˳�  */
} ncNtUser;


/* ��Ľṹ��Ϣ  */
typedef struct ncDbField_s {
    int  iFlags;
    char caField[32];
    char caType[32];
    char caNull[32];
  	char caKey[32];
  	char caDefault[64];
  	char caExtra[32];
} ncDbField;

typedef struct ncDbIndex_s {
    int  iFlags;
    char caIndex[32];
    char caUnique[4];    /* 0-- Unique  1-- No */
    char caSeq[4];       /* ���               */
    char caField[32];
} ncDbIndex;



#define NC_NETWORK_NOMAL          0    /* ��������    */
#define NC_NETWORK_NAMEBASE       1    /* ��������    */
#define NC_NETWORK_INTERNET       99   /* Internet��  */
#define NC_NETWORK_IPBASE         2    /* ����IP��ַ  */
#define NC_NETWORK_MACBASE        3    /* ����MAC��ַ */
#define NC_NETWORK_AUTH           4    /* ������֤    */
#define NC_NETWORK_NTAUTH         5    /* ��������֤  */
#define NC_NETWORK_NOMON          6    /* ����      */
#define NC_NETWORK_FORBID         7    /* ����        */
#define NC_NETWORK_CLIENT         8    /* ���ڿͻ���ID*/
#define NC_NETWORK_OUTSIDE        9    /* �ⲿ        */

typedef struct ncIpNetwork_s {      /* �ڲ�IP��ַ    */
    unsigned long   lIpLower;       /* ��ʼIP��ַ    */
    unsigned long   lIpUpper;       /* ��ֹIP��ַ    */
    unsigned long   lAuthIp;        /* ��֤������IP��ַ  */
    unsigned short  nAuthPort;      /* ��֤�������˿ں�  */
    unsigned short  iFlags;         /* ���궨��      */
} ncIpNetwork;

/* Ip��ͷ����Ϣ  */
typedef struct ncIpHead_s {
	unsigned long  lSip;       /* ԴIP��ַ     */
	unsigned long  lDip;       /* Ŀ��IP��ַ   */
	unsigned short nDport;     /* Ŀ��˿�     */
	unsigned short nSport;     /* Դ�˿�       */
	char     caSmac[6];        /* ԴMAC��ַ    */
	char     caDmac[6];        /* Ŀ��MAC��ַ  */
	short    cTran;            /* ���ͷ��� 0--���� 1--����    */
	short    cProt;            /* Э��  6 UDP      17 TCP     */
	unsigned long lSeq;
} ncIpHead;


typedef struct ncMsnPkg_s {
	unsigned long  lSip;       /* ԴIP��ַ     */
	unsigned long  lDip;       /* Ŀ��IP��ַ   */
	unsigned short nDport;     /* Ŀ��˿�     */
	unsigned short nSport;     /* Դ�˿�       */
	unsigned long  lLen;       /* ���ݰ�����   */
} ncMsnPkg;



/* ���Ʒ���  */
typedef struct ncIpLimited_s {       /* ���Ʒ��ʵ�Ip��ַ  */
    unsigned long   lUid;              /* �û�Id  0 ��ʾȫ��  */
    unsigned long   lIpLower;          /* ����  */
    unsigned long   lIpUpper;          /* ����  */
    unsigned char   cTranType;         /* ��������  0--ȫ��   1--UDP  2--TCP          */
    unsigned char   cTimeType;         /* ʱ������                                    */
    unsigned short  nLowerport;        /* �˿ں�����                                  */
    unsigned short  nUpperport;        /* �˿ں�����                                  */
    unsigned char   cService;          /* ��������                                    */
    unsigned char   cFlags;            /* ���Ʒ�ʽ 1--�ⲿ��  2--����  3--IP��ַ�Ͷ˿� */
    unsigned long   lStart;            /* ��ʼʱ�� HHMMSS                             */
    unsigned long   lEnd;              /* ��ֹʱ�� HHMMSS                             */
    unsigned char   cVister;           /* 0 ��ֹ   1 ����                             */
    unsigned char   cReserve[3];       /* ����  */
} ncIpLimited;


typedef struct ncWebLimited_s {        /* ���Ʒ��ʵ���վ      */
    unsigned long   lUid;              /* �û�Id  0 ��ʾȫ��  */
    char            caUrl[64];         /* ��վ��ַ            */
    unsigned long   lStart;            /* ��ʼʱ�� HHMMSS     */
    unsigned long   lEnd;              /* ��ֹʱ�� HHMMSS     */
    unsigned char   cTimeType;         /* ʱ������            */
    unsigned char   cVister;           /* 0  ��ֹ  1 ����     */
    unsigned char   cReserve[2];       /* ����                */
} ncWebLimited;

/* The Value of cType */
#define NC_PROT_TCP      6
#define NC_PROT_UDP     17
/* �˴���Դ��ַΪ�ͻ��˵�ַ  */
typedef struct ncIp_s {
    unsigned long  lSip;             /* �ڲ�IP��ַ                   */
    unsigned long  lDip;             /* �ⲿIP��ַ                   */
    unsigned short nDport;           /* Ŀ��˿ں�                   */
    unsigned short nSport;           /* Դ�˿�, ȱʡ�����Ϊ 0, ֻ�е������ʱ���Ϊ�� 0  */
    unsigned char  cType;            /* Э��    6--TCP 17 UDP        */
    unsigned char  cMark;            /* ��ʶ,�ڲ�ͬ�ĵط��в�ͬ���ô� */    
    unsigned char  cRev[2];          /* ����  */
    unsigned long  lStartTime;       /* ��ʼʱ��                     */
    unsigned long  lLastTime;        /* ����޸�ʱ��                 */
    unsigned long  lStop;            /* ���ʿ��Ƽ��ʱ�� hhmmss�� ����ֵΪ0��ʾʹ�ó�ʱʱ��  */
    long8    lBytes[2];              /* 0-�����ֽ���  1-�����ֽ���   */
    unsigned char  cStatus;          /* 0--��   1--����  2--����     */
    unsigned char  cUseFlags;        /* ʹ�ñ�ʶ 0--û���� 1--������ 2--�Ѵ��� 3--�ѱ���   */
    unsigned char  caMac[6];         /* ԴMac��ַ                    */
    ncUserInfo     *psUser;          /* �û���Ϣ����Ϊ�ձ�ʾ�û���Ϣ����    */
    unsigned long  lService;         /* ����                                */
    unsigned long  lUrl;             /* ����http                            */
} ncIp;



/* TCP������Ϣ  
      �˴���Դ��ַΪ������ַ
*/
/* Value of cConnect   */
#define NC_TCPSTAT_SYN     			1
#define NC_TCPSTAT_ESTABLISHED    	2
#define NC_TCPSTAT_CLOSED             9
/* Value of cDict      */
#define NC_DICT_SEND           0
#define NC_DICT_RECEIVE        1
typedef struct ncTcp_s {
    unsigned long  lSip;              /* �ڲ�IP��ַ                   */
    unsigned long  lDip;              /* �ⲿIP��ַ                   */
    unsigned short nDport;            /* Ŀ��˿ں�                   */
    unsigned short nSport;            /* Դ�˿ں�                     */
    unsigned long  lStartTime;        /* ��ʼʱ��                     */
    unsigned long  lLastTime;         /* ����޸�ʱ��                 */
    unsigned char  cConnect;          /* ����״̬  1 Syn  2 ����  9 Close   */
    unsigned char  cDiction;          /* ���� 0 ����   1 ����               */
    unsigned char  cStatus;           /*      0 δ֪   1 ����      2 ����   */
    unsigned char  cProt;             /* Э��   6-TCP  17 UDP               */
    unsigned char  cFlags;            /* ���ھ���Э���еı�ʶ               */
    unsigned char  cProxy;            /* 0 -- ����   1 -- ����Proxy��Э��   */
    unsigned char  cRev[2];
    ncIp           *psIp;             /* ��Ӧ��IP��Ϣ,NULL ��ʾ�����Ӳ����� */
    unsigned long  lStop;             /* �������õ���ֹʱ��                 */
    unsigned long  lSeq;              /* �������к�                          */
    unsigned long  lAck_seq;          /* �������к�                          */
    unsigned long  lSid;              /* Session ID                          */
    unsigned long  lUrl;              /* Url���                             */
} ncTcp;



/* �����IP����, Key=12    
         cStatus --- ����ԭ��
         ID      --- ����ID
 */
typedef struct ncIpExcept_s {
    unsigned long  lSip;             /* �ڲ�IP��ַ                         */
    unsigned long  lDip;             /* �ⲿIP��ַ                         */
    unsigned short nDport;           /* Ŀ��˿ں�                         */
    unsigned char  cType;            /* Э��    6--TCP 17 UDP              */
    unsigned char  cStatus;          /* ����                               */
    unsigned long  lUserid;          /* �û�ID, UseridΪ0��ʾ���ܿ����ݰ�  */
    unsigned long  lRid;             /* ����ID                             */
    unsigned long  lStartTime;       /* ����޸�ʱ��                       */
    unsigned long  lLastTime;        /* ����޸�ʱ��                       */
    unsigned long  lCount;           /* ���ݰ�������                       */
    char           caMsg[96];        /* ������Ϣ                           */
} ncIpExcept;


typedef struct ncHttpBuffer_s {
    unsigned long  lSip;             /* ԴIP��ַ     */
    unsigned long  lStartTime;       /* ��ʼʱ��     */
    unsigned long  lLastTime;        /* ��ֹʱ��     */
    unsigned long  lBytes;           /* ����         */
    unsigned long  lDip;             /* Ŀ���ַ     */
    unsigned short nDport;           /* Ŀ��˿�     */
    unsigned char  caMac[6];         /* ԴMac��ַ    */
    unsigned char  cUseFlags;        /* ��ʶ��0--������ 1--������ 2--���Դ��� 3--�ѱ���  */
    unsigned char  cReserve[3];      /* ����  */
    unsigned long  userid;
    char     caHost[64];
    char     caUrl[128];
    char     caTitle[128];             /* ���� 2005/01/05 ����      */
} ncHttpBuffer;

typedef struct ncService_s {
    char            caName[32];      /* ��������  */
    unsigned long   lServices;       /* ��������  */
} ncService;



/* �ʼ���ع��˹���  */
typedef struct ncMailFilter_s {
    int    tid;                  /* ���ID */
    char   uname[128];
    char   caFrom[128];
    char   caTo[128];
    char   caSub[128];
    char   caCont[128];
    char   caAtt[128];
    int    lSize;
    int    lAsize;
    int    lTonum;
    char   cStype;            /* 0--ȫ��  1--����  2--����  */
    char   cUflags;           /* 1--��    2--�û�           */
    char   cTzflags;          /* 0--��֪ͨ  1--֪ͨ         */
    char   cSaveflags;        /* 0--������  1--����         */
    char   caTzmail[64];
} ncMailFilter;


/* �����ʼ�������� */
typedef struct ncMailCtlType_s {
    int    tid;                  /* ���ID */
    char   uname[128];
    char   caFrom[128];
    char   caTo[128];
    char   caSub[128];
    char   caCont[128];
    char   caAtt[128];
    int    lSize;
    int    lAsize;
    int    lTonum;
    char   cStype;            /* 0--ȫ��  1--����  2--����  */
    char   cUflags;           /* 1--��    2--�û�           */
} ncMailCtlType;

typedef struct ncUploadFilter_s {
    int    tid;                  /* ���ID */
    char   uname[128];
    char   caHost[128];
    char   caUrl[128];
    char   caCont[128];
    char   caAtt[128];
    int    lSize;
    int    lAsize;
    char   cUflags;           /* 1--��    2--�û�           */
    char   cTzflags;          /* 0--��֪ͨ  1--֪ͨ         */
    char   cSaveflags;        /* 0--������  1--����         */
    char   cReserve;          /* ����                       */
    char   caTzmail[64];
} ncUploadFilter;



typedef struct ncPostFileList_s {
    char     pOriginFile[128];   /* Դ�ļ�    */
    char     pType[12];          /* �ļ�����  */
    char     pOutFile[64];
    unsigned long lSize;
    struct ncPostFileList_s *psNext;
} ncPosFileList;



typedef struct ncPostDataContent_s {
    unsigned long  lBytes;         /* ���ֽ���  */
    unsigned long  lTime;          /* ʱ��      */
    char           caName[32];     /* �û���    */
    char           caHost[128];    /* ������    */
    char           caUrl[128];     /* ����URL   */
    char           *pValue;        /* ��������  */
    int            iSum;           /* ��������  */
    ncPosFileList  *psFileList;    /* �ļ��б�  */
} ncPostDataContent;


typedef struct ncPostFList_s {
    char     *pOriginFile;       /* Դ�ļ�     */
    char     *pType;             /* �ļ�����   */
    char     *pOutFile;          /* ����ļ�   */
    unsigned long lSize;
    struct ncPostFileList_s *psNext;
} ncPostFList;

typedef struct ncPostVarList_s {
    char          *pVar;              /* ������    */
    char          *pValue;            /* ����      */
    struct ncPostVarList_s *psNext;
} ncPosVarList;

/* ������(New)  */
typedef struct ncPostDataList_s {
    unsigned long  lBytes;         /* ���ֽ���  */
    unsigned long  lTime;          /* ʱ��      */
    unsigned long  lUserid;        /* �û�ID    */
    char           caHost[128];    /* ������    */
    char           caUrl[128];     /* ����URL   */
    int            iSumVar;        /* ��������  */
    ncPosVarList   *psVarList;     /* �����б�  */
    int            iSumFile;       /* ��������  */
    ncPosFileList  *psFileList;    /* �ļ��б�  */
} ncPostDataList;



#define NC_IPPKG_UPFLOW      0
#define NC_IPPKG_DOWNFLOW    1

typedef struct ncIpPkgInfo_s {
    long8    lIpFlow[2];           /*  0 Upload Bytea  1  DownBytes  */
    unsigned long lStartTime;      /*  ��ʼʱ��                      */
    long8    lSumPkg;              /*  �����ݰ�                      */
    unsigned long lpPkgPerSec;     /*  ÿ�����ݰ�                    */
    unsigned long lStartCountTime; /*  ��������ʼʱ��                */
    long8    lPkgCount;            /*  ���ݰ�������                  */
    unsigned long lCount;          /*  ���ʴ���                      */
    unsigned long lStartControl;   /*  ʱ����Ƶ���ʼʱ��            */
    char          caFilename[128];
} ncIpPkgInfo;

typedef struct ncSumControl_s {
    unsigned long  lStartTime;       /* ��ʱ��                     */
    unsigned long  lLastTime;        /* ������ʱ��                 */
    unsigned long  lTimeOut;         /* ���ʱʱ��                 */
    unsigned short nLock;            /* ��  0--����   1--���ڼ��    */
    unsigned short nR1;              /*                               */
    unsigned long  lR1[2];           /* ����                          */
} ncSumControl;

/* ������Ϣ ��1��ʼ  */
#define NC_CONTROL_NOUSE           0
#define NC_CONTROL_DELETE          1
#define NC_CONTROL_TABDROP         5
#define NC_CONTROL_MODPORT         6
#define NC_CONTROL_DISPERR         7

/* Iptables �Ŀ���̨����           */


struct ncTestRemote_s {     /* Զ���ļ�����  */
    char  caIp[16];
    char  caHost[64];
    char  caUser[32];
    char  caPass[32];
    char  caMount[64];
    char  caShare[32];
    char  caSdate[12];
    char  caEdate[12];
    char  caOpt[12];       /* ����       */
};

/* ��ΪRemoteMountʱ cPort��ֵΪ���������  */
#define NC_REMOTE_MOUNT         1
#define NC_REMOTE_MOUNTTEST     2
#define NC_REMOTE_MAILBACK      3
#define NC_REMOTE_UNMOUNT       4
#define NC_REMOTE_MAILLOAD      5
#define NC_REMOTE_MAILEXPORT    6    /* ���ݵ���  */
typedef struct ncControl_s {
    unsigned long  lSip;             /* ��ʼIP    */
    unsigned long  lDip;
    unsigned short nDport;
    unsigned char  cProt;            /* Э��                         */
    unsigned char  cUse;             /* ������ĺ�                   */
    unsigned long  lLastTime;        /* ��ʼʱ��                     */
    unsigned long  lStop;            /* ��ֹʱ��                     */
    int            iIndex;
} ncControl;

typedef struct ncIpControlInfo_s {
    unsigned long  lSip;             /* ��ʼIP                      */
    unsigned long  lDip;
    unsigned short nDport;
    unsigned char  cProt;            /* Э��                        */
    unsigned char  cComm;            /* ���� 0--Add 1--Del 2--Flush */
    unsigned long  lStop;            /* ��ֹʱ�� hhmmss             */
    unsigned long  lId;              /* ControlId                   */
} ncIpControlInfo;

typedef struct ncDevList_s {
    char caDev[32];
    char caIp[32];
    char caNetmask[32];
    char caBoard[32];
    struct ncDevList_s *next;
} ncDevList;


#define  NC_PID_COLLECT        1     /* ���ݲɼ�     */
#define  NC_PID_SYSLOG         0     /* ϵͳ��־     */
#define  NC_PID_TABLECTL       2     /* IpTable����  */
#define  NC_PID_NTSYNC         3     /* ��ͬ��       */
#define  NC_PID_ONTIME         4     /* ��ʱ         */
#define  NC_PID_ICAUTH         5     /* ��������֤   */
#define  NC_PID_CHECKSOFT      6     /* ���Software */
#define  NC_PID_SMTPPROXY      7     /* Smtp Proxy   */
#define  NC_PID_LISTEN25       8     /* ��������     */
#define  NC_PID_HTTPPROXY      9     /* Http Proxy   */
#define  NC_PID_POP3PROXY     10     /* Pop3 Proxy   */
#define  NC_PID_NTAUTH        11     /* NT�����֤   */
#define  NC_PID_GETPKG        12     /* ���ݴ���      */
#define  NC_PID_PKGDO         13     /* ���ݲɼ�      */
#define  NC_PID_ASYNC         14     /* �첽��־����  */
#define  NC_PID_MAILMON       15     /* �ʼ����ݼ��  */
#define  NC_PID_POSTMON       16     /* �����ݼ��  */
#define  NC_PID_CHECKMAC      17     /* Mac��ַ���   */
#define  NC_PID_SYSMON        18     /* Mac��ַ���   */
#define  NC_PID_DBSYNC        19     /* ����ͬ������  */
#define  NC_PID_FILESRV       20     /* �ļ�������   */
#define  NC_PID_DODBLOG       21     /* �������ݿ�ͬ����Ϣ  */
#define  NC_PID_UPDATE        22     /* �Զ���������       */
#define  NC_PID_MAILFILTER    23     /* �ʼ����       */
#define  NC_PID_AUTOBAK       24     /* �Զ����ݽ���  */
#define  NC_PID_AUTOCLEAN     25     /* �Զ��������  */
#define  NC_PID_VIRUSCHECK    26     /* ��鲡��ɨ������  */
#define  NC_PID_NWCHECKCOMP5  27     /* ����������߼������  */
#define  NC_PID_DBCHECK       28     /* ���ݿ�����޸�      */   
#define  NC_RELOAD_ALL            0  /* ȫ��        */
#define  NC_RELOAD_NETWORK        1  /* ��������    */
#define  NC_RELOAD_LIMIT          2  /* ��������    */
#define  NC_RELOAD_MAILMONFILTER  3  /* �ʼ����˹��� */
#define  NC_RELOAD_PQCONFIG       4  /* �������ò��� */
#define  NC_RELOAD_DEBUG          5  /* Debug����    */
/* ������Ϣ  */
typedef struct ncProcessInfo_s {
    int           iPid;
    unsigned long lStartTime;       /* ����ʱ��  */
    unsigned long lTimeOut;         /* ��ʱʱ��  */
    unsigned long lOntime;          /* ��ÿ��ָ��ʱ����������  */
    unsigned char caControl[32];    /* ������Ϣ  */
    char     caName[32];            /* ��������  */
    int   (*fFunName)(utShmHead *); /* ������   */
    unsigned long lLastTime;        /* ����������ʱ��   */
    unsigned long lStepTime;        /* �����ʱ�䣬ͨ��������ʱ��������������� */
    char     caRev[32];             /* ��������ͬ�Ľ������ò�ͬ                   */
    int      iFlags;                 /* 0--��  1--�ڲ�����  2--�ⲿ  */
} ncProcessInfo;

/* ������Ϣ  */
#define NC_PROC_RESET       1     /* ��������  */
#define NC_PROC_STOP        9     /* ����ֹͣ  */


typedef struct ncEimProcess_s {
    char     caName[16];           /* ����                    */
    char     caPath[64];           /* ·��                    */
    char     caFun[32];            /* ��������                */
    int      iPrio;                /* ���ȼ�                  */
    int      iPid;                 /* 0 ��ʾû������          */
    unsigned long lStartTime;      /* ����ʱ��                */
    unsigned long lTimeOut;        /* ��ʱʱ��                */
    unsigned long lOnTime;         /* ��ÿ��ָ��ʱ����������  */
    unsigned char caControl[32];   /* ������Ϣ                */
    int      iStatus;              /* 0--������   1--����   -1 ����*/
    int      iFlags;               /* 1--������  2--�����    */
} ncEimProcess;


#define  NC_ONTIME_IPCHECK        0   /* ��ʱ���IP����  */
#define  NC_ONTIME_PROCESSCHECK   1   /* ��ʱ������    */
#define  NC_ONTIME_COUNT          2   /* ����ͳ��        */
#define  NC_ONTIME_DELDETAILLOG   3   /* �����ϸ��Ϣ    */
#define  NC_ONTIME_DELTEMPFILE    4   /* ɾ����ʱ�ļ�    */
#define  NC_ONTIME_DATABACK       5   /* ���ݱ���        */
#define  NC_ONTIME_CHECKIPTAB     6   /* ���IPtables    */
#define  NC_ONTIME_RELOADCNF      7   /* �����������    */
#define  NC_ONTIME_TIMECONTROL    8   /* ���ʱ�����    */
#define  NC_ONLINE_RESTARTNC      9   /* ��������NC      */


typedef struct ncOnTimeFun_s {
    unsigned long lLastTime;            /* ���һ��ִ��ʱ��  */
    unsigned long lUsedTime;            /* ���һ��ִ��ʹ��ʱ��  */
    unsigned long lCount;               /* ִ�д���      */
    unsigned long lStepTime;            /* ���ʱ��      */
    unsigned long lOnTime;              /* ָ��ʱ�� hhmmss       */
    int      iStatus;                   /* 0--����  1--�ȴ� 2--����ִ��  */
    char     caName[32];                /* ��������      */
    int   (*fFunName)(utShmHead *);     /* ִ�к�������  */
} ncOnTimeFun;


/* �ʼ����˹���  */
typedef struct ncMailCtl_s {
    unsigned long lId;
    char caUname[128];
    char caFrom[128];
    char caTo[128];
    char caSub[128];
    char caCont[128];
    char caAttname[128];
    unsigned long lMsize;
    unsigned long lAsize;
    unsigned long lTonum;
    unsigned char cFlags;     /* ���Ʊ�ʶ  2--���� 1--��  0-- ȫ�� */
    unsigned char cActflags;  /* ����ʽ 0--���� 1--������  */
    unsigned char control;    /* �ʼ����� 1--���� 2--�ܾ�  3--����ָ����ַ  4--�ȴ�ȷ�� */
    unsigned char cTzflags;   /* ֪ͨ��ʽ 0--��֪ͨ  1--֪ͨ������  2--�ռ��� 3--ָ������  */
    unsigned char cStype;     /* ������� 0--ȫ��                                          */
    unsigned char cReserv[3];
    char caSmail[64];         /* ת������        */
    char caTzmail[64];        /* ֪ͨ�ʺ�        */
    char caTzcont[128];       /* ֪ͨ����        */
} ncMailCtl;

/* Add 2002/11/30 */
typedef struct ncFieldList_s {
    char   caFname[32];
    char   cType;          /* ���� n-���� s-�ַ� */
    char   cFlags;
    short  nLen;
} ncFieldList;

/* ������Ϣ  */
extern int iDebugLevel;
#define NC_DEBUG_ERROR    1            /* ������Ϣ  */
#define NC_DEBUG_WARN     2
#define NC_DEBUG_LOG      4
#define NC_DEBUG_MSG      8
#define NC_DEBUG_SHMLOAD 16

#define NCS_SYNC_CONTFILTER   1
typedef struct ncNcsrvinfo_s {
    unsigned long  lId;
    unsigned long  lSip;
    unsigned short nPort;
    unsigned short nStatus;
    unsigned long  lLasttime;
    long           nTcpPort;
    char           caName[16];
    char           caSid[16];
} ncNcsrvinfo;



/* gtype    ������    */
#define NC_GTYPE_LOCAL      0           /* ����       */
#define NC_GTYPE_USER       1           /* �����û�   */
#define NC_GTYPE_GROUP      2           /* ��         */
#define NC_GTYPE_COMPANY    3           /* ��˾       */
#define NC_GTYPE_POLICY     4           /* ����       */
#define NC_GTYPE_CENTER     8           /* ����       */
#define NC_GTYPE_SYSTEM     9           /* ϵͳ       */



/* DHCP���ݽṹ  
   0                   1                   2                   3
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |     op (1)    |   htype (1)   |   hlen (1)    |   hops (1)    |
   +---------------+---------------+---------------+---------------+
   |                            xid (4)                            |
   +-------------------------------+-------------------------------+
   |           secs (2)            |           flags (2)           |
   +-------------------------------+-------------------------------+
   |                          ciaddr  (4)                          |
   +---------------------------------------------------------------+
   |                          yiaddr  (4)                          |
   +---------------------------------------------------------------+
   |                          siaddr  (4)                          |
   +---------------------------------------------------------------+
   |                          giaddr  (4)                          |
   +---------------------------------------------------------------+
   |                                                               |
   |                          chaddr  (16)                         |
   |                                                               |
   |                                                               |
   +---------------------------------------------------------------+
   |                                                               |
   |                          sname   (64)                         |
   +---------------------------------------------------------------+
   |                                                               |
   |                          file    (128)                        |
   +---------------------------------------------------------------+
   |                                                               |
   |                          options (variable)                   |
   +---------------------------------------------------------------+
   */
#define MACIP_FROM_DHCP          1
#define MACIP_FROM_WINS          2
#define MACIP_FROM_FIXED         9

#define DHCP_MSG_DHCPDISCOVER    1
#define DHCP_MSG_DHCPOFFER       2
#define DHCP_MSG_DHCPREQUEST     3
#define DHCP_MSG_DHCPDECLINE     4
#define DHCP_MSG_DHCPACK         5
#define DHCP_MSG_DHCPNAK         6
#define DHCP_MSG_DHCPRELEASE     7
#define NC_MAIPFILE_ID           19650429L
typedef struct ncDhcp_s {
    unsigned char  op;       /* 1:from Client  2:from Server */
    unsigned char  htype;    /* 1:Ethernet, 7:Arcnet         */
    unsigned char  hlen;     /* MAC��ַ���� 6                */
    unsigned char  hops;     /* ת������                     */
    unsigned long  xid;      /* Transaction ID               */
    unsigned short secs;
    unsigned short flags;
    unsigned long  ciaddr;   /* ĿǰClient��ʹ�õ�IP��ַ     */
    unsigned long  yiaddr;   /* Ҫ�����IP��ַ               */
    unsigned long  siaddr;
    unsigned long  giaddr;
    unsigned char  chaddr[16];
    unsigned char  sname[64];
    unsigned char  file[128];
} ncDhcp;



typedef struct ncComputeMacIp_s {
    unsigned char  mac[6];      /* Mac��ַ                      */
    char           flags;       /* ��¼��Դ 1--�̶����� 8--Wins 9--DHCP */
    char           status;
    unsigned long  ip;          /* Ip��ַ                       */
    unsigned char  cname[16];   /* ������,����15λ�Զ��ص�      */
} ncComputeMacIp;


/* �����ݴ�����ڴ��У����ڲ�����Ӧ�����������Ϣ    */
typedef struct ncComputeIpMac_s {
    unsigned long  ip;          /* Ip��ַ                       */
    unsigned char  mac[6];
    char           flags;       /* ��¼��Դ 1--�̶����� 8--Wins 9--DHCP */
    char           status;
} ncComputeIpMac;


typedef struct ncUtlFileList_s {
    char name[64];                  /* �ļ���     */
    unsigned long lSize;            /* �ļ�����   */
} ncUtlFileList;


typedef struct ncUtlDBSynInfo_s {
    int           iFileServerId;    /* �ļ��������Ľ��̺� */
    int           iProcessId;       /* ���ݴ������ID     */
    unsigned long lStartTime;       /* ��ʱ��           */
    unsigned long lMailMon;         /* ����ʼ�������     */
    unsigned long lFormMon;
    unsigned long lMailCtl;
    unsigned long lDbLog;
    unsigned long long lBytes;      /* ͬ��������       */
    unsigned long lLastTime;        /* ���һ��ͬ��ʱ�� */
    unsigned long lLastDoTime;      /* ���һ�δ���ʱ��  */
    unsigned long lUndoFile;        /* δ������ļ����� */
    char     caDoFile[128];         /* ��ǰ���ڴ��͵��ļ�  */
    char     caCurFile[128];        /* ���ڴ���            */
} ncUtlDBSynInfo;

typedef struct ncMailList_s {
    char mail[60];                  /* �ʼ���ַ */
    char cRev[2];
    char cdo;                       /* ����ʽ */
    char cflags;
} ncMailList;

typedef struct ncGroupIpList_s {
    unsigned long lSip;
    unsigned long lEip;
    unsigned long lGroupid;
} ncGroupIpList;




#ifdef MTEST_1
#include "ncalloc.h"
#endif
#endif
