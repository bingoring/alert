# logger
- product에서 사용할 logger module입니다.

# format
[serverName] level: [time] message ...

# 사용 방법
- initService에서 bootstrapLogger()를 최상단에서 가장 먼저 초기화를 합니다.
    - bootstrapLogger의 인자로 해당 서버의 이름을 전달합니다.
- initService에서 initLogger()를 사용해 한 번만 초기화를 합니다.
    - initLogger의 인자로 해당 서버의 이름과 로그 레벨을 전달합니다.
    - 반드시 initConfig가 호출된 다음에 사용되어야 합니다.
- 초기화 예시
```
    export async function initService() {
        bootstrapLogger('api-server');
        await initConfig({ isAPI: false });
        await initLogger('api-server', env.logLevel);
        await initDatabase();
    }
```
- initLogger로 초기화 후 globalThis의 log를 사용합니다.
- 로그 레벨: `error`, `info`, `debug`
- 파라미터: `message`, ...
    - message: log message를 콤마로 구분하여 보낼 수 있습니다. 콘솔에는 공백으로 구분되어 표시됩니다. 
    - type: 모든 타입 지원
- test code 내에서 초기화할 때는 두번 째 인자 log level에 `test`를 주입합니다.
	- test에서 로그가 나오는 것을 막습니다.
```
initLogger('test', 'test');
```


# 사용 예시
1. log.error('error message');
2. log.info('server on: ', 12345);
3. log.debug('Successfully', 'delete', 'target');

# 주의 사항
- `initLogger`는 `initConfig`를 먼저 호출한 다음 사용해주세요. 
- 다른 초기화 함수보다 먼저 선언해야 globalThis의 log를 인식할 수 있습니다.
- 초기화시 넣어주는 레벨에 따라 콘솔에 표시되는 로그 레벨이 결정됩니다.
    - 로그 레벨의 순서는 debug, info, error입니다.
    - ex) 로그 레벨을 debug로 초기화했다면 debug를 포함한 상위 로그 레벨이 모두 표시됩니다.
    - ex) 로그 레벨을 info로 초기화했다면 debug 로그는 표시되지 않습니다.
