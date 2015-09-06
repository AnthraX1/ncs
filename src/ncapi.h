#ifndef __NCAPIDEF__
#define __NCAPIDEF__
#define NC_LNK_APSRVONLINE     161   /* AP��������Ϣ              		 */
#define NC_LNK_MACLOCATION     169   /* Mac�ɼ���Ϣ                    */  
#define NC_LNK_APMACONLINE     170   /* AP MAC��ַ���ձ�               */
#define NC_LNK_DEPTINFO        171   /* ������Ϣ                       */
#define NC_LNK_SECFACTORY      172   /* ��ȫ������Ϣ                   */
#define  NC_MACLOG_VER_AEROSCOUT       1                 // ��׼
#define  NC_MACLOG_VER_GBCOM           2                 // 徴�COM
#define  NC_MACLOG_VER_H3C             3                 // H3C


// ����AP��Ϣ 2014/12/3 ������һЩ�ֶ�
typedef struct ncApSrvOnline_s {
    uchar         apname[18];                  // Ap����,12����д��MAC��ַ��ʾ
    uchar         status;                      // 0--����  1--����  1--����ʹ��
    uchar         dbmark;                      // 1--�����ݿ����Ѵ���  0--�����ݿ��в�����
    uint4         lSip;                        // ͨ�ŵ�ַ
    uint4         starttime;                   // ��ʼʱ��
    uint4         lasttime;                    // ���ʱ��   
    uint4         bpflasttime;
    uint4         lGid;                        // AP��������ID
    uint8         lBytes;                      // ��������
    uint4         lPkts;                       // ���ݰ�����
    uint4         lNum;                        // ��������
    uint4         lIp;                         // IP��ַ
    uchar         devid[32];                   // �豸ID
    uchar         model[16];                   // �ͺ�
    uchar         ssid[32];
    uchar         servicecode[16];
    uchar         servicename[64];             // ����������
    uchar         address[64];                 // ��װλ��
    uchar         dispname[64];
    uchar         plate[32];
    uchar         line[32];
    uchar         mapid[32];
    uchar         longitude[12];               // ����
    uchar         latitude[12];                // γ��
    uint4         reporttime;                  // �ϱ�ʱ��
    uint4         uptimestep;                  // �ϴ�ʱ����
    uint4         radius;                      // �ɼ��뾶
    uchar         cursrvbpfrule[256];          // srv bpf rule
    uchar         curbpfrule[246];             // ap current bpf rule
    uchar         scode[10];                   // ��ȫ���̱���
    uchar         version[8];
    uchar         apmac[64];                   // AP��MAC��ַ
    uchar         *pGroup;                     // ����ID
    uchar         *pDept;                      // ��λID
    uint4         lMacVer;                     // ��̽��ʽ�汾   
    uint4         lSynTime;                    // ���һ�κͷ�������ͬ��ʱ��
    uint4         lMacTime;                    // Mac��̽���ɼ�ʱ��
    uchar         cmode;                       // �޸ı�ʶ
    uchar         mtype;                       // ��� 1--�̶�AP  2--�ƶ�����   3--�����ɼ��豸 9--����
    uchar         synflags;
    uchar         cWorkFlags;                  // 1--���   2--Mac��̽  3--���+MAC��̽
    uint2         nMarkNum;
    uint2         lMacCount;                   // MAC����
    uint4         lGpsTime;                    // GPS�ɼ�ʱ��
    uint4         lModiTime;                   // ���һ���޸�ʱ��
}  ncApSrvOnline;


typedef struct ncApMacOnline_s {
    uchar           apmac[6];
    uchar           apname[18];
    ncApSrvOnline   *psAp;
}   ncApMacOnline;


typedef struct ncBcpSec_s {    // ��ȫ����
        uchar           scode[16];
        uchar           sname[64];
        uchar           slink[32];
        uchar           saddress[128];
        uchar           smail[32];
        uchar           stel[32];
        int             flags;
        uint4           moditime;
        struct ncBcpSec_s *next;
} ncBcpSec;




/*   
     ������Ϣ
     ���ݷ��������и���servicename����
     
 */

typedef struct ncDeptinfo_s {    /* ����Ϣ  */
    char           name[16];            // ��������
    char           disp[64];
    char           address[128];
    uint4          lDid;
    uint4          lGid;              /* ��ID                            */
    uchar          cmod;            /* 0--����  1--�޸�                  */
    uchar          cdb;             /* 0--���ݿ��в�����  1--�Ѵ���      */
    uchar          gtype;           // ������� 1-D
    uchar          jytype;
    uchar          ceoname[16];
    uchar          ceoidtype[4];
    uchar          ceoidno[20];
    uchar          ceotel[16];
    uchar          sdate[6];
    uchar          edate[6];
    uint4          lSip;          // ͨ�ŵ�ַ
    uint2          nSport;        // ��ʼ�˿�
    uint2          nEport;        // ��ֹ�˿�
    uchar          caLongitude[12];
    uchar          caLatitude[12];
    uchar          caAccount[32];    // ADSL�˺Ż���IP��ַ
    uint8          lUp;
    uint8          lDown;
    uint4          lUser;
    uint4          lAps;                 // AP����
    uint4          lOip;                 // ������ַ
    uint4          lOnlineAp;            // ����AP����
    uint4          lasttime;             /* ���ʱ��                                       */
    uint4          moditime;             /* ����޸�ʱ��                                   */
    uchar          caScode[10];
    uchar          jointype;
    uchar          joincode;
    uchar          shflags;              // 0--δ��  1--����
    uchar          status;               // 0--����  1--ͣҵ
    uchar          caRev[2];             // ����
    ncBcpSec       *psSec;
} ncDeptinfo;



#endif
