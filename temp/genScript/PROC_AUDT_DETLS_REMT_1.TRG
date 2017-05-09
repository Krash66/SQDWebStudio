**** NOTE: Before Use, replace 'xxxxxxxx' with
****       Schema Name or Qualifier

    DROP TRIGGER xxxxxxxx.PROC_AUDT_DETLS_REMT_1_PAD_INS;
    CREATE TRIGGER xxxxxxxx.PROC_AUDT_DETLS_REMT_1_PAD_INS
        AFTER INSERT ON xxxxxxxx.PROC_AUDT_DETLS_REMT_1_PAD_TBL
        REFERENCING NEW AS N
        FOR EACH ROW MODE DB2SQL
        VALUES DB2MQ.MQSEND
      (
            CHAR(CURRENT TIMESTAMP)
          ||','
          ||SUBSTR(USER,1,8)
          ||','
          ||'PROC_AUDT_DETLS_REMT_1DB'
          ||','
          ||'PROC_AUDT_DETLS_REMT_1_PAD_TBL'
          ||','
          ||'A'
          ||','
          ||'I'
          ||','
          ||'N.SEQUENCE_NUMBER'
          ||','
          ||'N.ORIGIN'
          ||','
          ||'N.APPLMNEM'
          ||','
          ||'N.CURR_DATE'
          ||','
          ||'N.REC_TYP'
          ||','
          ||'N.CONCAT_KEY'
          ||','
          ||'N.RSRVD_DATA'
          ||','
          ||'N.LAST_UPDT_DTTM'
          ||','
          ||'N.FUNC_RLSE_IND'
      );

    DROP TRIGGER xxxxxxxx.PROC_AUDT_DETLS_REMT_1_PAD_UPD;
    CREATE TRIGGER xxxxxxxx.PROC_AUDT_DETLS_REMT_1_PAD_UPD;
        AFTER UPDATE ON xxxxxxxx.PROC_AUDT_DETLS_REMT_1_PAD_TBL
        REFERENCING NEW AS N
        FOR EACH ROW MODE DB2SQL
        VALUES DB2MQ.MQSEND
      (
            CHAR(CURRENT TIMESTAMP)
          ||','
          ||SUBSTR(USER,1,8)
          ||','
          ||'PROC_AUDT_DETLS_REMT_1DB'
          ||','
          ||'PROC_AUDT_DETLS_REMT_1_PAD_TBL'
          ||','
          ||'A'
          ||','
          ||'U'
          ||','
          ||'N.SEQUENCE_NUMBER'
          ||','
          ||'N.ORIGIN'
          ||','
          ||'N.APPLMNEM'
          ||','
          ||'N.CURR_DATE'
          ||','
          ||'N.REC_TYP'
          ||','
          ||'N.CONCAT_KEY'
          ||','
          ||'N.RSRVD_DATA'
          ||','
          ||'N.LAST_UPDT_DTTM'
          ||','
          ||'N.FUNC_RLSE_IND'
      );

    DROP TRIGGER xxxxxxxx.PROC_AUDT_DETLS_REMT_1_PAD_DEL;
    CREATE TRIGGER xxxxxxxx.PROC_AUDT_DETLS_REMT_1_PAD_DEL
        AFTER DELETE ON xxxxxxxx.PROC_AUDT_DETLS_REMT_1_PAD_TBL
        REFERENCING OLD AS D
        FOR EACH ROW MODE DB2SQL
        VALUES DB2MQ.MQSEND
      (
            CHAR(CURRENT TIMESTAMP)
          ||','
          ||SUBSTR(USER,1,8)
          ||','
          ||'PROC_AUDT_DETLS_REMT_1DB'
          ||','
          ||'PROC_AUDT_DETLS_REMT_1_PAD_TBL'
          ||','
          ||'B'
          ||','
          ||'D'
          ||','
          ||'N.SEQUENCE_NUMBER'
          ||','
          ||'N.ORIGIN'
          ||','
          ||'N.APPLMNEM'
          ||','
          ||'N.CURR_DATE'
          ||','
          ||'N.REC_TYP'
          ||','
          ||'N.CONCAT_KEY'
          ||','
          ||'N.RSRVD_DATA'
          ||','
          ||'N.LAST_UPDT_DTTM'
          ||','
          ||'N.FUNC_RLSE_IND'
      );

