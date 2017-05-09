CREATE TRIGGER sqdaudit_I_PROC_AUDT_DETLS_REMT_1
ON PROC_AUDT_DETLS_REMT_1
AFTER UPDATE
AS
BEGIN
INSERT SQDENGCD
SELECT
 'SQMS'    AS EYECATCHER
,'I'       AS CHANGEOP
,GETDATE() AS UPDATE_TSTMP
,user      AS USER_UPDATED
,'PROC_AUDT_DETLS_REMT_1' AS TABLE_UPDATED
,'PROC_AUDT_DETLS_REMT_1' AS TABLE_ALIAS
,9
    ,inserted.SEQUENCE_NUMBER
+','+inserted.ORIGIN
+','+inserted.APPLMNEM
+','+inserted.CURR_DATE
+','+inserted.REC_TYP
+','+inserted.CONCAT_KEY
+','+inserted.RSRVD_DATA
+','+inserted.LAST_UPDT_DTTM
+','+inserted.FUNC_RLSE_IND
 AS CDC_AFTER_DATA
,'' AS CDC_BEFORE_DATA
FROM inserted
END
go
--------------------
CREATE TRIGGER sqdaudit_R_PROC_AUDT_DETLS_REMT_1
ON PROC_AUDT_DETLS_REMT_1
AFTER UPDATE
AS
BEGIN
INSERT SQDENGCD
SELECT
 'SQMS'    AS EYECATCHER
,'R'       AS CHANGEOP
,GETDATE() AS UPDATE_TSTMP
,user      AS USER_UPDATED
,'PROC_AUDT_DETLS_REMT_1' AS TABLE_UPDATED
,'PROC_AUDT_DETLS_REMT_1' AS TABLE_ALIAS
,9
    ,inserted.SEQUENCE_NUMBER
+','+inserted.ORIGIN
+','+inserted.APPLMNEM
+','+inserted.CURR_DATE
+','+inserted.REC_TYP
+','+inserted.CONCAT_KEY
+','+inserted.RSRVD_DATA
+','+inserted.LAST_UPDT_DTTM
+','+inserted.FUNC_RLSE_IND
 AS CDC_AFTER_DATA
    ,deleted.SEQUENCE_NUMBER
+','+deleted.ORIGIN
+','+deleted.APPLMNEM
+','+deleted.CURR_DATE
+','+deleted.REC_TYP
+','+deleted.CONCAT_KEY
+','+deleted.RSRVD_DATA
+','+deleted.LAST_UPDT_DTTM
+','+deleted.FUNC_RLSE_IND
 AS CDC_BEFORE_DATA
FROM inserted
INNER JOIN deleted on deleted.SEQUENCE_NUMBER= inserted.SEQUENCE_NUMBER
;
END
go
--------------------
CREATE TRIGGER sqdaudit_D_PROC_AUDT_DETLS_REMT_1
ON PROC_AUDT_DETLS_REMT_1
AFTER UPDATE
AS
BEGIN
INSERT SQDENGCD
SELECT
 'SQMS'    AS EYECATCHER
,'D'       AS CHANGEOP
,GETDATE() AS UPDATE_TSTMP
,user      AS USER_UPDATED
,'PROC_AUDT_DETLS_REMT_1' AS TABLE_UPDATED
,'PROC_AUDT_DETLS_REMT_1' AS TABLE_ALIAS
,9
,'' AS CDC_AFTER_DATA
    ,deleted.SEQUENCE_NUMBER
+','+deleted.ORIGIN
+','+deleted.APPLMNEM
+','+deleted.CURR_DATE
+','+deleted.REC_TYP
+','+deleted.CONCAT_KEY
+','+deleted.RSRVD_DATA
+','+deleted.LAST_UPDT_DTTM
+','+deleted.FUNC_RLSE_IND
 AS CDC_BEFORE_DATA
FROM deleted
;
END
go
--------------------
