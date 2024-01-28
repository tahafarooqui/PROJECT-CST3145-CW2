
# PROJECT-CST3145-CW2 AWS Express Backend 
This Vue.js web application, developed by Taha Farooqui and hosted on Elastic Beanstalk, utilizes a MongoDB database with two collections: Lessons and Orders. It is designed as a mobile app to manage lessons and a shopping cart, offering various functionalities to enhance the user experience.

## Frontend - Vue.js Application

- **GitHub Repository:** [Vue.js App Repository](https://github.com/tahafarooqui/PROJECT-CST3145-CW2-Frontend)
- **Live Application:** [Vue.js App on GitHub Pages](https://tahafarooqui.github.io/PROJECT-CST3145-CW2-Frontend/)

## Backend - Express.js Application

- **GitHub Repository:** [Express.js App Repository](https://github.com/tahafarooqui/PROJECT-CST3145-CW2-Backend)

## AWS Express.js Application

- **Live AWS Route:** [AWS Route for Express.js App](https://mdxapp.eu-west-2.elasticbeanstalk.com/)

## Additional Information

For more detailed information about each component, please refer to their respective repositories. Each repository includes specific instructions on setup, usage, and deployment.

Thank you for visiting my project!

## Mdxapp-cw2 Postman Collection

This document describes the Postman collection for the Mdxapp-cw2 API.


### Endpoints

#### Lessons

##### All Lessons

- **Method:** GET
- **URL:** `{{base_url}}/lessons/all-lessons?sort=LessonName&order=asc&search`
- **Test Script:** 
  ```javascript
  pm.test("Status test", function () {
    pm.response.to.have.status(200);
    var json = pm.response.json();
    pm.expect(json.msg).to.equal("success");
  });
  ```

##### Update Lessons

- **Method:** PUT
- **URL:** `{{base_url}}/lessons/update-lessons`
- **Request Body:**
  ```json
  [
    {"lessonId":"65b5cafa3fcd2c3adc0ed67f","newSpace":3}
  ]
  ```

#### Orders

##### Get Order by ID

- **Method:** GET
- **URL:** `{{base_url}}/orders/get-order-by-id/65b6c117f3d1851be69dcb6e`

##### Create Order

- **Method:** POST
- **URL:** `{{base_url}}/orders/create-order`
- **Request Body:**
  ```json
  {
    "username":"Taha Farooqui",
    "contact":"746564536",
    "items":[
        {
            "_id":"65b5cafa3fcd2c3adc0ed681",
            "LessonName":"Art History",
            "LessonLocation":"London",
            "LessonPrice":109,
            "TotalLessonSpace":9,
            "LessonSpace":1
        }
    ],
    "totalAmount":109
  }
  ```

##### Delete Order

- **Method:** DELETE
- **URL:** `{{base_url}}/orders/delete-order`

##### All Orders

- **Method:** GET
- **URL:** `{{base_url}}/orders/all-orders`