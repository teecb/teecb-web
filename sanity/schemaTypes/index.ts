import { localizedRichText, localizedString, localizedText, richText } from "./objects/localized";
import { address, beliefCopy, beliefSection, link, serviceTime, socialLink } from "./objects/shared";
import { aboutPage } from "./documents/aboutPage";
import { event } from "./documents/event";
import { homePage } from "./documents/homePage";
import { siteSettings } from "./documents/siteSettings";
import { staffMember } from "./documents/staffMember";
import { statementOfFaith } from "./documents/statementOfFaith";

/** Documents that exist exactly once; pinned to the top of the Studio sidebar. */
export const singletons = [siteSettings, homePage, aboutPage, statementOfFaith];

export const schemaTypes = [
  // objects
  localizedString,
  localizedText,
  richText,
  localizedRichText,
  link,
  socialLink,
  serviceTime,
  address,
  beliefCopy,
  beliefSection,
  // documents
  ...singletons,
  event,
  staffMember,
];
