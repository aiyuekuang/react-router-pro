import json
import os
import shutil
import stat

class OperationJson:
    def __init__(self,file_name=None):
        if file_name:
            self.file_name = file_name
        else:
            self.file_name = './package.json'
        self.data = self.get_data()

    def get_data(self):
        fp = open(self.file_name)
        data = json.load(fp)
        fp.close()
        return data

    def get_value(self,id):
        return self.data[id]

def getTag():
  return "feature/v"+OperationJson(os.path.join(os.getcwd() + "/package.json")).get_value('version')

#filePath:文件夹路径
def del_dir(dir_path):
    """
    删除文件夹及内容
    :param dir_path:
    :return:
    """
    try:
        shutil.rmtree(dir_path)
    except Exception as err:
        print(err)


#复制文件夹到另一个文件夹中
def copy_dirs(olddir_path,newdir_path):
    """
    复制文件夹，olddir和newdir都只能是文件夹，且newdir必须不存在
    :return:
    """
    if os.path.exists(newdir_path):
        shutil.rmtree(newdir_path)

    shutil.copytree(olddir_path, newdir_path)

#复制文件到另一个文件夹中，并且覆盖文件
def copy_dir(yuan,target):

    '''将一个目录下的全部文件和目录,完整地<拷贝并覆盖>到另一个目录'''
    # yuan 源目录
    # target 目标目录

    if not (os.path.isdir(yuan) and os.path.isdir(target)):
        # 如果传进来的不是目录
        # print("传入目录不存在")
        return

    for a in os.walk(yuan):
        #递归创建目录
        for d in a[1]:
            dir_path = os.path.join(a[0].replace(yuan,target),d)
            if not os.path.isdir(dir_path):
                os.makedirs(dir_path)
        #递归拷贝文件
        for f in a[2]:
            dep_path = os.path.join(a[0],f)
            arr_path = os.path.join(a[0].replace(yuan,target),f)
            shutil.copy(dep_path,arr_path)
