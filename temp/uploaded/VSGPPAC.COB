   ****************************************************************  00000100
      *                  *   I M P O R T A N T   *                   *  00000200
      *   IF ANY CHANGES ARE MADE TO THIS COPYBOOK, CONTACT STAR     *  00000300
      *   ON-LINE SUPPORT AS SOON AS POSSIBLE BECAUSE THE CHANGES    *  00000400
      *   MAY AFFECT THE SUPER OP APPLICATION.                       *  00000500
      ***************************************************************** 00000700
      *     GROUP PACKAGE SEGMENT IDENTIFIES A SET OF BENEFITS FOR A    00000800
      *     GROUP.  VARIOUS CONTRACTS FROM THE CONTRACTS DATA BASE MAKE 00000900
      *     UP A PACKAGE OF BENEFITS.                                   00001000
      *    FILE/SEGMENT ID.-VSGPGRU    COBOL PREFIX-GB                  00001100
      *            IMS KEY FIELD ID.---NULLPKGN                         00001200
      *            KEY FIELD TAG ID.---GB-PKG-NO                        00001300
      *    SSA FIELDS THIS SEGM PACKSRTD, AND PACKENDD                  00001400
      ***************************************************************** 00001500
       01  GB-VSGPPACC.                                                 00001600
            05 GB-PKG-NO USAGE COMP-3                                   00001700
                                    PIC 9(3).                           00001800
            05 GB-PKG-SEQ-NO        PIC 9(2).                           00001900
            05 GB-PKG-STRT-DT USAGE COMP-3                              00002000
                                    PIC 9(7).                           00002100
            05 GB-PKG-END-DT USAGE COMP-3                               00002200
                                    PIC 9(7).                           00002300
            05 GB-AWARE-STAS-CD USAGE COMP                              00002400
                                    PIC 9(4).                           00002500
            05 GB-ID-TYCD USAGE COMP                                    00002600
                                    PIC 9(4).                           00002700
            05 GB-PCS-TYCD USAGE COMP                                   00002800
                                    PIC 9(4).                           00002900
            05 GB-PKG-STAS-CD USAGE COMP                                00003000
                                    PIC 9(4).                           00003100
                88 GB-PS-SETUP-ERR  VALUE 10.                           00003200
                88 GB-PS-TRM-COVACT VALUE 09.                           00003300
                88 GB-PS-ACTIVE     VALUE 01.                           00003400
                88 GB-PS-TRM-CVNPAY VALUE 08.                           00003500
                88 GB-PS-TRM-SUBARR VALUE 07.                           00003600
                88 GB-PS-IN-SETUP   VALUE 02.                           00003700
                88 GB-PS-PENDING    VALUE 03.                           00003800
            05 GB-PKG-COMP-DT USAGE COMP-3                              00003900
                                    PIC 9(7).                           00004000
            05 GB-PR-FEE-CD USAGE COMP                                  00004100
                                    PIC 9(4).                           00004200
            05 GB-FEE-AMT USAGE COMP-3                                  00004300
                                    PIC 9(3)V99.                        00004400
            05 GB-DOCM-TY-CD USAGE COMP                                 00004500
                                    PIC 9(4).                           00004600
            05 GB-COB-IDCD USAGE COMP                                   00004700
                                    PIC 9(4).                           00004800
            05 GB-DEP-CARI-CD USAGE COMP                                00004900
                                    PIC 9(4).                           00005000
            05 GB-DEP-CONV-CD USAGE COMP                                00005100
                                    PIC 9(4).                           00005200
                88 GB-DC-NO-ACTION  VALUE 01.                           00005300
                88 GB-DC-LIST-AND-NOTICE                                00005400
                                    VALUE 03.                           00005500
                88 GB-DC-LIST       VALUE 02.                           00005600
            05 GB-REI-REA-IND USAGE COMP                                00005700
                                    PIC 9(4).                           00005800
            05 GB-65-CVN-CD USAGE COMP                                  00005900
                                    PIC 9(4).                           00006000
                88 GB-6C-LIST       VALUE 02.                           00006100
                88 GB-6C-CAN-SUB-DEPS                                   00006200
                                    VALUE 04.                           00006300
                88 GB-6C-LIST-NOTICE                                    00006400
                                    VALUE 03.                           00006500
                88 GB-6C-NO-ACTION  VALUE 01.                           00006600
            05 GB-SUBR-CVN-CD USAGE COMP                                00006700
                                    PIC 9(4).                           00006800
                88 GB-SD-SEND-CV-LEFT-EMPLOY                            00006900
                                    VALUE 02.                           00007000
                88 GB-SD-NO-CONVERSION                                  00007100
                                    VALUE 01.                           00007200
                88 GB-SD-CVRT-BL-LEFT-EMPLOY                            00007300
                                    VALUE 03.                           00007400
            05 GB-EDS-BEN-CD USAGE COMP                                 00007500
                                    PIC 9(4).                           00007600
            05 GB-EDS-LIM-CD USAGE COMP                                 00007700
                                    PIC 9(4).                           00007800
            05 GB-QUAL-PLCD USAGE COMP                                  00007900
                                    PIC 9(4).                           00008000
            05 GB-OCCR-CNT-NO USAGE COMP                                00008100
                                    PIC 9(4).                           00008200
            05 GB-GRPF-TY-CNT OCCURS 0025 TIMES INDEXED BY              00008300
               GBX-GRPF-TY-CNT.                                         00008400
             07 GB-CON-TY-CD USAGE COMP                                 00008500
                                    PIC 9(4).                           00008600
             07 GB-SUBR-CNT USAGE COMP-3                                00008700
                                    PIC S9(7).                          00008800
            05 GB-SEL-NETWRK-OCCR-CNT-NO USAGE COMP                     00008900
                                    PIC 9(4).                           00009000
            05 GB-SEL-NETWRK-CNT OCCURS 5 TIMES INDEXED BY              00009100
               GBX-SEL-NETWRK-CNT.                                      00009200
             07 GB-SEL-NETWRK-NO    PIC X(3).                           00009300
             07 GB-SEL-NETWRK-TY USAGE COMP                             00009400
                                    PIC 9(4).                           00009500
            05 GB-REC-CD-OCCR-CNT-NO USAGE COMP                         00009600
                                    PIC 9(4).                           00009700
            05 GB-REC-CD-CNT OCCURS 10 TIMES INDEXED BY GBX-REC-CD-CNT. 00009800
             07 GB-REC-COMP-CD      PIC X(1).                           00009900
             07 GB-REC-PROD-CD      PIC X(3).                           00010000
             07 GB-REC-GRCC-CD      PIC X(3).                           00010100
             07 GB-REC-PROD-OPT     PIC X(3).                           00010200
            05 GB-ACCT-CAP-CD       PIC X(1).                           00010300
            05 GB-ORGAN-TRANS-CD    PIC X(1).                           00010400
            05 GB-SMOKE-RATE-CD     PIC X(1).                           00010500
            05 GB-BMTC-CD           PIC X(2).                           00010600
            05 GB-NATL-ACCT-CLM     PIC X(1).                           00010700
            05 GB-PLAN-AGREE-CD     PIC X(1).                           00010800
            05 GB-CON-COUNT-CD      PIC X(1).                           00010900
            05 GB-CENT-ADMN-CD      PIC X(1).                           00011000
            05 GB-CLASS-CD          PIC X(3).                           00011100
            05 GB-STOP-LOSS         PIC X(1).                           00011200
            05 GB-DNT-COV-COMB-CD   PIC X(1).                           00011300
            05 GB-GRP-SELF-ADMN-CD  PIC X(1).                           00011400
            05 GB-GRP-ST-CD         PIC X(2).                           00011500
            05 GB-CMPLIA-CD         PIC X(1).                           00011600
            05 GB-MII-ST-SLD-CD     PIC X(2).                           00011700
            05 GB-SLCT-PROV-OCCR-CNT-NO USAGE COMP                      00011800
                                    PIC 9(4).                           00011900
            05 GB-SLCT-PROV-CNT OCCURS 10 TIMES INDEXED BY              00012000
               GBX-SLCT-PROV-CNT.                                       00012100
             07 GB-SLCT-PROV-ARR    PIC X(3).                           00012200
            05 GB-AREA-NO-CD        PIC X(2).                           00012300
            05 GB-TBL-NO-CD         PIC X(3).                           00012400
            05 GB-ALPHA-PFX-CD      PIC X(3).                           00012500
            05 GB-DEP-AGE-LMCD USAGE COMP                               00012600
                                    PIC 9(4).                           00012700
            05 GB-CNL-AGE-CD        PIC X(3).                           00012800
            05 GB-BDI-CD.                                               00012900
             07 GB-BDI-BUS-PROD-CD USAGE COMP                           00013000
                                    PIC 9(04).                          00013100
             07 GB-BDI-CONSTR-SEQN USAGE COMP                           00013200
                                    PIC 9(04).                          00013300
             07 GB-BDI-CNSL-SEQN USAGE COMP                             00013400
                                    PIC 9(04).                          00013500
            05 GB-GN-CD.                                                00013600
             07 GB-GN-PLN-NO USAGE COMP                                 00013700
                                    PIC 9(04).                          00013800
             07 GB-GN-FRM-BRND-COPAY USAGE COMP                         00013900
                                    PIC 9(04).                          00014000
             07 GB-GN-FRM-GEN-COPAY USAGE COMP                          00014100
                                    PIC 9(04).                          00014200
             07 GB-GN-NFM-BRND-COPAY USAGE COMP                         00014300
                                    PIC 9(04).                          00014400
             07 GB-GN-NFM-GEN-COPAY USAGE COMP                          00014500
                                    PIC 9(04).                          00014600
            05 FILLER               PIC X(34).                          00014700
