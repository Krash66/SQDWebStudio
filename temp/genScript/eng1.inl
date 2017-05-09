--------------------------------------------------------
--           PROJECT: test
--       ENVIRONMENT: env1
--            SYSTEM: sys1
--------------------------------------------------------
JOBNAME eng1;
COMMIT EVERY ;

RDBMS ODBC ;

-- ------------------------------------------------------
--           Data Definition Section
-- ------------------------------------------------------

DESCRIPTION SrcCOBIMS
/+
       01 COMPANY-REC.              
          05 COMPNAME     PIC X(10).
          05 COMP-ADDRESS PIC X(20).
          05 COMP-CITY    PIC X(10).
          05 COMP-STATE   PIC X(02).
          05 COMP-ZIP     PIC X(05).
+/
              AS company
              FOR SEGMENT COMPANY
              IN DATABASE ;

DESCRIPTION SrcCOBIMS
/+
       01 DEPTMENT-REC.             
          05 DEPTNO       PIC X(03).
          05 DEPT-NAME    PIC X(29).
          05 DEPT-MGRNO   PIC X(06).
          05 DEPT-ADMRDEP PIC X(03).
          05 DEPT-LOC     PIC X(16).

+/
              AS deptment
              FOR SEGMENT DEPTMENT
              IN DATABASE ;

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

DESCRIPTION SrcCOBIMS
/+
       01 VENDOR-REC.               
          05 VENDID       PIC X(03).
          05 VEND-NAME    PIC X(10).
          05 VEND-COMPANY PIC X(10).
          05 VEND-ADDRESS PIC X(20).
          05 VEND-CITY    PIC X(10).
          05 VEND-STATE   PIC X(02).
          05 VEND-ZIP     PIC X(05).
+/
              AS vendor
              FOR SEGMENT VENDOR
              IN DATABASE ;

DATASTORE UnknownType
          OF IMSCDC
          AS CDCIN
          DESCRIBED BY
                    company
                   ,deptment
                   ,employee
                   ,vendor
;

DESCRIPTION TgtDB2DDL
/+
CREATE TABLE COMPDB2
(
    COMPNAME                      CHAR(10)       NOT NULL
   ,COMP_ADDRESS                  CHAR(20)       NOT NULL
   ,COMP_CITY                     CHAR(10)       NOT NULL
);
+/
              AS COMPDB2
;
DATASTORE company
          OF DB2LUW
          AS Tcomp
          DESCRIBED BY
                    COMPDB2
          FOR Change
;

DESCRIPTION TgtDB2DDL
/+
CREATE TABLE DEPTDB2
(
    DEPTNO                        CHAR(3)        NOT NULL
   ,DEPT_NAME                     CHAR(29)       NOT NULL
   ,DEPT_MGRNO                    CHAR(6)        NOT NULL
   ,DEPT_ADMRDEP                  CHAR(3)        NOT NULL
   ,DEPT_LOC                      CHAR(16)       NOT NULL
   ,COMPNAME                      CHAR(10)       NOT NULL
);
+/
              AS DEPTDB2
;
DATASTORE department
          OF DB2LUW
          AS Tdept
          DESCRIBED BY
                    DEPTDB2
          FOR Change
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
   ,PFK_DEPTNO                    CHAR(3)        NOT NULL
   ,PFK_COMPNAME                  CHAR(10)       NOT NULL
);
+/
              AS EMPLOYEEddl
;
DATASTORE employee
          OF DB2LUW
          AS Templ
          DESCRIBED BY
                    EMPLOYEEddl
          FOR Change
;

DESCRIPTION TgtDB2DDL
/+
CREATE TABLE VENDOR
(
    VENDID                        CHAR(3)        NOT NULL
   ,VEND_NAME                     CHAR(10)       NOT NULL
   ,VEND_COMPANY                  CHAR(10)       NOT NULL
   ,VEND_ADDRESS                  CHAR(20)       NOT NULL
   ,VEND_CITY                     CHAR(10)       NOT NULL
   ,VEND_STATE                    CHAR(2)        NOT NULL
   ,VEND_ZIP                      CHAR(5)        NOT NULL
   ,VENDZIP                       CHAR(5)        NOT NULL
   ,PFK_COMPNAME                  CHAR(10)       NOT NULL
);
+/
              AS vendorDDL
;
DATASTORE vendor
          OF DB2LUW
          AS Tvend
          DESCRIBED BY
                    vendorDDL
          FOR Change
;

-- ------------------------------------------------------
--           Field Specification Section
-- ------------------------------------------------------

DECLARE var1 12 1;

-- ------------------------------------------------------
--           Procedure Section
-- ------------------------------------------------------

CREATE PROC Pcomp AS SELECT
{
     COMPNAME  =  COMPNAME
     COMP_ADDRESS  =  COMP-ADDRESS
     COMP_CITY  =  COMP-CITY
}
FROM CDCIN;


CREATE PROC Pdept AS SELECT
{
     DEPTNO  =  DEPTNO
     DEPT_NAME  =  DEPT-NAME
     DEPT_MGRNO  =  DEPT-MGRNO
     DEPT_ADMRDEP  =  DEPT-ADMRDEP
     DEPT_LOC  =  DEPT-LOC
}
FROM CDCIN;


CREATE PROC Pempl AS SELECT
{
     EMPNO  =  EMPNO
     EMPL_FIRST  =  EMPL-FIRST
     EMPL_MID  =  EMPL-MID
     EMPL_LAST  =  EMPL-LAST
     EMPL_DEPT  =  EMPL-DEPT
     EMPL_PHONE  =  EMPL-PHONE
     EMPL_HIREDT  =  EMPL-HIREDT
     EMPL_JOB  =  EMPL-JOB
     EMPL_EDLEVEL  =  EMPL-EDLEVEL
     EMPL_SEX  =  EMPL-SEX
     EMPL_DOB  =  EMPL-DOB
     EMPL_SALARY  =  EMPL-SALARY
     EMPL_BONUS  =  EMPL-BONUS
     EMPL_COMM  =  EMPL-COMM
     PFK_DEPTNO  =  PFK_DEPTNO
}
FROM CDCIN;


CREATE PROC Pvend AS SELECT
{
     VENDID  =  VENDID
     VEND_NAME  =  VEND-NAME
     VEND_COMPANY  =  VEND-COMPANY
     VEND_ADDRESS  =  VEND-ADDRESS
     VEND_CITY  =  VEND-CITY
     VEND_STATE  =  VEND-STATE
     VEND_ZIP  =  VEND-ZIP
}
FROM CDCIN;


-- ------------------------------------------------------
--           Main Section
-- ------------------------------------------------------

PROCESS INTO
       Tcomp
      ,Tdept
      ,Templ
      ,Tvend
SELECT
{
CASE CDC_TBNAME(CDCIN)
     WHEN 'company'
     DO
          CALLPROC(Pcomp)
     END
     WHEN 'deptment'
     DO
          CALLPROC(Pdept)
     END
     WHEN 'employee'
     DO
          CALLPROC(Pempl)
     END
     WHEN 'vendor'
     DO
          CALLPROC(Pvend)
     END

}
FROM CDCIN;
