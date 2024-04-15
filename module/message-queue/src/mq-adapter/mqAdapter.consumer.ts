export abstract class AbstractMqConsumeAdapter {
    public abstract subscribe(msgCallback: (msg: string) => void | Promise<void>): Promise<void>;
}
