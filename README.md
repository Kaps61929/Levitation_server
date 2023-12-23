1)https://54.79.133.245:3000/auth/register  (for registering)  --->Post Method



Body:
{
    "name":"test1",
    "email": "test1@vail.com",
    "password": "aA@11jkndkjnsdf"
    
}




2) https://54.79.133.245:3000/auth/login  (for login)          --->Post Method



Body:
{
   
    
     "email": "test1@vail.com",
    "password": "aA@11jkndkjnsdf"
    
}





After this in every api header app jwt token ('token':'dmlk')


3) https://54.79.133.245:3000/blog/create    (create blog)    --->Post Method



Body:{
    "title":"firsadst blog",
    "content":"firasdsasdsadst blog first blog",
    "author":"6586f475ddcefc20e5c9c4f4"
}




4)https://54.79.133.245:3000/blog/get       (get all blog)     --->Get Method




 
5)https://54.79.133.245:3000/blog/updater/6586f6e0ddcefc20e5c9c4f8    (for updating blog)    --->Put Method



Body:
{
    "title":"first blog",
    "content":"dlkfkldskfml"
}




6)https://54.79.133.245:3000/blog/delete/6586f6e0ddcefc20e5c9c4f8   (for deleting blog)  --->Delete Method



### Server Side
```bash
  npm install
  node index.js
  
