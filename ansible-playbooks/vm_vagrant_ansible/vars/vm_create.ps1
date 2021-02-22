New-Item -Path 'D:\Vagrant\UbuntuMachine' -ItemType Directory
Set-Location -Path 'D:\Vagrant\UbuntuMachine'
vagrant init ubuntu/xenial64
vagrant up
vagrant ssh
