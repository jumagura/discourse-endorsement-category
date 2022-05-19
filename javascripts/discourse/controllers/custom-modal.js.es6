import Controller from '@ember/controller';
import { action } from '@ember/object';
import { addLike } from '../lib/actions';

export default Controller.extend({
  usernames: null,
  newNote: null,

  @action
  attachNote() {
    const targetCategory = Number(settings.endorsement_category);
    const title = 'Virtual-Internship 2021 Endorsements';
    console.log('this is clicked');
    console.log('this', this);
    const usernames = this.get('usernames');
    const newNote = this.get('newNote');
    console.log(usernames, typeof usernames, 'u');

    let args = {
      raw: newNote,
      users: usernames,
      title: title,
      category: targetCategory,
    };
    const users = args.users.map((e) => `@${e}`).join(', ');
    const postContent = `**Description:** ${args.raw}\n\n**Recipients:** ${users}`;
    args.post = postContent;
    const post = addLike(args);
    console.log('result', post);
    this.set('usernames', null);
    this.set('newNote', null);
    this.send('closeModal');
  },

  @action
  changeUserValue(previousValue, value) {
    this.changeValue(value);
  },
});
