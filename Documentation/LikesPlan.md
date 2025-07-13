## planning out the "Likes" functionality:

First we should make a likes table. 
    - Each like should make an association between the user and the post. 
    - We should make sure that the User and Post models account for likes
    - We'll need to do a data migration once its all setup


We need to make a backend API routes file for the likes
    - it should be a POST route to add a like (a user should have to be logged in)
    - a DELETE route to remove a like(a user should have to be logged in)
    - and a GET method to view likes (this one we can allow for unauthenticated users)


Then we can make a frontend file for the likes
    - first we need to make the Store slice for the likes

Then we can make a components folder and make a like component (and i usually add an index file as well to make imports easy)
    - here we can implement showing the current like count and whether the use has likes a post or not
    - we can add the html and css stuff there or just the html and put the css in another file in the folder if we wanna keep it all separate. both work

    