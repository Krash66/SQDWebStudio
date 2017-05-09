CREATE TRIGGER sqdaudit_I_EMPLOYEE_DDL
ON EMPLOYEE_DDL
AFTER UPDATE
AS
BEGIN
INSERT SQDENGCD
SELECT
 'SQMS'    AS EYECATCHER
,'I'       AS CHANGEOP
,GETDATE() AS UPDATE_TSTMP
,user      AS USER_UPDATED
,'EMPLOYEE_DDL' AS TABLE_UPDATED
,'EMPLOYEE_DDL' AS TABLE_ALIAS
,17
    ,inserted.EMPNO
+','+inserted.EMPL_FIRST
+','+inserted.EMPL_MID
+','+inserted.EMPL_LAST
+','+inserted.EMPL_DEPT
+','+inserted.EMPL_PHONE
+','+inserted.EMPL_HIREDT
+','+inserted.EMPL_JOB
+','+inserted.EMPL_EDLEVEL
+','+inserted.EMPL_SEX
+','+inserted.EMPL_DOB
+','+inserted.EMPL_SALARY
+','+inserted.EMPL_BONUS
+','+inserted.EMPL_COMM
+','+inserted.EMPED
+','+inserted.PFK_DEPTNO
+','+inserted.PFK_COMPNAME
 AS CDC_AFTER_DATA
,'' AS CDC_BEFORE_DATA
FROM inserted
END
go
--------------------
CREATE TRIGGER sqdaudit_R_EMPLOYEE_DDL
ON EMPLOYEE_DDL
AFTER UPDATE
AS
BEGIN
INSERT SQDENGCD
SELECT
 'SQMS'    AS EYECATCHER
,'R'       AS CHANGEOP
,GETDATE() AS UPDATE_TSTMP
,user      AS USER_UPDATED
,'EMPLOYEE_DDL' AS TABLE_UPDATED
,'EMPLOYEE_DDL' AS TABLE_ALIAS
,17
    ,inserted.EMPNO
+','+inserted.EMPL_FIRST
+','+inserted.EMPL_MID
+','+inserted.EMPL_LAST
+','+inserted.EMPL_DEPT
+','+inserted.EMPL_PHONE
+','+inserted.EMPL_HIREDT
+','+inserted.EMPL_JOB
+','+inserted.EMPL_EDLEVEL
+','+inserted.EMPL_SEX
+','+inserted.EMPL_DOB
+','+inserted.EMPL_SALARY
+','+inserted.EMPL_BONUS
+','+inserted.EMPL_COMM
+','+inserted.EMPED
+','+inserted.PFK_DEPTNO
+','+inserted.PFK_COMPNAME
 AS CDC_AFTER_DATA
    ,deleted.EMPNO
+','+deleted.EMPL_FIRST
+','+deleted.EMPL_MID
+','+deleted.EMPL_LAST
+','+deleted.EMPL_DEPT
+','+deleted.EMPL_PHONE
+','+deleted.EMPL_HIREDT
+','+deleted.EMPL_JOB
+','+deleted.EMPL_EDLEVEL
+','+deleted.EMPL_SEX
+','+deleted.EMPL_DOB
+','+deleted.EMPL_SALARY
+','+deleted.EMPL_BONUS
+','+deleted.EMPL_COMM
+','+deleted.EMPED
+','+deleted.PFK_DEPTNO
+','+deleted.PFK_COMPNAME
 AS CDC_BEFORE_DATA
FROM inserted
INNER JOIN deleted on deleted.EMPNO= inserted.EMPNO
;
END
go
--------------------
CREATE TRIGGER sqdaudit_D_EMPLOYEE_DDL
ON EMPLOYEE_DDL
AFTER UPDATE
AS
BEGIN
INSERT SQDENGCD
SELECT
 'SQMS'    AS EYECATCHER
,'D'       AS CHANGEOP
,GETDATE() AS UPDATE_TSTMP
,user      AS USER_UPDATED
,'EMPLOYEE_DDL' AS TABLE_UPDATED
,'EMPLOYEE_DDL' AS TABLE_ALIAS
,17
,'' AS CDC_AFTER_DATA
    ,deleted.EMPNO
+','+deleted.EMPL_FIRST
+','+deleted.EMPL_MID
+','+deleted.EMPL_LAST
+','+deleted.EMPL_DEPT
+','+deleted.EMPL_PHONE
+','+deleted.EMPL_HIREDT
+','+deleted.EMPL_JOB
+','+deleted.EMPL_EDLEVEL
+','+deleted.EMPL_SEX
+','+deleted.EMPL_DOB
+','+deleted.EMPL_SALARY
+','+deleted.EMPL_BONUS
+','+deleted.EMPL_COMM
+','+deleted.EMPED
+','+deleted.PFK_DEPTNO
+','+deleted.PFK_COMPNAME
 AS CDC_BEFORE_DATA
FROM deleted
;
END
go
--------------------
