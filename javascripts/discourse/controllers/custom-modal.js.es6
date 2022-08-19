import Controller from "@ember/controller";
import { action } from "@ember/object";
import { addLike } from "../lib/actions";

export default Controller.extend({
  usernames: null,
  newNote: null,

  @action
  attachNote() {
    const targetCategory = Number(settings.endorsement_category);
    const title = settings.Topic_title;
    const badge_id = settings.endorsement_badge_id;
    const usernames = this.get("usernames");
    const newNote = this.get("newNote");

    let args = {
      raw: newNote,
      users: usernames,
      title,
      category: targetCategory,
      badge_id,
    };
    const users = args.users.map((e) => `@${e}`).join(", ");
    const postContent = `**Description:** ${args.raw}\n\n**Recipients:** ${users}`;
    args.post = postContent;
    addLike(args);
    this.set("usernames", null);
    this.set("newNote", null);
    this.send("closeModal");
  },

  @action
  changeUserValue(previousValue, value) {
    this.changeValue(value);
  },
});
