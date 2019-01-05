# Bamazon

## Overview

Bamazon is an Amazon-like storefront, node/console run application with a MySQL database backend. The app takes in orders from customers and depletes stock from the store's inventory. 

### Customer View 

1. The products table in the Bamazon mySql database has each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

2. The database has 11 different products. 

![Initial Prompt](/screenshots/initialPrompt.png)

3. Running the Node application `bamazonCustomer.js` will first display all of the items available for sale. Include the ids, names, prices and remaining stock of products for sale.

4. The app then prompts users with two messages.

   * The first asks the user which product they would like to buy.
   * The second message asks how many units of the product they would like to buy.

5. Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.

![Not Enough Inventory](/screenshots/notEnough.png)

   * If not, the app logs a phrase like `There is not enough inventory.. Try again`, and then prevents the order from going through.

6. If there is enough of the product to complete the request, the customer's order is filled.

![Order Completed](/screenshots/orderCompleted.png)

   * This means the SQL database is updated to reflect the remaining quantity.
   * Once the update goes through, the customer is displayed the total cost of their purchase.

- - -