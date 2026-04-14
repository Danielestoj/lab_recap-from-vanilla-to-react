/*
Iteration 2 – Fetch and Display Users with Vanilla JS
Now it's time to bring our page to life! We will use JavaScript to fetch user data from an API and dynamically create
the user cards.

You'll be working in the app.js file.

Your task is to:

Select the necessary DOM elements (user-list-container and load-more-btn).
Create an async function that fetches data from https://dummyjson.com/users.
For each user returned from the API, create a div with the class user-card.
Populate the card with the user's image and name.
Append the new card to the user-list-container.
Add a click event listener to the button to trigger this function.
Tip

Remember to handle the loading state by disabling the button during the fetch request to prevent multiple clicks. 
Use a try...catch...finally block for robust error handling.*/
/*
fetch ('https://dummyjson.com/users')
    .then(response => response.json())
    .then(data => {
        const datos = data.users
        console.log(datos)
    })
*/
const listContainer = document.getElementById("user-list-container")
const moreBtn = document.getElementById ("load-more-btn")

async function buscadorUsuarios() {
    moreBtn.disabled = true;

    try {
        const response = await fetch ('https://dummyjson.com/users')
        const datos = await response.json();
        const users = datos.users;

        users.forEach(element => {
            const card = document.createElement("div");
            card.className ="user-card";
            card.innerHTML = `<img src="${element.image}" alt="${element.firstName}">
            <h3>${element.firstName} ${element.lastName}</h3>`;
            listContainer.appendChild(card)
        });


    }  catch (error) {
    console.error("Error fetching users:", error);
  } finally {
        moreBtn.disabled = false;
  }
}
    
moreBtn.addEventListener("click", buscadorUsuarios);

/*
Iteration 3 – Refactor to a React App
Our vanilla JS app works, but as apps grow, managing the DOM manually becomes complex. Let's refactor our project to use React, which makes managing UI state much easier.

First, set up a new React project. The quickest way is to use Vite. Open your terminal and run:

# npm 6.x
npm create vite@latest my-react-app --template react

# npm 7+, extra double-dash is needed:
npm create vite@latest my-react-app -- --template react
Navigate into your new project (cd my-react-app), install dependencies (npm install), and start the development server (npm run dev).

Your task is to recreate the user profile viewer as a React component.

Delete the contents of src/App.css and replace them with the CSS from our style.css file.
In src/App.jsx, create a component named UserList.
Use the useState hook to manage an array of users, a loading boolean, and the skip count.
Use the useEffect hook to fetch the initial batch of users when the component first mounts.
Create a function fetchUsers that contains the async/await logic. When you get new users, append them to the existing users state array.
Render the list of users by mapping over the users state array.
Add a button that calls fetchUsers when clicked.
Caution

When mapping over an array to create elements in React, don't forget to add a unique key prop to each element, like <div key={user.id}>. This helps React identify which items have changed, are added, or are removed.

*/