      ***********************************************************
      *          Cobol definition for record type:0402          *
      ***********************************************************
       01 SRECOMMS.
         02 ORIGIN                              PIC X(4).
         02 APPLMNEM                            PIC X(4).
         02 CURR_DATE                           PIC X(8).
         02 REC_TYP                             PIC X(4).
         02 CONCAT_KEY                          PIC X(16).
         02 RSRVD_DATA                          PIC S9(4)  COMP.
         02 LAST_UPDT_DATE                      PIC X(8).
         02 LAST_UPDT_TIME                      PIC X(6).
         02 COMM_TYPE                           PIC X(4).
         02 COMM_AMT                            PIC S9(13)V9(2) COMP-3.
         02 COMM_CODE                           PIC X(1).
         02 COMM_ORIDE_IND                      PIC X(1).
         02 COMM_DR_ACCT_NO                     PIC X(10).
         02 COMM_CHRG_CURR_TYPE_CODE            PIC X(1).
         02 TXBLE_CODE                          PIC X(1).
         02 TAX_RATE                            PIC S9(3)V9(4)  COMP-3.
         02 ENTRY_TYPE                          PIC X(3).
         02 CORR_PYMT_CHRG_TYPE                 PIC X(1).
         02 PRICE_CURR_CODE                     PIC X(4).
         02 ACCT_BILLG_STTS                     PIC X(1).
         02 CHRG_AMT                            PIC S9(13)V9(2) COMP-3.
         02 FILLER                              PIC X(17).
         