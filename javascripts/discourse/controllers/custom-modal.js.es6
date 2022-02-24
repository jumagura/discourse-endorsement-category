import Controller from "@ember/controller";
import { addLike } from "../lib/actions";
export default Controller.extend({
  actions: {
    attachNote() {
      const targetCategory = 81;
      const title = "Virtual-Internship 2021 Endorsements";
      console.log("this is clicked");
      let args = {
        raw: this.newNote,
        users: this.value,
        title: title,
        category: targetCategory,
      };
      const users = args.users.split(",").map((e) => `@${e}`).join(", ");
      const postContent = `**Description:** ${args.raw}\n\n**Recipients:** ${users}`;
      args.post = postContent;
      const post = addLike(args);
      console.log("result", post);
    },
    changeUserValue(previousValue, value) {
      this.changeValue(value);
    },
  },
});
