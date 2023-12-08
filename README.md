# ReactPedia - A React.js Learning Platform

https://reactpedia.vercel.app/

Welcome to our interactive learning platform dedicated to teaching the basics of React.js to beginners and amateur developers. Through a fusion of AI-powered support, hands-on coding within an in-browser development environment, and an extensive selection of video tutorials, we aim to make learning React.js an accessible and enjoyable journey for everyone.

## Project Objectives

- **AI-Powered Assistance**: Deliver instant support for user queries, provide practical exercises, quizzes, and code debugging help.
- **In-Browser Development Environment**: Allow users to write, test, and run code directly in the browser, negating the need for external IDE installations.
- **Video Tutorial Library**: Offer curated video content from expert programmers and give users the ability to compile their own playlists for a customized learning experience.

## Tech Stack

- **Front-End**: React.js, HTML5, CSS3, JavaScript ES6+
- **AI Integration**: OpenAI API (GPT 3.5)
- **In-Browser Editor**: OneCompiler
- **Video Integration**: YouTube Data API
- **Continuous Integration (CI)**: GitHub Actions
- **Testing Framework**: Vitest
- **Deployment**: Vercel
- **Version Control**: Git

## Contributors

- **Jashan Gill**: OneCompiler Developer & Vercel Deployment Overseer
- **Anthony Gudiel**: UI Designer, OpenAI Developer & Educational Content Strategist
- **Clement Lau**: YouTube and OpenAI Developer, DevOps Engineer & Quality Assurance
- **Duc viet Nguyen**: API Features Planner & YouTube Features Analyst


## Setup Instructions

To set up this project locally, follow the instructions below:

1. Clone the repository via `git clone https://github.com/anthony-gudiel/reactjs-learning-app.git`
2. Download dependencies with `npm install`
3. Navigate to the `app` directory within the repository with `cd app`
4. Start the website on localhost with `npm run dev`

### API Keys and Environmental Variables
In order to use YouTube and OpenAI features, you must set up a `.env` file and retrieve the YouTube Data API key, OpenAI API key, and an OAuth Client ID.<br>

<b>.env file</b>
1. Navigate to your repository, then the `app` directory.
2. Create a `.env` file. Ensure that it is .gitignored if you plan on pushing it to any public repository.
3. Add the following constants. You will fill in the API keys in the following steps.<br>
![.env file layout](/Project%20Documents/README%20assets/envfile.png)

<b>YouTube Data API</b>

1. Head to https://console.cloud.google.com/cloud-resource-manager and sign in with your Google account.
2. Create a new or use an existing project.
3. Navigate to the YouTube Data API page. You may have to search and enable it.
4. Click on the Credentials tab, then the Create Credentials button. Select API key.
5. Copy your API key to your .env file
![YouTube API Key Page](/Project%20Documents/README%20assets/YouTubeAPIkey.png)

<b>OAuth Client ID</b>
1. Navigate to the OAuth Consent Screen tab, and select External.
2. Fill in the required fields with any app name and your email.
3. Click on Add Or Remove Scopes and add all YouTube related scopes.
4. Add your email as a test user.
5. Return to the Credentials tab in the YouTube Data API page, then click Create Credentials and OAuth Client ID.
6. Name your client, then add http://localhost to both `Authorized JavaScript origins` and `Authorized Redirect URLs`.
7. Copy the client ID to your .env file. <br>
(This video may be helpful if you are stuck: https://www.youtube.com/watch?v=zVtS5fBXOa0. Please contact chl55@gmail.com if you are unable to complete this step.)<br>
![OAuth Client ID setup](/Project%20Documents/README%20assets/OAuthClientID.png)

<b>OpenAI API</b>
1. Head to https://openai.com/blog/openai-api and sign up or sign in.
2. You may need a valid phone number to receive a $5 credit, otherwise you may have to top up your account before you can use your API key.
3. Follow the steps on the website, then copy the API key to the .env file

Now that you have all 3 environment variables, you should be all set up for the features.

### Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/) (Tested on 20.x)
- To fully engage with the content on our website, experience with HTML, CSS and JavaScript is highly recommended.

## Known Issues
- Users who wish to use OAuth features (subscriptions and playlists) on our Vercel website must contact chl55@sfu.ca to have your email added as a user. This is because we will not be sending our application to Google for verification.
- After signing in, there is a small chance that the OAuth features may not work for certain accounts. This is rare and we are unsure why it happens.
- If you have more than 50 playlists in your account, there is a chance your playlist may not be detected.
- There is a daily quota of 10,000 units for the YouTube Data API features, which is equivalent to 100 searches, or 200 POST or DELETE requests. If the web application exceeds the daily quota, a 403 error may be thrown.
- Display may be faulty for mobile and smaller screens.
- After December 22nd, 2023, support for this application may cease and the API features may no longer function as intended.

## Privacy Policy
By using our OAuth features, you consent granting us access to your YouTube subscriptions and playlists data associated with your Google account. <b>Please be aware that our web application does not store any of your user data after your session ends.</b>

## AI Declaration Forms

AI Declaration forms can be found in the AI Declaration folder under Project Documents.