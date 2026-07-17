import {coreExtensions} from "./core-extensions";
import {historyExtensions} from "./history-extensions";
import {headingExtensions} from "./heading-extensions";
import {blockExtensions} from "./block-extensions";
import {listExtensions} from "@/components/ui/sections/add-article/editor/extensions/list-extention";
import {markExtensions} from "@/components/ui/sections/add-article/editor/extensions/mark-extensions";

export const extensions = [
    ...coreExtensions,
    ...historyExtensions,
    ...headingExtensions,
    ...blockExtensions,
    ...listExtensions,
    ...markExtensions,
]