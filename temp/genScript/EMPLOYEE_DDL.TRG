**** NOTE: Before Use, replace 'xxxxxxxx' with
****       Schema Name or Qualifier

    DROP TRIGGER xxxxxxxx.EMPLOYEE_DDL_PAD_INS;
    CREATE TRIGGER xxxxxxxx.EMPLOYEE_DDL_PAD_INS
        AFTER INSERT ON xxxxxxxx.EMPLOYEE_DDL_PAD_TBL
        REFERENCING NEW AS N
        FOR EACH ROW MODE DB2SQL
        VALUES DB2MQ.MQSEND
      (
            CHAR(CURRENT TIMESTAMP)
          ||','
          ||SUBSTR(USER,1,8)
          ||','
          ||'EMPLOYEE_DDLDB'
          ||','
          ||'EMPLOYEE_DDL_PAD_TBL'
          ||','
          ||'A'
          ||','
          ||'I'
          ||','
          ||'N.EMPNO'
          ||','
          ||'N.EMPL_FIRST'
          ||','
          ||'N.EMPL_MID'
          ||','
          ||'N.EMPL_LAST'
          ||','
          ||'N.EMPL_DEPT'
          ||','
          ||'N.EMPL_PHONE'
          ||','
          ||'N.EMPL_HIREDT'
          ||','
          ||'N.EMPL_JOB'
          ||','
          ||'N.EMPL_EDLEVEL'
          ||','
          ||'N.EMPL_SEX'
          ||','
          ||'N.EMPL_DOB'
          ||','
          ||'N.EMPL_SALARY'
          ||','
          ||'N.EMPL_BONUS'
          ||','
          ||'N.EMPL_COMM'
          ||','
          ||'N.EMPED'
          ||','
          ||'N.PFK_DEPTNO'
          ||','
          ||'N.PFK_COMPNAME'
      );

    DROP TRIGGER xxxxxxxx.EMPLOYEE_DDL_PAD_UPD;
    CREATE TRIGGER xxxxxxxx.EMPLOYEE_DDL_PAD_UPD;
        AFTER UPDATE ON xxxxxxxx.EMPLOYEE_DDL_PAD_TBL
        REFERENCING NEW AS N
        FOR EACH ROW MODE DB2SQL
        VALUES DB2MQ.MQSEND
      (
            CHAR(CURRENT TIMESTAMP)
          ||','
          ||SUBSTR(USER,1,8)
          ||','
          ||'EMPLOYEE_DDLDB'
          ||','
          ||'EMPLOYEE_DDL_PAD_TBL'
          ||','
          ||'A'
          ||','
          ||'U'
          ||','
          ||'N.EMPNO'
          ||','
          ||'N.EMPL_FIRST'
          ||','
          ||'N.EMPL_MID'
          ||','
          ||'N.EMPL_LAST'
          ||','
          ||'N.EMPL_DEPT'
          ||','
          ||'N.EMPL_PHONE'
          ||','
          ||'N.EMPL_HIREDT'
          ||','
          ||'N.EMPL_JOB'
          ||','
          ||'N.EMPL_EDLEVEL'
          ||','
          ||'N.EMPL_SEX'
          ||','
          ||'N.EMPL_DOB'
          ||','
          ||'N.EMPL_SALARY'
          ||','
          ||'N.EMPL_BONUS'
          ||','
          ||'N.EMPL_COMM'
          ||','
          ||'N.EMPED'
          ||','
          ||'N.PFK_DEPTNO'
          ||','
          ||'N.PFK_COMPNAME'
      );

    DROP TRIGGER xxxxxxxx.EMPLOYEE_DDL_PAD_DEL;
    CREATE TRIGGER xxxxxxxx.EMPLOYEE_DDL_PAD_DEL
        AFTER DELETE ON xxxxxxxx.EMPLOYEE_DDL_PAD_TBL
        REFERENCING OLD AS D
        FOR EACH ROW MODE DB2SQL
        VALUES DB2MQ.MQSEND
      (
            CHAR(CURRENT TIMESTAMP)
          ||','
          ||SUBSTR(USER,1,8)
          ||','
          ||'EMPLOYEE_DDLDB'
          ||','
          ||'EMPLOYEE_DDL_PAD_TBL'
          ||','
          ||'B'
          ||','
          ||'D'
          ||','
          ||'N.EMPNO'
          ||','
          ||'N.EMPL_FIRST'
          ||','
          ||'N.EMPL_MID'
          ||','
          ||'N.EMPL_LAST'
          ||','
          ||'N.EMPL_DEPT'
          ||','
          ||'N.EMPL_PHONE'
          ||','
          ||'N.EMPL_HIREDT'
          ||','
          ||'N.EMPL_JOB'
          ||','
          ||'N.EMPL_EDLEVEL'
          ||','
          ||'N.EMPL_SEX'
          ||','
          ||'N.EMPL_DOB'
          ||','
          ||'N.EMPL_SALARY'
          ||','
          ||'N.EMPL_BONUS'
          ||','
          ||'N.EMPL_COMM'
          ||','
          ||'N.EMPED'
          ||','
          ||'N.PFK_DEPTNO'
          ||','
          ||'N.PFK_COMPNAME'
      );

