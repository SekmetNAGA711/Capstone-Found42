require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const path = require('path');

app.use(express.static(path.join(__dirname, '..', 'Html ,CSS & mainjs')));

// app.use(express.static(`${__dirname}/Html ,CSS & mainjs`))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Html ,CSS & mainjs', 'home.html'));
});
/*----------------------------Blog Page----------------------------------------*/



const db = require('./database')
const seed = require('./seed')
const {addBlog, getBlogs,deleteBlog} = require('./controllers/addblog')

db.sync()
app.post('/api/seed', seed)
app.post('/api/addBlog', addBlog)
app.get('/api/getBlogs', getBlogs)
app.delete('/api/deleteBlog/:id', deleteBlog);

/*----------------------------what to eat Page----------------------------------------*/
const bloodInfo = {
    "A+": {
        description: "A meat-free diet based on fruits and vegetables, beans and legumes, and whole grains -- ideally, organic and fresh, \
         Research shows people with type A blood have a sensitive immune system. <br> <br> Foods include:",
        foods: [
            "walnuts, pumpkin seeds, and peanuts",
            "olive oil",
            "certain fruits, such as blueberries and elderberries",
            "certain kinds of beans and legumes",
            "certain vegetables, especially dark, leafy greens, such as kale, Swiss chard, and spinach",
            "garlic and onions",
            "cold-water fish, such as sardines and salmon",
            "limited amounts of chicken and turkey",
            "green tea",
            "ginger"
        ]
    },
    "A-": {
        description: "A meat-free diet based on fruits and vegetables, beans and legumes, and whole grains -- ideally, organic and fresh, \
        Research shows people with type A blood have a sensitive immune system. <br> <br> Foods include:",
        foods: [  "walnuts, pumpkin seeds, and peanuts",
        "olive oil",
        "certain fruits, such as blueberries and elderberries",
        "certain kinds of beans and legumes",
        "certain vegetables, especially dark, leafy greens, such as kale, Swiss chard, and spinach",
        "garlic and onions",
        "cold-water fish, such as sardines and salmon",
        "limited amounts of chicken and turkey",
        "green tea",
        "ginger"]
    },
    "B+": {
        description: "A more varied diet than those with other blood types. Research suggests a diet that balances both animal \
         and vegetable selections but avoid wheat, buckwheat, corn, lentils, peanuts, sesame seeds and tomatoes. \
         These foods compromise the B+ blood type metabolism \
         and can cause fluid retention, fatigue and hypoglycemia. Also avoid chicken and pork, \
        which can attack the bloodstream of your blood type and potentially cause immune disorders or strokes.<br> <br> Good foods include:",
        foods: ["Cetain meats: lamb, vension, rabbit and fish",
        "Leafy greens: baby kale, argula, and spinach",
        "Elderberry",
        "Grapes",
        "cranberries",
        "Beets",
        "carrots",
        "cauliflower",
        "Kale",
        "Banana, grapes and plums are particulary beneficial",
        "Olive oil and flaxseed",
        "Green Tea and ginger tea",
        "Spices: Ginger, curry and parsley"]
    },
    "B-": {
        description: "A more varied diet than those with other blood types. Research suggests a diet that balances both animal \
        and vegetable selections but avoid wheat, buckwheat, corn, lentils, peanuts, sesame seeds and tomatoes. \
        These foods compromise the B- blood type metabolism \
        and can cause fluid retention, fatigue and hypoglycemia. Also avoid chicken and pork, \
       which can attack the bloodstream of your blood type and potentially cause immune disorders or strokes.<br> <br> Good foods include:",
        foods: ["Cetain meats: lamb, vension, rabbit and fish",
    "Leafy greens: baby kale, argula, and spinach",
    "Elderberry",
    "Grapes",
    "cranberries",
    "Beets",
    "carrots",
    "cauliflower",
    "Kale",
    "Banana, grapes and plums are particulary beneficial",
    "Olive oil and flaxseed",
    "Green Tea and ginger tea",
    "Spices: Ginger, curry and parsley"
]
    },
    "AB+": {
        description: "You have the most varied diet option when \
        compared to other blood types. This is because your blood type AB+ has a tolerant digestive \
        system. Research shows a dietary combination  of those for \
        blood types A and B. <br> <br> Foods include:",
        foods: ["Certain meats: Tofu, lamb, mutton, rabbit, turkey, and fish. <br>Avoid Beef, chicken and pork ",
        "Rice",
         "Broccoli",
         "cauliflower",
         "yams",
         "Sweet Potatoe ",
         "Fruits: Almost all fruits are beneficial for you, however grapes, <brb>plums and berries are especially beneficial <br> \
         avoid oranges and b",
         "Teas",
        ]
    },
    "AB-": {
        description: "You have the most varied diet option when \
        compared to other blood types. This is because your blood type AB- has a tolerant digestive \
        system. Research shows a dietary combination of those for \
        blood types A and B. <br> <br> Foods include:",
        foods: ["Certain meats: Tofu, lamb, mutton, rabbit, turkey, and fish. <br>Avoid Beef, chicken and pork ",
        "Rice",
         "Broccoli",
         "cauliflower",
         "yams",
         "Sweet Potatoe",
         "Fruits: Almost all fruits are beneficial for you, however grapes, <brb>plums and berries are especially beneficial <br> \
         avoid oranges and bananas",
         "Teas"]
    },
    "O+": {
        description: "A high-protein diet and certain fruits and vegetables, \
        but limited in graines and legumes. Corn, dairy, kidney beans, caffeine and alcohol are to be avoided. Your diet resembles the paleo diet. Take various supplements to help with tummy troubles and other issues\
        your O+ blood type tends to have.<br> <br> Good foods include:",
        foods: ["Protein: lamb, mutton, vension, fish and Poutry",
        "Seafood: O+ blood type reacts well to seafood, seafoods like cod, mackerel and sardines are good choices and kelp, which is rich in iodine",
     "kale", 
    "Spinach",
    "Fruits: Most fruits in moderation, However plums, figs and prunes are particularly beneficial",
    "walnuts",
    "almonds",
    "flaxseed",
    "olive oil",
    "spices: cayenne, curry, parsley and seeweed",
    "Teas"]
    },
    "O-": {
        description: "A high-protein diet and certain fruits and vegetables, \
        but limited in grains and legumes. Corn, dairy, kidney beans, caffeine and alcohol are to be avoided. Your diet closely resembles the paleo diet. Take various supplements to help with tummy troubles and other issues\
        your O- blood type tends to have.<br> <br> Good foods include:",
        foods: ["Protein: lamb, mutton, vension, fish and Poutry",
        "Seafood: O- blood type reacts well to seafood, seafoods like cod, mackerel and sardines are good choices and kelp, which is rich in iodine",
         "kale",
        "Spinach",
        "Fruits: Most Fruits in moderation, However plums, figs and prunes are particularly beneficial",
        "walnuts",
        "almonds",
        "flaxseed",
        "olive oil",
        "spices: cayenne, curry, parsley and seaweed",
        "Teas"]
    },
};


app.post('/api/bloodInfo', (req, res) => {
    const { name, age, gender, bloodType } = req.body;
    res.status(200).send(bloodInfo);
});



const PORT = process.env.PORT || 4004;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));