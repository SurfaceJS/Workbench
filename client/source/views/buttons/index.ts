import "./components";

import { element } from "@surface/custom-element/decorators";
import View        from "@surface/view";
import template    from "./index.html";
import style       from "./index.scss";

@element("buttons-view", template, style)
export default class Buttons extends View
{
    public constructor()
    {
        super();
        this.viewName = "Buttons";
    }
}