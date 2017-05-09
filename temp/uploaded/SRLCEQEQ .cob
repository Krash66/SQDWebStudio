           05  ES-SRLCEQEQ.                                             00000010
               08  ES-BR-NO        PIC X(4).                            00000020
               08  ES-CUST-NO      PIC 9(5).                            00000030
               08  ES-LOCN-ID      PIC 9(2).                            00000040
               08  ES-RSRVD-DATA   PIC S9(4)            COMP.           00000050
               08  ES-LAST-UPDT-DATE                                    00000060
                                   PIC 9(8).                            00000070
               08  ES-LAST-UPDT-TIME                                    00000080
                                   PIC 9(6).                            00000090
               08  ES-KFLDES.                                           00000100
                 11  ES-CURR-CODE.                                      00000110
                   14  ES-ISO-CNTRY-CODE                                00000120
                                   PIC X(2).                            00000130
                   14  FILLER      PIC X(2).                            00000140
                 11  ES-CURR-CODE-SQD REDEFINES ES-CURR-CODE PIC X(4)   00000141                   
                 11  ES-SEQ-NO     PIC 9(2).                            00000150
               08  ES-CONT-TYPE-APPLB-IND.                              00000160
                 11  ES-FX-TYPE-IND                                     00000170
                                   PIC X.                               00000180
                 11  ES-TDT-TYPE-IND                                    00000190
                                   PIC X.                               00000200
                 11  ES-TDF-TYPE-IND                                    00000210
                                   PIC X.                               00000220
                 11  ES-CDT-TYPE-IND                                    00000230
                                   PIC X.                               00000240
                 11  ES-CDF-TYPE-IND                                    00000250
                                   PIC X.                               00000260
                 11  ES-NGI-TYPE-IND                                    00000270
                                   PIC X.                               00000280
                 11  ES-NGP-TYPE-IND                                    00000290
                                   PIC X.                               00000300
                 11  ES-NGS-TYPE-IND                                    00000310
                                   PIC X.                               00000320
                 11  ES-LOAN-CORR-BANK-IND                              00000330
                                   PIC X.                               00000340
                 11  ES-PYMT-CORR-BANK-IND                              00000350
                                   PIC X.                               00000360
                 11  ES-CORR-CLRNG-CEN-CODE                             00000370
                                   PIC X(5).                            00000380
                 11  ES-PYMT-CORR-IND                                   00000390
                                   PIC X.                               00000400
                 11  ES-RECPT-CORR-IND                                  00000410
                                   PIC X.                               00000420
                 11  ES-XBS-TYPE-IND                                    00000430
                                   PIC X.                               00000440
                 11  ES-PYMT-CORR-FXB-IND                               00000450
                                   PIC X.                               00000460
               08  ES-UPDTD-CORR-DETS-RPTD-IND                          00000470
                                   PIC X.                               00000480
               08  ES-STD-USUAL-CODE                                    00000490
                                   PIC X.                               00000500
               08  ES-STD-USUAL-START-DATE                              00000510
                                   PIC 9(8).                            00000520
               08  ES-STD-USUAL-END-DATE                                00000530
                                   PIC 9(8).                            00000540
               08  ES-REF-ACCT     PIC X(12).                           00000550
               08  ES-INTER-BANK   PIC 9(7).                            00000560
               08  ES-STD-ACCT     PIC 9(8).                            00000570
               08  ES-STD-ACCT-PROD-CODE                                00000580
                                   PIC X(2).                            00000590
               08  ES-RIB-CHECK-DGITS                                   00000600
                                   PIC 9(2).                            00000610
               08  ES-UPDTD-BY-USER-ID                                  00000620
                                   PIC X(9).                            00000630
