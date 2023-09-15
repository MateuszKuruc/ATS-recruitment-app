# ATS-recruitment-app

The goal is to develop full fledged Applicant Tracking System (ATS) app for recruiters. This is a full stack app based on JavaScript and related tools:

- React for frontend
- Redux for state management
- NodeJS + Express for backend
- MongoDB as a non relational database
- Token authentication (JWT) for login
- Material UI for design layer
- Fly.io for hosting the whole app

The app allows a recruiter to better organise the recruitment process and make it more transparent. Functionalities:

- add candidate with the basic, universally used, data (name, e-mail, phone nubmer, experience, field, city, notice period etc.)
- upload and download candidate's CV
- delete candidate's records
- update candidate's profile (e.g. when their contact details or work experience change)
- sort candidates by the field of their specialisation (e.g. main programming lanugage/tool), location or years of experience

The idea is to add another weapon to individual recruiter's toolset in order to make their work more organised and more organised as compared with huge and overly complicated ATS systems incorporated by commercial companies. 

Each recruiter's data (meaning the data of their applicants, too) is only available to themselves, as the app provides data based on currently logged in user. This means that candidate's details will only be shown to the user who added them to the database, thus restraining app users from sharing sensitive data of others by the means of ATS app.