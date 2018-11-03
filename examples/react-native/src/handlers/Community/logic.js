import { createLogic } from 'redux-logic';
import { types } from './base';
import { devLog } from '../../helpers';

const posts = {
  1: [
    {
      Id: 1,
      Title: `Schedule`,
      Body: `The schedule for the SW will be as follows:
      
        - 9/17
        - 10/14
      `,
      Pinned: true,
    },
    {
      Id: 5,
      Title: `My Takeaways (9/7) - Stefan`,
      Body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra commodo nisl vel varius. Pellentesque massa metus, lacinia tempus lacus non, placerat tincidunt felis. Praesent bibendum ultrices scelerisque.
      
      Aliquam id feugiat orci. Proin libero arcu, efficitur sed condimentum sed, semper ut urna. Fusce dignissim tellus vitae purus facilisis, in malesuada diam aliquet. Cras a nunc ac nibh commodo egestas. Mauris leo lorem, eleifend et ornare quis, vulputate quis sapien. Nullam vel condimentum magna.
      
      Pellentesque mauris orci, malesuada sed elit at, dignissim placerat dolor. Aliquam odio diam, iaculis quis tincidunt non, vulputate vel ipsum. Sed neque est, aliquam sed quam ut, pellentesque tempus justo. Etiam maximus metus quis dui aliquet ultrices. Cras elit risus, tristique eget nulla nec, feugiat mattis sapien. Proin fermentum libero sit amet mattis tristique. Nam eu ornare justo.`,
      Pinned: false,
    },
    {
      Id: 8,
      Title: `Takeaways (9/7) - Talha`,
      Body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra commodo nisl vel varius. Pellentesque massa metus, lacinia tempus lacus non, placerat tincidunt felis. Praesent bibendum ultrices scelerisque.
      
      Aliquam id feugiat orci. Proin libero arcu, efficitur sed condimentum sed, semper ut urna. Fusce dignissim tellus vitae purus facilisis, in malesuada diam aliquet. Cras a nunc ac nibh commodo egestas. Mauris leo lorem, eleifend et ornare quis, vulputate quis sapien. Nullam vel condimentum magna.
      
      Pellentesque mauris orci, malesuada sed elit at, dignissim placerat dolor. Aliquam odio diam, iaculis quis tincidunt non, vulputate vel ipsum. Sed neque est, aliquam sed quam ut, pellentesque tempus justo. Etiam maximus metus quis dui aliquet ultrices. Cras elit risus, tristique eget nulla nec, feugiat mattis sapien. Proin fermentum libero sit amet mattis tristique. Nam eu ornare justo.`,
      Pinned: false,
    },
  ],
  2: [
    {
      Id: 2,
      Title: `Otter VM Setup`,
      Body: `To set up your Otter VM, follow the instructions in Gitlab.
      
      Let JH know if you have any questions.`,
      Pinned: true,
    },
    {
      Id: 3,
      Title: `Creating an unsecured route?`,
      Body: `Was wondering how I can create an unsecured route in Otter? One that doesn't require app authentication.
      
      Any help appreciated!`,
      Pinned: false,
    },
    {
      Id: 4,
      Title: `unknown struct error`,
      Body: `I'm getting this error a lot, anyone know what it means?
      
      I tried debugging it but have had a lot of trouble.`,
      Pinned: false,
    },
    {
      Id: 6,
      Title: `Best Golang Coding Practices`,
      Body: `Follow best coding practices! Make sure you always catch your errors. Use gofmt.
      
      Don't return server data to the user!`,
      Pinned: true,
    },
    {
      Id: 7,
      Title: `Releasing Otter Code`,
      Body: `You can release Otter code through our dev portal.
      
      Make sure to get a code review!`,
      Pinned: true,
    },
    {
      Id: 9,
      Title: `New Otter VM Release`,
      Body: `Hi everyone, we've released a new Otter VM. Please download it and check it out!
      
      You can download it here: https://test.url`,
      Pinned: false,
    },
  ],
};

export const logic = [
  createLogic({
    name: `fetchCommunity`, // just used for debugging purposes, not referenced anywhere

    type: types.FETCH_COMMUNITY, // only apply this logic to this type
    cancelType: types.FETCH_COMMUNITY_FAILURE, // cancel on this type
    latest: true, // only take latest

    process({ getState }, dispatch, done) {
      // here is where we would do a network request with axios, just supplying static data now
      let postsToReturn = [];

      const communityId = getState().COMMUNITY.id.toString();

      if (Object.keys(posts).includes(communityId)) {
        postsToReturn = posts[communityId];
      }

      devLog(`posts to return`, postsToReturn, posts, getState());

      dispatch({
        type: types.FETCH_COMMUNITY_SUCCESS,
        posts: postsToReturn,
      });

      done();
    },
  }),
];

export default logic;
