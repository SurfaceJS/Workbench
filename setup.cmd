 cd %~dp0\modules\type-root && npm i && tsc -p %~dp0\tasks && %~dp0\commands\unlink && %~dp0\commands\install && %~dp0\commands\link && %~dp0\commands\build