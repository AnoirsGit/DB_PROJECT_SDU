CREATE OR REPLACE package login_pck AS
	FUNCTION confirmation(
		p_nickname IN Userss.nickname%TYPE,
		p_password IN Userss.pass%TYPE
		) RETURN BOOLEAN;
END login_pck;
/

CREATE OR REPLACE PACKAGE BODY login_pck AS
	FUNCTION confirmation(
		p_nickname IN Userss.nickname%TYPE,
		p_password IN Userss.pass%TYPE
	) RETURN BOOLEAN
	IS
		is_true BOOLEAN := FALSE;
        v_pass Userss.pass%TYPE;
	BEGIN
        BEGIN
            SELECT pass INTO v_pass
                FROM Userss
                WHERE nickname = p_nickname;
        
            IF (p_password = v_pass) THEN is_true := TRUE;
            ELSE is_true := FALSE;
            END IF;
            EXCEPTION
                WHEN NO_DATA_FOUND THEN
                    RETURN FALSE;
        END;
        RETURN is_true;
	END confirmation;
END login_pck;
/
--DECLARE
--    checks BOOLEAN;
--BEGIN
--    checks := login_pck.confirmation('Murat', 'myassword');
--    IF checks THEN
--        DBMS_OUTPUT.put_line('Your pASSword is Correct!!!');
--    ELSE 
--        DBMS_OUTPUT.put_line('Nickname or password are incorrect. Please, try again');
--    END IF;
--END;
--/