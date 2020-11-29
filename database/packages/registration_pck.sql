CREATE OR REPLACE package registration_pck AS
	procedure new_user(
        p_nickname IN Userss.nickname%TYPE,
		p_pass IN Userss.pass%TYPE,
		p_phone_number IN Userss.phone_number%TYPE,
		p_pass_salt IN Userss.pass_salt%TYPE
    );
END registration_pck;
/

CREATE OR REPLACE PACKAGE BODY registration_pck AS
	PROCEDURE new_user(
		p_nickname IN Userss.nickname%TYPE,
		p_pass IN Userss.pass%TYPE,
		p_phone_number IN Userss.phone_number%TYPE,
		p_pass_salt IN Userss.pass_salt%TYPE
	)
	IS
	BEGIN
		INSERT INTO Userss(
			user_id,
			nickname,
			pass,
			phone_number,
			pass_salt
		)
		VALUES(
			0,
			p_nickname,
			p_pass,
			p_phone_number,
			p_pass_salt
		);

		COMMIT;
	END new_user;
/* Example of insert
	BEGIN
		registration.new_user('Anuar4eg', 'easypass1', 87772341212, 'salut');
	END;
*/
END registration_pck;
/
