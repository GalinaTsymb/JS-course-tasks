// Обычно jQuery подключаю через установку пакета npm или сохраняю минимизированный файл jquery в папку libs.js
// данная задача - простая, поэтому поключаю через cdn

$(document).ready(function() {

    const $LINK          = 'https://jsonplaceholder.typicode.com/comments';
    const $USER_COMMENTS = $('#users-comments');
    const USER_ID        = $USER_COMMENTS.find('.js-user-id');
    const USER_POST_ID   = $USER_COMMENTS.find('.js-post-id');
    const $USER_LIST     = $USER_COMMENTS.find('.js-comments-list');
    let   $findUsers     = { userId: 3 , postId: 15 };
    let   users          = [];

    let renderUser       = makeRender('.js-user-template');

    USER_ID.html($findUsers.userId);
    USER_POST_ID.html($findUsers.postId);

    function renderUsers() {
        let users_html = users.map(function(user) {
            return renderUser(user);
        }).join('');

        $USER_LIST.html(users_html);
    }

    $.ajax({
        url: $LINK,
        method: 'GET',
        data: $findUsers,
        async: true
    }).done(function(data) {
        users = data;
        renderUsers();
    });
});