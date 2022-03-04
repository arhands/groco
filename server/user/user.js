const pool = require("../db");

async function createUser(res, req) {
    try {
        console.log(req)
        const { googleid, user_email, first_name, last_name, image_url } = req.body;
        const newUser = await pool.query(
            "INSERT INTO public.user_table (googleid, user_email, first_name, last_name, image_url) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [googleid, user_email, first_name, last_name, image_url]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}
async function getUser(req, res) {
    try {
        const { id } = req.params;
        const user = await pool.query(
            "SELECT * FROM public.user_table WHERE googleId = ($1)",
            [id]
        );
        if (user.rows.length === 1) {
            res.json(user.rows[0]);
        }
        else
            res.status(202).send({ message: "Couldnt find user with that id" })
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

module.exports = {
    create: createUser,
    get: getUser,
};