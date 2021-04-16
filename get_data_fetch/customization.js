(function() {

    const USERS_LINK        = 'https://jsonplaceholder.typicode.com/users';
    const DATA_LIST         = document.querySelector('.js_data_list');

    /**
     * showing data from USERS_LINK
     * @param data
     */
    function showItem(data){
        console.log('data function', data);
        let show = data.map(function(value){
            return `<li class="data_item">
                        <p><strong>name:</strong> ${value.name}</p>
                        <p><strong>username:</strong> ${value.username}</p>
                        <p><strong>email:</strong> ${value.email}</p>
                        <p><strong>address:</strong> 
                                    <span><strong>street:</strong>  ${value.address.street}</span>
                                    <span><strong>suite:</strong>   ${value.address.suite}</span>
                                    <span><strong>city:</strong>    ${value.address.city}</span>
                                    <span><strong>zipcode:</strong> ${value.address.zipcode}</span> 
                                    <span><strong>geo:</strong> lat ${value.address.geo.lat} / lng ${value.address.geo.lng}</span></p>
                     </li>`
        }).join("");
        DATA_LIST.innerHTML = show;
    }

    /**
     * None of the following then will be executed on error,
     * and we will immediately get caught in the catch.
     * @param response
     * @returns {Promise<never>|Promise<unknown>}
     */
    let status = function (response) {
        if (response.status !== 200) {
            return Promise.reject(new Error(response.statusText))
        }
        return Promise.resolve(response)
    };

    /**
     * parse response as json
     * @param response
     * @returns {any | Promise<any>}
     */
    let json = function (response) {
        return response.json()
    };


    /**
     *  get data from the resource
     */
    fetch(USERS_LINK)
        .then(status)
        .then(json)
        .then((data) => {
            showItem(data);
        })
        .catch(err => {
            console.log(err);
        });
}());