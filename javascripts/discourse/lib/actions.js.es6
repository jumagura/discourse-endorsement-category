import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";

let addLike = function (args) {
  const { title, post, category } = args;
  console.log("=====inside action");
  console.log(typeof title);
  console.log(title);
  console.log(typeof post);
  console.log(post);
  console.log(typeof category);
  console.log(category);
  const skip_validations = true;
  return ajax("/posts", {
    type: "POST",
    data: {
      category: 81,
      skip_validations: skip_validations,
      skip_revision: true,
      bypass_bump: true,
      title: "some title that is asslong s s asdas  s ss sa as ",
      raw: "this is a post that needs to be correc dfasd asd as d as as s",
      auto_track: false,
    },
  })
    .catch(popupAjaxError)
    .then((result) => {
      console.log(result);
    });
};

export { addLike };
