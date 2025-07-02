## Tumblr

Determine whether you want to work on features together, one at a time, or have pairs work on features together, or if everyone in the group gets their own feature.
Be smart about your Git workflow. Create branches, commit to them, then create Pull Requests on GitHub to let others see your changes.

* What features are needed to make this an application that people would use?
* What features would be nice to have if the minimum viable product gets finished?
* Will these features demonstrate everything we've learned during the first half of the course?


1. Posts
    * Users should be able to view all posts.
        * Get query of all the post in the database
    * Users should be able to create posts.
        * Create button when logged in so the id can be tied to that users post. The new post should be added to the database and reflected to all the post page
    * Users should be able to update their posts.
        * Get the id of the specific user post that should be updated.
        * Should the form be prefilled to update data?
    * Users should be able to delete their posts.
        * Select post that needs to be updated by id
        * When deleting it should cascade to delete everywhere in the site
        * We should have a two check process to make sure that’s the id post you want to delete.
2. Comments
    * Users should be able to view all comments on a post.
    * Users should be able to create a comment on a post.
    * Users should be able to update their comment on a post.
    * Users should be able to delete their comment from a post.
3. Likes
    * Users should be able to view the likes on a post.
    * Users should be able to like a post.
    * Users should be able to unlike a post.
4. Follows
    * Users should be able to view who they follow.
    * Users should be able to follow another user.
    * Users should be able to unfollow another user.
5. Bonus: Search
    * Users should be able to search for specific user's posts.
    * Users should be able to view the results of their search.


Required Design Documents
1. Features List / MVP
2. DataBase Schema (both tables and the diagram with relationships)
3. User Stories
4. Scrum Board (either Github projects or something like Trello/Asana/Habitica)
5. Wire Frames (if you are making an original site)

Schedule Build Timeline


Day	Tasks to Work On	Design Docs Due
Monday	Select Project, Feature List	What site to clone
Tuesday	Feature List, DB Schema	Feature List
Wednesday	DB Schema, User Stories	DB Schema
Thursday	User Stories, Wire Frames (if your site is original)Set up Scrum Board (GitHub Projects)	User Stories
Friday	Release & Review Project Starter	Scrum Board


Evaluating your completion

Full-stack projects will be evaluated against the following "Minimal Viable Product" features.
1. New account creation, login, and guest/demo login
2. A production README file for your GitHub repository containing
    * Brief explanation of what the app is and does
    * Link to live site
    * Discussion of technologies used
    * Discussion of two features that show off the team's technical abilities
    * Discussion of both challenges faced and the way the team solved them
    * Code snippets to highlight the best code
3. Hosting on Render.com
4. For four features:
    * 2 features must be full CRUD, the other 2 features can be partial CRUD
    * Adequate styling
    * Smooth, bug-free navigation
    * Adequate and appropriate seed data to demonstrate the feature


CSS Project Requirements

TO DO CHECKLIST
Important Note: You must finish the basic functionality of your feature before styling it.
* ✅ All links, buttons, input fields, and text features on the site are functioning properly and belong to the features that were worked on
* ✅ The alignment / justification of each element is consistent with the target cloned site
* ✅ The colors used on each element are comparable with the target cloned site or within professional standards
* ✅ The fonts & font sizes used on each element are comparable with the target cloned site
* ✅ Google Fonts Links to an external site.or the built-in browser fonts must be used for fonts
* ✅ Your site has no glaring visual issues on a standard size laptop (needs to be a desktop version of the target cloned site - 1024px)
* ✅ The logo and name of your application are different from the target cloned site
* ✅ Your document page title and application's favicon match that of the name and the logo of your application
* ✅ The white spacing (padding, margin, border, and positioning) of each element are consistent with the target cloned site
* ✅ The box-shadows of each element are consistent with the target cloned site
* ✅ The buttons are consistent with the target cloned site
* ✅ The menus are consistent with the target cloned site
* ✅ The mouse-pointers are consistent with industry standards
* ✅ The hover effects on each element are consistent with the target cloned site
* ✅ The icons used are comparable with the target cloned site
* ✅ FontAwesome Links to an external site.must be used for icons
* You can use FlexBox
* You can use Grid.css
