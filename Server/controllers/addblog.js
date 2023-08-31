const db = require('../database')

module.exports = {
    addBlog: (req, res) => {
        const {imageURL, title, description} = req.body
        console.log(req.body)
        db.query(`
            INSERT INTO blogs(imageURL, title, description)
            VALUES ('${imageURL}','${title}','${description}')
            RETURNING *;`).then((dbRes)=>{res.status(200).send(dbRes[0])
        })
    },
    getBlogs: (req, res) => {
        db.query(`SELECT * FROM blogs`).then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
    },
    deleteBlog: (req, res) => {
        const { id } = req.params;
        db.query(`DELETE FROM blogs WHERE id = ${id}`)
        .then(() => {
            res.status(200).send({ message: "Article deleted successfully!" });
        })
        
    }
}
