const blogForm = document.getElementById('blogform');
const articleSubmit = document.getElementById('articleSubmit');
const blogdiv = document.getElementById('blogformdiv');
const blogBody = document.getElementById('blogbody')
const blogContainer = document.querySelector('.blogcontainer');
const imageURL = document.getElementById('blogImg');
const title = document.getElementById('blogtitle');
const description = document.getElementById('blogdescription');
const blogContainerbottom = document.getElementById('blogContainerbottom')
const viewAllBtn = document.getElementById('viewAllBtn');
const blogContainerMiddle  = document.getElementById('blogContainerMiddle')







/*-------Show and hid form-------------*/

function showblogForm() {
    if (blogdiv.style.display === 'none' || blogdiv.style.display === '') {
        blogdiv.style.display = 'block';     
    } else {
        hideblogform();
    }
}

function hideblogform() {
    blogdiv.style.display = "none";
  
} 


/*-------Add an article------------------------------------------------*/


function addBlog(e) {
    e.preventDefault();
    hideblogform();
    

    let newblog = {
        imageURL: imageURL.value,
        title: title.value,
        description: description.value
    };
    console.log(newblog)
    axios.post('http://localhost:4004/api/addBlog', newblog).then((res)=>{
        console.log(res.data);
        let newArticle = document.createElement('article');
      
        newArticle.classList.add('bottom-article'); 
        newArticle.innerHTML = `
            <h2>${newblog.title}</h2>
            <img src="${newblog.imageURL}" alt="${newblog.title}">
            <p>${newblog.description}</p>   
        `;
       
        blogContainerbottom.appendChild(newArticle);
        blogForm.reset()
        alert('Your Article has been added! :)')
    }).catch((err)=>{
        console.error(err)
    })
  
}




/*---------------Display all articles------------------------------------------------*/

function displayAllBlogs() { 
    blogContainerbottom.innerHTML = ''  
    axios.get('http://localhost:4004/api/getBlogs')
    .then((res) => {
        res.data.forEach(blog => {
            
          let articles = document.createElement('article');
            articles.classList.add('bottom-article');     
            articles.innerHTML = `
                <h2>${blog.title}</h2>  
                <img src="${blog.imageurl}">
                <p>${blog.description}</p>
                <button class="deleteBtn" data-id="${blog.id}">Delete</button>
            `;
            blogContainerbottom.appendChild(articles);
        });
    }).catch((err) => {
        console.error(err);
    })
}




/*---------------Delete an articles------------------------------------------------*/
blogContainerbottom.addEventListener('click', function(e) {
    if (e.target.classList.contains('deleteBtn')) {
        const articleId = e.target.dataset.id;
        deleteArticle(articleId, e.target.parentElement);
    }
});

function deleteArticle(id, articleElement) {
    axios.delete(`http://localhost:4004/api/deleteBlog/${id}`)
    .then((res) => {
        console.log(res.data.message);
        articleElement.remove();
    })
    .catch((err) => {
        console.error(err);
    });
}




viewAllBtn.addEventListener('click', displayAllBlogs);
blogForm.addEventListener('submit', addBlog)