# Term 3 JS Project : Birthday App

Hey team! So the final project here will be a birthday list.

We have a list of persons. The app will show us whose person is the closest to have their birthday.

You have a file in the project called person.json. It contains a list of persons, and we want to add all those persons to our birthday list app.

The first time you launch the app, it should fetch all the data from the people.json local file. You can use fetch for that, it also works with local files.

Once they are loaded in the app, you can save them on localstorage, and you don't need to work with the json file anymore.

The app will show the list of people, sorted by the ones who will have their birthday the soonest.

![assets/Screenshot_2020-09-12_at_16.57.18.png](assets/Screenshot_2020-09-12_at_16.57.18.png)

The screenshot is just an example of a possible layout. Feel free to create a custom layout with boostrap if you want to.

The users will be able to add a new element on the list (only on the app list localstorage, not on the json). Here are the fields :

-   first name
-   last name
-   birthday (datepicker)
-   an url for their avatar image
-   an id for handling the operations on the objects. (no need to add that on the form)

The users should be able to edit an element on the list. When you click the edit button, a modal should appear with a form inside, to edit any attribute.

The users should be able to delete an element. There will be a modal that will ask if you're sure to delete the element.

Every action should be persisted into the local storage.

Here is the package you should use for handling date computations. Add it as a dependency of your project

[https://date-fns.org/v1.29.0/docs/differenceInYears](https://date-fns.org/v1.29.0/docs/differenceInYears)

Again, try to make a plan, by dividing big tasks into smaller ones.
You have the whole week to work on it. You can collaborate with other students, but copy/pasting code is forbidden.
Once you're finished with the functionality, try to make your app more appealing with css and other tricks.
Be creative 🎨

Good Luck

/********************************************************/

# Readme update : Birthday app.

1. In this project, It does not really work properly, although some of the features are working but the truth to be told, not all of them are working. With the delete person for instance, it deletes the person but not display the list unless you refersh the page then it's deleted. Similar problem with the edit.

1. If you had more time, I would probably work on the filter and cleaning up the code. At the moment, there is still no style, so styling it is what I would at the end of the day, it has bad looking. It seems as if the local storage did not work properly when I split the functions in different files, I worked on in the whole days but did not come with the best idea.

1. Yes, I learned something while I was doing this project, It was hot, I learned a bulk of subjects, methode about time especially. I am not sure but It seems that we can not assign variable from imported file.

1. Well, this one was not that easy but the most challenging part was dealing with the dates, tranforming time stamps into a real readable human date and then sorting it from to the nearest date, nightmare, although I like it. Playing puzzle.

1. Yes, I have a lot to say here. If you wouldn't mind explaining about the date-fns. Then, I am not sure if we can reassing a variable from a module files in another file. One thing I would like you to give a bit of explanation is this `parseInt()` method. I saw it on a website and what it said was it gives a string to a radical numeric number but I not sure if I fully understood it.

1. Nothing much to say, the project was challenging which is pretty nice training, I liked it.