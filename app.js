    const loadData = () => {
    const url = "https://openapi.programming-hero.com/api/news/categories"
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error));
}

    const displayCategory = (categories) => {
    const ul = document.getElementById("ul-container");

    categories.forEach(category => {
        const {category_id, category_name } = category;
        const li = document.createElement('li');
        li.classList.add('inline-block')
        li.innerHTML = ` <li class="d-inline-block fw-bold"><button onclick="loadCategory(${category_id} , 
        '${category_name}')" class="no-background fw-bold">${category_name}</button> </li>`
        ul.appendChild(li);
    })
}

    const loadCategory = async (id, name) => {
    
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none')
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllCategory(data.data, name))
        .catch(error => console.log(error));
}

    const displayAllCategory = (allNews, name) => {
    const allDatas = [...allNews]
    const newNews = allDatas.sort((a, b) => {
        return b.total_view - a.total_view;
    })
    const foundItem = document.getElementById('newsFoundNumber');
    foundItem.innerHTML = ``;
    const newsLength = newNews.length;
    foundItem.innerHTML = `<h6 class="bg-white fw-bolder p-4 rounded" > ${newsLength} items found 
    for category ${name}</h6> `

    const noFound = document.getElementById('newsNotFound')
    noFound.innerHTML = ``
    if (newsLength === 0) {
        noFound.innerHTML = `<h1 class="bg-white text-center p-4" >Sorry, No News Found</h1> `
    }

    const spinner = document.getElementById('spinner');
    spinner.classList.add('d-none');
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ` `;
    newNews.forEach(news => {
        const { image_url, title, details, total_view, _id } = news;
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div class="card mb-4 w-100" style="min-width: 400px;">
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${image_url}" class="img-fluid rounded-start h-100" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title fs-2">${title}</h5>
                <p class="card-text">${details.length > 300 ? details.slice(0, 300) + '...' : details}</p>
                <div class="d-flex mb-3 align-items-center justify-content-evenly">
                    <div class="p-1">
                        <img class="author-img" src="${news.author.img}" alt="">
                        </div>
                        <div>
                            <p class="d-inline fs-5">${news.author.name ? news.author.name : 'No Details'}</p> <br>
                            <p class="d-inline fs-6">${news.author.published_date ? news.author.published_date : 'Data Not Found'}</p> <br>
                        </div>
                    
                        <div class="p-2">
                        <i class="bi bi-eye"></i> <span class="px-2">${total_view ? total_view : 'No Details'}</span>
                    
                        </div>
                        <div class="p-2 text-dark d-none d-md-block">
                        <i class="bi bi-star-half"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        </div>                  
                        <button onclick="loadDetails('${_id}')"  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#seeDetailsModal">Details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    cardContainer.appendChild(cardDiv)
    })
}

const loadDetails = (newsid) => {

    const url = `https://openapi.programming-hero.com/api/news/${newsid}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data[0]))
        .catch(error => console.log(error));
}

const displayDetails = (newsDetails) => {
    const { thumbnail_url, title, details, total_view } = newsDetails;
    const modalTitle = document.getElementById('seeDetailsModalLabel')
    modalTitle.innerHTML = `${title}`
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = ``;
    const cardDiv = document.createElement('div')
    cardDiv.innerHTML = `
    <div class="card" style="width:100%">
        <img src="${thumbnail_url}" class=" modal-img" alt="...">
            <div class="card-body">
            <p class="card-text">${details.length > 300 ? details.slice(0, 300) + '...' : details}</p>
                <div class="d-flex mb-3 align-items-center justify-content-evenly">
                        <div class="p-2">
                            <img class="author-img" src="${newsDetails.author.img}" alt="">
                        </div>
                        <div>
                            <p class="d-inline fs-5">${newsDetails.author.name ? newsDetails.author.name : 'No Details'}</p> <br>
                            <p class="d-inline fs-6">${newsDetails.author.published_date ? newsDetails.author.published_date : 'No Details'}</p> <br>
                        </div>
                        <div class="p-2">
                        <i class="bi bi-eye"></i><span class="px-2">${total_view ? total_view : 'No Details'}</span>
                        </div>
                </div>
            </div>
        </div>`
modalBody.appendChild(cardDiv)
}
loadData();