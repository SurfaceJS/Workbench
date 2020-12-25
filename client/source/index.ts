import CustomElement from "@surface/custom-element";
import WebRouter     from "@surface/web-router";
import routes        from "./routes";

window.addEventListener("load", async () => navigator.serviceWorker.register("/service-worker.js"));

const router = new WebRouter("app-root", routes);

CustomElement.registerDirective(WebRouter.createDirectiveRegistry(router));

void import("./app").then(() => void router.pushCurrentLocation());