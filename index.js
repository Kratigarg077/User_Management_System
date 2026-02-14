const express = require('express');

const app = express();

const port = 4000;

app.set("view engine", "ejs");

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const user_records = require('./public/users_data.json');

const Users = require("./models/user_model");

const connectDB = require('./config/db.js');

const { ObjectId } = require('mongodb');

// Connect Database
connectDB();

//Middlware in form of variable
const one = ((req,res,next) => {
    const d = new Date();
    console.log(`${req.method} :: ${req.url} :: ${d.getHours()} :: ${d.getMinutes()} :: ${d.getSeconds()}`);
    next();
});

const two = ((req,res,next) => {
    const d = new Date();
    console.log(`Hi 2nd Middleware ${req.method} :: ${req.url}`);
    next();
});

// const myToken = '12345';

// const validateToken = (req,res,next) => {
//     if(req.query.token == '' | req.query.token == undefined){
//         return res.send(
//             {
//                 status: 0,
//                 message: "Token is required!!"
//             }
//         )
//     }else if(req.query.token != myToken){
//         return res.send(
//             {
//                 status: 0,
//                 message: "Invalid Token!!"
//             }
//         )
//     }
//     next();
// }

// app.use(validateToken);

//Passed middleware variable in get method
app.get('/', async (req, res) => {
    const totalUsers = await Users.countDocuments();
    const latestUser = await Users.findOne().sort({ _id: -1 });
    res.render('home', {
        currentPath: req.path,
        totalUsers,
        latestUser
     });
});

app.get('/result', (req, res) => {
  const html = `
    <ol>
        ${user_records.map ( user => `<li>${user.name}</li>`).join("")}
    </ol>
  `;
  res.send(html);
});

app.get('/view',async(req,res)=>{
    const users = await Users.find()
    res.render('viewUser',{ currentPath: req.path, records: users })
});

//Used middleware, it will be called automatically when below pages will be rendered (not applicable for above pages like home and result)
app.use(two);

app.get('/insert', one, two, (req, res) => {
  res.render("insertUser", { currentPath: req.path });
});

app.post('/insert', async (req, res) => {
    await Users.insertOne({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPhone: req.body.userPhone,
        userAddress: req.body.userAddress
    });
    res.redirect("/view");
})

app.get('/singleView', async (req, res) => {
    return res.status(404).send({ error: "Page not found, enter complete route like /singleView/1" });
});

app.get('/singleView/:id', async (req, res) => {
    const id = req.params.id;
    const userData = await Users.findOne({ _id: id });
    if (!userData) {
        return res.status(404).send({ error: "User not found" });
    }
    
    res.render("singleViewUser", { record: userData, currentPath: req.path });
});

app.get('/update/:id', async (req, res) => {
  const id = req.params.id;
  const userData = await Users.findOne({ _id: id});
  res.render("updateUser", {
    currentPath: req.path,
    record: userData
  });
});

//Way 1
// app.post('/update/:id', async (req, res) => {
//     const id = req.params.id;

//     await Users.updateOne(
//         {_id: new ObjectId(id)},
//         {
//             $set: {
//                 userName: req.body.userName,
//                 userEmail: req.body.userEmail,
//                 userPhone: req.body.userPhone,
//                 userAddress: req.body.userAddress
//             }
//         }
//     );
//     res.redirect("/view");
// });

//Way 2

app.post('/update/:id', async (req, res) => {
    const id = req.params.id;

    await Users.findByIdAndUpdate(id, req.body);

    res.redirect("/view");
});

// Delete using post
// app.post('/delete',async (req,res) => {
//     const id = req.body.id;
//     await Users.deleteOne({_id: new ObjectId(id)});
//     res.redirect('/view');
// })

// Delete using get
app.get('/delete/:id', async (req, res) => {
  await Users.findByIdAndDelete(req.params.id);
  res.redirect('/view');
});

app.listen(port, () =>{
    console.log(`Server start http://localhost:${port}`);
})