import authObj from "./auth";


// a new object called models
const models = {
  //  assigning the entire counterObj (which holds the fetch method) to a key called users within the models object.
 
  // users: {
  //         fetch: (query) => store.dispatch(Action.fetch(query)),}
  auth: authObj,
 
};

export default models;
