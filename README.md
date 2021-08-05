# Yelpcamp

YelpCamp is a website where users can create and review campgrounds. In order to review or create a campground, you must have an account. This project was part of Colt Steele's web dev course on udemy.
This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication.

![home](screenshots/home1.png)

---

All campgrounds are displayed on the world map, users can open any campgrounds and get more detailed information about it

![campgrounds](screenshots/Campgrounds1.png)

---

![show](screenshots/show1.png)

---
User passwords are protected by hashing using salt.The database is protected from NoSQL injection by Express Mango Sanitize.The application is protected from Cross Site Scripting by Joi + Sanitize Html

![register](screenshots/register1.png)
