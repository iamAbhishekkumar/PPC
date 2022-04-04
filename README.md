<h1 align="center">Python Project Creator</h1> 
<br>
<p align="center">
<img width="200" src="assets/icon.png" alt="logo">
  <br><br>
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="flutter">
  <img  src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="firebase">
  <br><br>
  
</p>

Just as Code Style, API Design, and Automation are essential for a healthy development cycle. Repository structure is a crucial part of your project’s architecture.

When a potential user or contributor lands on your repository’s page, they see a few things:

    Project Name
    Project Description
    Bunch O’ Files

Only when they scroll below the fold will the user see your project’s README.

If your repo is a massive dump of files or a nested mess of directories, they might look elsewhere before even reading your beautiful documentation. Dress for the job you want, not the job you have.

Of course, first impressions aren’t everything. You and your colleagues will spend countless hours working with this repository, eventually becoming intimately familiar with every nook and cranny. The layout is important.

**So, to solve that problem, here it is a vs-code extension which creates the best possible project structure.**

## How to install⚓️

Directly search for **PPC** or [refer to this](https://marketplace.visualstudio.com/items?itemName=iamAbhishekkumar.ppc).

## Preview📺

![Demo](assets/demo.gif)

## Known Issues🕵

- "Open in new window" dialog appears way before completion of terminal's task.

- Tested for linux os only.

## How to Contribute🚀

1. Fork the [repo](https://github.com/iamAbhishekkumar/PPC)
2. If the Issue you want to solve is not present in open issue, create an Issue.
3. Comment on the issue, you want to work on.
4. Work on your Fork and test it.
5. Send A PR
6. Follow [me](https://github.com/iamAbhishekkumar)🙃

## How to setup⭐️

1. Clone the forked repo
2. Go to the directory
3. Run `npm i` or `npm install`
4. To run the extension : `Ctlr + f5`
5. To build the extension : `npx vsce package`

## Different Project Structures🚧

- Basic App Structure

```
projectName/
│
├── .gitignore
├── projectName.py
├── LICENSE
├── README.md
├── requirements.txt
├── setup.py
└── tests.py
└── env
```

- Installable Package

```
projectName/
│
├── app
│   ├── __init__.py
|   ├── projectName.py
│   └── helpers.py
├── tests
│   ├── folder_name_tests.py
│   └── helpers_tests.py
├── .gitignore
├── LICENSE
├── README.md
├── requirements.txt
└── setup.py
└── env
```

- Flask-App: Basic

```
projectName
│
├── app
│   ├── __init__.py
    ├── projectName.py
│   ├── views.py
│   ├── models.py
│   ├── helpers.py
│   └── static
│       └── main.css
│   └── templates
│       └── index.html
├── config.py
├── .gitignore
├── LICENSE
├── README.md
├── requirements.txt
```

- Flask-App: Advanced

```
projectName
 ├── app
 │   ├── __init__.py
 |   ├── projectName.py
 │   ├── extensions.py
 │   │
 │   ├── helpers
 │   │   ├── __init__.py
 │   │   ├── views.py
 │   │   ├── models.py
 │   │   └── commands.py
 │   │
 │   ├── auth
 │   │   ├── __init__.py
 │   │   ├── routes.py
 │   │   ├── views.py
 │   │   ├── models.py
 │   │   ├── forms.py
 │   │   └── commands.py
 │   │
 │   └── ui
 │       ├── static
 │       │   ├── css
 │       │   │   └── styles.css
 │       │   └── js
 │       │       └── custom.js
 │       │
 │       └── templates
 │           ├── 404.html
 │           ├── 500.html
 │           └── base.html
 │
 ├── tests
 │   ├── __init__.py
 │   ├── conftest.py
 │   │
 │   └── auth
 │       ├── __init__.py
 │       └── test_views.py
 │
 ├── config.py
 ├── wsgi.py
 ├── requirements.txt
 └── README.md
```

## References😸

- [How to structure Flask Applications](https://laymanclass.com/how-to-structure-flask-application-for-larger-projects/)

- [Python Application Layouts](https://realpython.com/python-application-layouts/#django)

If you like it, ⭐️ this repo 🙃
