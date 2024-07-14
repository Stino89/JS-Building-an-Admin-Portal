// Your Code Here
// The main function is asynchronous and acts as the entry point of the script.
async function main() {
    // Wait for the fetch request to complete and retrieve the response from the server.
    let response = await fetch('http://localhost:3001/listBooks')

    // Parse the JSON response into a JavaScript object.
    let books = await response.json()

    // For each book in the list, call the renderBook function.
    books.forEach(renderBook)
}

// The renderBook function takes a book object as an argument and creates a list item with book details.
function renderBook(book) {
    // Select the root element in the HTML where the book list will be appended.
    let root = document.querySelector('#root')

    // Create a list item element to hold the book information.
    let li = document.createElement('li')
    li.textContent = book.title // Set the text content to the book's title.

    // Create an input element to display and edit the book's quantity.
    let quantityInput = document.createElement('input')
    quantityInput.value = book.quantity // Set the input's value to the book's quantity.

    // Create a button element to save the updated quantity.
    let saveButton = document.createElement('button')
    saveButton.textContent = 'Save' // Set the button's text content to "Save".

    // Add an event listener to the button for the click event.
    saveButton.addEventListener('click', () => {
        // Send a PATCH request to the server to update the book's quantity.
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH', // Use the PATCH HTTP method for partial updates.
            headers: {
                'Content-Type': 'application/json' // Set the request's content type to JSON.
            },
            body: JSON.stringify({ // Convert the updated book data to a JSON string.
                id: book.id, // Include the book's ID.
                quantity: quantityInput.value // Include the updated quantity from the input element.
            })
        })
    })

    // Append the input element and the save button to the list item.
    li.append(quantityInput, saveButton)

    // Append the list item to the root element in the HTML.
    root.append(li)
}

// Call the main function to start the script.
main();
