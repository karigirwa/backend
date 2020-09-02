const container = document.querySelector('.container')

const renderPost = (doc) => {
    const post = document.createElement('div')
    post.setAttribute('class', 'post')

    const title = document.createElement('h1')
    title.setAttribute('class', 'post-title')
    title.textContent = doc.title

    const content = document.createElement('p')
    content.setAttribute('class', 'post-content')
    content.textContent = doc.content

    const deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('class', 'post-delete')
    deleteBtn.textContent = "Delete"

    post.setAttribute('data_id', doc._id)

    post.appendChild(title)
    post.appendChild(content)
    post.appendChild(deleteBtn)

    container.appendChild(post)

    deleteBtn.addEventListener('click', (e) => {
        let varConfirm = confirm("you want to delete this surely?")
        if (varConfirm == true) {
            let id = e.target.parentElement.getAttribute('data_id')
            console.log(id)
            fetch(`http://127.0.0.1:3000/v1/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).then(res => res.json())
                .then(result => console.log(result))
            return true
        } else {
            return false
        }

    })

}




// posts.forEach(el => renderPost(el))

fetch('http://127.0.0.1:3000/v1/blogs', {
    method: 'GET'
}).then(res=>res.json())
.then(dt=>{
    console.log(dt)
    dt.forEach(renderPost)
})