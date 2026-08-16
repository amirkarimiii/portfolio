import {coreExtensions} from "./core-extensions";
import {historyExtensions} from "./history-extensions";
import {headingExtensions} from "./heading-extensions";
import {blockExtensions} from "./block-extensions";
import {listExtensions} from "./list-extention";
import {markExtensions} from "./mark-extensions";
import {linkExtensions} from "./link-extensions";
import {embedExtensions} from "./embed-extensions";
import ContentReferenceNode
    from "@/features/article-publishing/components/article/article-editor/extensions/ContentReferenceNode";

export const extensions = [
    ...coreExtensions,
    ...historyExtensions,
    ...headingExtensions,
    ...blockExtensions,
    ...listExtensions,
    ...markExtensions,
    ...linkExtensions,
    ...embedExtensions,
    ContentReferenceNode
]