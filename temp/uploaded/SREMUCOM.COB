      ***********************************************************
      *    Cobol definition for record type:0902                *
      ***********************************************************
       01 SREMUCOM.
         02 ORIGIN                              PIC X(4).
         02 APP-MNEM                            PIC X(4).
         02 SYS-DATE                            PIC X(8).
         02 REC-TYPE                            PIC X(4).
         02 CONC-KEY                            PIC X(19).
         02 RSRVD-DATA                          PIC S9(4) COMP.
         02 LAST-UPDT-DATE                      PIC X(8).
         02 LAST-UPDT-TIME                      PIC X(6).
******** 02 KFLDUP                              PIC X(4).
         02 COMM-AMT                            PIC S9(13)V9(2) COMP-3.
         02 COMM-CODE                           PIC X(1).
         02 COMM-ORIDE-IND                      PIC X(1).
         02 COMM-DR-ACCT-NO                     PIC 9(10).
         02 COMM-CHRG-CURR-TYPE-CODE            PIC X(1).
         02 TXBLE-CODE                          PIC X(1).
         02 TAX-RATE                            PIC S9(3)V9(4)  COMP-3.
         02 ENTRY-TYPE                          PIC X(3).
         02 CORR-PYMT-CHRG-TYPE                 PIC X(1).
         02 PRICE-CURR-CODE                     PIC X(4).
         02 ACCT-BILLG-STTS                     PIC X(1).
         02 CHRG-AMT                            PIC S9(13)V9(2) COMP-3.
         02 FILLER                              PIC X(17).
