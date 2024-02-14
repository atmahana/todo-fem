# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). This project is a full-stack web application built using the MERN stack.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode

### Screenshot

![Light mode](https://i.imgur.com/VKZCGNV.png)

![Dark mode](https://i.imgur.com/vkHY6Zw.png)

### Links

- Solution URL: [Solution URL](https://www.frontendmentor.io/solutions/-todo-app-mern-stack-tanstack-query-clerk-n65wM2eSj3)
- Live Site URL: [Live site](https://todo-fem.vercel.app/)

## My process

### Built with

#### Backend
- Node.js (Express)
- MongoDB
- Deployed on Render

#### Frontend 
- React
- TailwindCSS 
- React Query
- Deployed on Vercel

#### Authentication
- Clerk

### What I learned

Throughout this project, I managed to grasp the knowledge of building a full-stack application using Express.js for the backend and React for the client side. 

Also I tried to use Tanstack Query in this project. One thing that made me stuck was to make it work with Clerk. 

Since my backend is protected by the [Clerk middleware](https://clerk.com/docs/backend-requests/handling/nodejs#clerk-express-with-auth). It requires me to get the session token from the client which can be get through [`useAuth`](https://clerk.com/docs/references/react/use-auth) hook. 

```ts
const Content: FC<ContentProps> = ({ type, session }) => {
  const { data, isLoading, isError } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const res = await axios.get(BACKEND_URI, {
          headers: {
            Authorization: `Bearer ${session}}`
          }
        });

        return res.data;
      } catch (error) {
        throw error;
      }
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="..."></div>
    );
  }

  return (
    <div className="..."></div>
  );
};
```
The issue with passing the token through props is that the token is obtained asynchronously, meaning it may not be available immediately when the component mounts and the axios request is made. Since the request is made synchronously during rendering, passing the token as a prop directly could result in the token not being ready when needed for the request, causing errors. 

Then I came across a better approach based on the Clerk's docs about using [Clerk with Tanstack Query](https://clerk.com/docs/backend-requests/making/cross-origin#tanstack-query-react-query). With that, I created a custom hook as follows that I can call in any necessary component as follows:  

```ts
export const useGetTodosQuery = (type: 'all' | 'active' | 'completed') => {
  const { getToken } = useAuth();

  return useQuery<Todo[]>({
    queryKey: ["todos", { type }],
    queryFn: async () => {
      try {
        const res = await axios.get(BACKEND_URI, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        });

        return res.data;
      } catch (error) {
        throw error;
      }
    },
  });
}
```

With this, the token will always be ready whenever `useQuery` executes the query function. 

## Continued Development

Clerk is still in dev mode because it is still not supporting production apps on `name.vercel.app`. Explaination by the CTO [here](https://www.reddit.com/r/nextjs/comments/164xfye/using_clerk_auth_in_production_why/). If Clerk can support deploying to Vercel without any paid domain, I will migrate it to production mode. 

## Author

- GitHub - [Zubair Adham](https://github.com/atmahana)
- Frontend Mentor - [@atmahana](https://www.frontendmentor.io/profile/atmahana)

