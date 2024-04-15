export abstract class AbstractMqProduceAdapter {
    public abstract send(...msgList: string[]): Promise<void>;
}
