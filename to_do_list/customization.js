
(function(){

    let ukraineCity = [];

    const cityRequest = async () => {
        fetch('http://my-json-server.typicode.com/achubirka/db/products')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then(function (data) {

                        for (let i = 0; i < data.length; i++) {

                                ukraineCity.push(data[i]);


                        }
                    })
                })
    };
    let city = cityRequest();
    console.log('ukraine', ukraineCity);
    console.log('ukraine len', ukraineCity.length);


    async function show(title){
        let tit = await title;
        for (let i = 0; i < tit.length; i++) {
            console.log('answer len', tit.length);
            console.log("answer", tit[i].name);
        }
    /*    document.querySelector('.js_todo_list').addEventListener("click",  () => {
            for (let i = 0; i < title.length; i++) {
                console.log('answer len', title.length);
                console.log("answer", title[i].name);
            }
        });*/
    }
    show(ukraineCity);




    /*const APP_EL        = document.getElementById('app'); // елементы с id попадают в глобальную область видимости const APP_EL = app
    const ADD_BTN       = APP_EL.querySelector('.js_add'); // APP_EL, чтобы не искать по всему документу
    const SAVE_BTN      = APP_EL.querySelector('.js_save');
    const CANCEL_BTN    = APP_EL.querySelector('.js_cancel');
    const ADD_INPUT     = APP_EL.querySelector('.js_add_input');
    const TODO_LIST_EL  = APP_EL.querySelector('.js_todo_list');


    let todo_items      = APP_EL.querySelectorAll('.js_todo_item');

    //получаем данные из local storage либо наш заготовленный обьект
    let tasks           = JSON.parse(localStorage.getItem('taskList')) || [{
        name: 'First',
        status: false
    },{
        name: 'Second',
        status: false
    }];

    /!**
     * отрисовка тасков
     * на входе в map - обьект с данными (tasks), индекс
     * data-index - соответствует индексу в массиве
     * после того как map нам возвращает новый массив с обработанными шаблонами, соеденяем это все (join) в строку и помещаем tasks_html
     * по атрибуту data-action - определяем по какой кнопке произошло событие
     *!/
    function render (){
        console.log('tasks', tasks);

            let tasks_html = tasks.map(function (value, index) {
                return `
                <div class="js_todo_item row" data-index="${index}">
                    <div class="c5 js_item_text" data-action="done">${value.name}</div>
                    <div class="c2 js_item_action">
                        <button type="button" data-action="edit" title="Edit">!</button>
                        <button type="button" data-action="remove" title="Remove">X</button>
                    </div>
                </div>
            `;
            }).join("");

            // show tasks
            TODO_LIST_EL.innerHTML = tasks_html;

            // перезаписываем todo_items когда появляются и обновляются элементы
            todo_items = APP_EL.querySelectorAll('.js_todo_item');
    }


    //delete task
    function removeTask(event, index){
        tasks.splice(index, 1);
        render();
        saveData();
    }

    //add task
    function addItem(){
        tasks.push({
            name: ADD_INPUT.value,
            status: false
        });

        ADD_INPUT.value = '';
        render();
        saveData();
    }

    // отметить как выполненое
    function doneTask(event, index){

        tasks.map(function(item, ind){
            if(index === ind && item.status === false){
                item.status = true;
                event.style.textDecoration = 'line-through';
            }
            else if(index === ind && item.status === true){
                item.status = false;
                event.style.textDecoration = '';
            }
        });
        saveData();
    }

    //сохранение данных в localStorage
    function saveData(){
        localStorage.setItem('taskList', JSON.stringify(tasks));
    }

    function startEdit(index){
        let data = tasks[index];
        ADD_INPUT.value = data.name;
        SAVE_BTN.dataset.index = index;
        ADD_BTN.style.display = 'none';
        SAVE_BTN.style.display = "";
        CANCEL_BTN.style.display = "";

    }

    function endEdit(){
        ADD_INPUT.value = '';
        ADD_BTN.style.display = '';
        SAVE_BTN.style.display = "none";
        CANCEL_BTN.style.display = "none";
    }

    function saveItem(index){
        tasks[index].name = ADD_INPUT.value;
        saveData();
        render();
        endEdit();
    }
    render();

    (APP_EL) && APP_EL.addEventListener('click', function(){
        let target = event.target;
        let todo_item = target.closest('.js_todo_item'); //находим родителя елемента по которому произошло событие
        let index = -1;
        switch(target.dataset.action){

            case 'edit':
                // получаем индекс елемента (это его же индекс в массиве), можно было также через атрибут data-index, который у родителя
                index =  Array.prototype.indexOf.call(todo_items,todo_item);
                startEdit(index);
                break;

            case 'remove':
                index =  Array.prototype.indexOf.call(todo_items,todo_item );
                removeTask(target, index);
                break;

            case 'done':
                index =  Array.prototype.indexOf.call(todo_items,todo_item );
                doneTask(target, index);
                break;
            default:
                console.log('ignore');
                break;
        }

    });

    (ADD_BTN) && ADD_BTN.addEventListener('click', function (event) {
        addItem();
    });

    (SAVE_BTN) && SAVE_BTN.addEventListener('click', function (event) {
        saveItem(SAVE_BTN.dataset.index);
    });
    (CANCEL_BTN) && CANCEL_BTN.addEventListener('click', function (event) {
        endEdit();
    });
*/
})();