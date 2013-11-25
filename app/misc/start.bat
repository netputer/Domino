::====================================
:: Domino start script
::====================================

@echo off

title Domino

:: TODO check update
::echo checking for updates ...

::set installPythonFlag=1
set installNodeFlag=1
set installRubyFlag=1
set script=tmp\download.vbs
set Output=tmp\output

set NodeLink=http://www.python.org/ftp/python/3.3.3/python-3.3.3.msi
set PythonLink=http://nodejs.org/dist/v0.10.22/node-v0.10.22-x86.msi
set RubyLink=http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.0.0-p353.exe?direct

::call:checkPython
call:checkNode
call:checkRuby
call:createScript
call:installEnv
call:installDomino

@rd /s /q tmp

echo Domino initialize Done!
pause
goto :eof

::====================================
:: check python runtime
::====================================
:checkPython
set ReqVer=2.6
for /F "tokens=2" %%A IN ('python -V 2^>^&1 ^| %WINDIR%\system32\find.exe /I "Python"') DO (
    for /F "tokens=1,2 delims=." %%B IN ("%%~A") DO (
        set PythonVer=%%B.%%C
    set installPythonFlag=2
    )
)

if %installPythonFlag% EQU 2 (
    if %ReqVer% GTR %PythonVer% (
        echo Please install Python [%ReqVer%] or later
        set installPythonFlag=2
    ) else (
        echo Python %PythonVer% or later has already installed
    )
) else (
  echo Can not find python runtime!
  set installPythonFlag=2
)
goto :eof

::====================================
:: check node runtime
::====================================
:checkNode
for /F "tokens=1" %%A IN ('node -v ^| %WINDIR%\system32\find.exe /I "v"') DO (
    set NodeVer=%%~A
    set installNodeFlag=2
)

if %installNodeFlag% EQU 2 (
    echo Node %NodeVer% has already installed
) else (
    echo Please install Node
    set installNodeFlag=2
)
goto :eof

::====================================
:: check ruby runtime
::====================================
:checkRuby
for /F "tokens=2" %%A IN ('ruby -v ^| %WINDIR%\system32\find.exe /I "ruby"') DO (
   set RubyVer=%%~A
   set installRubyFlag=2
)

if %installRubyFlag% EQU 2 (
    echo Ruby %RubyVer% has already installed
) else (
    echo Please install Ruby
    set installRubyFlag=2
)
goto :eof

::====================================
:: create script
::====================================
:createScript
::create tmp folder
if not exist tmp (
    @md tmp
)

::VB Script
echo 'Domino download script'                                                                            > %script%
echo Dim DS, ROOT, FS                                                                                   >> %script%
echo DS = "\"                                                                                           >> %script%
echo set FS = CreateObject("Scripting.FileSystemObject")                                                >> %script%
echo ROOT = WScript.Arguments(0)                                                                        >> %script%
echo 'create folder                                                                                     >> %script%
echo 'String Path relative ROOT path                                                                    >> %script%
echo Function Mkdir(Path)                                                                               >> %script%
echo     Set Reg = New RegExp                                                                           >> %script%
echo     Reg.Pattern = "^[\\]+|[\\]+[^\\]+$"                                                            >> %script%
echo     Dir = Reg.Replace(Path, "")                                                                    >> %script%
echo     DirSplit = Split(Dir, "\")                                                                     >> %script%
echo     FullPath = ROOT                                                                                >> %script%
echo     For Each Dir In DirSplit                                                                       >> %script%
echo         FullPath = FullPath + Dir + "\"                                                            >> %script%
echo         If Not FS.FolderExists(FullPath) Then                                                      >> %script%
echo             FS.CreateFolder(FullPath)                                                              >> %script%
echo         End If                                                                                     >> %script%
echo     Next                                                                                           >> %script%
echo End Function                                                                                       >> %script%
echo 'download files                                                                                    >> %script%
echo 'String Url  relative REMOTE path                                                                  >> %script%
echo 'String Path relative ROOT path                                                                    >> %script%
echo Function Download(Url, Path)                                                                       >> %script%
echo     WScript.StdOut.Write("download [" + URL + "] ")                                                >> %script%
echo     Path = Replace(Path, "/", "\")                                                                 >> %script%
echo     Set XHR = Wget(Url)                                                                            >> %script%
echo     Set IO = CreateObject("ADODB.Stream")                                                          >> %script%
echo     IO.Mode = 3                                                                                    >> %script%
echo     IO.Type = 1                                                                                    >> %script%
echo     IO.Open                                                                                        >> %script%
echo     On Error Resume Next                                                                           >> %script%
echo     IO.Write XHR.ResponseBody                                                                      >> %script%
echo     Mkdir Path                                                                                     >> %script%
echo     Dim NameArray, i, Name                                                                         >> %script%
echo     NameArray = Split(URL, "/", -1, 1)                                                             >> %script%
echo     Name = NameArray(UBound(NameArray))                                                            >> %script%
echo     NameArray = Split(Name, "?", -1, 1)                                                            >> %script%
echo     Name = NameArray(LBound(NameArray))                                                            >> %script%
echo     IO.SaveToFile ROOT + Path + "\" + Name, 2                                                      >> %script%
echo     WScript.StdOut.Write("OK ")                                                                    >> %script%
echo     WScript.StdOut.Write(Name)                                                                     >> %script%
echo     WScript.StdOut.WriteLine("")                                                                   >> %script%
echo End Function                                                                                       >> %script%
echo 'create XMLHTTP object                                                                             >> %script%
echo 'String url'                                                                                       >> %script%
echo Function Wget(Url)                                                                                 >> %script%
echo     set XHR = CreateObject("MSXML2.XMLHTTP")                                                       >> %script%
echo     XHR.Open "GET", Url, 0                                                                         >> %script%
echo     On Error Resume Next                                                                           >> %script%
echo     XHR.Send()                                                                                     >> %script%
echo     IF Err.Number ^<^> 0 Then                                                                      >> %script%
echo         WScript.Quit(404)                                                                          >> %script%
echo         On Error Goto 0                                                                            >> %script%
echo     else                                                                                           >> %script%
echo         IF XHR.Readystate ^<^> 4 THEN WScript.Quit(404)                                            >> %script%
echo         Set Wget = XHR                                                                             >> %script%
echo         On Error GoTo 0                                                                            >> %script%
echo     END IF                                                                                         >> %script%
echo END Function                                                                                       >> %script%

if %installNodeFlag% EQU 1 (
echo Download "%NodeLink%", "tmp"                                                                       >> %script%
)

::if %installPythonFlag% EQU %s% (
::echo Download "%PythonLink%", "tmp"                                                                   >> %script%
::)

if %installRubyFlag% EQU 1 (
echo Download "%RubyLink%", "tmp"                                                                       >> %script%
)

::run script
cscript.exe /nologo %script% %~dp0 > %Output%
type %Output%
goto :eof

::====================================
:: install env
::====================================
:installEnv
for /F "tokens=4" %%A IN ('type %Output% ^| %WINDIR%\system32\find.exe /I "ok"') DO (
    (tmp\%%~A)
)
goto :eof

::====================================
:: install Domino
::====================================
:installDomino
call npm i grunt-cli -g
call npm i yo -g
call npm i bower -g
call npm i generator-wdj -g
call gem sources --remove https://rubygems.org/
call gem sources --remove https://rubygems.org
call gem sources -a http://ruby.taobao.org
call gem install compass --pre
goto :eof
