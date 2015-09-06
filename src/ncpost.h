/* 2009/02/20 ���� �˺š�����ɼ�   */
/* ������                         */
#ifndef __NCPOSTDEF___
#define __NCPOSTDEF___
#define NC_WBM_ID        651129L
#define NC_FILE_BUF       8192
#define NC_MAX_POSTBUF    64000L
#define NC_WBM_From      0
#define NC_WBM_To        1
#define NC_WBM_Cc        2
#define NC_WBM_Bcc       3
#define NC_WBM_Sub       4
#define NC_WBM_Conetnt   5
#define NC_WBM_Attach    6
#define NC_WBM_TITLE     7
#define NC_WBM_CHARSET   8    // �ַ���
#define NC_WBM_UID
#define NC_WBM_MAXITEM   16
#define NC_MAX_FILEREAD  2048    // ÿ�ζ��ļ����������  

/* ��������    */
typedef struct ncPostCont_s {  /* ������    */
    char            *pVar;              /* ������        */
    char            *pValue;            /* ����ֵ        */
    char            *pContentType;      /* �ļ�����      */
    unsigned long   lFileId;            /* �ļ����,�� proeim#����  0--��ʾ��һ���ֶ�  */
    struct   ncPostCont_s *next;
} ncPostCont;

#define NC_POST_FORM     1
#define NC_POST_UPLOAD   2
#define NC_POST_XML      3
#define NC_POST_EXCHANGE 4
typedef struct ncPostHead_s {   /* Httpͷ��Ϣ(POST����)   */
    char    *pHost;     /* ������       */
    char    *pUrl;      /* Url����      */
    char    *pBound;    /* �ֽ��       */
    int     iLen;       /* ���ݵĳ���   */
    int     iType;      /* ����   1--FORM��    2--Upload��    3--XML��*/
    unsigned long lAsize;  /* ������С     */
    unsigned long lTime;
    ncPostCont *psCont;
} ncPostHead;

/* WebMail���ʼ�ͷ                    */
typedef struct ncWbmMailHead_s {
    unsigned long lUserid;                    /* �û�ID   */
    char         *pHost;                      /* ������   */
    ncPostCont   *psCont[NC_WBM_MAXITEM];
    struct ncWbmMailHead_s *next;
} ncWbmMailHead;


/* ����Hash���������
       1--������Webmail��ʽģ��
             name    Ϊ 0
             iType --- 0 ��������������һ��   1 ���������ݷֿ�
 */
 
typedef struct ncWebMailPlate_s {
    char  caHost[16];     /* ����������Ϊ0,��ʾȱʡ  */
    char  caName[16];     /* ����                    */
    unsigned short nLen;  /* ����                    */
    unsigned short nType; /* ����  1-From 2-To  3-Cc  4-Bcc 5-Subject 6--Text 7--Attach  9--CharSet*/
} ncWebMailPlate;

typedef struct ncWMPList_s {
    char     caName[16];     /* ����                    */
    unsigned short nLen;     /* ��������                */
    unsigned short nType;    /* ����                    */
} ncWMPList;


typedef struct ncWMPIndex_s {
    char            caHost[16];   /* ������  */
    int             iStart;
    unsigned short  nLen;         /* �������� */
    unsigned short  nSum;
} ncWMPindex;

typedef struct ncWMP_s {
    int             iId;
    int             iSumIndex;
    int             iSumPlate;
    ncWMPindex      *psIndex;
    ncWMPList       *psList;
} ncWMP;


/* ���� Post���˺Ż�ȡ����
   ����Hash��ķ�ʽ���
       ����URL���� ��ؼ�¼,�����ж�
       ֧������ģ�� ��: sina.com = *.sina.com
*/
#define NC_POST_NAMEPASS  1
#define NC_POST_NAMEONLY  2

typedef struct ncPostAccount_s {
    char url[64];  // ��ַ
    int  sid;      // ���к�
    int  from;     // �Ӻδ���
    char account[32];   // �˺Ŷ�Ӧ�ı��� 
    char passwd[32];    // �����Ӧ�ı���
    int  code;          // ����
} ncPostAccount;




typedef struct ncPostFVarList_s {
    char     var[20];     // ������
    short    service;     // �������---0������
    short    vartype;     // �������, ÿ�ַ��������벻һ��
    struct ncPostFVarList *next;
} ncPostFVarList;


/* ������


*/

typedef struct ncPostFilter_s {
    char url[32];                    // ��ַ
    ncPostFVarList  *psFlist;        // ���б�
} ncPostFilter;


typedef struct ncPostVarList_s1 {
    char   var[20];                   // ������
    char   disp[16];                  // ��ʾ��
    short  vartype;
    short  cFlags;                    // 1--����    0--���п���
} ncPostVarList1;
    
/* ������     */
typedef struct ncPostDesc_s {
    char  name[16];                 // ��������
    ncPostVarList1  psList;          // ���������б�
    int   iMaxVar;                  // ��������
    int   (*fFunName)(utShmHead *);     /* ִ�к�������  */
} ncPostDesc;    


typedef struct ncPostDataList_s1 {
    short service;
    short vartype;
    char  var[20];
    char  *pValue;
} ncPortDataList1;


/* �ļ��嵥   */
typedef struct ncPostDirList_s {
    unsigned long lTime;        // ������ʱ��
    char     caFile[40];        // �ļ���
} ncPostDirList;

#endif
