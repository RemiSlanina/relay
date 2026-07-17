/**
 * Disclosure import and init
 *
 * Storage is delegated to DisclosureStorage.
 */

import { getFirstLaunchTime } from "../bootstrap/first-launch";
import { Disclosure } from "./Disclosure";
import { DisclosureStorage } from "./disclosure.storage";
import { TEMPLATES_DISCLOSURES } from "./disclosure.templates";

export function copyTemplateToUserDisclosure(template: Disclosure): Disclosure {
  // console.log("correct id?");

  // console.log({
  //   ...template,
  //   id: `usr${template.id.slice(3)}`,
  //   lastEditedAt: `${Date.now()}`,
  // });

  return {
    ...template,
    id: `usr${template.id.slice(3)}`,
    lastEditedAt: `${Date.now()}`,
  };
}

async function initializeUserDisclosuresFromTemplateDisclosures(
  templates: Disclosure[] = TEMPLATES_DISCLOSURES,
): Promise<Disclosure[]> {
  // console.log("ENTER initializeUserDisclosuresFromTemplateDisclosures");
  const savedUserDisclosures = await DisclosureStorage.loadDisclosures();

  if (savedUserDisclosures.length > 0) {
    return savedUserDisclosures;
  }
  const userDisclosures = templates.map(copyTemplateToUserDisclosure);
  // console.log("inside initializeUserDisclosuresFromTemplateDisclosures");
  // console.log("saving", userDisclosures.length);
  await DisclosureStorage.saveDisclosures(userDisclosures);
  return userDisclosures;
}

export async function initializeDisclosures(): Promise<Disclosure[]> {
  const { isFirstLaunch, date } = await getFirstLaunchTime();
  // console.log("first launch: ", { isFirstLaunch, date });
  // console.log("templates", TEMPLATES_DISCLOSURES.length);
  // console.log("########### inside initializeDisclosures ###########");
  if (isFirstLaunch) {
    return initializeUserDisclosuresFromTemplateDisclosures();
  } else {
    return DisclosureStorage.loadDisclosures();
  }
}

// export async function initializeDisclosures(): Promise<Disclosure[]> {
//   const saved = await DisclosureStorage.loadDisclosures();
//   //   const { isFirstLaunch, date } = await getFirstLaunchTime();
//   //   console.log("first launch: ", { isFirstLaunch, date });
//   console.log("templates", TEMPLATES_DISCLOSURES.length);
//   console.log("########### inside initializeDisclosures ###########");
//   if (saved.length > 0) {
//     return saved;
//   }
//   return initializeUserDisclosuresFromTemplateDisclosures();
// }

// export async function initializeDisclosures(): Promise<Disclosure[]> {
//   console.log("FORCING TEMPLATE INITIALIZATION");
//   return initializeUserDisclosuresFromTemplateDisclosures();
// }

export async function importTemplateDisclosures(
  templates: Disclosure[],
): Promise<Disclosure[]> {
  const existingDisclosures = await DisclosureStorage.loadDisclosures();
  const importedDisclosures = templates.map(copyTemplateToUserDisclosure);
  const updatedDisclosures = [...existingDisclosures, ...importedDisclosures];
  await DisclosureStorage.saveDisclosures(updatedDisclosures);
  return updatedDisclosures;
}
