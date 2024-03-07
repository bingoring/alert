export abstract class AbstractLogger {
    public abstract debug(...msg: any[]): void;
    public abstract info(...msg: any[]): void;
    public abstract error(...msg: any[]): void;
}
