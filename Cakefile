
{print} = require "util"
{spawn} = require "child_process"

echo = (child) ->
  child.stderr.pipe process.stderr
  child.stdout.pipe process.stdout

split = (str) -> str.split " "
d = __dirname

queue = [
  "jade -O #{d}/page/ -wP #{d}/src/index.jade"
  "livescript -o #{d}/page/ -wbc #{d}/src/handle.ls"
  "stylus -o #{d}/page/ -w #{d}/src/page.styl"
  "doodle #{d}/page/"
]

task "dev", "watch and convert files", (callback) ->
  queue.map(split).forEach (array) ->
    echo (spawn array[0], array[1..]), callback