# Suvepidu Project (frontend)
This project consists of a backend service built with Java and PostgreSQL, and a frontend built with Vue.js and JavaScript.

# Project Status and Contact
**Please note that this project is actively under development, with ongoing improvements and updates being made on a weekly basis.**
As such, you may encounter features that are still in progress or incomplete.
Your feedback and contributions are highly appreciated as we work towards enhancing and completing the project.

If you want to contact me, you can reach me at **madli.petuhhov89@gmail.com**.

Thank you for your understanding and support as I continue to develop and refine the Suvepidu project.

## Repositories
[Backend Repository](https://github.com/madlipetuhhov/suvepiduback-madli)
[Frontend repository](https://github.com/madlipetuhhov/suvepidufront-madli)

## Prerequisites
Ensure you have the following installed on your local machine:
- Java Development Kit (JDK) 8 or higher (for the backend)
- Gradle (for the backend)
- Node.js and npm (for the frontend)
- PostgreSQL Database (for the backend)

## Backend Installation
Clone the [Frontend repository](https://github.com/madlipetuhhov/suvepidufront-madli)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Usage
The frontend communicates with the backend API to fetch and display data. It serves as the user interface for interacting with the application.

## Logging In
To access the online ticket platform and manage events, follow these steps to log in:
1. Open your web browser and navigate to the platform's login modal 'LOGI SISSE'.
2. Use the following credentials:
Username (kasutajanimi): korraldaja
Password (parool): 123
3. Click on the "Logi sisse" button to proceed.

## Creating a New Event
Once logged in, you can create a new event through the following stages:

### Stage 1: Add Main Event
1. Navigate to the platform's 'MINU SÜNDMUSED' view.
2. Choose from the dropdown menu under which company you want to add the event.
3. Click on the big plus sign on the card called 'Lisa sündmus'. A view will open to add a title (Pealkiri), description (Sündmuse kirjeldus) and image (Pilt) for the event.
4. After adding all the information, click the 'OK' button to finalize the addition of the event to the list associated with the respective company.

You can now proceed to add more details to the event in the subsequent stages:

### Stage 2: Add Features and Categories
Define features (e.g., parking, food) and categories (e.g., music, festival, workshop) for the event.
1. Navigate to the 'Võimalused & kategooriad' view via button located on main event card.
2. Click the plus button at the bottom of the table. This will open a modal where you can add features (Võimalused) and categories (Kategooriad) using radio buttons.
3. Return to the 'MINU SÜNDMUSED' view to locate your event, now updated with the added features and categories.

### Stage 3: Add Ticket Types
Define various ticket types (e.g., VIP, children) for the event and price for each ticket type.
1. Navigate to the 'Piletitüübid' view via button located on main event card.
2. Click the plus button at the bottom of the table. This will open a modal where you can specify ticket type name (Piletitüüp) and price (Hind).
3. Return to the 'MINU SÜNDMUSED' view to locate your event, now updated with ticket types.

### Stage 4: Add Event Location Details and Ticket Amounts
Define event location(s) details (e.g., address, time) and ticket amounts for each ticket type for each event location.

Location(s) details:
1. Navigate to the 'Toimumiskohad & piletid' view via button located on main event card.
2. Click the plus button at the bottom of the table. This will open a modal where you can specify date (Kuupäev), start-time (Algus), end-time (Lõpp), county (Maakond), address (Aadress), longitude (Pikkuskraad) and latitude (Laiuskraad).
3. After adding all the information, click the 'Lisa' button.

Ticket amount for each location:
1. Navigate to the 'Piletid' view by clicking the button located in the locations table.
2. Click the plus button at the bottom of the table. This will open a modal where you can specify ticket amounts (Piletite arv) for each ticket type.
3. After adding all the information, click the 'Lisa' button.

## Editing Event
You can also edit all the event details (title, location, features, categories, tickets etc.) in the same views used for adding the event.

## Viewing Event
This view is not ready yet.
