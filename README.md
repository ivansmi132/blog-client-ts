# OurBlog - A Fullstack Blog Application

### Render Cloud URL: 
https://react-client-d2vl.onrender.com
It might take a minute for the server to wake up.
I added ilia's grunitech email as a test email in my google oauth configurations so that he can sign in and test the application. 
Supported image formats: png/jpeg/gif

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### .env file :
REACT_APP_API_URL=http://127.0.0.1:3001 \
HOST=127.0.0.1

### Utilized Libraries:
1. antd
2. react-router-dom
3. react-hook-form

### All Users Functionality: 
1. Read posts
2. Filter posts by title or by post creator's name
3. Login with Google account (Register) 
4. Logout 

### Authenticated Users Functionality: 
1. Create posts, optionally attach image
2. Edit posts created by the user

### Admin Privileges:
1. Delete any post
2. Edit any post

### To Be Implemented: 
1. Post comments
2. Apply admin moderation on user posts before making them public 
3. Allow users to customize their profile
4. More fun

### Known Issues:
1. It is not possible to remove image on post edit, only replace it
2. An authentication token expiration in the middle of a session is not handled
3. Error handling in usePostsAPI can be improved upon 
4. Post and User models implementation can be improved

