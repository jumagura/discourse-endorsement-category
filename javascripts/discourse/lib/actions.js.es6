import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";
import DiscourseURL from "discourse/lib/url";

let addLike = function (args) {
  const { title, post, category, users, badge_id } = args;
  const skip_validations = true;
  return ajax("/posts", {
    type: "POST",
    data: {
      category,
      skip_validations,
      skip_revision: true,
      // lock the topic, so that the user can't edit it
      bypass_bump: true,
      title,
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
            // TODO make badge_id a setting
            badge_id,
            username: user,
            reason: `/t/${result.topic_id}`,
          },
        }).catch(popupAjaxError);
      });
      return DiscourseURL.routeTo(`/t/${result.topic_id}`);
    });
};

export { addLike };
