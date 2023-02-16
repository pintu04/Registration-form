const express = require("express");
const app = express();
const path = require("path");
const hbs = require('hbs');
const { json } = require("express");


require("./db/conn");
const Register = require("./models/register");


const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

hbs.registerPartials(partial_path);


app.get("/", (req, res) => {
    res.render("index");
});
app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/register", async (req, res) => {
    try {

        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {
            const registerEmployee = new Register({
                firstname: req.body.fname,
                lastname: req.body.lname,
                email: req.body.email,
                phone: req.body.mobile,
                password: password,
                confirmpassword: cpassword

            })
            const registered = await registerEmployee.save();
            res.status(201).render("index");

        } else {
            res.send("password are not matching")

        }

        
        
        
        
    } catch (error) {
        res.status(400).send(error);
        
    }
});

app.post("/login", async (req, res) => {
    try {

        const email = req.body.username;
        const password = req.body.password;

        // console.log(`${email} or password ${password}`)
        
        const useremail =  await Register.findOne({password});

        if(useremail.password === password)
        {
            res.status(201).render("index")
        }
        else{
            res.send("password are not matching");
        }

    }
    catch (error) {
        res.status(400).send("invalid email");
    }
})





app.listen(port, () => {
    console.log(`server is running ${port}`);
})