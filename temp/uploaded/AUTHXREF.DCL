     ******************************************************************
     * DCLGEN TABLE(BCBSDB24.XX1_AUTH_XREF)                           *
     *        LIBRARY(SCOTTQ.DDLLIB(AUTHXREF))                        *
     *        ACTION(REPLACE)                                         *
     *        LANGUAGE(COBOL)                                         *
     *        STRUCTURE(HOMER)                                        *
     *        QUOTE                                                   *
     * ... IS THE DCLGEN COMMAND THAT MADE THE FOLLOWING STATEMENTS   *
     ******************************************************************
          EXEC SQL DECLARE BCBSDB24.XX1_AUTH_XREF TABLE
          ( AUTH_ID_NBR                    CHAR(12) NOT NULL,
            APPL_ID_NBR                    CHAR(3) NOT NULL,
            CO_ID_NBR                      CHAR(1) NOT NULL,
            CLM_ID_NBR                     CHAR(9) NOT NULL,
            CLM_ID_SFX                     CHAR(1) NOT NULL,
            SYS_UPDT_TS                    TIMESTAMP NOT NULL,
            SYS_ERROR_CD                   INTEGER NOT NULL,
            SQDSTCK                        CHAR(16) NOT NULL
          ) END-EXEC.
     ******************************************************************
     * COBOL DECLARATION FOR TABLE BCBSDB24.XX1_AUTH_XREF             *
     ******************************************************************
      01  HOMER.
          10 AUTH-ID-NBR          PIC X(12).
          10 APPL-ID-NBR          PIC X(3).
          10 CO-ID-NBR            PIC X(1).
          10 CLM-ID-NBR           PIC X(9).
          10 CLM-ID-SFX           PIC X(1).
          10 SYS-UPDT-TS          PIC X(26).
          10 SYS-ERROR-CD         PIC S9(9) USAGE COMP.
          10 SQDSTCK              PIC X(16).
     ******************************************************************
     * THE NUMBER OF COLUMNS DESCRIBED BY THIS DECLARATION IS 8       *
     ******************************************************************
