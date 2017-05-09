CREATE TABLE employee
(
        EMPNO     CHAR(6)   NOT NULL
       ,EMPL_FIRST     CHAR(12)
       ,EMPL_MID     CHAR(1)
       ,EMPL_LAST     CHAR(15)
       ,EMPL_DEPT     CHAR(3)
       ,EMPL_PHONE     CHAR(4)
       ,EMPL_HIREDT     CHAR(10)
       ,EMPL_JOB     CHAR(8)
       ,EMPL_EDLEVEL     HALFW(2)
       ,EMPL_SEX     CHAR(1)
       ,EMPL_DOB     CHAR(10)
       ,EMPL_SALARY     PACKED(5)
       ,EMPL_BONUS     PACKED(5)
       ,EMPL_COMM     PACKED(5)
       ,EMPED     X(2)
);