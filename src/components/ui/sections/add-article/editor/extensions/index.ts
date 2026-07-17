import {coreExtensions} from "./core-extensions";
import {historyExtensions} from "./history-extensions";
import {headingExtensions} from "./heading-extensions";

export const extensions = [
    ...coreExtensions,
    ...historyExtensions,
    ...headingExtensions,
]