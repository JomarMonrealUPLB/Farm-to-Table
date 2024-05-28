# Farm-to-Table

"Farm-to-table" means a social movement emphasizing a direct link between consumers and farmers as the source of food.

## How to run the website?

1. Clone this repository https://github.com/JomarMonrealUPLB/Farm-to-Table.git in your local directory.

2. In your terminal, make sure that your cloned repository is the current working directory.

3. Run the following commands to start the `server`:

   - cd server
   - npm install _(do it once)_
   - node index.js

   **Note: Your local server must be running at http://localhost:3000**

4. Run the following commands to start the `client`:

   - cd client
   - npm install _(do it once)_
   - npm start

   **Note: Your local client must be running at http://localhost:3001**

5. Open your browser and type http://localhost:3001 on the address bar.

6. **Congratulations!** Your website is now functioning.

7. For testing the website:

   - Log in the following credentials for customer view:

     - Email: "customer@example.com"
     - Password: "12345678"

   - Log in the following credentials for admin view:

     - Email: "merchant@example.com"
     - Password: "12345678"

## Website Specifications

### Login Page

- The user can login as a customer or a merchant

### Signup Page

### Customer View

#### Customer Homepage

- Includes quick links to other pages
  ![image](https://github.com/JomarMonrealUPLB/Farm-to-Table/assets/112914563/80166544-131f-4823-86f6-0efd101a2f88)

#### Shopping Page

- Shows the list of products with filterting, sorting, and searching functionalities
  ![image](https://github.com/JomarMonrealUPLB/Farm-to-Table/assets/112914563/1748a041-3be1-45b3-8948-8403a4b1e9a6)

#### Cart Page

- Shows cart items. User can add or remove a product
  ![image](https://github.com/JomarMonrealUPLB/Farm-to-Table/assets/112914563/8563c430-2bfa-4f8b-ba79-ddae1bea0106)

#### Profile Page

- Contains user information along with pending, fulfilled, and cancelled orders
  ![image](https://github.com/JomarMonrealUPLB/Farm-to-Table/assets/112914563/95374c20-82ea-4f83-8a48-679eaf98135f)

### Admin View

#### Admin Home Page

- Include quick links to other apges
  ![image](https://github.com/JomarMonrealUPLB/Farm-to-Table/assets/159239289/e8aeef82-666f-4dd0-8885-1f573fe6e15c)

#### Account Management Page

- Show all user accounts. Admin can view or delete them.
  ![image](https://github.com/JomarMonrealUPLB/Farm-to-Table/assets/159239289/1f5b82e7-a4cd-442c-abfa-2eaf4e759c07)

#### Order Fulfillment Page

- Show all pending orders. Admin can view, cancel, or fulfill them.
  ![image](https://github.com/JomarMonrealUPLB/Farm-to-Table/assets/159239289/343d10fa-e787-4eaf-a1ed-dc5eacc55306)


