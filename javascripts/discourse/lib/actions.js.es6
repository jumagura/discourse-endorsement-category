import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";

let addLike = function (args) {
  const { title, post, category, users } = args;
  console.log("=====inside action");
  console.log(typeof title);
  console.log(title);
  console.log(typeof post);
  console.log(post);
  console.log(typeof category);
  console.log(category);
  console.log(typeof users);
  console.log(users);
  const skip_validations = true;
  return ajax("/posts", {
    type: "POST",
    data: {
      category: 399,
      skip_validations: skip_validations,
      skip_revision: true,
      // lock the topic, so that the user can't edit it
      bypass_bump: true,
      title: title,
      raw: post,
      auto_track: false,
    },
  })
    .catch(popupAjaxError)
    .then(function (result) {
      users.forEach((user) => {
        ajax(`/user_badges`, {
          type: "POST",
          data: {
            badge_id: 73,
            username: user,
            // reason: `/${result.topic_id}`,
          },
        }).catch(popupAjaxError);
      });
      console.log(result);
    });
};

export { addLike };
