CREATE OR REPLACE package books_pck AS
	FUNCTION book_insert(
		) RETURN type;
END books_pck;
/

CREATE OR REPLACE PACKAGE BODY books_pck AS
	FUNCTION book_insert(
	) RETURN type
	IS
	BEGIN
	END book_insert;
END books_pck;
/
--DECLARE
--    checks BOOLEAN;
--BEGIN
--    checks := books_pck.book_insert('Murat', 'myassword');
--    IF checks THEN
--        DBMS_OUTPUT.put_line('Your pASSword is Correct!!!');
--    ELSE 
--        DBMS_OUTPUT.put_line('Nickname or password are incorrect. Please, try again');
--    END IF;
--END;
--/