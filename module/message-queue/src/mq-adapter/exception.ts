export class MqProducerAdapterSendMsgException extends Error {
    constructor(adapterName: string, msg: string) {
        super(`[${adapterName}][MsgSendException] ${msg}`);
        this.name = 'MqProducerAdapterSendMsgException';
    }
}
