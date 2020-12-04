require('../config/config')
const oracledb = require('oracledb');
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
connectObj = { user: process.env.user, password: process.env.password, connectString: process.env.CONNECT_STRING }

module.exports.getBook = async(req, res, next) => {
    var connection = await oracledb.getConnection(connectObj);
    console.log('sdfsd')
    connection.execute(
        `SELECT *  FROM book
        WHERE AMAZON_INDEX = :id
        `, { id: req.body.id }, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            } else if (result.rows.length < 1) {
                return res.status(404).json(err)
            } else if (result.rows.length > 0) {
                return res.status(200).json({
                    books: result.rows[0],
                })

            }
        }
    );
}

module.exports.getBooks = async(req, res, next) => {
    // const numRows = 20;
    // try {
    //     var connection = await oracledb.getConnection(connectObj);
    //     let arr = [];
    //     const result = await connection.execute(
    //         `BEGIN
    //             books_pck.get_books_by_page_num(:page, :cursor);
    //         END;
    //         `, {
    //             page: req.body.page,
    //             cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    //         });
    //     const resultSet = result.outBinds.cursor;
    //     let rows;
    //     do {
    //         rows = await resultSet.getRows(numRows); // get numRows rows at a time
    //         if (rows.length > 0) {
    //             console.log("getRows(): Got " + rows.length + " rows");
    //             arr.push(rows)
    //         }
    //     } while (rows.length === numRows);
    //     res.status(200).json(arr);
    //     await resultSet.close();
    // } catch (err) {
    //     console.error(err);
    //     res.status(400).json(err);
    // } finally {
    //     if (connection) {
    //         try {
    //             await connection.close();
    //         } catch (err) {
    //             console.error(err);
    //             res.status(500).json("connection to db rejected");
    //         }
    //     }
    // }


    var connection = await oracledb.getConnection(connectObj);
    connection.execute(
        `SELECT *  FROM book
        `, {}, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            } else if (result.rows.length < 1) {
                return res.status(404).json(err)
            } else if (result.rows.length > 0) {
                return res.status(200).json({
                    books: result.rows,
                })

            }
        }
    );
}

module.exports.getBasket = async(req, res, next) => {

    try {

        console.log(req.body.id);
        var connection = await oracledb.getConnection(connectObj);
        let arr = [];
        const count = await connection.execute(
            `SELECT *
            FROM Basket
            WHERE user_id = :id
            `, { id: req.body.id });
        console.log(count);
        const numRows = count.rows.length;
        console.log(numRows)
        const result = await connection.execute(
            `BEGIN
                baskets_pck.get_basket_books(:id, :cursor);
            END;
            `, {
                id: req.body.id,
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            });
        const resultSet = result.outBinds.cursor;
        let rows;
        do {
            rows = await resultSet.getRows(numRows); // get numRows rows at a time
            if (rows.length > 0) {
                console.log("getRows(): Got " + rows.length + " rows");
                arr.push(rows)
            }
        } while (rows.length === numRows);
        res.status(200).json(arr);
        await resultSet.close();
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
                res.status(500).json("connection to db rejected");
            }
        }
    }
}


module.exports.insBasket = async(req, res, next) => {
    var connection = await oracledb.getConnection(connectObj);
    console.log(req.body.id + " " + req.body.userId)
    connection.execute(
        `
                BEGIN
		            baskets_pck.book_into_basket(:userId, :id);
                END;
                `, { userId: req.body.userId, id: req.body.id }, { autoCommit: true }, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).json(err);
            }
            res.status(200).json(result);
            console.log(result);
        }
    );


}


module.exports.delBasket = async(req, res, next) => {
    var connection = await oracledb.getConnection(connectObj);
    console.log(req.body.id + " " + req.body.userId)
    connection.execute(
        `
                BEGIN
		            baskets_pck.remove_from_basket(:userId, :id);
                END;
                `, { userId: req.body.userId, id: req.body.id }, { autoCommit: true }, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).json(err);
            }
            res.status(200).json(result);
            console.log(result);
        }
    );
}