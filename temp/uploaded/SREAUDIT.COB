      ***********************************************************
      *          Cobol definition for record type:0202          *
      ***********************************************************
       01 SREAUDIT.
           02 ORIGIN                            PIC X(4).
           02 APPLMNEM                          PIC X(4).
           02 CURR_DATE                         PIC X(8).
           02 REC_TYP                           PIC X(4).
           02 CONCAT_KEY                        PIC X(14).
           02 RSRVD_DATA                        PIC S9(4) COMP.
           02 LAST_UPDT_DATE                    PIC X(8).
           02 LAST_UPDT_TIME                    PIC X(6).
           02 FUNC_CODE                         PIC X(2).
           02 FUNC_OPID                         PIC X(9).
           02 FUNC_RLSE_IND                     PIC X(1).
           02 FILLER                            PIC X(12)
