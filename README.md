pc端脚手架项目

## 仓库地址修改

- 下载此项目至本地，修改项目名称和package.json、cortex.json里的信息；
```bash
    $ git init
    $ git add README.md
    $ git commit -m "first commit"
    $ git remote add origin {你的仓库地址}     例如：git remote add origin git@github.com:mtuan-f4/react-redux-es6-pc-template.git
    $ git push -u origin master
```

- …or push an existing repository from the command line
```bash
    $ git remote add origin git@github.com:mtuan-f4/react-redux-es6-pc-template.git
    $ git push -u origin master
```

然后就正常开发和提交代码；

## 启动本地环境

cnpm install
cnpm install bower -g
bower install
cortex install  //不用可省略这一步骤

运行 npm run dev 进入调试
运行 npm run build 打包


不需要jquery
