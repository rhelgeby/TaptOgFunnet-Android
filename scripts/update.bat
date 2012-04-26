@echo off

set SRC=..\..\TaptOgFunnetApp-Core\www
set DEST=..\www

xcopy %SRC% %DEST% /E /I /Y

echo Files written to %DEST%
pause
