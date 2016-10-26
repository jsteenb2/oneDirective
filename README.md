#One Directive
######A front-end web application for building a personal website.

##I. Introduction
One Directive is a front-end solution for every individual's desire to build a personal website. It abstracts away the technical process and allows them to build one without having to know how to code.

##II. Technical Overview.
One Directive consists of a client-side application that interfaces with a custom API for data. The client-side application was built using Angular 1.x. The API, on the other hand, was built using Ruby on Rails.

###A. Back-end
The application uses a custom-built API for serving data to the client-side application. The API stores data in a Postgresql database and serves it in JSON. The data was modeled as follows: users who own projects, projects that have rows, and rows that have components.

One Directive is a secure application. It uses Devise to handle user authentication, keeping their credentials safe. This is buttressed by Rails' own countermeasures, such as Cross-Site Request Forgery (CSRF) Protection. The Rails controller filters malicious requests as they are passed down by the Route Dispatcher. Any user registered with our application can rest at ease, knowing that their private information is in good hands.

One of the core features in One Directive is serving the user's completed website in the form of a Github repository. To that end, the team used the Octokit gem. The gem builds an interface with the Github API, which we then used to create a unique repository with the user's website.

The projects page features photo uploads for each project card. The team used the Paperclip gem to cache these uploads for storage in an AWS server.

###B. Front-end
The application greets the user with a landing page, asking them to sign up. Upon registration, the user is redirected to the projects page, solely occupied by a button to create a project. When the user clicks the button, they are greeted with a modal for inputting a title and description. They can click on the submit button when they're satisifed, and a card for it will appear almost instantly.

The user can click on a project card to begin working on their own website. The user can drag Bootstrap components from the left side bar and place them anywhere inside the workspace. These components range from the typical button to the navbar. These components can also be resized according to their needs.
