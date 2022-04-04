# Python Project Creator:computer:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

Just as Code Style, API Design, and Automation are essential for a healthy development cycle. Repository structure is a crucial part of your project’s architecture.

When a potential user or contributor lands on your repository’s page, they see a few things:

    Project Name
    Project Description
    Bunch O’ Files

Only when they scroll below the fold will the user see your project’s README.

If your repo is a massive dump of files or a nested mess of directories, they might look elsewhere before even reading your beautiful documentation. Dress for the job you want, not the job you have.

Of course, first impressions aren’t everything. You and your colleagues will spend countless hours working with this repository, eventually becoming intimately familiar with every nook and cranny. The layout is important.

**So, to solve that problem, here it is a vs-code extension which creates the best possible project structure.**

## How to install:anchor:

This extension is in its initial stage, thus to install, download the vsix file from [here.](https://github.com/iamAbhishekkumar/PPC/releases/download/v0.0.1/ppc-0.0.1.vsix) And run this command :

    code --install-extension ppc-0.0.1.vsix

## How to use

![Demo](assets/demo.gif)

## Known Issues:detective:

- "Open in new window" dialog appears way before completion of terminal's task.

- Tested for linux os only.

## How to Contribute:rocket

1. Clone this repo using, `git clone https://github.com/iamAbhishekkumar/PPC`

2. Go to the directory.
3. Run `npm i` or `npm install`

4. To run the extension : `Ctlr + f5`

5. To build the extension : `npx vsce package`

## Different Project Structures:construction:

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

## References :smile_cat:

- [How to structure Flask Applications](https://laymanclass.com/how-to-structure-flask-application-for-larger-projects/)

- [Python Application Layouts](https://realpython.com/python-application-layouts/#django)

**If you like it, :star:this repo :upside_down_face:**

**If you find any issues, feel free to raise issues. Enjoy!:smile:**
