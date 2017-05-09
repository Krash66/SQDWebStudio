      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      *    COPYBOOK: P1ON.DT.STAR.COPYLIB(BHS3MDE)                    *
      * FOR SEGMENT: BHS3MDE                                          *
      * IN DATABASE: PCBHSPA0                                         *
      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
       01 BHS3MDE-STRUCTURE-DATA-ITEM.
         03 CLD-DETAIL-RECORD OCCURS 4 TIMES.
           05 CLD-PAY-LN-NBR            PIC S9(4) COMP.
           05 CLD-CHUNK-ONE.
             10 CLD-ORIG-FEP-LINE-NBR   PIC X(2).
             10 CLD-LN-SPLIT-FROM       PIC S9(4) COMP.
             10 CLD-NBR                 PIC S9(4) COMP.
           05 CLD-FST-DT                PIC S9(8) COMP.
           05 CLD-LST-DT                PIC S9(8) COMP.
           05 CLD-HOSP-ADMN-DT          PIC S9(8) COMP.
           05 CLD-DSCH-DT               PIC S9(8) COMP.
           05 CLD-NET-PAY-AMT           PIC S9(8) COMP.
           05 CLD-ORIGINAL-CHG          PIC S9(8) COMP.
           05 CLD-ITS-SUR-AMT           PIC S9(8) COMP.
           05 CLD-CHG                   PIC S9(8) COMP.
           05 CLD-NC-AMT                PIC S9(8) COMP.
           05 CLD-OI-CON-AMT            PIC S9(8) COMP.
           05 CLD-OI-PAID-AMT           PIC S9(8) COMP.
           05 CLD-CR-RES                PIC S9(8) COMP.
           05 CLD-UCR-AMT               PIC S9(8) COMP.
           05 CLD-WHOLD-AMT             PIC S9(8) COMP.
           05 CLD-CHUNK-TWO.
             10 CLD-FOL-UP-DAYS         PIC S9(4) COMP.
             10 CLD-PRE-OP-DAYS         PIC S9(4) COMP.
             10 CLD-POST-OP-DAYS        PIC S9(4) COMP.
             10 CLD-SVC-CD-NBR          PIC S9(4) COMP.
             10 CLD-ADJ-HR-MIN          PIC S9(4) COMP.
             10 CLD-DIAG-NBR            PIC S9(1).
             10 CLD-RISK-POOL-LVL       PIC S9(1).
             10 CLD-RISK-DAYS           PIC S9(8) COMP.
           05 CLD-RISK-DOLLARS          PIC S9(8) COMP.
           05 CLD-BEN-SAV               PIC S9(8) COMP.
           05 CLD-COB-OOP-AMT           PIC S9(8) COMP.
           05 CLD-CHUNK-THREE.
             10 CLD-POS-IND             PIC X(1).
           05 FILLER                    PIC X(1).
           05 CLD-CHUNK-FOUR.
             10 CLD-HOURS               PIC S9(4) COMP.
             10 CLD-MINUTES             PIC S9(4) COMP.
             10 CLD-FAM-DED-DESC        PIC X(1).
             10 FILLER                  PIC X(1).
             10 CLD-POS-GRP-CD          PIC X(2).
             10 CLD-RPT-GROUP           PIC X(9).
             10 CLD-RPT-BEN-CD          PIC X(9).
             10 CLD-RMK-CD-1            PIC X(4).
             10 CLD-RMK-CD-2            PIC X(4).
             10 CLD-RMK-CD-3            PIC X(4).
             10 CLD-RMK-CD-4            PIC X(4).
             10 CLD-RMK-CD-5            PIC X(4).
             10 CLD-GROUP               PIC X(9).
             10 CLD-BEN-CD              PIC X(9).
             10 CLD-TIER                PIC X(1).
             10 CLD-TOC                 PIC X(1).
             10 CLD-CAUSE-ID            PIC X(1).
             10 CLD-POS                 PIC X(2).
             10 CLD-TOS                 PIC X(3).
             10 CLD-SVC-TYPE            PIC X(1).
             10 CLD-SERVICE-CLS         PIC X(2).
             10 CLD-DESC                PIC X(6).
             10 CLD-SCH-IND             PIC X(1).
             10 CLD-HAZ-COND            PIC X(1).
             10 CLD-SPCL-PROC-ALL       PIC X(6).
             10 CLD-DISP-CD             PIC X(1).
             10 CLD-PROC-CD             PIC X(5).
             10 CLD-MOD                 PIC X(4).
             10 CLD-ASSOC-PROC          PIC X(5).
             10 CLD-PRC-TYPE-1          PIC X(2).
             10 CLD-PRC-TYPE-2          PIC X(2).
             10 CLD-PRC-TYPE-3          PIC X(2).
             10 CLD-PRC-TYPE-4          PIC X(2).
             10 CLD-PRC-TYPE-5          PIC X(2).
           05 CLD-ON-LMP-ACC-DT         PIC S9(8) COMP.
           05 CLD-CHUNK-SIX.
             10 CLD-ON-LMP-ACC-CD       PIC X(1).
             10 CLD-DIAGNOSIS           PIC X(5).
           05 FILLER                    PIC X(2).
           05 CLD-CHUNK-SEVEN.
             10 CLD-PAYEE-CD            PIC X(1).
             10 CLD-OVR-CD              PIC X(2).
             10 CLD-NON-DUPE            PIC X(1).
             10 CLD-FOLLOW-UPCARE       PIC X(1).
             10 CLD-OCL-MED-CONS        PIC X(1).
             10 CLD-OCL-MED-PD          PIC X(1).
             10 CLD-DIAG-GRP-CD         PIC X(2).
             10 CLD-PRICE-CAT           PIC X(3).
             10 CLD-PRICE-TYPE          PIC X(1).
             10 CLD-LINE-CONT-PRVID-NO  PIC X(10).
             10 CLD-LINE-CONT-NTWK-NO   PIC X(3).
             10 CLD-LINE-CONT-REG-NO    PIC X(3).
             10 CLD-LINE-PRV-GRP-NO     PIC X(4).
             10 CLD-PROV-SPEC-CD        PIC X(2).
             10 CLD-LINE-PRV-ID-NBR     PIC X(10).
             10 CLD-LINE-PRV-SPEC       PIC X(2).
             10 CLD-PCP-PRV-ID-NBR      PIC X(10).
             10 CLD-PCP-NTWK-NBR        PIC X(3).
             10 CLD-PCP-REG-NBR         PIC X(3).
             10 CLD-PCP-PRV-GRP-NBR     PIC X(4).
             10 CLD-RISK-PRV-ID-NBR     PIC X(10).
             10 CLD-RISK-NTWK-NBR       PIC X(3).
             10 CLD-RISK-REG-NBR        PIC X(3).
             10 CLD-RISK-PRV-GRP-NBR    PIC X(4).
             10 CLD-RISK-POOL-NBR       PIC X(8).
             10 CLD-LINE-CNTPRV-ID-EXT  PIC X(5).
             10 CLD-LINE-CNTPRV-LCL-ID  PIC X(1).
             10 CLD-PRV-OF-SVC-ID-EXT   PIC X(5).
             10 CLD-PRV-OF-SVC-LOCL-ID  PIC X(1).
             10 CLD-PCP-PRV-ID-EXT      PIC X(5).
             10 CLD-PCP-PRV-LOCAL-ID    PIC X(1).
             10 CLD-CLMCHK-BYPASS       PIC X(1).
             10 CLD-CLMCHK-IND          PIC X(1).
             10 CLD-SMTSUS-IND          PIC X(1).
           05 FILLER                    PIC X(34).
           05 CLD-CHUNK-EIGHT.
             10 CLD-ITS-ORIG-PROC-CD    PIC X(5).
             10 CLD-BEN-PROCESS-TYPE    PIC X(1).
             10 CLD-PAR-CD              PIC X(1).
             10 CLD-SURG-TP-CD          PIC X(1).
             10 CLD-SUBMITTER-CODE      PIC X(1).
             10 CLD-SPEC-PROC-USED      PIC X(1).
           05 CLD-PPO-DIS-PCT           PIC S9(8) COMP.
           05 CLD-CHUNK-NINE.
             10 CLD-LETTER-IND          PIC X(1).
             10 CLD-REL-SERV-IND        PIC X(1).
             10 CLD-ALT-TBL-NBR-BASE    PIC X(6).
             10 CLD-ALT-TBL-NBR-MM      PIC X(6).
           05 CLD-ALT-TBL-PCT-BASE      PIC S9(8) COMP.
           05 CLD-ALT-TBL-PCT-MM        PIC S9(8) COMP.
           05 FILLER                    PIC X(17).
           05 CLD-CHUNK-TEN.
             10 CLD-CLM-RSK-SHR-CD      PIC X(2).
             10 CLD-SUP-IND             PIC X(1).
             10 CLD-SUPP-BYP-IND        PIC X(1).
             10 CLD-BASE-MM-TYPE-CD     PIC X(1).
           05 CLD-BASE-COV-AMT          PIC S9(8) COMP.
           05 CLD-BASE-WD-PAY           PIC S9(8) COMP.
           05 CLD-BASE-AMT              PIC S9(8) COMP.
           05 CLD-BASE-PEN-AMT          PIC S9(8) COMP.
           05 CLD-BASE-DED-AMT          PIC S9(8) COMP.
           05 CLD-COPAY-AMT-BASE        PIC S9(8) COMP.
           05 CLD-BASE-SCHED-AMT        PIC S9(8) COMP.
           05 CLD-COINS-AMT-BASE        PIC S9(8) COMP.
           05 CLD-BASE-NEW-COINS-AM1    PIC S9(8) COMP.
           05 CLD-BASE-NEW-COINS-AM2    PIC S9(8) COMP.
           05 CLD-BASE-NEW-COINS-AM3    PIC S9(8) COMP.
           05 CLD-CHUNK-ELEVEN.
             10 CLD-PD-UNDR-SERV-CD-BS  PIC S9(4) COMP.
           05 CLD-BASE-PCT              PIC S9(4) COMP.
           05 CLD-RULE-PCT-BASE         PIC S9(8) COMP.
           05 CLD-PCT-COV-BASE          PIC S9(4) COMP.
           05 CLD-CHUNK-TWELVE.
             10 CLD-BASE-SCHED-CD       PIC X(3).
             10 CLD-BASE-DED-DESC       PIC X(2).
             10 CLD-NEW-COINS-APPLY-BS  PIC X(3).
             10 CLD-NC-ACCUM-IND-BASE   PIC X(3).
             10 CLD-COPAY-APP-IND-BASE  PIC X(1).
           05 FILLER                    PIC X(10).
           05 CLD-MM-COV-AMT            PIC S9(8) COMP.
           05 CLD-MM-WD-PAY             PIC S9(8) COMP.
           05 CLD-MM-AMT                PIC S9(8) COMP.
           05 CLD-MM-PEN-AMT            PIC S9(8) COMP.
           05 CLD-MM-DED-AMT            PIC S9(8) COMP.
           05 CLD-COPAY-AMT-MM          PIC S9(8) COMP.
           05 CLD-MM-SCHED-AMT          PIC S9(8) COMP.
           05 CLD-COINS-AMT-MM          PIC S9(8) COMP.
           05 CLD-MM-NEW-COINS-AMT-1    PIC S9(8) COMP.
           05 CLD-MM-NEW-COINS-AMT-2    PIC S9(8) COMP.
           05 CLD-MM-NEW-COINS-AMT-3    PIC S9(8) COMP.
           05 CLD-CHUNK-THIRTEEN.
             10 CLD-PD-UNDR-SERV-CD-MM  PIC S9(4) COMP.
           05 CLD-MM-PCT                PIC S9(4) COMP.
           05 CLD-RULE-PCT-MM           PIC S9(8) COMP.
           05 CLD-PCT-COV-MM            PIC S9(4) COMP.
           05 CLD-CHUNK-FOURTEEN.
             10 CLD-MM-SCHED-CD         PIC X(3).
             10 CLD-MM-DED-DESC         PIC X(2).
             10 CLD-NEW-COINS-APPLY-MM  PIC X(3).
             10 CLD-NC-ACCUM-IND-MM     PIC X(3).
             10 CLD-COPAY-APP-IND-MM    PIC X(1).
           05 FILLER                    PIC X(10).
           05 CLD-SUPP-COV-AMT          PIC S9(8) COMP.
           05 CLD-SUP-WD-PAY            PIC S9(8) COMP.
           05 CLD-SUP-AMT               PIC S9(8) COMP.
           05 CLD-SUPP-PEN-AMT          PIC S9(8) COMP.
           05 CLD-ITS-UCR-AMT           PIC S9(8) COMP.
           05 CLD-CHUNK-FIFTEEN.
             10 CLD-CPT-CD              PIC X(5).
           05 FILLER                    PIC X(3).
           05 CLD-COINS-AMT-SUPP        PIC S9(8) COMP.
           05 FILLER                    PIC X(5).
           05 CLD-CHUNK-SIXTEEN.
             10 CLD-SEC-CARE-PRV-ID-EXT PIC X(5).
             10 CLD-SEC-CARE-PRV-LCL-ID PIC X(1).
             10 CLD-PCP-SEC-CARE-IND    PIC X(1).
             10 CLD-PD-UNDR-SERV-CD-SP  PIC S9(4) COMP.
           05 CLD-SUPP-PCT              PIC S9(4) COMP.
           05 CLD-RULE-PCT-SUPP         PIC S9(8) COMP.
           05 FILLER                    PIC X(4).
           05 CLD-CHUNK-SEVENTEEN.
             10 CLD-SEC-CARE-PRV-ID-NO  PIC X(10).
             10 CLD-SEC-CARE-NTWK-NO    PIC X(3).
             10 CLD-SEC-CARE-REG-NO     PIC X(3).
             10 CLD-SEC-CARE-PRVGRP-NO  PIC X(4).
           05 FILLER                    PIC X(4)
