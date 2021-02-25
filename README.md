
# Building a Django Back End

In this project, you will be building a back wnd with Django for your iTunes project from phase 1.

## Tasks
1. Follow the directions below for *Using This Template* to start a project from the Django Project Template.
*strong suggestion not to use the built-in VS Code terminal and use iTerm instead*
2. Create a superuser by doing `python manage.py createsuperuser`.
3. Inside of the `static` directory, make directories for CSS and JavaScript.
4. Make a template in the templates file for your home page. For example, `index.html`.
5. Write a view in views.py that renders the template you made in 3.
6. Write a url path in `urls.py` that calls the view you made in 4.
7. Create a CSS file in the `css` directory.
8. Create a JS file in the `js` directory.
9. Place the HTML from your iTunes project in your homepage template.
10. Place the JS from your iTunes project in your js file.
11. Place the CSS from your iTunes project in the css file.
12. Add/adjust the links on your homepage template to your JS, CSS, and external files.
13. Do `python manage.py runserver` in the terminal, and see if you can see your page. If not, troubleshoot. 


## 🌶️🌶️ Spicy Options
- Using the DjangoGirls tutorial as a guide, add a new url and form to your site for people to submit album info. This
will require creating an `Album` model in `models.py`.
- Render the stored album info in addition to or instead of the info from the API.

# Django Project Template

This project was generated from the Momentum Django project template. This template sets up some minimal changes:
```
    django-extensions and django-debug-toolbar are both installed and set up.
    django-environ is set up and the DEBUG, SECRET_KEY, and DATABASES settings are set by this package.
    A starting Django app named core is provided.
    There is a custom user model defined in core.models.User.
    There is a templates/ and a static/ directory at the top level, both of which are set up to be used.
    A .gitignore file is provided.
    Pipenv is used to manage dependencies.
```

## Using this template

In an *empty directory*, run:
```py

django-admin startproject --template=https://github.com/momentumlearn/django-project-template/archive/main.zip --name=Pipfile project .
pipenv install
pipenv shell
cp project/.env.sample project/.env
python manage.py makemigrations
python manage.py migrate

```

**Replace `project` above with the name of your project.**
