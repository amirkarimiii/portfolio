import { textNodeStrategy } from './text-renderer';
import { imageBlockStrategy } from './image-renderer';
import { contentReferenceStrategy } from './content-reference-renderer';
import {NodeRendererStrategy, TipTapNode} from "@/features/article-publishing/types/node-renderers.type";

class StrategyRegistry {
    private strategies: NodeRendererStrategy[] = [];

    public register(strategy: NodeRendererStrategy): void {
        this.strategies.push(strategy);
    }

    public getStrategy(node: TipTapNode): NodeRendererStrategy | undefined {
        return this.strategies.find((strategy) => strategy.canRender(node));
    }
}

export const strategyRegistry = new StrategyRegistry();

strategyRegistry.register(textNodeStrategy);
strategyRegistry.register(imageBlockStrategy);
strategyRegistry.register(contentReferenceStrategy);