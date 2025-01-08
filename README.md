### 上传文件
post /upload/deploy projectKey file
+ 上传zip文件到指定目录dir下
+ 调用接口时，触发备份事件：备份dir下所有文件，并且压缩为dirname-backup-date.zip
+ 备份异常，接口返回备份失败，不再进行后续操作
+ 备份完毕后，将指定目录下的zip文件解压缩替换全部内容，然后删除zip文件
+ 接口调用成功，返回部署成功
+ 部署成功后，将发布记录记录到mysql中，保存发布时间和文件名，版本号
+ 根据不同项目提供projectName和发布目录的映射关系
### 查询备份文件目录
get /upload/list projectKey
### 恢复指定备份文件接口
get /upload/restore id发布版本的id
### 删除备份文件
get /upload/delete/:id id发布版本的id

涉及到数据库版本数据和文件操作
