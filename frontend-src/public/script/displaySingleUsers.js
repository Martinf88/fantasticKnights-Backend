const userList = document.querySelector('.user-list')

export function displaySingleUsers(userData) {
    const userItem = document.createElement('div');
    const userName = document.createElement('h4');
    const userAdmin = document.createElement('p');
    const editButton = document.createElement('button');

    userItem.classList.add('user-item');
    editButton.classList.add('edit-button');
    editButton.innerText = 'Edit';
    editButton.setAttribute('data-id', userData._id);

    userName.textContent = `User: ${userData.name}`; 
    userAdmin.textContent = `Admin: ${userData.isAdmin}`; 

    userItem.appendChild(userName);
    userItem.appendChild(userAdmin);
    userItem.appendChild(editButton);

    userList.appendChild(userItem);
}
