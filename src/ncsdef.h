#ifndef __NCSDEF___
#define __NCSDEF___
#include "ncscase.h"
#define  NCS_CLT_MINVERSION                        "V6.00.00"
#define  NCS_VERSION       "V7.50.126"              // ��ǰ�汾
#define  NCS_RELEASETIME   "2014/08/11"             // ����ʱ��
#define  NCS_MIN_DBID      20000000L
#define  NCS_MAX_DBID      29999999L
#define  NCS_MAX_SYNINFO     20                    /* ͬ���������           */
#define  NCS_MAX_SYNPKG      400000L               /* ����ͬ�����ݰ�       */
#define  NCS_LOG_ERROR      0                      /* ������Ϣ                  */
#define  NCS_LOG_WARN       1                      /* �澯��Ϣ                  */
#define  NCS_LOG_EVENT      2                      /* ��Ҫ�¼�����              */
#define  NCS_LOG_EVENT1     3                      /* �¼�����                  */
#define  NCS_LOG_EVENT2     4                      /* �¼�����                  */
#define  NCS_LOG_EVENT3     5                      /* �¼�����                  */
#define  NCS_LOG_DEBUG      9                      /* ������Ϣ                  */

#define  NCS_LNK_ONTIME      46                      /* ��ʱ����  */
#define  NCS_LNK_PROCESS     47                      /* ���̹���  */
#define  NCS_LNK_CLIENT      50                      /* ��ص�λ��Ϣ           */
#define  NCS_LNK_ONLINE      51                      /* ������Ϣ  */
#define  NCS_LNK_SYSINFO     52                      /* ���ϵͳ��ǰ������Ϣ   */
#define  NCS_LNK_ADMIPLIST   53                      /* ����ԱIP�б�           */
#define  NCS_LNK_SYNINDEX    54                      /* ���ֲ�������           */
#define  NCS_LNK_SYNCONT     55                      /* ���ֲ�������           */
#define  NCS_LNK_GROUP       56                      /* ��λ���               */
#define  NCS_LNK_ONLINEINDEX 57                      /* ������Ϣ����           */
#define  NCS_LNK_ONLINEBUF   58                      /* ��������               */
#define  NCS_LNK_CASEAREA    59                      /* ��������               */
#define  NCS_LNK_CASEINDEX   60                      /* ������Ϣ               */
#define  NCS_LNK_CASECTL     61                      /* ����������Ϣ           */
#define  NCS_LNK_UPDATEINFO  62                      /* ��������               */
#define  NCS_LNK_SUBADM      63                      /* �ֹ�������             */
#define  NCS_LNK_CASEMOB     64                      /* �����澯�ʼ����ֻ���       */
#define  NCS_LNK_MAILWARN    65                      /* �����ʼ��澯��¼       */

#define  NCS_LNK_ENDUSER     66                      /* ���������û�            */
#define  NCS_LNK_DOWNCOM     67                      /* �·�����                */
#define  NCS_LNK_MYSTATUS    68                      /* �ͻ�����Ϣ                */
#define  NCS_LNK_INDCLIENT    69                      /* Ŀ¼ͬ���ͻ�����Ϣ             */
#define  NCS_LNK_SMSMODEN    70                      /* ����è���Ŷ���             */
#define  NCS_LNK_SMSNO    71                         /* ���������ֻ���             */
#define  NCS_LNK_SMSONLINE    72                  /* ���ų�������������Ϣ             */
#define  NCS_LNK_CLINTCODETOID    73                /* �����˴��뵽ID   */

#define  NCS_LNK_MACPROCYOBJ    74                /* MAC���ز��Բ��س��� */
#define  NCS_LNK_BABPROCYOBJ    75                /* ������Ϊ���� */
#define  NCS_LNK_FRONTPAGE      76                /*��ҳ����*/


#define  NCS_MAX_CLIENT      100
#define  NCS_RUNLOG          "../log/ncssystem.log"

#define  NCS_ERR_SUCCESS     0                       /* ��ȷ              */
#define  NCS_ERR_RELOGIN     10001                   /* �û���Ҫ���µ�¼  */
#define  NCS_ERR_USRNOEXIST  10002                   /* �û�������        */
#define  NCS_ERR_PASSERROR   10003                   /* �������          */
#define  NCS_ERR_FILENOEXIST 10004                   /* �ļ�������        */
#define  NCS_ERR_MEMERROR    10005                   /* �ڴ����          */
#define  NCS_CLTLOG_LOGIN        1
#define  NCS_CLTLOG_LOGINERR     2
#define  NCS_CLTLOG_LOGOUT       3                   

#define  NCS_CLTSTA_ERROR       -1    /* ���ش���   */
#define  NCS_CLTSTA_ONLINE      1     /* ����  */
#define  NCS_CLTSTA_OFFLINE     2     /* ����  */
#define  NCS_CLTSTA_ABNORMITY   3     /* �쳣  */

#define  NCS_FTYPE_REALMON    0
#define  NCS_FTYPE_LOG        1
#define  NCS_FTYPE_CTL        2

#define  NCS_FIL_CASECTL      1         /* �����ļ�   Case */    

#define  NCS_UFLAGS_COMM            0
#define  NCS_UFLAGS_ALL             3
#define  NCS_UFLAGS_GROUP           2
#define  NCS_UFLAGS_USER            1

/* ����Ͳ���  */
#define  NCS_SYN_MESSAGE            0                     /* ��Ϣ              */
#define  NCS_SYN_MONIP              1                     /* �˿ں�IP��ַ���  */
#define  NCS_SYN_MONWEB             2
#define  NCS_SYN_MONMAIL            3
#define  NCS_SYN_MONIM              4
#define  NCS_SYN_MONFORM            5   
#define  NCS_SYN_MONFTP             6
#define  NCS_SYN_MONDEFAULT         7

#define  NCS_SYN_LIMIP              8
#define  NCS_SYN_LIMWEB             9
#define  NCS_SYN_LIMIM              10
#define  NCS_SYN_LIMFORM            11
#define  NCS_SYN_LIMMAIL            12
#define  NCS_SYN_LIMVID             13
#define  NCS_SYN_MONBBS             14                  /* BBS���   */
#define  NCS_SYN_NETSENSE           15                  /* ����Ϣ  */

/* �������ݼ�¼����  */
#define  NCS_SYN_MONIPLEN           32                    
#define  NCS_SYN_MONWEBLEN          80
#define  NCS_SYN_MONMAILLEN         340
#define  NCS_SYN_MONIMLEN           148
#define  NCS_SYN_MONFORMLEN         588
#define  NCS_SYN_MONFTPLEN           20
#define  NCS_SYN_MONBBSLEN          204
#define  NCS_SYN_MONDEFAULTLEN       16

#define  NCS_SYN_LIMIPLEN           56
#define  NCS_SYN_LIMWEBLEN          100
#define  NCS_SYN_LIMIMLEN           360
#define  NCS_SYN_LIMFORMLEN         864
#define  NCS_SYN_LIMMAILLEN         808
#define  NCS_SYN_LIMVIDLEN          104


/* ͨ����Ϣ  */
#define  NCS_SYN_IPPOLTYPE          0
#define  NCS_SYN_IPPOL              1
#define  NCS_SYN_WEBPOLCLASS        2
#define  NCS_SYN_WEBPOLLIST         3
#define  NCS_SYN_IPLIST             4
#define  NCS_SYN_IPINDEX            5
#define  NCS_SYN_WEBCLASS           6
#define  NCS_SYN_WEBLIST            7
#define  NCS_SYN_MAILCLASS          8
#define  NCS_SYN_MAILADDR           9
#define  NCS_SYN_USERIDCLASS        10
#define  NCS_SYN_USERIDLIST         11
#define  NCS_SYN_LIMDATEDES         12
#define  NCS_SYN_LIMDATE            13
#define  NCS_SYN_LIMWARNTYPE        14
#define  NCS_SYN_LIMWARNNOTICE      15
#define  NCS_SYN_NCSKEYCONT         16
#define  NCS_SYN_NCSKEYINDEX        17
#define  NCS_SYN_POSTACCOUNT        18     // ���˺���Ϣ

#define  NCS_SYN_IPPOLTYPELEN       76
#define  NCS_SYN_IPPOLLEN           16
#define  NCS_SYN_WEBPOLCLASSLEN     76
#define  NCS_SYN_WEBPOLLISTLEN      16
#define  NCS_SYN_IPLISTLEN          88
#define  NCS_SYN_IPINDEXLEN         68

#define  NCS_SYN_WEBCLASSLEN        48
#define  NCS_SYN_WEBLISTLEN         140
#define  NCS_SYN_MAILCLASSLEN       48
#define  NCS_SYN_MAILADDRLEN        140
#define  NCS_SYN_USERIDCLASSLEN     48
#define  NCS_SYN_USERIDLISTLEN      140

#define  NCS_SYN_LIMDATEDESLEN      36
#define  NCS_SYN_LIMDATELEN         16
#define  NCS_SYN_LIMWARNTYPELEN     44
#define  NCS_SYN_LIMWARNNOTICELEN   48
#define  NCS_SYN_NCSKEYCONTLEN      76
#define  NCS_SYN_NCSKEYINDEXLEN     40
#define  NCS_SYN_POSTACCOUNTLEN     172   // ���˺���Ϣ����



/* ������Ϣ  */
#define  NCS_DATA_USEDMARK         88   // ���ݱ�ʶ
#define  NCS_MAX_ONLINE            20
#define  NCS_ONLINE_IP              0    // IP������Ϣ
#define  NCS_ONLINE_WEB             1    // Http����
#define  NCS_ONLINE_ERRLOG          2    // �����Ϣ
#define  NCS_ONLINE_WARN            4    // �澯��Ϣ
#define  NCS_ONLINE_MAIL            5    // �ʼ���Ϣ
#define  NCS_ONLINE_FORM            6    // ����Ϣ
#define  NCS_ONLINE_IM              7    // ��ʱͨ��
#define  NCS_ONLINE_USERLOG         8    // �û���¼
#define  NCS_ONLINE_NETID           9    // �����ʶ
#define  NCS_ONLINE_TELNET          10   // Telnet ftp
#define  NCS_ONLINE_USERLOGN        11   // �û�������¼--���10

/* ��־��Ϣ  */
#define  NCS_DBLOG_USER             0    // �û���Ϣ
#define  NCS_DBLOG_GROUP            1    // ������Ϣ
#define  NCS_DBLOG_MAILMON          2    // �ʼ� 
#define  NCS_DBLOG_FORMMON          3    // ��
#define  NCS_DBLOG_MAILCTL          4    // �����ʼ�
#define  NCS_DBLOG_IPLOG            5    // IP����
#define  NCS_DBLOG_HTTPLOG          6    // Http����
#define  NCS_DBLOG_IMLOG            7    // ��ʱͨ��
#define  NCS_DBLOG_ERRLOG           8    // �����־
#define  NCS_DBLOG_WARNLOG          9    // �澯��־
#define  NCS_DBLOG_USERLOG          10   // �û�������¼
#define  NCS_DBLOG_NETIDLOG         11   // �������������¼
#define  NCS_DBLOG_NETID            12   // �����������
#define  NCS_DBLOG_ACCOUNTLOG       13   // ���˺���Ϣ
#define  NCS_DBLOG_BBSMON           14   // BBS��Ϣ
#define  NCS_DBLOG_IPSERVICE        15   // IPService
#define  NCS_DBLOG_QQNUMBER         16   // QQ����
#define  NCS_DBLOG_NETSENSE         17   // ����Ự��Ϣ
#define  NCS_DBLOG_SEARCHLOG        18   // ��������ʹ�����

#define     NCSCTL_DEFKEY       "Pro@#$NetW12%^As123QW"


/* ������Ϣ  */
typedef struct ncsProcessInfo_s {
    int           iPid;
    unsigned long lStartTime;       /* ����ʱ��  */
    unsigned long lTimeOut;         /* ��ʱʱ��  */
    unsigned long lOntime;          /* ��ÿ��ָ��ʱ����������  */
    unsigned char caControl[32];    /* ������Ϣ  */
    char          caName[32];       /* ��������  */
    int   (*fFunName)(utShmHead *); /* ������    */
    unsigned long lLastTime;        /* ����������ʱ��                                 */
    unsigned long lStepTime;        /* �����ʱ�䣬ͨ��������ʱ���������������         */
    char     caRev[32];             /* ��������ͬ�Ľ������ò�ͬ                         */
    int      iFlags;                /* 0--��  1--�ڲ�����  2--�ⲿ                     */
} ncsProcessInfo;


/* ͬ����ʶ  */
typedef struct ncsSynMark_s { 
    unsigned long  id;       // ��¼ID
    unsigned char  ntype;    // ����
    unsigned char  gtype;    // ���
    unsigned char  status;   // 0--��ʼ  1--���  
    unsigned char  rev;      // ����
    unsigned long  pos;      // �ڱ��е�ƫ����
    unsigned long  check;    // �ڱ��е�ƫ����
    
} ncsSynMark;


/* ͬ����Ϣ, �����ֽ�˳�� 
 */
typedef struct ncsSynInfo_s {
    unsigned long  allchsum;       /* �ܵ�У����          */
    unsigned long  checksum[NCS_MAX_SYNINFO];   /* ÿһ����¼��У����  */
} ncsSynInfo;

/* ��������, �����һ��Hash����  */
typedef struct ncsSynIndex_s {
    unsigned long  lId;            /* 0--Check  1--LastTime   */
    unsigned char  ntype;          /* ���ݱ�                                           */
    unsigned char  gtype;          /* �����   0-ͨ�� 1-��λ 2--�� 3--ȫ�� 4--����     */
    unsigned short nLen;           /* ��¼��С   */
    unsigned long  lSum;           /* ��¼����   */
    unsigned long  lStart;         /* ��ʼƫ���� */
    unsigned long  lCheckSum;      /* У����     */
}  ncsSynIndex;   



/* �ͻ�����Ϣ����  */
typedef struct ncsClient_s {
    unsigned long  userid;              // �û�ID
    int            num;                 // ���ڴ��е����        
    char           username[16];        // �û���
    char           password[32];        // ����
    char           dispname[64];        // ��ʾ��
    unsigned long  groupid;             // ��ID
    unsigned long  usertype;            // ��λ���
    int            gnum;                // ������Ϣ�е����
    char           useflags;            // �û�״̬  
    char           status;              // ��ǰ״̬  0--����  1--����  2--�쳣  
    char           cmod;                // �޸�״̬  0--����  1--����  2--�޸�   9--ɾ��
    char           csync;               // ͬ��״̬  0--��
    int            errcount;            // ���������������γ���ϵͳ������Ӧ��
    unsigned long  lLastTime;           // ������ʱ��
    ncsSynInfo     syninfo;
    ncsSynInfo     syndata;             // ����ͬ����¼
    unsigned long  lCaseCode;           // �������ش��� 0--û��  >0 ����ͬ��,��ʼͬ��ʱ��
    unsigned char  caVer[12];           // �ͻ��˰汾
    unsigned char  caMsg[64];           // ��ע��Ϣ
    double         fx;                  // ����
    double         fy;                  // γ��
} ncsClient;

/* �澯�ʼ���ַ���ֻ���*/
typedef struct ncsCaseMob_s {
    unsigned long  cid;              // ����ID
    char           waddr[64];        //�ʼ���ַ���ֻ���
    int            wtype;           // �澯��ʽ 1���ʼ� 2������
} ncsCaseMob;
/*�澯�ʼ���¼*/
typedef struct ncsMailWarnRecord_s {
    unsigned long  md5;              // ���ɵ�MD5
    char           mesg[512];        //�澯����
    int            lasttime;           //�ϴη���ʱ��
} ncsMailWarnRecord;



/* ��λ���   */
typedef struct ncsGroup_s {
    unsigned long  groupid;              // ��ID
    int            num;
    char           groupname[32];        // ����
    ncsSynInfo     syninfo;
} ncsGroup;

/* ���߿ͻ���Ϣ  */
typedef struct ncsOnline_s {     
    unsigned long  userid;
    int            num;            /* ���û������е����  */
    char           caKey[24];      /* ͨ��Key             */
    unsigned long  lSip;           /* IP��ַ              */
    unsigned short nPort;          /* �˿�                */
    char           cSyn;           /* ͬ��״̬            */
    char           cMsg;           /* ��Ϣ                */
    long long      lBytes[2];      /* ��ǰ���� �ֽ�/��    */
    unsigned long  lTcp;
    unsigned long  lUser;
    unsigned long  lStartTime;
    unsigned long  lLastTime;           /* ������ʱ��         */
    unsigned long  lSynCheck;           /* ͬ�����ݵ�У����,�ڵ�¼��ʱ�����  */
    unsigned long  lHeatCount;          // ������¼
    unsigned long  lHeatRecTime;        // ������¼ʱ��
    unsigned long  long lSendBytes;     // ���������ֽ���
    unsigned long  long lRecvBytes;     // ���������ֽ���
    char           cflags;              // 0-̽��  1-ͨ���ֹ�������ת��   8-ģ��
    char           cRev[3];
    ncsClient      *psClient;          // ���
} ncsOnline;


typedef struct ncsBackOnline_s {
    ncsOnline  sOnline;
    struct ncsBackOnline_s *next;
} ncsBackOnline;

typedef struct ncsDemoClient_s {
    ncsClient  *psClient;
    unsigned long lSip;                    // Ip��ַ
    unsigned long lSumUser;                // �û�����
} ncsDemoClient;



typedef struct ncsMonIp_s {
            unsigned long ftype;
            unsigned long sip;
            unsigned long eip;
            unsigned long sport;
            unsigned long dport;
            unsigned long service;
            unsigned long prot;
            unsigned long flags;
} ncsMonIp;

typedef struct ncsMonWeb_s {
            unsigned long ftype;
            unsigned char url[64];
            unsigned long cond;
            unsigned long urlid;
            unsigned long flags;
} ncsMonWeb;

typedef struct ncsMonMail_s {
            unsigned long ftype;
            unsigned char sender[64];
            unsigned long sendid;
            unsigned char toname[64];
            unsigned long toid;
            unsigned char subject[64];
            unsigned char attname[64];
            unsigned long msize;
            unsigned char content[64];
            unsigned long flags;
} ncsMonMail;


typedef struct ncsMonIm_s {
            unsigned long ftype;
            unsigned long service;
            unsigned char uname[64];
            unsigned long uid;
            unsigned long fun;
            unsigned char content[64];
            unsigned long flags;
} ncsMonIm;

typedef struct ncsMonForm_s {
            unsigned long ftype;
            unsigned char url[64];
            unsigned long urlid;
            unsigned char varname[256];
            unsigned char content[256];
            unsigned long flags;
} ncsMonForm;

typedef struct ncsMonBbs_s {
   unsigned long ftype;
   unsigned long urlid;
   unsigned char url[64];
   unsigned char bbsname[64];
   unsigned char content[64];
   unsigned long flags;
} ncsMonBbs;


typedef struct ncsMonFtp_s {
            unsigned long ftype;
            unsigned long service;
            unsigned long sip;
            unsigned long eip;
            unsigned long flags;
} ncsMonFtp;

typedef struct ncsMonDefault_s {
            unsigned long ftype;
            unsigned long timestep;
            unsigned long ipenable;
            unsigned long ipdefault;
            unsigned long webenable;
            unsigned long webdefault;
            unsigned long mailenable;
            unsigned long maildefault;
            unsigned long imenable;
            unsigned long imdefault;
            unsigned long ftpenable;
            unsigned long ftpdefault;
            unsigned long formenable;
            unsigned long formdefault;
} ncsMonDefault;

/* ͨ����Ϣ  */
typedef struct ncsIppoltype_s {
            unsigned long pid;
            char          name[64];
            unsigned long vister;
            unsigned long warnid;
} ncsIppoltype;

        
typedef struct ncsIppol_s {
    unsigned long  pid;
    unsigned long  tid;
    unsigned long  vflags;
    unsigned long  warnid;
}  ncsIppol;

typedef struct ncsWebpolclass_s {
    unsigned long  pid;
    unsigned char  name[64];
    unsigned long  vister;
    unsigned long  warnid;
}  ncsWebpolclass;

typedef struct ncsWebpollist_s {
    unsigned long  pid;
    unsigned long  tid;
    unsigned long  vflags;
    unsigned long  warnid;
}  ncsWebpollist;

typedef struct ncsIplist_s {
    unsigned long  id;
    unsigned long  prot;
    unsigned long  lip;
    unsigned long  uip;
    unsigned long  lport;
    unsigned long  uport;
    unsigned char  name[64];
}  ncsIplist;


typedef struct ncsIpIndex_s {
    unsigned long  id;
    unsigned char  name[64];
}  ncsIpIndex;


typedef struct ncsWebClass_s {
    unsigned long  modtime;
    unsigned long  flags;
    unsigned char  name[32];
    unsigned long  id;
    unsigned long  status;
}  ncsWebClass;

typedef struct ncsWebList_s {
    unsigned long  modtime;
    unsigned long  flags;
    unsigned char  url[64];
    unsigned char  name[64];
    unsigned long  id;
}  ncsWebList;


typedef struct ncsMailClass_s {
    unsigned long  modtime;
    unsigned long  flags;
    unsigned char  name[32];
    unsigned long  id;
    unsigned long  status;
}  ncsMailClass;

typedef struct ncsMailAddr_s {
    unsigned long  modtime;
    unsigned long  flags;
    unsigned char  mail[64];
    unsigned char  name[64];
    unsigned long  id;
}  ncsMailAddr;


typedef struct ncsUserIdClass_s {
    unsigned long  modtime;
    unsigned long  flags;
    unsigned char  name[32];
    unsigned long  id;
    unsigned long  status;
}  ncsUserIdClass;

typedef struct ncsUserIdList_s {
    unsigned long  modtime;
    unsigned long  flags;
    unsigned char  uname[64];
    unsigned char  descr[64];
    unsigned long  id;
}  ncsUserIdList;


typedef struct ncsLimDatedes_s {
    unsigned long  id;
    unsigned char  name[32];
}  ncsLimDatedes;

typedef struct ncsLimDate_s {
    unsigned long  id;
    unsigned long  ltype;
    unsigned long  llower;
    unsigned long  lupper;
}  ncsLimDate;

typedef struct ncsLimWarnType_s {
    unsigned long  id;
    unsigned char  name[32];
    unsigned long  localwanr;
    unsigned long  admcenter;
}  ncsLimWarnType;

typedef struct ncsLimWarnNotice_s {
    unsigned long  id;
    unsigned char  name[32];
    unsigned long  mesgnote;
    unsigned long  mailnote;
    unsigned long  mobile;
}  ncsLimWarnNotice;




typedef struct ncsLimWeb_s {
    unsigned char  gtype;
    unsigned char  cRev;
    unsigned char  conflags;
    unsigned char  flags;
    unsigned long  lId;            /* ID         */
    unsigned long  urlid;
    char           url[64];
    unsigned long  timetype;
    unsigned long  starttime;
    unsigned long  stoptime;
    unsigned long  warntype;
}  ncsLimWeb;



/* ʵʱ��Ϣ  */
typedef struct ncsRealInfo_s {
    unsigned char   cMark;         /* ��Ϣ��ʶ, �������ݸ��ֶ���Ϊ88   99--���� */
    unsigned char   cType;         /* ��Ϣ���        */
    unsigned short  nLen;          /* ��¼����        */
} ncsRealInfo;


/* �����������      */
typedef struct ncsOnlineIndex_s {
    unsigned long   starttime; // ��ʼʱ��
    unsigned long   lasttime;  // ���ͬ��ʱ��
    unsigned long   lastnum;   // ����¼��
    unsigned long   maxrec;    // ����¼��
    unsigned long   lstart;    // ���ڴ��е���ʼλ��
    unsigned short  reclen;    // ÿ����¼���ֽ���
    unsigned short  lock;      // ��
    unsigned long   count;     // 0--�տ�ʼ  >0--��ѭ��ʹ��
} ncsOnlineIndex;

/* �����������      */
typedef struct ncsOnBufHead_s {
    unsigned long   rtime;     // ����ʱ��
    unsigned long   did;       // ��λID
    unsigned long   tid;       // ����ID
    unsigned short  nlen;      // ��¼����
    unsigned short  nrev;
} ncsOnBufHead;


typedef struct ncsOnlineIp_s {
    unsigned long   did;       // ��λID
    unsigned long   uid;       // �û�ID
    unsigned long   tid;       // ��λ���
    char            udisp[32]; // �û���
    unsigned long   stime;     // ʱ��
    unsigned long   ctime;     // ����ʱ��
    unsigned long   sip;       // ԴIP��ַ
    unsigned long   dip;       // Ŀ��IP��ַ
    unsigned short  prot;      // Э��  6:Tcp  17:UDP
    unsigned short  port;      // �˿�
    unsigned long   service;   // ����Э��
    unsigned long   ubytes;    // �����ֽ���
    unsigned long   dbytes;    // �����ֽ���
} ncsOnlineIp;
/*�����û�������Ϣ*/
typedef struct ncsEndGroup_s {
            unsigned long did;
            unsigned long gid;
            char name[32];
} ncsEndGroup;
/*����������*/
 typedef struct ncsNettype_s {
            long id;
            char caName[32];
 } ncsNettype;


#define NCS_MAX_SYNTAB    16       // ���ͬ���ı�
#define NCS_SYNTAB_ONLINEUSR  0    // ���߿ͻ���ͬ��ʱ��
#define NCS_SYNTAB_NCSUSER    1    // �ͻ�������
#define NCS_SYNTAB_GROUP      2    // ����Ϣ
#define NCS_SYNTAB_ENDGROUP   3    // ����������Ϣ
#define NCS_SYNTAB_ENDUSER    4    // �����û�
#define NCS_SYNTAB_USERIP     5    // ������λIP�켣
#define NCS_SYNTAB_CASEMSG    6    // �澯��Ϣ
#define NCS_SYNTAB_NETID      7    // ���������Ϣ
#define NCS_SYNTAB_USERLOG    8    // �û�������¼
#define NCS_SYNTAB_NETLOG     9    // ������ݹ켣


#define NCS_TAB_CLIENT      1001
#define NCS_TAB_GROUP       1002
#define NCS_TAB_ENDGROUP    1003
#define NCS_TAB_ENDUSER     1004
#define NCS_TAB_USERIP      1005 
#define NCS_TAB_CASEMSG     1006
#define NCS_TAB_NETID       1007
#define NCS_TAB_USERLOG     1008 
#define NCS_TAB_NETLOG      1009 
#define NCS_TAB_SUBCROP     1010

/* �ֹ���������Ϣ�����ڴ���˳���� */
typedef struct ncsSubAdm_s {
    unsigned long  id;                  // �û�ID
    char           username[16];        // �û���
    char           password[32];        // ����
    char           key[24];             // ͨ����Կ
    char           dispname[64];        // ��ʾ��
    char           version[12];         // �ͻ��˰汾��
    unsigned long  lasttime;            // ������ʱ��
    unsigned long  savetime;           // ״̬����ʱ��
    unsigned long  lDeptTime;           // ������Ϣ�������ʱ��
    unsigned long  lSip;                // �ͻ���IP��ַ
    unsigned long  lPid;                // ȱʡ���
    unsigned long  lSynFlags[NCS_MAX_SYNTAB]; 
    unsigned short nPort;               // Tcp�˿�
    char           status;              // ��ǰ״̬  0--����  1--����  2--�쳣  
    char           rev[17];             // ����
} ncsSubAdm;

/* ������ǰ��Ϣ */
typedef struct ncsMyStatus_s {
    unsigned long  id;                  // �û�ID
    unsigned long  pid;                 // �ϼ���
    char           username[16];        // �û���
    char           password[32];        // ����
    char           key[24];             // ͨ����Կ
    char           dispname[64];        // ��ʾ��
    char           version[12];         // �ͻ��˰汾��
    unsigned long  lasttime;            // ������ʱ��
    unsigned long  srvnum;              // ���ϼ����������е����
    unsigned long  lDeptTime;           // ������Ϣ�������ʱ��
    unsigned long  lSip;                // ��������ַ
    unsigned short nPort;               // ������Tcp�˿�
    unsigned short nTcpPort;            // ����TCp�˿�
    unsigned long  lSynFlags[NCS_MAX_SYNTAB];
    unsigned long  lThisFlags[NCS_MAX_SYNTAB]; 
    unsigned long  lTimeStep;           // ����ʱ����
    unsigned long  lLogTimeStep;        // ��־ʱ����
    unsigned long  lMinCaseId;          // ������СCaseId
    unsigned long  lMaxCaseId;          // �������CaseId
    char           status;              // ��ǰ״̬  -1 ���� 0--����  1--����  2--�쳣  
    char           sendtype;            // ���ͷ�ʽ  0-TCP  1-Ftp
    char           rev[14];             // ����
    unsigned long  lCaseTime;           // ���ذ������ʱ��
    
} ncsMyStatus;

/* ϵͳ������Ϣ   */
typedef struct ncsSystemInfo_s {
    utShmHead      *psShmHead;
    ncsClient      *psClient;
    ncsGroup       *psGroup;
    ncsSubAdm      *psSub;
    ncsMyStatus     sMyInfo;       /* ������Ϣ                  */
    int             iSumClient;     /* ��λ����                  */
    int             iSumGroup;
    int             iSumSubAdm;     /* �ֹ������ĵ�����          */
    unsigned long   lMyId;          /* �Լ���ID                  */
    unsigned char   caHome[64];     /* ��Ŀ¼                    */
    unsigned long   lLastTime;      /* ϵͳ������ʱ��          */
    unsigned long   lStartTime;     /* ϵͳ����ʱ��              */
    unsigned long   lCaseTime;      /* ����������Ϣ������ʱ��  */
    unsigned long   lMsgTime;       /* ��Ϣ����ʱ��              */
    unsigned long   lComTime;       /* ����ʱ��                  */
    ncsSynInfo      syncomm;        /* ����ͨ�õ�������Ϣ        */
    ncsSynInfo      synall;         /* ȫ����Ϣ                  */
    ncsCaseIndex    *psCase;        // ������Ϣ
    int             iSumCase;       // ��������
    ncsCaseContHead *psCaseCont;    // ��������
    int             iSumCaseArea;   // ��������
    ncsCaseArea     *psCaseArea;    // ��������
    char            password[32];   // ��Կ        
    char            caMinVar[12];   // Ҫ��ͻ�����Ͱ汾     
} ncsSystemInfo;

typedef struct ncsEndUser_s {
    

} ncsEndUser;


/* ��Ҫ�·��������б�   
   ���飬��ʱ��Ӵ󵽴�����
 */
typedef struct ncsDownloadCom_s {
    unsigned char  cGtype;            // 0--ȫ��  1--��   2--���  3--����
    unsigned char  cRev[3];
    unsigned long  lId;
    unsigned long  lPos;              // �����ı�����λ��
    unsigned long  lBytes;            // �����ֽ���
    unsigned long  lTime;             // �����޸�ʱ��
    unsigned long  lExpireTime;       // ����ʧЧʱ��
} ncsDownloadCom;

typedef struct ncsDownloadComHead_s {
    unsigned long lSumBytes;             // �����ܵ��ֽ���
    unsigned long lLoadTime;             // װ��ʱ��
    unsigned long lLastTime;             // ����޸�ʱ��
    unsigned long lSumCom;               // ��������
    unsigned char *pBase;                // ��׼��ַ
    ncsDownloadCom *psCom;
} ncsDownloadComHead;

typedef struct ncsSmsModenMesg_s {
    char caNo[20];
    char caMesg[128];
} ncsSmsModenMesg;    
typedef struct ncsSmsNo_s {
    char caNo[20];
    char caPass[20];
    char caMac[20];
    unsigned long flag;
    unsigned long lasttime;
} ncsSmsNo;

typedef struct ncsSmsOnline_s {         /*���ÿ������������Ϣ*/
    char caSn[16];                  /*���������к�*/
    long lFlag;                      /*1ÿ�� 2-ÿ�� 2-ÿ��*/
    long lLimCount;                  /*�޶�������*/
    long lCount;                     /*�ѷ�������*/
    char caUptime[12];               /*�޶�������ʱ��*/
} ncsSmsOnline;
typedef struct ncsuserCode2Id_s {           
    char   code[32];                  //��������
    unsigned long id;               //��λID      
} ncsuserCode2Id; 

typedef struct ncsMacProcyObj_s {           
    char   code[32];                  // cid_type_did           type_idֵΪ9_9 ʱ����
    unsigned long id;               //ID  ���ţ���λID 0 ����ȫ��    
} ncsMacProcyObj; 
typedef struct ncsBabProcyObj_s {           
    char   code[32];                  // cid_type_did           type_idֵΪ9_9 ʱ����
    unsigned long id;               //ID  ���ţ���λID 0 ����ȫ��    
} ncsBabProcyObj; 
typedef struct ncsMacFrontpageObj_s {           
    uint8 userId;                      //�û�id
    ulong lastAskTime;                 //��������ʱ��
    ulong lastModTime;                 //���¸���ʱ��
    ulong todayMacCount;               //��������mac��
    ulong totalMacCount;               // ��mac��
} ncsMacFrontpageObj; 


#endif
