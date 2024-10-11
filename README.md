# Immigration Chatbot

## Description

The Immigration Chatbot is a web application that helps users navigate through immigration-related queries by providing instant responses using OpenAI's language model. This application offers a user-friendly interface for asking questions and receiving accurate information.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Environment Variables](#environment-variables)


## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/en/download/) (version 14.x or later)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [OpenAI API Key](https://platform.openai.com/signup) (You need to sign up for an OpenAI account to get your API key)

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/immigration-chatbot.git

2. Navigate to the project directory

   cd immigration-chatbot

3.  Install the dependencies

     npm install

## Running the Application
   
   npm run dev

## Testing
    
    npm test

## Environment Variables

This application requires an OpenAI API key to function. You need to set it up as follows:

Create a .env file in the root of your project if it doesn't exist.

Add the following line to the .env file

OPENAI_API_KEY=your_openai_api_key_here

Replace your_openai_api_key_here with your actual OpenAI API key.

Make sure to restart the server after adding the environment variables.

