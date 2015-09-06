/* ����޸�ʱ�� 2008/04/21   */
#ifndef __NCSCASEDEF___
#define __NCSCASEDEF___
/* ������Ϣ, ����ڹ����ڴ���   */
// ������Ϣ
#define  NCS_MAX_CASECONT            9   // ��󲼿�����
#define  NCS_CASECONT_USER           0   // �û�����
#define  NCS_CASECONT_NETID          1   // �������
#define  NCS_CASECONT_IP             2   // IP��ַ
#define  NCS_CASECONT_WEB            3   // Web
#define  NCS_CASECONT_POST           4   // Post
#define  NCS_CASECONT_IM             5   // IM
#define  NCS_CASECONT_MAIL           6   // Mail
#define  NCS_CASECONT_WARN           7   // Warn
#define  NCS_CASECONT_SENS           8   // ���з���
#define  NCS_CASE_KEY              "SProNetWay!@#878"

typedef struct ncsCaseIndex_s {
    unsigned long   cfrom;               // ������Ϣ��Դ  1-�������� 2-2����������
    unsigned long   caseid;              // ����Id
    unsigned long   lCrc32;              // У����, ͬ����ɺ�ɸ���Crc�����ͬ����Ϣ�Ƿ���ȷ
    unsigned long   lStart[NCS_MAX_CASECONT];     // ���ڴ��е���ʼ��ַ
    unsigned long   lBytes;              // �ܵ��ֽ���
    unsigned long   lSumRec;             // ��¼����
    unsigned long   lLastTime;           // ����޸�ʱ��
    unsigned long   lExpire;             // ��Чʱ��
    char            casecode[16];        // �������
    char            casename[32];        // ��������
    unsigned char   cFlags;              // ״̬ 1-��������  8-ɾ��  9-����
    unsigned char   cRev[3];
} ncsCaseIndex;




// ��������
typedef struct ncsCaseContHead_s {
    unsigned long   lMax;          // ��󳤶�
    unsigned long   lCur;          // ��ǰʹ�õ���󳤶�
    char   *pBuf;         // ��ַ
} ncsCaseContHead;

// ���ط�Χ, ���ݰ�����ID�Ĵ�С����
typedef struct ncsCaseArea_s {
    unsigned long   caseid;           // �������к�
    unsigned char   cType;            // ��� 0-��λ 1-��λ���  2-��λ��
    unsigned char   cRev[3];
    unsigned long   did;              // ID
    ncsCaseIndex    *psCase;          // ��Ӧ������ָ��
} ncsCaseArea;



typedef struct ncsCaseContIndex_s {
        unsigned long   lNext;             // ��һ����¼
        unsigned long   lLastTime;         // ����޸�ʱ��

        unsigned short  nLen;              // ��¼���� (������ͷ)
        unsigned char   cType;             // ���
        unsigned char   cFlags;            // 1--����  8--ɾ��  9--����
        unsigned long   lSid;
} ncCaseContIndex;


typedef struct ncsCaseContH_s {
        unsigned short  nLen;              // ��¼���� (������ͷ)
        unsigned char   cType;             // ���
        unsigned char   cFlags;            // 1--����  8--ɾ��  9--����
        unsigned long   lSid;              // �ڱ��е����к�
} ncCaseContH;


// ʹ��������, ���޸�ʱ��Ӵ�С����
#define  NCS_CASEUSER_USERNAME     1
#define  NCS_CASEUSER_DISPNAME     2
#define  NCS_CASEUSER_COMPNAME     3
#define  NCS_CASEUSER_MACADDR      4
#define  NCS_CASEUSER_CARDID       5

// �����û�����
typedef struct ncsCaseUser_s {
    char      cType;          // 1--�û���  2-��ʾ��  3-�������  4-MAC��ַ  5-֤��
    char      cRev[3];
    char      caName[32];
} ncsCaseUser;

// ���������˺�
typedef struct ncsCaseNetId_s {
    unsigned  long  lType;      // �������
    unsigned  long  lUid;       // ��Ӧ���û�ID(���ڹ���)
    char      caName[64];       // �˺�����
} ncsCaseNetId;

// ����IP��ַ
typedef struct ncsCaseIp_s {
    unsigned  long  lSlip;        // Դ��ʼIP��ַ
    unsigned  long  lSuip;        // Դ��ֹIP��ַ
    unsigned  long  lDlip;        // Ŀ����ʼIP��ַ
    unsigned  long  lDuip;        // Ŀ����ֹIP��ַ
    unsigned  short nDlport;      // ��ʼ�˿�
    unsigned  short nDuport;      // ��ֹ�˿�
    unsigned  long  lService;     // ����
    unsigned  char  cProt;        // Э��
    unsigned  char  cRev[3];      // ����
} ncsCaseIp;

// ���ڷ�����ַ
typedef struct ncsCaseWeb_s {
    unsigned  long  lUrlId;       // ��ַ�����
    char  caUrl[128];             // ������ַ
} ncsCaseWeb;


// ���ڷ��ʱ�
typedef struct ncsCasePost_s {
    unsigned  long  lUrlId;       // ��ַ���
    unsigned  long  lContId;      // �������
    char  caCont[256];            // ������,����ַ������һ���� 012www.sina.com012aaaaaa
} ncsCasePost;


//  ��������
typedef struct ncsCaseIm_s {
    unsigned  long  lType;        // �������
    unsigned  long  lContId;      // �������
    char  caCont[128];  // ������
} ncsCaseIm;

// �ʼ�����
typedef struct ncsCaseMail_s {
    unsigned  char  cType;        // 0-ȫ��  1-����  2-����
    unsigned  char  cRev[3];
    unsigned  long  lContId;      // �������
    char      caCont[256];        // ���� 000From000To000Sub000Cont
} ncsCaseMail;

// �ʼ�����
typedef struct ncsCaseMail1_s {
    unsigned  char  cType;        // 0-ȫ��  1-����  2-����
    unsigned  char  cRev[3];
    unsigned  long  lContId;      // �������
    char      *pFrom;
    char      *pTo;
    char      *pSub;
    char      *pCont;
    char      caCont[256];        // ���� 000From000To000Sub000Cont
} ncsCaseMail1;


// �澯����
typedef struct ncsCaseWarn_s {
    unsigned  long  lUid;         // �û�Id
    unsigned  char  cType;        // �澯��ʽ 1-�ʼ�  2-����
    unsigned  char  cRev[3];
    char      caAddr[64];         // ��ַ
} ncsCaseWarn;

// ���з���
typedef struct ncsCaseSens_s {
    unsigned  long  lService;     // �������
} ncsCaseSens;


#define NCS_CASEFILE_ID     19651129L
// �����ļ�ͷ��
typedef struct ncsCaseFile_s {
    unsigned long  lFid;         // �ļ�ID
    unsigned long  lSumCase;     // ��������
} ncsCaseFile;

#endif
