import express from "express";
import bodyParser from "body-parser";



const app = express();
const port = 4000;

//DONT FORGET ANY OF THESE!!!!
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));

//All posts route


app.get("/posts", (req, res) => {
    res.json(posts);
    
});

app.get("/posts/:id", (req, res) => {
    const result = posts.find((post) => parseInt(req.params.id) === post.id);
    if(!result) return res.status(404).json({message: "Post not found"});
    res.json(result);
  });




app.post("/posts", (req, res) => {
    
    const newPost = {
        id: lastId + 1,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
    posts.push(newPost);
    
    lastId += 1;
    
    res.json(newPost);
  
    
});

app.patch("/posts/:id", (req, res) => {
    let post = posts.find((post) => parseInt(req.params.id) === post.id);
    if(!post) return res.status(404).json({ message: "Post not found" });
   
    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    if (req.body.author) post.author = req.body.author;
    res.json({message: "post updated"})
});

app.delete("/posts/:id", (req, res) => {
    
    let index = posts.findIndex((post) => parseInt(req.params.id) === post.id);
    
    if (index === -1) return res.status(404).json({ message: "Post not found" });
    posts.splice(index, 1);
    res.json({message: "post deleted"});
});


app.listen(port, () => {
    console.log("Server listening on port " + port);
});

let lastId = 3;

let posts = [{id: 1, title: "Star Wars Fans.", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas commodo libero a mauris venenatis, in suscipit magna iaculis. Ut sit amet sollicitudin dolor, eu feugiat massa. Nam justo dui, venenatis a libero eu, maximus egestas lorem. Suspendisse vitae porttitor dolor, id gravida purus. Proin volutpat nunc et lobortis gravida. Pellentesque non nisl vitae augue condimentum blandit. Nunc vel porta nunc, non fringilla ipsum. Praesent rhoncus ornare justo, eu facilisis velit feugiat eget.", author: "Stephanie Livengood"}, 
{id: 2, title: "First trip to the Shire!", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas commodo libero a mauris venenatis, in suscipit magna iaculis. Ut sit amet sollicitudin dolor, eu feugiat massa. Nam justo dui, venenatis a libero eu, maximus egestas lorem. Suspendisse vitae porttitor dolor, id gravida purus. Proin volutpat nunc et lobortis gravida. Pellentesque non nisl vitae augue condimentum blandit. Nunc vel porta nunc, non fringilla ipsum. Praesent rhoncus ornare justo, eu facilisis velit feugiat eget.", author: "Anastasia B."}, 
{id: 3, title: "Have you seen Vampires?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas commodo libero a mauris venenatis, in suscipit magna iaculis. Ut sit amet sollicitudin dolor, eu feugiat massa. Nam justo dui, venenatis a libero eu, maximus egestas lorem. Suspendisse vitae porttitor dolor, id gravida purus. Proin volutpat nunc et lobortis gravida. Pellentesque non nisl vitae augue condimentum blandit. Nunc vel porta nunc, non fringilla ipsum. Praesent rhoncus ornare justo, eu facilisis velit feugiat eget.", author: "Riley James"}];