const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
const url = '/rsSchool-1.0-SNAPSHOT/education';
const courseUrl = '/rsSchool-1.0-SNAPSHOT/course';
const detailsUrl = '/rsSchool-1.0-SNAPSHOT/course';

const urlParams = new URLSearchParams(window.location.search);
const educationId = urlParams.get('id');

function onLoad() {
    // set default axios
    return axios
        .get(`${url}?id=${educationId}`)
        .then((res) => {

            const {id,name,description,image,courses} = res.data;

            pageDetails(id,name,description,image);

            courses.forEach((el) => {
                console.log(el);
                addElement(el.id, el.name, el.description, el.image);
            });
        });
}

function deleteRequest(id) {
    return axios.delete(url,{
        params:{
            id:id
        }
    }).then(dt=>{
        var item = document.getElementById(id);
        var container = document.getElementById("elements");
        container.removeChild(item);
    })
}

function onCreate() {
    const params = new URLSearchParams();
    params.append('educationId',educationId);
    params.append('name', document.getElementById("nameId").value);
    params.append('description', document.getElementById("descriptionText").value);
    params.append('image', document.getElementById("imageId").value);
    return axios.post(courseUrl,
        params
    ).then(res=>{
        const {id , name,description,image} = res.data;
        addElement(id,name,description,image);
        hideForm();
    })
}

function onUpdate() {
    const params = new URLSearchParams();
    params.append('name', document.getElementById("nameId").value);
    params.append('description', document.getElementById("descriptionText").value);
    params.append('image', document.getElementById("imageId").value);
    params.append('id', document.getElementById("hiddenId").value);

    return axios.put(url,
        params
    ).then(res=>{
        const {id , name,description,image} = res.data;
        addElement(id,name,description,image);
        hideForm();
    })
}

function onSearch(){
    const searchInput = document.getElementById("searchTxt");
    const searchText = searchInput.value;
    return axios.get(url,{
        params:{
            search:searchText
        }
    }).then(res=>{
        clearContainer();
        res.data.forEach((el) => {
            addElement(el.id, el.name, el.description, el.image);
        });
    });
}

function addElement(id, name, description, image) {
    var container = document.getElementById('elements');
    var card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';
    card.setAttribute("id",id);
    var cardImage = document.createElement('img');
    cardImage.setAttribute('src', image);
    cardImage.classList.add('card-img-top');

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    var title = document.createElement('h5');
    title.classList.add('card-title');
    title.innerHTML = name;

    var descriptionTag = document.createElement('p');
    descriptionTag.classList.add('card-text');
    descriptionTag.innerHTML = description;

    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('btn-danger');
    deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.addEventListener('click', function () {
        const result = confirm(`Are you sure to delete ${name} ?`);
        console.log('result');
        console.log(result);
        if (result === true) {
            deleteRequest(id);
        }
    });

    var editBtn = document.createElement('button');
    editBtn.setAttribute('type', 'button');
    editBtn.innerHTML="Edit";
    editBtn.classList.add('btn');
    editBtn.classList.add('btn-primary');
    editBtn.addEventListener('click', function () {
        displayEditForm(id, name, image, description);
    });

    var viewBtn = document.createElement('a');
    viewBtn.setAttribute('type', 'button');
    viewBtn.innerHTML="View";
    viewBtn.classList.add('btn');
    viewBtn.classList.add('btn-secondary');
    viewBtn.setAttribute('href',detailsUrl);

    card.appendChild(cardImage);
    cardBody.appendChild(title);
    cardBody.appendChild(descriptionTag);
    cardBody.appendChild(deleteBtn);
    cardBody.appendChild(editBtn);
    cardBody.appendChild(viewBtn);
    card.appendChild(cardBody);
    container.appendChild(card);
}


function displayCreateForm(){
    document.getElementById("formBtn").innerHTML="Create";
    document.getElementById("formBtn").addEventListener('click',onCreate);
    document.getElementById("form").style.display="flex";
}
function hideForm(){
    document.getElementById("nameId").value='';
    document.getElementById("descriptionText").value='';
    document.getElementById("imageId").value='';
    document.getElementById("form").style.display="none";
}
function displayEditForm() {
    document.getElementById("formBtn").innerHTML="Create";
    document.getElementById("formBtn").addEventListener('click',onUpdate());
    document.getElementById("form").style.display="flex";

}

function clearContainer(){
    document.getElementById("elements").innerHTML='';
}

function pageDetails(id,name,description,image){
    const titleEl = document.getElementById("pageTitle");
    const descriptionEl = document.getElementById("pageDescription");
    const imageEL = document.getElementById("pageImage");

    titleEl.innerHTML = name;
    descriptionEl.innerHTML = description;
    imageEL.setAttribute('src',image);
}