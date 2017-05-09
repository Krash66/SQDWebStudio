           05  EQ-SNAMADDR.                                             00000010
               08  EQ-RSRVD-DATA   PIC S9(4)            COMP.           00000020
               08  EQ-LAST-UPDT-DATE                                    00000030
                                   PIC 9(8).                            00000040
               08  EQ-LAST-UPDT-TIME                                    00000050
                                   PIC 9(6).                            00000060
               08  EQ-KFLDEQ.                                           00000070
                 11  EQ-BR-NO      PIC X(4).                            00000080
                 11  EQ-CUST-NO    PIC 9(5).                            00000090
                 11  EQ-LOCN-ID    PIC 9(2).                            00000100
               08  EQ-NA.                                               00000110
                 11  EQ-ADDR-NAME  PIC X(34).                           00000120
                 11  EQ-ADDR-LINE-1                                     00000130
                                   PIC X(32).                           00000140
                 11  EQ-ADDR-LINE-2                                     00000150
                                   PIC X(32).                           00000160
                 11  EQ-ADDR-LINE-3                                     00000170
                                   PIC X(32).                           00000180
               08  EQ-GIRO-NO      PIC X(13).                           00000190
               08  EQ-KOREN-GIRO-GROUP                                  00000200
                            REDEFINES EQ-GIRO-NO.                       00000210
                 11  FILLER        PIC X(6).                            00000220
                 11  EQ-KOREN-GIRO-NO                                   00000230
                                   PIC X(7).                            00000240
               08  EQ-TEST-KEY-CODE                                     00000250
                                   PIC X.                               00000260
               08  EQ-LANG-CODE    PIC X(2).                            00000270
               08  EQ-ISO-CNTRY-CODE-DOM                                00000280
                                   PIC X(2).                            00000290
               08  EQ-DLTN-IND     PIC X.                               00000300
               08  EQ-BANK-SORT-CODE                                    00000310
                                   PIC X(10) JUST RIGHT.                00000320
               08  EQ-BANK-SORT-CODE-FRNCH                              00000330
                            REDEFINES EQ-BANK-SORT-CODE.                00000340
                 11  EQ-ETABL-CODE PIC X(5).                            00000350
                 11  EQ-GUICH-CODE PIC X(5).                            00000360
               08  EQ-BANK-SORT-CODE-SPNSH                              00000370
                            REDEFINES EQ-BANK-SORT-CODE.                00000380
                 11  FILLER        PIC X(2).                            00000390
                 11  EQ-SPNSH-BANK-SORT-CODE-PRFX                       00000400
                                   PIC 9(4).                            00000410
                 11  EQ-SPNSH-BANK-SORT-CODE-LOCN                       00000420
                                   PIC 9(4).                            00000430
               08  EQ-BANK-SORT-CODE-JPNSE                              00000440
                            REDEFINES EQ-BANK-SORT-CODE.                00000450
                 11  EQ-ZERO-VALUE-6                                    00000460
                                   PIC 9(6).                            00000470
                 11  EQ-JPNSE-BANK-SORT-CODE-LOCN                       00000480
                                   PIC 9(4).                            00000490
               08  EQ-BANK-SORT-CODE-FED                                00000500
                            REDEFINES EQ-BANK-SORT-CODE.                00000510
                 11  FILLER        PIC X.                               00000520
                 11  EQ-FED-WIRE-ID                                     00000530
                                   PIC 9(9).                            00000540
               08  EQ-BANK-SORT-CODE-BRZLN                              00000550
                            REDEFINES EQ-BANK-SORT-CODE.                00000560
                 11  EQ-SBACN-CLRNG-ID.                                 00000570
                   14  EQ-SBACN-CLRNG-NO                                00000580
                                   PIC 9(5).                            00000590
                   14  EQ-BRZLN-CITY-ID                                 00000600
                                   PIC 9(4).                            00000610
                 11  FILLER        PIC X.                               00000620
               08  EQ-BANK-CODE    PIC X.                               00000630
               08  EQ-TT-CHRG-CODE PIC X.                               00000640
               08  EQ-EFT-KEY      PIC X(4).                            00000650
               08  EQ-HOL-CODE.                                         00000660
                 11  EQ-ISO-CNTRY-CODE                                  00000670
                                   PIC X(2).                            00000680
                 11  FILLER        PIC X.                               00000690
                 11  EQ-ISO-RGN-CODE                                    00000700
                                   PIC X(2).                            00000710
               08  EQ-CHIPS-ID     PIC 9(6).                            00000720
               08  EQ-CHAPS-ID     PIC 9(6).                            00000730
               08  EQ-ADDR-NAME-FIRST-DLIM                              00000740
                                   PIC S9(3)            COMP-3.         00000750
               08  EQ-ADDR-NAME-LAST-DLIM                               00000760
                                   PIC S9(3)            COMP-3.         00000770
               08  EQ-ADDR-NAME-SORT-FLD                                00000780
                                   PIC X(20).                           00000790
               08  EQ-A90-IND      PIC X.                               00000800
               08  EQ-LOCN-EXIST-IND                                    00000810
                                   PIC X.                               00000820
               08  EQ-GMT-STD-DEVN PIC S9(2)V9(2)       COMP-3.         00000830
               08  EQ-AGENTS-CLRNG-CODE                                 00000840
                                   PIC X(4).                            00000850
               08  EQ-AID-CODE     PIC 9(6).                            00000860
               08  FILLER          PIC X(2).                            00000870
