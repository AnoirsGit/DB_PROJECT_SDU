CREATE package inserting AS
	procedure new_user();
END inserting;
/

CREATE OR REPLACE PACKAGE BODY inserting AS
	CREATE OR REPLACE PROCEDURE new_user(
		p_nickname IN Userss.nickname%TYPE,
		p_pass IN Userss.pass%TYPE,
		p_phone_number IN Userss.phone_number%TYPE,
		p_pass_salt IN Userss.pass_salt%TYPE
	)
	IS
	BEGIN
		INSERT INTO Userss(
			"user_id",
			"nickname",
			"pass",
			"phone_number",
			"pass_salt"
		)
		VALUES(
			0,
			p_nickname,
			p_pass,
			p_phone_number,
			p_pass_salt
		);

		COMMIT;
	END user_insertion;
/* Example of insert
	BEGIN
		inserting.new_user('Anuar4eg', 'easypass1', 87772341212, 'salut');
	END;
*/
END inserting;
/