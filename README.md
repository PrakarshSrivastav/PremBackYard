# PremBackYard

![Uploading PremBackYard.gif…]()

**PremBackYard** is a Spring Boot web application that showc![PremBackYard](https://github.com/user-attachments/assets/71c1e7d5-cfd2-4722-b59a-f2be20ba6830)
ases Premier League player data stored in a PostgreSQL database. The application provides filtering options to view players based on their position, nation, and team. It also displays relevant player statistics such as matches played, minutes played, goals, assists, and more.

### Motivation
The love of football drove me to create this application. As a Fantasy Premier League player, I wanted an easy way to evaluate player statistics and see whose stats look the best for getting into my squad and maximizing my points. This app allows me to filter and compare players based on key statistics and make informed decisions for my fantasy team.

## Screen Recording

Here’s a quick demo of how the **PremBackYard** app works:

[![PremBackYard Demo](https://img.youtube.com/vi/AB3x8GTA8Us/0.jpg)](https://www.youtube.com/watch?v=AB3x8GTA8Us)




## Features

- **Player Filtering**: Filter players by position, nation, and team.
- **Player Statistics**: View key statistics like matches played (MP), minutes (Min), goals (Gls), assists (Ast), expected goals (xG), expected assists (xAG), and more.
- **Basic HTML/CSS/JS**: A simple user interface built with HTML, CSS, and JavaScript for ease of use.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)


## Technologies Used

- **Spring Boot** - Backend framework for handling requests and responses
- **PostgreSQL** - Relational database to store Premier League player data
- **HTML/CSS/JavaScript** - Basic frontend for the user interface
- **JPA (Java Persistence API)** - To interact with the database
- **Thymeleaf** - Template engine for rendering dynamic web pages

## Installation

### Prerequisites

- Java 11+
- PostgreSQL
- Maven
- Git

### Clone the Repository

To get started with the project, clone the repository:

```bash
git clone https://github.com/yourusername/PremBackYard.git
cd PremBackYard
