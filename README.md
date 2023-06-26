# file-manager

### The file manager is able to do the following: ###

+ Work using CLI
+ Perform basic file operations (copy, move, delete, rename, etc.)
+ Utilize Streams API
+ Get information about the host machine operating system
+ Perform hash calculations
+ Compress and decompress files

### For work with File Manager: ###
1. Use `node 18.x` or higher.
2. Clone this repo: `https://github.com/Katsiaryna-Andrabaila/file-manager.git`
3. The program is started by npm-script `start` in the following way: ```npm run start -- --username=your_username```
4. Available commands:
   + `up` - to go upper from current directory
   + `cd path_to_directory` - to go to dedicated folder from current directory (`path_to_directory` can be relative or absolute)
   + `ls` - to print in console list of all files and folders in current directory
   + `cat path_to_file` - to read file and print its content in console
   + `add new_file_name` - to create empty file in current working directory
   + `rn path_to_file new_filename` - to rename file
   + `cp path_to_file path_to_new_directory` - to copy file
   + `mv path_to_file path_to_new_directory` - to move file
   + `rm path_to_file` - to delete file
   + `os --EOL` - to get EOL (default system End-Of-Line) and print it to console
   + `os --cpus` - to get host machine CPUs info and print it to console
   + `os --homedir` - to get home directory and print it to console
   + `os --username` - to get current system user name and print it to console
   + `os --architecture` - to get CPU architecture for which Node.js binary has compiled and print it to console
   + `hash path_to_file` - to calculate hash for file and print it into console
   + `compress path_to_file path_to_destination` - to compress file (using Brotli algorithm)
   + `decompress path_to_file path_to_destination` - to decompress file (using Brotli algorithm)
  
***NOTE!*** If you need to enter path with whitespaces, use ***double quotes***, for example: ```cd "./some-folder/my awesome folder"```

***NOTE2!*** While executing commands `compress/decompress`, do not enter target file name. It is generated automatically! ***Enter only target directory!***
