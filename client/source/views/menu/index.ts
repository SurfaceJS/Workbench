import CustomElement, { element } from "@surface/custom-element";
import template                   from "./index.html";

@element("menu-view", template)
export default class Menu extends CustomElement
{ }