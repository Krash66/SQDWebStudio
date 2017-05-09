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
