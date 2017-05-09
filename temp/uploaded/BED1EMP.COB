      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      *    COPYBOOK: P1ON.DT.STAR.COPYLIB(CS2MBR1C)                   *
      * FOR SEGMENT: BED1EMP                                          *
      * IN DATABASE: PCBEDPA0                                         *
      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
       01 CS2MBR1C-STRUCTURE-DATA-ITEM.
         05 EMP-EMP-ID                  PIC X(13).
         05 EMP-REL-CD                  PIC X(2).
         05 EMP-SEX                     PIC X(1).
         05 EMP-DOB                     PIC S9(8) COMP.
         05 EMP-DIFF-ORIG-DT            PIC X(1).
         05 EMP-PRE-EXS                 PIC X(1).
         05 EMP-FNAME                   PIC X(10).
         05 EMP-SS-NBR                  PIC X(10).
         05 EMP-LNAME                   PIC X(20).
         05 EMP-SUB-XREF                PIC X(13).
         05 EMP-CENT-IND                PIC X(1).
         05 EMP-OI-VERIF-DT1            PIC S9(8) COMP.
         05 FILLER                      PIC X(1).
         05 EMP-OI-IND1                 PIC X(1).
         05 FILLER                      PIC X(2).
         05 EMP-OI-EFF-DT1              PIC S9(8) COMP.
         05 EMP-OI-CANC-DT1             PIC S9(8) COMP.
         05 EMP-DUAL-ID1                PIC X(13).
         05 FILLER                      PIC X(3).
         05 EMP-OI-VERIF-DT2            PIC S9(8) COMP.
         05 FILLER                      PIC X(1).
         05 EMP-OI-IND2                 PIC X(1).
         05 FILLER                      PIC X(2).
         05 EMP-OI-EFF-DT2              PIC S9(8) COMP.
         05 EMP-OI-CANC-DT2             PIC S9(8) COMP.
         05 EMP-DUAL-ID2                PIC X(13).
         05 FILLER                      PIC X(3).
         05 EMP-OI-VERIF-DT3            PIC S9(8) COMP.
         05 FILLER                      PIC X(1).
         05 EMP-OI-IND3                 PIC X(1).
         05 FILLER                      PIC X(2).
         05 EMP-OI-EFF-DT3              PIC S9(8) COMP.
         05 EMP-OI-CANC-DT3             PIC S9(8) COMP.
         05 EMP-DUAL-ID3                PIC X(13).
         05 FILLER                      PIC X(3).
         05 EMP-OI-VERIF-DT4            PIC S9(8) COMP.
         05 FILLER                      PIC X(1).
         05 EMP-OI-IND4                 PIC X(1).
         05 FILLER                      PIC X(2).
         05 EMP-OI-EFF-DT4              PIC S9(8) COMP.
         05 EMP-OI-CANC-DT4             PIC S9(8) COMP.
         05 EMP-DUAL-ID4                PIC X(13).
         05 FILLER                      PIC X(3).
         05 EMP-OI-VERIF-DT5            PIC S9(8) COMP.
         05 FILLER                      PIC X(1).
         05 EMP-OI-IND5                 PIC X(1).
         05 FILLER                      PIC X(2).
         05 EMP-OI-EFF-DT5              PIC S9(8) COMP.
         05 EMP-OI-CANC-DT5             PIC S9(8) COMP.
         05 EMP-DUAL-ID5                PIC X(13).
         05 FILLER                      PIC X(3).
         05 EMP-OI-VERIF-DT6            PIC S9(8) COMP.
         05 FILLER                      PIC X(1).
         05 EMP-OI-IND6                 PIC X(1).
         05 FILLER                      PIC X(2).
         05 EMP-OI-EFF-DT6              PIC S9(8) COMP.
         05 EMP-OI-CANC-DT6             PIC S9(8) COMP.
         05 EMP-DUAL-ID6                PIC X(13).
         05 FILLER                      PIC X(3).
         05 EMP-IND-OI-ID1              PIC X(8).
         05 EMP-IND-OI-ID-DT1           PIC S9(8) COMP.
         05 EMP-IND-OI-ID2              PIC X(8).
         05 EMP-IND-OI-ID-DT2           PIC S9(8) COMP.
         05 EMP-IND-OI-ID3              PIC X(8).
         05 EMP-IND-OI-ID-DT3           PIC S9(8) COMP.
         05 EMP-IND-OI-ID4              PIC X(8).
         05 EMP-IND-OI-ID-DT4           PIC S9(8) COMP.
         05 EMP-IND-OI-ID5              PIC X(8).
         05 EMP-IND-OI-ID-DT5           PIC S9(8) COMP.
         05 EMP-IND-OI-ID6              PIC X(8).
         05 EMP-IND-OI-ID-DT6           PIC S9(8) COMP.
         05 FILLER                      PIC X(68).
         05 EMP-OCL3-COMMENT-DT         PIC S9(8) COMP.
         05 EMP-OCL3-COMMENT            PIC X(45).
         05 FILLER                      PIC X(3).
         05 EMP-MED-A-ELIG-DT           PIC S9(8) COMP.
         05 EMP-MED-B-ELIG-DT           PIC S9(8) COMP.
         05 EMP-DISAB-DT                PIC S9(8) COMP.
         05 EMP-DISAB-DIAG              PIC S9(4) COMP.
         05 EMP-NEXT-COV-ID             PIC X(13).
         05 EMP-NEXT-COV-IND            PIC X(1).
         05 EMP-MICRO-DT                PIC S9(8) COMP.
         05 EMP-CO-ORG-CD               PIC X(5).
         05 FILLER                      PIC X(23).
         05 EMP-ELIG-EFF-DT-MED1        PIC S9(8) COMP.
         05 EMP-ELIG-CANC-DT-MED1       PIC S9(8) COMP.
         05 EMP-ELIG-EFF-DT-DNT1        PIC S9(8) COMP.
         05 EMP-ELIG-CANC-DT-DNT1       PIC S9(8) COMP.
         05 EMP-CANC-CD-MED1            PIC X(1).
         05 EMP-CANC-CD-DNT1            PIC X(1).
         05 FILLER                      PIC X(2).
         05 EMP-ELIG-EFF-DT-MED2        PIC S9(8) COMP.
         05 EMP-ELIG-CANC-DT-MED2       PIC S9(8) COMP.
         05 EMP-ELIG-EFF-DT-DNT2        PIC S9(8) COMP.
         05 EMP-ELIG-CANC-DT-DNT2       PIC S9(8) COMP.
         05 EMP-CANC-CD-MED2            PIC X(1).
         05 EMP-CANC-CD-DNT2            PIC X(1).
         05 FILLER                      PIC X(2).
         05 EMP-ELIG-EFF-DT-MED3        PIC S9(8) COMP.
         05 EMP-ELIG-CANC-DT-MED3       PIC S9(8) COMP.
         05 EMP-ELIG-EFF-DT-DNT3        PIC S9(8) COMP.
         05 EMP-ELIG-CANC-DT-DNT3       PIC S9(8) COMP.
         05 EMP-CANC-CD-MED3            PIC X(1).
         05 EMP-CANC-CD-DNT3            PIC X(1).
         05 FILLER                      PIC X(2).
         05 EMP-OCL1-NAME               PIC X(25).
         05 EMP-OCL1-ADDR               PIC X(20).
         05 EMP-OCL1-CITY               PIC X(15).
         05 EMP-OCL1-STATE              PIC X(2).
         05 EMP-OCL1-ZIP                PIC 9(9) COMP-3.
         05 EMP-OCL1-POLICY             PIC X(20).
         05 EMP-OCL1-COMMENT            PIC X(45).
         05 EMP-OCL1-EFF-DT             PIC S9(8) COMP.
         05 EMP-OCL1-CANC-DT            PIC S9(8) COMP.
         05 EMP-OCL1-USER-ID            PIC X(8).
         05 EMP-OCL1-USER-ID-DT         PIC S9(8) COMP.
         05 EMP-OCL2-POLICY             PIC X(20).
         05 EMP-OCL2-USER-ID            PIC X(8).
         05 EMP-OCL2-USER-ID-DT         PIC S9(8) COMP.
         05 EMP-OCL2-EFF-DT             PIC S9(8) COMP.
         05 EMP-OCL2-CANC-DT            PIC S9(8) COMP.
         05 EMP-OCL1-COMMENT-DT         PIC S9(8) COMP.
         05 EMP-OCL2-COMMENT-DT         PIC S9(8) COMP.
         05 EMP-OCL1-ADDR2              PIC X(15).
         05 EMP-OCL1-PHONE              PIC 9(10) COMP-3.
         05 EMP-OCL1-INS-NAME           PIC X(26).
         05 EMP-OCL2-INS-NAME           PIC X(26).
         05 EMP-OCL2-COMMENT            PIC X(45).
         05 EMP-OCL1-EMPLOYER-NAME      PIC X(20).
         05 EMP-OCL2-EMPLOYER-NAME      PIC X(20).
         05 EMP-OCL2-NAME               PIC X(25).
         05 EMP-OCL2-ADDR               PIC X(20).
         05 EMP-OCL2-ADDR2              PIC X(15).
         05 EMP-OCL2-CITY               PIC X(15).
         05 EMP-OCL2-STATE              PIC X(2).
         05 EMP-OCL2-ZIP                PIC 9(9) COMP-3.
         05 EMP-OCL2-PHONE              PIC 9(10) COMP-3.
         05 FILLER                      PIC X(34).
         05 EMP-UCI                     PIC X(1).
         05 EMP-NOTE-IND                PIC X(1).
         05 EMP-PRIOR-COV-ID            PIC X(13).
         05 EMP-PRIOR-COV-IND           PIC X(1).
         05 EMP-ALT-TRMT-IND            PIC X(1).
         05 EMP-EXCL-IND                PIC X(1).
         05 FILLER                      PIC X(6).
         05 EMP-DEP-ADDR                PIC S9(8) COMP.
         05 EMP-MED-ADDR                PIC S9(8) COMP.
         05 EMP-DNT-ADDR                PIC S9(8) COMP.
         05 FILLER                      PIC X(4).
         05 FILLER                      PIC X(8).
         05 EMP-LST-DEP-NBR             PIC S9(4) COMP.
         05 FILLER                      PIC X(2).
         05 EMP-UPD-DT                  PIC S9(8) COMP.
         05 EMP-UPD-TIME                PIC S9(8) COMP.
         05 EMP-ZIP                     PIC S9(8) COMP.
         05 EMP-ADDR                    PIC X(25).
         05 FILLER                      PIC X(4).
         05 EMP-CITY                    PIC X(16).
         05 EMP-ST                      PIC X(2).
         05 EMP-ADDR4                   PIC X(25).
         05 EMP-HRC-IND                 PIC X(1).
         05 EMP-COMMENTS                PIC X(79).
         05 EMP-PREM-PD-TO-DT           PIC S9(8) COMP.
         05 EMP-FINAL-ACC-DT            PIC S9(8) COMP.
         05 FILLER                      PIC X(10).
         05 EMP-TRAN-XREF               PIC X(13).
         05 EMP-HCFA-NBR                PIC X(13).
         05 FILLER                      PIC X(24).
         05 EMP-ELIG-UPD-DT             PIC S9(8) COMP.
         05 FILLER                      PIC X(4).
         05 EMP-EFF-DT-BEN1             PIC S9(8) COMP.
         05 EMP-DED-YR1                 PIC S9(4) COMP.
         05 EMP-RM-RT1                  PIC S9(4) COMP.
         05 EMP-DED-AMT1                PIC S9(8) COMP.
         05 EMP-PROV-SCHED1             PIC X(3).
         05 FILLER                      PIC X(1).
         05 EMP-EFF-DT-BEN2             PIC S9(8) COMP.
         05 EMP-DED-YR2                 PIC S9(4) COMP.
         05 EMP-RM-RT2                  PIC S9(4) COMP.
         05 EMP-DED-AMT2                PIC S9(8) COMP.
         05 EMP-PROV-SCHED2             PIC X(3).
         05 FILLER                      PIC X(1).
         05 EMP-EFF-DT-BEN3             PIC S9(8) COMP.
         05 EMP-DED-YR3                 PIC S9(4) COMP.
         05 EMP-RM-RT3                  PIC S9(4) COMP.
         05 EMP-DED-AMT3                PIC S9(8) COMP.
         05 EMP-PROV-SCHED3             PIC X(3).
         05 FILLER                      PIC X(1).
         05 EMP-NOT-COV-DT-FROM1        PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-TO1          PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-FROM2        PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-TO2          PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-FROM3        PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-TO3          PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-FROM4        PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-TO4          PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-FROM5        PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-TO5          PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-FROM6        PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-TO6          PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-FROM7        PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-TO7          PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-FROM8        PIC S9(8) COMP.
         05 EMP-NOT-COV-DT-TO8          PIC S9(8) COMP.
         05 EMP-COV-EFF-DT-EE1          PIC S9(8) COMP.
         05 EMP-COV-CANC-DT-EE1         PIC S9(8) COMP.
         05 EMP-COV-GROUP-EE1           PIC X(9).
         05 EMP-COV-BEN-CD-EE1          PIC X(9).
         05 EMP-COVERAGE1               PIC X(2).
         05 EMP-COV-MULT-BILL1          PIC X(5).
         05 EMP-COV-ACCUMS1             PIC X(7).
         05 EMP-FEP-COV-SOURCE1         PIC X(1).
         05 EMP-COV-CANC-CD1            PIC X(1).
         05 EMP-ACC-XREF-GRP1           PIC X(6).
         05 EMP-COV-ROUT-CD1            PIC S9(4).
         05 EMP-COV-EFF-DT-EE2          PIC S9(8) COMP.
         05 EMP-COV-CANC-DT-EE2         PIC S9(8) COMP.
         05 EMP-COV-GROUP-EE2           PIC X(9).
         05 EMP-COV-BEN-CD-EE2          PIC X(9).
         05 EMP-COVERAGE2               PIC X(2).
         05 EMP-COV-MULT-BILL2          PIC X(5).
         05 EMP-COV-ACCUMS2             PIC X(7).
         05 EMP-FEP-COV-SOURCE2         PIC X(1).
         05 EMP-COV-CANC-CD2            PIC X(1).
         05 EMP-ACC-XREF-GRP2           PIC X(6).
         05 EMP-COV-ROUT-CD2            PIC S9(4).
         05 EMP-COV-EFF-DT-EE3          PIC S9(8) COMP.
         05 EMP-COV-CANC-DT-EE3         PIC S9(8) COMP.
         05 EMP-COV-GROUP-EE3           PIC X(9).
         05 EMP-COV-BEN-CD-EE3          PIC X(9).
         05 EMP-COVERAGE3               PIC X(2).
         05 EMP-COV-MULT-BILL3          PIC X(5).
         05 EMP-COV-ACCUMS3             PIC X(7).
         05 EMP-FEP-COV-SOURCE3         PIC X(1).
         05 EMP-COV-CANC-CD3            PIC X(1).
         05 EMP-ACC-XREF-GRP3           PIC X(6).
         05 EMP-COV-ROUT-CD3            PIC S9(4).
         05 EMP-COV-EFF-DT-EE4          PIC S9(8) COMP.
         05 EMP-COV-CANC-DT-EE4         PIC S9(8) COMP.
         05 EMP-COV-GROUP-EE4           PIC X(9).
         05 EMP-COV-BEN-CD-EE4          PIC X(9).
         05 EMP-COVERAGE4               PIC X(2).
         05 EMP-COV-MULT-BILL4          PIC X(5).
         05 EMP-COV-ACCUMS4             PIC X(7).
         05 EMP-FEP-COV-SOURCE4         PIC X(1).
         05 EMP-COV-CANC-CD4            PIC X(1).
         05 EMP-ACC-XREF-GRP4           PIC X(6).
         05 EMP-COV-ROUT-CD4            PIC S9(4).
         05 EMP-COV-EFF-DT-EE5          PIC S9(8) COMP.
         05 EMP-COV-CANC-DT-EE5         PIC S9(8) COMP.
         05 EMP-COV-GROUP-EE5           PIC X(9).
         05 EMP-COV-BEN-CD-EE5          PIC X(9).
         05 EMP-COVERAGE5               PIC X(2).
         05 EMP-COV-MULT-BILL5          PIC X(5).
         05 EMP-COV-ACCUMS5             PIC X(7).
         05 EMP-FEP-COV-SOURCE5         PIC X(1).
         05 EMP-COV-CANC-CD5            PIC X(1).
         05 EMP-ACC-XREF-GRP5           PIC X(6).
         05 EMP-COV-ROUT-CD5            PIC S9(4).
         05 EMP-COV-EFF-DT-EE6          PIC S9(8) COMP.
         05 EMP-COV-CANC-DT-EE6         PIC S9(8) COMP.
         05 EMP-COV-GROUP-EE6           PIC X(9).
         05 EMP-COV-BEN-CD-EE6          PIC X(9).
         05 EMP-COVERAGE6               PIC X(2).
         05 EMP-COV-MULT-BILL6          PIC X(5).
         05 EMP-COV-ACCUMS6             PIC X(7).
         05 EMP-FEP-COV-SOURCE6         PIC X(1).
         05 EMP-COV-CANC-CD6            PIC X(1).
         05 EMP-ACC-XREF-GRP6           PIC X(6).
         05 EMP-COV-ROUT-CD6            PIC S9(4).
         05 EMP-COV-EFF-DT-EE7          PIC S9(8) COMP.
         05 EMP-COV-CANC-DT-EE7         PIC S9(8) COMP.
         05 EMP-COV-GROUP-EE7           PIC X(9).
         05 EMP-COV-BEN-CD-EE7          PIC X(9).
         05 EMP-COVERAGE7               PIC X(2).
         05 EMP-COV-MULT-BILL7          PIC X(5).
         05 EMP-COV-ACCUMS7             PIC X(7).
         05 EMP-FEP-COV-SOURCE7         PIC X(1).
         05 EMP-COV-CANC-CD7            PIC X(1).
         05 EMP-ACC-XREF-GRP7           PIC X(6).
         05 EMP-COV-ROUT-CD7            PIC S9(4).
         05 EMP-COV-EFF-DT-EE8          PIC S9(8) COMP.
         05 EMP-COV-CANC-DT-EE8         PIC S9(8) COMP.
         05 EMP-COV-GROUP-EE8           PIC X(9).
         05 EMP-COV-BEN-CD-EE8          PIC X(9).
         05 EMP-COVERAGE8               PIC X(2).
         05 EMP-COV-MULT-BILL8          PIC X(5).
         05 EMP-COV-ACCUMS8             PIC X(7).
         05 EMP-FEP-COV-SOURCE8         PIC X(1).
         05 EMP-COV-CANC-CD8            PIC X(1).
         05 EMP-ACC-XREF-GRP8           PIC X(6).
         05 EMP-COV-ROUT-CD8            PIC S9(4).
         05 EMP-COV-EFF-DT-EE9          PIC S9(8) COMP.
         05 EMP-COV-CANC-DT-EE9         PIC S9(8) COMP.
         05 EMP-COV-GROUP-EE9           PIC X(9).
         05 EMP-COV-BEN-CD-EE9          PIC X(9).
         05 EMP-COVERAGE9               PIC X(2).
         05 EMP-COV-MULT-BILL9          PIC X(5).
         05 EMP-COV-ACCUMS9             PIC X(7).
         05 EMP-FEP-COV-SOURCE9         PIC X(1).
         05 EMP-COV-CANC-CD9            PIC X(1).
         05 EMP-ACC-XREF-GRP9           PIC X(6).
         05 EMP-COV-ROUT-CD9            PIC S9(4).
         05 EMP-COV-EFF-DT-EE10         PIC S9(8) COMP.
         05 EMP-COV-CANC-DT-EE10        PIC S9(8) COMP.
         05 EMP-COV-GROUP-EE10          PIC X(9).
         05 EMP-COV-BEN-CD-EE10         PIC X(9).
         05 EMP-COVERAGE10              PIC X(2).
         05 EMP-COV-MULT-BILL10         PIC X(5).
         05 EMP-COV-ACCUMS10            PIC X(7).
         05 EMP-FEP-COV-SOURCE10        PIC X(1).
         05 EMP-COV-CANC-CD10           PIC X(1).
         05 EMP-ACC-XREF-GRP10          PIC X(6).
         05 EMP-COV-ROUT-CD10           PIC S9(4).
         05 EMP-COV-EFF-DT-EE11         PIC S9(8) COMP.
         05 EMP-COV-CANC-DT-EE11        PIC S9(8) COMP.
         05 EMP-COV-GROUP-EE11          PIC X(9).
         05 EMP-COV-BEN-CD-EE11         PIC X(9).
         05 EMP-COVERAGE11              PIC X(2).
         05 EMP-COV-MULT-BILL11         PIC X(5).
         05 EMP-COV-ACCUMS11            PIC X(7).
         05 EMP-FEP-COV-SOURCE11        PIC X(1).
         05 EMP-COV-CANC-CD11           PIC X(1).
         05 EMP-ACC-XREF-GRP11          PIC X(6).
         05 EMP-COV-ROUT-CD11           PIC S9(4).
         05 EMP-COV-EFF-DT-EE12         PIC S9(8) COMP.
         05 EMP-COV-CANC-DT-EE12        PIC S9(8) COMP.
         05 EMP-COV-GROUP-EE12          PIC X(9).
         05 EMP-COV-BEN-CD-EE12         PIC X(9).
         05 EMP-COVERAGE12              PIC X(2).
         05 EMP-COV-MULT-BILL12         PIC X(5).
         05 EMP-COV-ACCUMS12            PIC X(7).
         05 EMP-FEP-COV-SOURCE12        PIC X(1).
         05 EMP-COV-CANC-CD12           PIC X(1).
         05 EMP-ACC-XREF-GRP12          PIC X(6).
         05 EMP-COV-ROUT-CD12           PIC S9(4).
         05 EMP-COV-SP-EFF-DT-SP1       PIC S9(8) COMP.
         05 EMP-COV-SP-CANC-DT-S1       PIC S9(8) COMP.
         05 EMP-COV-SP-BEN-CD-SP1       PIC X(9).
         05 EMP-COV-SP-MULT-BILL-SP1    PIC X(5).
         05 FILLER                      PIC X(10).
         05 EMP-COV-SP-EFF-DT-DEP1      PIC S9(8) COMP.
         05 EMP-COV-SP-CANC-DT-DEP1     PIC S9(8) COMP.
         05 EMP-COV-SP-BEN-CD-DEP1      PIC X(9).
         05 EMP-COV-SP-MULT-BILL-DEP1   PIC X(5).
         05 FILLER                      PIC X(10).
         05 EMP-COV-SP-EFF-DT-SP2       PIC S9(8) COMP.
         05 EMP-COV-SP-CANC-DT-S2       PIC S9(8) COMP.
         05 EMP-COV-SP-BEN-CD-SP2       PIC X(9).
         05 EMP-COV-SP-MULT-BILL-SP2    PIC X(5).
         05 FILLER                      PIC X(10).
         05 EMP-COV-SP-EFF-DT-DEP2      PIC S9(8) COMP.
         05 EMP-COV-SP-CANC-DT-DEP2     PIC S9(8) COMP.
         05 EMP-COV-SP-BEN-CD-DEP2      PIC X(9).
         05 EMP-COV-SP-MULT-BILL-DEP2   PIC X(5).
         05 FILLER                      PIC X(10).
         05 EMP-COV-SP-EFF-DT-SP3       PIC S9(8) COMP.
         05 EMP-COV-SP-CANC-DT-S3       PIC S9(8) COMP.
         05 EMP-COV-SP-BEN-CD-SP3       PIC X(9).
         05 EMP-COV-SP-MULT-BILL-SP3    PIC X(5).
         05 FILLER                      PIC X(10).
         05 EMP-COV-SP-EFF-DT-DEP3      PIC S9(8) COMP.
         05 EMP-COV-SP-CANC-DT-DEP3     PIC S9(8) COMP.
         05 EMP-COV-SP-BEN-CD-DEP3      PIC X(9).
         05 EMP-COV-SP-MULT-BILL-DEP3   PIC X(5).
         05 FILLER                      PIC X(10).
         05 EMP-COV-SP-EFF-DT-SP4       PIC S9(8) COMP.
         05 EMP-COV-SP-CANC-DT-S4       PIC S9(8) COMP.
         05 EMP-COV-SP-BEN-CD-SP4       PIC X(9).
         05 EMP-COV-SP-MULT-BILL-SP4    PIC X(5).
         05 FILLER                      PIC X(10).
         05 EMP-COV-SP-EFF-DT-DEP4      PIC S9(8) COMP.
         05 EMP-COV-SP-CANC-DT-DEP4     PIC S9(8) COMP.
         05 EMP-COV-SP-BEN-CD-DEP4      PIC X(9).
         05 EMP-COV-SP-MULT-BILL-DEP4   PIC X(5).
         05 FILLER                      PIC X(10).
         05 EMP-COV-SP-EFF-DT-SP5       PIC S9(8) COMP.
         05 EMP-COV-SP-CANC-DT-S5       PIC S9(8) COMP.
         05 EMP-COV-SP-BEN-CD-SP5       PIC X(9).
         05 EMP-COV-SP-MULT-BILL-SP5    PIC X(5).
         05 FILLER                      PIC X(10).
         05 EMP-COV-SP-EFF-DT-DEP5      PIC S9(8) COMP.
         05 EMP-COV-SP-CANC-DT-DEP5     PIC S9(8) COMP.
         05 EMP-COV-SP-BEN-CD-DEP5      PIC X(9).
         05 EMP-COV-SP-MULT-BILL-DEP5   PIC X(5).
         05 FILLER                      PIC X(10).
         05 EMP-COV-SP-EFF-DT-SP6       PIC S9(8) COMP.
         05 EMP-COV-SP-CANC-DT-S6       PIC S9(8) COMP.
         05 EMP-COV-SP-BEN-CD-SP6       PIC X(9).
         05 EMP-COV-SP-MULT-BILL-SP6    PIC X(5).
         05 FILLER                      PIC X(10).
         05 EMP-COV-SP-EFF-DT-DEP6      PIC S9(8) COMP.
         05 EMP-COV-SP-CANC-DT-DEP6     PIC S9(8) COMP.
         05 EMP-COV-SP-BEN-CD-DEP6      PIC X(9).
         05 EMP-COV-SP-MULT-BILL-DEP6   PIC X(5).
         05 FILLER                      PIC X(10).
         05 EMP-LTAPL-IND               PIC X(1).
         05 EMP-MED-OFFLINE-IND         PIC X(1).
         05 EMP-DNT-OFFLINE-IND         PIC X(1).
         05 EMP-SUSPENSE-CD             PIC X(1).
         05 EMP-SPCL-DT-FROM1           PIC S9(8) COMP.
         05 EMP-SPCL-DT-TO1             PIC S9(8) COMP.
         05 EMP-SPCL-DT-FROM2           PIC S9(8) COMP.
         05 EMP-SPCL-DT-TO2             PIC S9(8) COMP.
         05 EMP-SPCL-DT-FROM3           PIC S9(8) COMP.
         05 EMP-SPCL-DT-TO3             PIC S9(8) COMP.
         05 EMP-SPCL-CD1                PIC X(1).
         05 EMP-SPCL-CD2                PIC X(1).
         05 EMP-SPCL-CD3                PIC X(1).
         05 EMP-NTWK-NBR                PIC X(3).
         05 FILLER                      PIC X(2).
         05 EMP-COB-LETTER1-DT          PIC S9(8) COMP.
         05 EMP-COB-LETTER2-DT          PIC S9(8) COMP.
         05 EMP-OCL3-NAME               PIC X(25).
         05 EMP-OCL3-ADDR               PIC X(20).
         05 EMP-OCL3-ZIP                PIC 9(9) COMP-3.
         05 EMP-OCL3-PHONE              PIC 9(10) COMP-3.
         05 EMP-OCL3-POLICY             PIC X(20).
         05 EMP-OCL3-EFF-DT             PIC S9(8) COMP.
         05 EMP-OCL3-CANC-DT            PIC S9(8) COMP.
         05 EMP-OCL3-USER-ID            PIC X(8).
         05 EMP-OCL3-USER-ID-DT         PIC S9(8) COMP.
         05 EMP-OCL3-ADDR2              PIC X(15).
         05 EMP-OCL3-CITY               PIC X(15).
         05 EMP-OCL3-STATE              PIC X(2).
         05 EMP-OCL3-EMPLOYER-NAME      PIC X(20).
         05 EMP-OCL3-INS-NAME           PIC X(26).
         05 EMP-OCL-LEGAL-IND           PIC X(1).
         05 FILLER                      PIC X(29)
