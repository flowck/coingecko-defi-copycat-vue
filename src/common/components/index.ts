import { App } from "vue";

export default (appInstance: App<Element>): void => {
  const requireComponent = require.context(".", true, /[\w-]+\.vue$/);

  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);
    const componentName = fileName
      .replace(/\.\w+$/, "")
      .split("-")
      .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
      .join("")
      .split("/")[2];

    // Globally register the component
    appInstance.component(
      componentName,
      componentConfig.default || componentConfig
    );
  });
};
