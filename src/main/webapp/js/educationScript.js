const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
const url = '/rsSchool-1.0-SNAPSHOT/education';
const detailsUrl = `/rsSchool-1.0-SNAPSHOT/educationDetails.jsp`;


function onLoad() {

    axios.defaults.headers['content-type'] = 'application/x-www-form-urlencoded';
    // set default axios
    return axios
        .get(url)
        .then((res) => {

            console.log('dt');
            console.log(res.data);
            res.data.forEach((el) => {
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

    const name =  document.getElementById("nameId").value;
    const description =  document.getElementById("descriptionText").value;
    const image =  document.getElementById("imageId").value;
    params.append('name',name);
    params.append('description', description);
    params.append('image', image);
    return axios.post(url,
        params
    ).then(res=>{
        const {id,name,description,image} = res.data;
        addElement(id,name,description,image);
        hideForm();
    })
}

function onUpdate() {
    const name = document.getElementById("nameId").value;
    const description = document.getElementById("descriptionText").value;
    const image = document.getElementById("imageId").value;
    const id = document.getElementById("hiddenId").value;
    const params = new URLSearchParams();
    params.append('name',name );
    params.append('description',description );
    params.append('image', image);
    params.append('id', id);

    return axios.post(url,
        params
    ).then(res=>{
        updateElement(id,name,description,image);
        hideForm();
    });
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
        displayEditForm(id, name, description,image);
    });

    var viewBtn = document.createElement('a');
    viewBtn.setAttribute('type', 'button');
    viewBtn.innerHTML="View";
    viewBtn.classList.add('btn');
    viewBtn.classList.add('btn-secondary');
    viewBtn.setAttribute('href',`${detailsUrl}?id=${id}`);

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
    document.getElementById("formBtn").removeEventListener('click',onUpdate);
    document.getElementById("nameId").value ='' ;
    document.getElementById("descriptionText").value='';
    document.getElementById("imageId").value='';
    document.getElementById("hiddenId").value = '';

    document.getElementById("formTitle").innerHTML=`Create a New Education`;
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

function displayEditForm(id,name,description,image) {
    document.getElementById("formBtn").removeEventListener('click',onCreate);
    document.getElementById("nameId").value =name ;
    document.getElementById("descriptionText").value=description;
    document.getElementById("imageId").value=image;
    document.getElementById("hiddenId").value = id;

    document.getElementById("formTitle").innerHTML=`Update ${name}`;
    document.getElementById("formBtn").innerHTML="Update";
    document.getElementById("formBtn").addEventListener('click',onUpdate);
    document.getElementById("form").style.display="flex";
    document.getElementById("")

}

function clearContainer(){
    document.getElementById("elements").innerHTML='';
}

function updateElement(id, name,description,image){
    const container = document.getElementById(`${id}`);
    container.innerHTML = '';
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
        displayEditForm(id, name, description,image);
    });

    var viewBtn = document.createElement('a');
    viewBtn.setAttribute('type', 'button');
    viewBtn.innerHTML="View";
    viewBtn.classList.add('btn');
    viewBtn.classList.add('btn-secondary');
    viewBtn.setAttribute('href',`${detailsUrl}?id=${id}`);

    container.appendChild(cardImage);
    cardBody.appendChild(title);
    cardBody.appendChild(descriptionTag);
    cardBody.appendChild(deleteBtn);
    cardBody.appendChild(editBtn);
    cardBody.appendChild(viewBtn);
    container.appendChild(cardBody);
}