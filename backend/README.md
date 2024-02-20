<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="../frontend/images/logo.svg" alt="Logo" width="80" height="80">
  <h3 align="center">School Results Management UI</h3>

  <p align="center">
    An NextJS + MySQL application Backend to manage Students, Courses and School Results
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

School Results management is an application to manage schools results. Also, it provides to end user the Students and Courses modules whose has the following features:

* Students Module: Manage students by creating, editing and deleting.
* Courses Module: Manage courses by creating, editing and deleting.
* Results Module: Manage student's results by asociating creating, editing, and deleting student's results into the      different courses

### Built With

School Management UI was built with the following frameworks/libraries.

[![Next][Next.js]] ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Intall npm into your system
  ```sh
  npm install npm@latest -g
  ```

* Intall mysql database engine into your system, download the installer and run it
  ```sh
  go to url: https://dev.mysql.com/downloads/mysql/
  ```
  
* Create a schema into the mysql database engine. For the example we used: 'localhost'
  ```sh
  go to url: https://dev.mysql.com/downloads/mysql/
  ```

### Installation

_For running the app, follow the steps below_

1. Clone the repo
   ```sh
   git clone https://github.com/jfcastro92/school-management-app.git
   ```
2. Go to the frontend folder
   ```sh
   cd /frontend
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
3. Go to the Database configuration file into the school-management-app/backend/src/config/dbConnection.ts and edit connection credentials
   ```sh
   export const dbConfig = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'localhost',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

* Navigate to `http://localhost:3001/`. The application will automatically reload if you change any of the source files.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Juan Castro - [@your_twitter](https://twitter.com/your_username) - jfcastro9208@gmail.com

Project Link: [https://github.com/jfcastro92/school-management-app](https://github.com/jfcastro92/school-management-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

