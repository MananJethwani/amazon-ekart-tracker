# AMET - Amazon E-kart Tracker
## One stop for tracking, notification and product history analytics!

Amazon E-kart Tracker is a web application where you can add tracker for any product that is available on amazon and it will notify you when it notices a price drop in last 365 days,
built using MongoDB, Express, React and Nodejs.

![main_page](https://github.com/MananJethwani/amazon-ekart-tracker/blob/master/Screenshot%20from%202022-12-20%2023-45-09.png)

## Features

- Add products to track 
- Get notified on your mail when there is a price drop
- Use line chart based analytics to visulaize price history

![product_page](https://github.com/MananJethwani/amazon-ekart-tracker/blob/master/Screenshot%20from%202022-12-20%2023-44-42.png)

## Tech

 AMET uses the following tech:

- [React](https://reactjs.org/) - HTML enhanced for web apps!
- [Puppeteer](https://github.com/puppeteer/puppeteer) - Headless chrome nodejs API
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [node.js] - evented I/O for the backend
- [Bootstrap](https://getbootstrap.com/) - Bootstrap is a powerful, feature-packed frontend toolkit.

## Setup

AMET requires [Node.js](https://nodejs.org/) v10+ to run.

### Backend

Install the dependencies and devDependencies.

```sh
cd amazon-ekart-tracker
npm i
```

Create a `.env` file in root folder and add the following line with mongoDB URI to it.

```text
MONGO_URI=<mongoDB connection URL>
```

To start the backend server open your terminal and type -

```sh
npm run start
```
### Frontend

For frontend install the dependencies and start the server

```sh
cd frontend
npm i
npm run start
```
