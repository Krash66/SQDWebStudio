--------------------------------------------------------
--           PROJECT: TestOct1
--       ENVIRONMENT: env1
--            SYSTEM: sys1
--------------------------------------------------------
JOBNAME cdceng2;
COMMIT EVERY ;
-- ------------------------------------------------------
--           Data Definition Section
-- ------------------------------------------------------

DESCRIPTION SrcCOBIMS
/+
       01 EMPLOYEE-REC.                           
          05 EMPNO        PIC X(06).              
          05 EMPL-FIRST   PIC X(12).              
          05 EMPL-MID     PIC X(01).              
          05 EMPL-LAST    PIC X(15).              
          05 EMPL-DEPT    PIC X(03).              
          05 EMPL-PHONE   PIC X(04).              
          05 EMPL-HIREDT  PIC X(10).              
          05 EMPL-JOB     PIC X(08).              
          05 EMPL-EDLEVEL PIC 9(04) COMP.         
          05 EMPL-SEX     PIC X(01).              
          05 EMPL-DOB     PIC X(10).              
          05 EMPL-SALARY  PIC S9(07)V9(02) COMP-3.
          05 EMPL-BONUS   PIC S9(07)V9(02) COMP-3.
          05 EMPL-COMM    PIC S9(07)V9(02) COMP-3.
+/
              AS employee
              FOR SEGMENT EMPLOYEE
              IN DATABASE ;

DATASTORE UnknownType
          OF DB2ZOS
          AS CDCIN
          DESCRIBED BY
                    employee
;

DESCRIPTION TgtDB2DDL
/+
CREATE TABLE EMPLOYEE
(
    EMPNO                         CHAR(6)        NOT NULL
   ,EMPL_FIRST                    CHAR(12)       NOT NULL
   ,EMPL_MID                      CHAR(1)        NOT NULL
   ,EMPL_LAST                     CHAR(15)       NOT NULL
   ,EMPL_DEPT                     CHAR(3)        NOT NULL
   ,EMPL_PHONE                    CHAR(4)        NOT NULL
   ,EMPL_HIREDT                   CHAR(10)       NOT NULL
   ,EMPL_JOB                      CHAR(8)        NOT NULL
   ,EMPL_EDLEVEL                  SMALLINT       NOT NULL
   ,EMPL_SEX                      CHAR(1)        NOT NULL
   ,EMPL_DOB                      CHAR(10)       NOT NULL
   ,EMPL_SALARY                   DECIMAL(9,2)   NOT NULL
   ,EMPL_BONUS                    DECIMAL(9,2)   NOT NULL
   ,EMPL_COMM                     DECIMAL(9,2)   NOT NULL
   ,EMPED                         CHAR(2)        NOT NULL
   ,PFK_DEPTNO                    CHAR(3)        NOT NULL
   ,PFK_COMPNAME                  CHAR(10)       NOT NULL
);
+/
              AS EMPLOYEE_DDL
DESCRIPTION SrcDB2DDL
/+
CREATE TABLE EMPLOYEE
(
    EMPNO                         CHAR(6)        NOT NULL
   ,EMPL_FIRST                    CHAR(12)       NOT NULL
   ,EMPL_MID                      CHAR(1)        NOT NULL
   ,EMPL_LAST                     CHAR(15)       NOT NULL
   ,EMPL_DEPT                     CHAR(3)        NOT NULL
   ,EMPL_PHONE                    CHAR(4)        NOT NULL
   ,EMPL_HIREDT                   CHAR(10)       NOT NULL
   ,EMPL_JOB                      CHAR(8)        NOT NULL
   ,EMPL_EDLEVEL                  SMALLINT       NOT NULL
   ,EMPL_SEX                      CHAR(1)        NOT NULL
   ,EMPL_DOB                      CHAR(10)       NOT NULL
   ,EMPL_SALARY                   DECIMAL(9,2)   NOT NULL
   ,EMPL_BONUS                    DECIMAL(9,2)   NOT NULL
   ,EMPL_COMM                     DECIMAL(9,2)   NOT NULL
   ,EMPED                         CHAR(2)        NOT NULL
   ,PFK_DEPTNO                    CHAR(3)        NOT NULL
   ,PFK_COMPNAME                  CHAR(10)       NOT NULL
);
+/
              AS EMPLOYEE_DDL
;
DATASTORE tblName
          OF Cassandra
          AS cassout
          DESCRIBED BY
                    EMPLOYEE_DDL
          FOR Change
;

-- ------------------------------------------------------
--           Field Specification Section
-- ------------------------------------------------------

DECLARE var1 23 2;

INITIALIZE CDCIN.employee.EMPL-BONUS &nbsp;;

-- ------------------------------------------------------
--           Procedure Section
-- ------------------------------------------------------

CREATE PROC mproc1 AS SELECT
{
     cassout  =  CDCIN
     EMPLOYEE_DDL  =  employee
     EMPNO  =  EMPLOYEE-REC
     EMPL_FIRST  =  EMPNO
     EMPL_MID  =  EMPL-FIRST
     EMPL_LAST  =  EMPL-MID
     EMPL_DEPT  =  EMPL-LAST
     EMPL_PHONE  =  EMPL-DEPT
     EMPL_HIREDT  =  EMPL-PHONE
     EMPL_JOB  =  EMPL-HIREDT
     EMPL_EDLEVEL  =  EMPL-JOB
     EMPL_SEX  =  EMPL-EDLEVEL
     EMPL_DOB  =  EMPL-SEX
     EMPL_SALARY  =  EMPL-DOB
     EMPL_BONUS  =  EMPL-SALARY
     EMPL_COMM  =  EMPL-BONUS
     EMPED  =  EMPL-COMM
     PFK_DEPTNO  =  PFK_DEPTNO
     PFK_COMPNAME  =  PFK_COMPNAME
}
FROM CDCIN;


-- ------------------------------------------------------
--           Main Section
-- ------------------------------------------------------

PROCESS INTO
       cassout
SELECT
{
}
FROM CDCIN;
