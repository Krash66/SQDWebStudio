      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      *    COPYBOOK: P1ON.DT.STAR.COPYLIB(BHS2MCH)                    *
      * FOR SEGMENT: BHS2MCH                                          *
      * IN DATABASE: PCBHSPA0                                         *
      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
       01 BHS2MCH-STRUCTURE-DATA-ITEM.
         05 CLH-KEY.
           10 CLH-CENT-IND-INV-COMP     PIC X(1).
           10 CLH-DECADE-COMP           PIC X(1).
           10 CLH-INV-NBR-COMP          PIC 9(13) COMP-3.
           10 CLH-KEY-FILLER            PIC X(3).
           10 CLH-DT-PROC-COMP          PIC S9(8) COMP.
           10 CLH-TIME-COMP             PIC S9(8) COMP.
         05 CLH-AREA.
           10 CLH-PAY-LN-NBR            PIC S9(4) COMP.
           10 CLH-CENT-IND-INV          PIC X(1).
           10 CLH-DECADE-INV            PIC X(1).
           10 CLH-INV-NBR               PIC 9(13) COMP-3.
           10 CLH-INV-NBR-X             REDEFINES CLH-INV-NBR PIC X(7).
           10 CLH-SUPEROP-IND-HDR       PIC X(1).
           10 CLH-DT-PROC               PIC S9(8) COMP.
           10 CLH-TIME                  PIC S9(8) COMP.
           10 CLH-DECADE-ALT            PIC X(1).
           10 CLH-ALT-INV-NBR           PIC 9(13) COMP-3.
           10 CLH-ALT-INV-NBR-X
              REDEFINES CLH-ALT-INV-NBR PIC X(7).
           10 CLH-INV-STAT-CD           PIC S9(4) COMP.
           10 CLH-TERM-NBR              PIC X(4).
           10 CLH-ROUTE-CD              PIC S9(4) COMP.
           10 CLH-OPER-ID               PIC X(8).
           10 CLH-ORIG-PMT-DT           PIC S9(8) COMP.
           10 CLH-ORIG-PMT-TIME         PIC S9(8) COMP.
           10 CLH-DT-REC                PIC S9(8) COMP.
           10 CLH-ACT-PD-DT             PIC S9(8) COMP.
           10 CLH-SV-PEND-DT            PIC S9(8) COMP.
           10 CLH-PEND-RLSE-DT          PIC S9(8) COMP.
           10 CLH-HOSP-ADMN-DT          PIC S9(8) COMP.
           10 CLH-DSCH-DT               PIC S9(8) COMP.
           10 CLH-OI-VERIF-DT           PIC S9(8) COMP.
           10 CLH-BAL-TOTL              PIC S9(8) COMP.
           10 CLH-ADJ-AMT               PIC S9(8) COMP.
           10 CLH-BSA-APPLIED-IND       PIC X(1).
           10 CLH-REIMT-FLEX-IND-HDR    PIC X(1).
           10 FILLER                    PIC X(2).
           10 CLH-OI-CON-TOT            PIC S9(8) COMP.
           10 CLH-OI-PAID-TOT           PIC S9(8) COMP.
           10 CLH-UR-SV-AMT             PIC S9(8) COMP.
           10 CLH-PRICING-AMT           PIC S9(8) COMP.
           10 CLH-CLM-PAID-AMT          PIC S9(8) COMP.
           10 CLH-CLM-PREPAID-AMT       PIC S9(8) COMP.
           10 CLH-DED-RM                PIC S9(8) COMP.
           10 CLH-DAYS-RM               PIC S9(4) COMP.
           10 CLH-COV-DAYS              PIC S9(4) COMP.
           10 CLH-NON-COV-DAYS          PIC S9(4) COMP.
           10 CLH-ITS-HDR-PRICE-METH    PIC X(2).
           10 CLH-EE-ZIP                PIC S9(8) COMP.
           10 CLH-PAY-TO-ZIP            PIC S9(8) COMP.
           10 CLH-PAY-TO-ASPW           PIC S9(8) COMP.
           10 CLH-SEN-GOLD              PIC S9(8) COMP.
           10 CLH-PRO-APP-FROM-DT       PIC S9(8) COMP.
           10 CLH-PRO-APP-TO-DT         PIC S9(8) COMP.
           10 CLH-MC-NBR                PIC 9(10) COMP-3.
           10 CLH-MC-NBR-X              REDEFINES CLH-MC-NBR PIC X(6).
           10 CLH-HOURS                 PIC S9(4) COMP.
           10 CLH-MINUTES               PIC S9(4) COMP.
           10 CLH-ITS-SPLIT-CLM         PIC X(1).
           10 CLH-HOST-DF-STAT          PIC X(1).
           10 CLH-ACCUM-XREF-GROUP      PIC X(6).
           10 CLH-DIAGNOSIS-CD-1        PIC X(5).
           10 CLH-DIAGNOSIS-CD-2        PIC X(5).
           10 CLH-DIAGNOSIS-CD-3        PIC X(5).
           10 CLH-DIAGNOSIS-CD-4        PIC X(5).
           10 CLH-DIAGNOSIS-CD-5        PIC X(5).
           10 CLH-PND-RCYCL-STRT-DT     PIC S9(8) COMP.
           10 CLH-THIRD-PRTY-GRP-CAP    PIC X(1).
           10 CLH-PLAN-PAR-STAT         PIC X(1).
           10 CLH-NATURE-OF-BUSINESS    PIC X(1).
           10 CLH-ITS-PLAN-PAYER-CD     PIC S9(1).
           10 CLH-ACCESS-FEE            PIC S9(8) COMP.
           10 CLH-ADMIN-FEE             PIC S9(8) COMP.
           10 CLH-FIN-PROC-DT           PIC S9(8) COMP.
           10 CLH-ITS-SCCF-SERIAL-NO    PIC 9(15) COMP-3.
           10 CLH-ITS-SCCF-SERIAL-NUM-X
              REDEFINES CLH-ITS-SCCF-SERIAL-NO PIC X(8).
           10 CLH-LOC-PLAN-CD           PIC 9(5) COMP-3.
           10 CLH-LOC-PLAN-CD-X
              REDEFINES CLH-LOC-PLAN-CD PIC X(3).
           10 CLH-ITS-RESUB-IND         PIC X(1).
           10 CLH-ITS-ADJ-IND           PIC X(1).
           10 CLH-SERV-BUR-ID-NBR       PIC S9(4) COMP.
           10 CLH-NBR-GRACE-DAYS        PIC S9(1).
           10 CLH-OCP-CD                PIC S9(1).
           10 CLH-OCL-LETTER-IND        PIC S9(1).
           10 CLH-AUDIT-FLAG            PIC S9(1).
           10 CLH-CNTL-PLAN             PIC S9(4) COMP.
           10 CLH-LINE-COUNT            PIC S9(4) COMP.
           10 CLH-INT-SCRN-IND          PIC S9(1).
           10 CLH-CLMCHK-IND-HDR        PIC X(1).
           10 CLH-OPER-ID-AUDITOR       PIC X(8).
           10 CLH-CENT-IND-ALT          PIC X(1).
           10 CLH-TOC                   PIC X(1).
           10 CLH-RMK-CD                PIC X(4).
           10 CLH-OVR-CD                PIC X(2).
           10 CLH-GROUP                 PIC X(9).
           10 CLH-BEN-CD                PIC X(9).
           10 CLH-GROUP-TYPE            PIC X(2).
           10 CLH-COMPANY-CD            PIC X(1).
           10 CLH-PRODUCT-CD            PIC X(3).
           10 CLH-GRCC-CD               PIC X(3).
           10 CLH-PRODUCT-OPT           PIC X(3).
           10 CLH-PAID-GROUP            PIC X(9).
           10 CLH-PAID-BEN-CD           PIC X(9).
           10 CLH-RSN-ADJ               PIC X(3).
           10 CLH-SOURCE-ADJ            PIC X(1).
           10 CLH-SV-PEND-CD            PIC X(4).
           10 CLH-DOCUMENT-TP           PIC X(1).
           10 CLH-DISP-CD               PIC X(1).
           10 CLH-CONTRACT-TYPE         PIC X(2).
           10 CLH-CONT-PRV              PIC X(10).
           10 CLH-PLAN-ID               PIC X(1).
           10 CLH-MC-ACCEPTANCE         PIC X(1).
           10 CLH-LOC-CD                PIC X(2).
           10 CLH-PIP-IND               PIC X(1).
           10 CLH-SDE-IND               PIC X(1).
           10 CLH-SPEC-PAY              PIC X(10).
           10 CLH-MEDICARE-NBR          PIC X(10).
           10 CLH-DUAL-ID               PIC X(13).
           10 CLH-PATIENT-NBR           PIC X(17).
           10 CLH-COVERAGE              PIC X(2).
           10 CLH-OPL-TYPE              PIC X(2).
           10 CLH-PAT-ST-CD             PIC X(2).
           10 CLH-STUDENT-FLAG          PIC X(1).
           10 CLH-NEWBORN-FLAG          PIC X(1).
           10 CLH-PRICE-CAT             PIC X(3).
           10 CLH-PRICE-TYPE            PIC X(1).
           10 CLH-OUTLR-STAT            PIC X(1).
           10 CLH-CASE-TP               PIC X(1).
           10 CLH-ADM-TP                PIC X(1).
           10 CLH-ADMIT-DIAG            PIC X(5).
           10 CLH-DFT-TP                PIC X(1).
           10 CLH-ACT-CHK-NBR           PIC X(10).
           10 CLH-HLD-HMLS              PIC X(1).
           10 CLH-WC-CLAIM-NBR          PIC 9(15) COMP-3.
           10 CLH-WC-CLAIM-NBR-X
              REDEFINES CLH-WC-CLAIM-NBR PIC X(8).
           10 CLH-STORE-FRONT-IND       PIC X(1).
           10 CLH-CONT-PRV-ID-EXT       PIC X(5).
           10 CLH-CONT-PRV-LOCAL-ID     PIC X(1).
           10 CLH-SELF-INS-FLAG         PIC X(1).
           10 FILLER                    PIC X(4).
           10 CLH-CNTL-PLAN-IND         PIC X(1).
           10 CLH-ITS-POS-IND           PIC X(1).
           10 CLH-PAG-SHARE-IND         PIC X(1).
           10 CLH-SPLIT-IND             PIC X(1).
           10 CLH-ITS-PRICING-AMT       PIC S9(8) COMP.
           10 CLH-GROUP-STATUS          PIC X(2).
           10 CLH-MULTI-BILL-CD         PIC X(5).
           10 CLH-CONDITION-1           PIC X(2).
           10 CLH-CONDITION-2           PIC X(2).
           10 CLH-CONDITION-3           PIC X(2).
           10 CLH-CONDITION-4           PIC X(2).
           10 CLH-CONDITION-5           PIC X(2).
           10 CLH-PRO-APP-IND           PIC X(1).
           10 CLH-IPDR-REQD             PIC X(3).
           10 CLH-CLIENT-SIZE           PIC X(1).
           10 CLH-REG-HSA-NBR           PIC X(2).
           10 CLH-MEDICARE-DED          PIC S9(4) COMP.
           10 CLH-MC-BLOOD-DED          PIC S9(4) COMP.
           10 CLH-MC-COINS-DLRS         PIC S9(8) COMP.
           10 CLH-MC-NCOV-DAYS          PIC S9(4) COMP.
           10 CLH-PRV-CONTRACT-TYPE     PIC X(2).
           10 CLH-NOTE-IND              PIC X(1).
           10 CLH-SUB-ALPHA-PRFX-1-2    PIC X(2).
           10 CLH-SUB-ALPHA-PRFX-3      PIC X(1).
           10 CLH-SUB-ALPHA-STATE       PIC X(2).
           10 FILLER                    PIC X(5).
           10 CLH-PD-REFERRAL-VISITS    PIC S9(4) COMP.
           10 CLH-REPOS-CLM-CTL-NBR     PIC 9(10) COMP-3.
           10 CLH-ITS-HPA-ACTION-CD     PIC X(5).
           10 FILLER                    PIC X(9).
           10 FILLER                    PIC X(4).
           10 CLH-ACCESS-FEE-PCT        PIC 9(2)V9(2) COMP-3.
           10 CLH-ACCESS-FEE-PCT-X
              REDEFINES CLH-ACCESS-FEE-PCT PIC X(3).
           10 CLH-ITS-XREF-SCCF-NUM     PIC 9(15) COMP-3.
           10 CLH-ITS-XREF-SCCF-NUM-X
              REDEFINES CLH-ITS-XREF-SCCF-NUM PIC X(8).
           10 FILLER                    PIC X(4).
           10 CLH-REFUND-AMT            PIC S9(8) COMP.
           10 CLH-ITS-CTL-CF-ACCT-CD    PIC X(2).
           10 CLH-ITS-PROG-CD           PIC X(1).
           10 CLH-HRC-IND               PIC X(1).
           10 CLH-CLMCHK-BYPASS-HDR     PIC X(1).
           10 CLH-CLMCHK-HIST-IND       PIC X(1).
           10 CLH-ITS-PROG-PROD-TP      PIC X(1).
           10 CLH-SMTSUS-IND-HDR        PIC X(1).
           10 CLH-DRG-VER-ID            PIC X(2).
           10 FILLER                    PIC X(8)
