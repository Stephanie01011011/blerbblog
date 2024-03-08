import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const port = 2000;
const app = express();

const api_url = "http://localhost:4000";

app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    

   try{
    const response = await axios.get(`${api_url}/posts`);
    
    res.render("index.ejs", {posts: response.data})

   } catch (err) {

   }
});

app.get("/new", (req, res) => {
    res.render("newpost.ejs");
});

app.get("/edit/:id", async (req, res) => {
    try{
        const response = await axios.get(`${api_url}/posts/${req.params.id}`);
        console.log(response.data);
        res.render("editpost.ejs", {post: response.data});

    } catch (err){
        console.log(err);
    }
});

app.post("/api/posts", async (req, res) => {
    try{
        const response = await axios.post(`${api_url}/posts`, req.body);
        console.log(response.data);
        res.redirect("/");
    
    
    } catch (err) {
        console.log(err);
    }
});

app.post("/api/posts/:id", async (req, res) => {
    try{
    let response = await axios.patch(api_url+"/posts/"+ req.params.id, req.body);
    res.redirect("/");
    } catch (err) {

    }
});

app.get("/api/posts/delete/:id", async (req, res) => {
    try{
        
        await axios.delete(`${api_url}/posts/${req.params.id}`);
        res.redirect("/");

    }catch(err){
        res.status(500).json({ message: "Error deleting post" });
    }
})


app.listen(port, () => {
    console.log("Server listening on port " + port)
});
