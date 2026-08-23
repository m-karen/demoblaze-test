# Repository: demoblaze-test
## *Demoblaze purchasing process*

## Repository creation
- New (empty) public repository created on GitHub
- Repository cloned locally: `git clone https://github.com/m-karen/demoblaze-test`
- Project created locally in repository and Playwright installed: `npm init playwright@latest` (TypeScript selected during installation)
- Directory structure with code created

## Prerequisites
On a fresh installed computer, `node-v24.18.0-x64.msi` and `VSCodeSetup-x64-1.134.0.exe` with the `Playwright Test for VS Code` extension (https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) are installed.

Followed this tutorial: https://playwright.dev/docs/getting-started-vscode (see attached `screenshot.png`)

Installed `Git-2.55.0.5-64-bit.exe` and optionally `GitExtensions-x64-7.2.0.92-501f831.msi` for communication with GitHub.

## Test start
The test can be run locally in Visual Studio Code with the extension or also directly in the repository from the CLI: `npx playwright test`

## Justification of the choice of architecture and methods of asynchronous waiting

The code was intended to demonstrate a robust and maintainable approach to automated UI testing using the Playwright framework, taking advantage of Playwright's asynchronous handling.

The architecture is built on the **Page Object Model (POM)** design pattern, extended by the component composition principle. This approach separates the testing logic from the technical details of page interaction.

- **Separation of Responsibilities:** Page classes (`HomePage`, `ProductDetailPage`, `CartPage`) encapsulate locators and page-specific interactions (the test itself contains only business logic, i.e. user steps, which makes it easy to read).
- **`BasePage` Abstract Class:** It serves as a basic building block (enforces the implementation of the `isLoaded()` method on all inheriting pages).
- **`NavigationHeader` Component:** It is separated and is then instantiated inside `BasePage`.

## Asynchronous waiting methods

- **Built-in Auto-Waiting:** When calling actions like `await this.page.locator('#cartur').click()` Playwright waits asynchronously until the element is attached to the DOM, visible, stable and able to receive events.

- **Web-First Assertions:** "Polling" assertions are used in the `isLoaded()` methods, where Playwright asynchronously tests the state of the table again and again until it appears or a timeout expires.

- **"Page Guard" Design Pattern:** The `isLoaded()` method acts as a state guard. A typical Single Page Application (SPA), such as Demoblaze, does not change pages by classic reloading, but by asynchronously downloading data and redrawing the DOM.

- **Event Promises (Prevention of Race-conditions):** The `addToCart()` method demonstrates advanced handling of asynchronous events (pop-up alert in the browser). By creating the promise declaratively before the action itself, the event is 100% guaranteed to be caught.

# SQL & Cleanup

## 1. Data cleaning (DELETE)

**A.** If a foreign key with the `ON DELETE CASCADE` rule is defined in the database, it is enough to simply delete the customer directly and the linked records will be deleted automatically:

```SQL
DELETE FROM customers WHERE email = 'test.user@example.com';
```

**B.** If the `ON DELETE CASCADE` rule is not explicitly set on the foreign key in the database, it is necessary to strictly follow the deletion order - first delete the dependent data (child) from the `bookings` table and only then the customer itself (parent) from `customers`. A test email will be used to securely identify the test data.

**[B1]** Wrapping it in a transaction guarantees that no data is left hanging if one of the commands fails:

```SQL
BEGIN;

-- 1. Deleting dependent bookings for a test customer
DELETE FROM bookings 
WHERE customer_id IN (SELECT id FROM customers WHERE email = 'test.user@example.com');

-- 2. Deleting the customer himself
DELETE FROM customers 
WHERE email = 'test.user@example.com';

COMMIT;
```

**[B2]** In PostgreSQL, you can use CTE (Common Table Expression) for safe cleanup within a single query:

```SQL
WITH target_customer AS (
    SELECT id 
    FROM customers 
    WHERE email = 'test.user@example.com'
),
deleted_bookings AS (
    DELETE FROM bookings 
    WHERE customer_id IN (SELECT id FROM target_customer)
)
DELETE FROM customers 
WHERE id IN (SELECT id FROM target_customer);
```

## 2. Verifying storage of address (JOIN)
Query to verify that there is a corresponding record with an address in the `addresses` table (which has a foreign key `user_id`) for a newly registered user in the `users` table:

```SQL
SELECT 
    u.id AS user_id,
    u.email,
    a.street,
    a.city,
    a.zip_code,
    a.country
FROM users u
JOIN addresses a ON u.id = a.user_id
WHERE u.email = 'test.user@example.com';
```

*(If the query returns an empty result, it means that the record was either not saved in the addresses table at all, or was saved with a missing or incorrect foreign key `user_id`.)*
