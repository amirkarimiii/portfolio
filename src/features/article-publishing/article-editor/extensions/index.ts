import {coreExtensions} from "./core-extensions";
import {historyExtensions} from "./history-extensions";
import {headingExtensions} from "./heading-extensions";
import {blockExtensions} from "./block-extensions";
import {listExtensions} from "./list-extention";
import {markExtensions} from "./mark-extensions";
import {linkExtensions} from "./link-extensions";
import {embedExtensions} from "./embed-extensions";

export const extensions = [
    ...coreExtensions,
    ...historyExtensions,
    ...headingExtensions,
    ...blockExtensions,
    ...listExtensions,
    ...markExtensions,
    ...linkExtensions,
    ...embedExtensions
]