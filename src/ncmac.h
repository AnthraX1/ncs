#ifndef __NCMACDEF__
#define __NCMACDEF__
#define NCMAC_VERSION         "V1.60.001"
#define NCMAC_RELEASE         "2015/06/03"
#include "ncapi.h"

// �������
#define MACLOG_OUTFLAG_ALL          7
#define MACLOG_OUTFLAG_STARTSTOP    3
#define MACLOG_OUTFLAG_STOP         2
#define MACLOG_OUTFLAG_START        1
#define MACLOG_OUTFLAG_NONE         0


//     ����ͳ��
//     ��markid�仯ʱ��д��־   268
//     mac,starttime,endtime,mark
typedef struct ncLbsMacLocation_s {
    uchar   mac[6];                                   // Mac��ַ��Ϊ����   
    uchar   apmac[6];                                 // AP Mac��ַ
    char    lrssi;                                    // ����
    char    urssi;                                    // ���
    char    noise;
    uchar   channel;
    uint4   starttime;                                // ��ʼʱ��
    uint4   gpstime;
    uint4   lasttime;                                 // ���һ�η���ʱ��
    uchar   cFlags;                                   // 1--����
    uchar   cDb;                                      // 0--δ���浽��־  1--�ѱ��浽��־
    uchar   caBssid[6];                               // ������Bssid
    uchar   cAssocicated;                             // ����  1--Yes  2--No
    uchar   encrypt;
    uchar   distance;
    uchar   mutype;                                   // 1-�ն�  2--�ȵ�
    uchar   vtype;                                    // ������ 0--��ʵ���  1--�������
    uchar   cMacDb;                                   // �Ƿ�ͬ����Mac�� 0-�� 1-�ǳɹ�  2-����ͬ�� 9-���ֻ���
    uchar   caRev[2];
    uchar   longitude[12];
    uchar   latitude[12];
    uint4   reporttime;                               // �ϱ�����ʱ��
    uchar   ssid[32];                                 // 
    uchar   termtype[32];                             // �ն�Ʒ��
    uchar   name[60];                                 // �������
    uint4   lSynMacDbTime;                            // ͬ��ʱ��
    uchar   *pAp;                                     // ���AP��Ϣ�Ľṹ
} ncLbsMacLocation;



typedef struct ncLbsMacRecord_s {
    ncLbsMacLocation *psMacLoc;
} ncLbsMacRecord;




//     �������
typedef struct ncMacLogVname_s {
    uchar   mac[6];                                   // Mac��ַ��Ϊ����   
    uint2   num;                                      // ��¼��ţ���0��ʼ
    uint2   sum;                                      // ��¼����
    uint2   vtype;                                    // ����������
    uchar   apmac[6];                                 // AP Mac��ַ
    uchar   vname[32];                                // �����������
    uchar   vdisp[32];                                // ��ʾ��
    uint4   lSip;
    uint4   lDip;
    uint4   starttime;                                // ץȡʱ��
    uint4   lasttime;                                 // ���ʱ��
    uint4   reporttime;                               // �ϱ�ʱ��
    uchar   cDb;                                      // �Ƿ񱣴������ݿ���
    uchar   cRev;
    uint2   nDport;
} ncMacLogVname;



// ������״̬
typedef struct ncPortalSrvStatus_s {
    uchar               caName[32];                // ����
    unsigned long       lIp;                       // IP��ַ
    unsigned long       lLastTime;                 // ���һ�λʱ��
    uint2               nPort;                     // �˿�
    uint2               nStatus;                   // ״̬
    uint2               nRev[2];
} ncPortalSrvStatus;


// λ�ñ�ǩ
typedef struct ncLbsLocApMark_s {
    char        caMark[32];
    uint4       lMacCount;        // Mac��ַ����
} ncLbsLocMark;


#define NCSRV_LBS_HEAD         0x7C83
#define NCSRV_LBS_HEADXOR      0x7C85
#define NCSRV_LBS_H3C          0x0001
#define NCSRV_LBS_MUREPORT     0xD6
#define NCSRV_LBS_PDUSPEC      0xD8
#define NCSRV_LBS_MAXLEN       16000

typedef struct ncSrvLbsPdu_s {
    uint2   nHead;       // 0x7C83
    uint2   nReqId;      // Request ID
    uchar   cCode;
    uchar   cSubCode;
    uint2   nLen;
    uchar   data[4096];
} ncSrvLbsPdu;


    
// 48�ֽ�
typedef struct ncSrvMuReport_s {   // Code: 0xD6
    uchar   apmac[6];    // APMac
    uint2   vendorid;    // ����ID
    uint2   rev1;
    uchar   bssid[6];    // AP's SSID
    uchar   radtype;     
    uchar   channel;
    uchar   isassocicated;
    uchar   rev2;       // 0--ɨ��  1--�뿪  ��徴���չ)
    uint4   timestamp;
    uint2   rev3;
    uchar   mutype;      //  0x01--Unknow  0x02:Wifi Mobile Unit  0x03:Rogue Ap
    uchar   rev4;
    char    rssi;        // -128--127 dBm
    uchar   rev5;
    uchar   noisefloor;  // 
    uchar   rev6[3];
    uchar   datarate;
    uchar   mpduflags;
    uchar   mumac[6];
    uint2   fc;
    uint2   sc;
    uint2   rev7;
} ncSrvMuReport;


// 72�ֽ�
typedef struct ncSrvMuReportHC_s {   // Code: 0xD6  徴��°�
    uchar   apmac[6];    // APMac
    uint2   vendorid;    // ����ID
    uint2   rev1;
    char   longitude[10];   // ����
    char   latitude[10];    // γ��
    uchar   gpstime[4];      // GPS Time
    uchar   bssid[6];    // AP's SSID
    uchar   ssid[32];    // SSID
    uchar   radtype;     
    uchar   channel;
    uchar   isassocicated;  // 1--Yes  2--No
    uchar   encrypttype;       // ������������ 0--Open 1--WEP 2--WPA 3-WPA2
    uchar   distance;          // ���ɼ��豸��ɼ��豸�ľ���(��)
    uchar   mutype;      //  0x01--STA  2--AP  3 Adhox
    char    rssi;        // -128--127 dBm
    char   noisefloor;  // 
    uint4   timestamp;
    uchar   datarate;
    uchar   mpduflags;
    uchar   mumac[6];
    uint2   fc;
    uint2   sc;
} ncSrvMuReportHC;

typedef struct ncSrvPduMsg_s {
    uint2   nHead;       // 0x7C83
    uint2   nReqId;      // Request ID
    uchar   cCode;
    uchar   cSubCode;
    uint2   nLen;
    ncSrvMuReportHC sPayload;
} ncSrvPduMsg;


typedef struct ncSrvLbsH3C_s {
    uint2   nHead;       // Version
    uint2   nLen;
    uint4   nReqId;      // 
    uint2   nCode;
    uint2   nSubCode;
    uchar   data[1600];
} ncSrvLbsH3C;

typedef struct ncSrvMuReportH3C_s {   // Code: 0xD6
    uchar   mumac[6];
    uchar   apmac[6];    // APMac
    uchar   radid;     
    uchar   radtype;     
    uchar   bssid[6];    // AP's SSID
    uchar   txid;        // ����ID
    uchar   cRev0;
    uchar   channel;
    uchar   isassocicated;
    uint4   timestamp;
    char    rssi;        // -128--127 dBm
    char    noisefloor;  // 
    uint2   fc;
    uint2   vendorid;    // ����ID
    uint2   rev1;
} ncSrvMuReportH3C;



#endif