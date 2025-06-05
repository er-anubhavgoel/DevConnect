export const isLikedByReqUser = (userId, post) => {
  
  return post.likes?.some((like) => like.user?.userId === userId) || false;
};



// console.log("POSTS_ITEM", post.likes);
// console.log("Current User ID:", userId);

// post.likes?.forEach((like, idx) => {
//   console.log(`Like[${idx}] User ID:`, like.user?.userId);
// });