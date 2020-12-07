import os
import shutil
import stat
from utils import copy_dir

source_lib = r"D:\ku\react-router-pro\lib"


class Path(object):
    def __init__(self,path):
        self.lib = path +"/lib"


arr = [
Path('D:/oppo_pro/esa-admin/node_modules/react-router-pro'),
Path('D:/oppo_pro/ddp_h5_new/node_modules/react-router-pro'),
]



for i in arr:
    #del_dir(i.lib)
    copy_dir(source_lib,i.lib)
