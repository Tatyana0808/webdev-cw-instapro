import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { getPosts } from "../api.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  let message = null;
  if (posts.length) {
    const getApiPosts = posts.map((postItem) => {
      return {
        userId: postItem.id,
        userImageUrl: postItem.imageUrl,
      // postCreatedAt: formatDistance(new Date(postItem.createdAt)), new Date , { locale: ru}),
       description: postItem.description,
       postId: postItem.user.id,
       userName: postItem.user.name,
       userLogin: postItem.user.login,
       postImageUrl: postItem.user.ImageUrl,
       userLikes: postItem. likes,
       isLiked: postItem.isLiked,
  
  
      }
    })
    message =  getApiPosts.map((postItem) => {
      return `
          
    
         <li class="post">
           <div class="post-header" data-user-id="${postItem.user.id}">
               <img src="${postItem.userImageUrl}" class="post-header__user-image">
               <p class="post-header__user-name">${postItem.username}</p>
           </div>
           <div class="post-image-container">
             <img class="post-image" src="${postItem.postImageUrl}">
           </div>
           <div class="post-likes">
             <button data-post-id="${postItem.postId}" class="like-button">
               <img src="./assets/images/like-active.svg">
             </button>
             <p class="post-likes-text">
               Нравится: ${postItem.userLikes.length > 0 ? `${postItem.userLikes[postItem.userLikes.lenght - 1].name}
               ${postItem.length - 1 > 0 ? 'и еще' + (postItem.length - 1) : ''} ` : '0'}
             </p>
           </div>
           <p class="post-text">
             <span class="user-name">${postItem.userName}</span>
             ${postItem.description}
           </p>
           <p class="post-date">
             ${postItem.postCreatedAt}
           </p>
         </li>
        
      ` 
     
   }).join() ;

  } else {

    message = "постов нет";

  }

}

  

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */  

  const originlHtml = ` <div class="page-container">
  <div class="header-container"></div>
  <ul class="posts">
   ${message}
  </ul>
  </div>
  `

   const appHtml =
  appEl.innerHTML = originlHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

