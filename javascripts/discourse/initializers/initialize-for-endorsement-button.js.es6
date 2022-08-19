import I18n from "I18n";
import { withPluginApi } from "discourse/lib/plugin-api";
const { iconNode } = require("discourse-common/lib/icon-library");
import showModal from "discourse/lib/show-modal";

export default {
  name: "endorsement-button",
  initialize() {
    let currentLocale = I18n.currentLocale();
    I18n.translations[currentLocale].js.custom_modal_title = "Endorse a participant";
    I18n.translations[currentLocale].js.custom_modal_button = "Endorse";
    withPluginApi("0.8.7", (api) => {
      const currentUser = api.getCurrentUser();
      if (!currentUser) {
        return;
      }
      if (currentUser.staff || currentUser.trust_level >= settings.min_trust_level) {
        api.decorateWidget("header-buttons:after", (helper) => {
          const ntb_text = settings.New_topic_button_text,
            ntb_title = settings.New_topic_button_title.length
              ? settings.New_topic_button_title
              : ntb_text,
            ntb_icon = settings.New_topic_button_icon,
            ntb_button_class = "btn btn-default btn btn-icon-text",
            ntb_button_helper = "button#new-create-topic",
            ntb_label_helper = "span.d-button-label";
          const displayModal = () => {
            showModal("customModal", {});
          };

          return helper.h(
            ntb_button_helper,
            {
              className: ntb_button_class,
              title: ntb_title,
              onclick: displayModal,
            },
            [iconNode(ntb_icon), helper.h(ntb_label_helper, ntb_text)],
          );
        });
      }
    });
  },
};
