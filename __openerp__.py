# encoding: utf-8
##############################################################################
#
#     patch for base export language
#     Copyright (C) 2014  zkjiao@gmail.com
# 
#     This program is free software: you can redistribute it and/or modify
#     it under the terms of the GNU Affero General Public License as
#     published by the Free Software Foundation, either version 3 of the
#     License, or (at your option) any later version.
# 
#     This program is distributed in the hope that it will be useful,
#     but WITHOUT ANY WARRANTY; without even the implied warranty of
#     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#     GNU Affero General Public License for more details.
# 
#     You should have received a copy of the GNU Affero General Public License
#     along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################
{
    "name": "导出翻译模块多选补丁",
    "version": "1.0",
    "author": "zkjiao@gmai.com",
    "depends" : ["base",'base_setup'],
    "category" : "Generic Modules/Base",
    "description": """
    为导出翻译模块选择对话框增加多选功能
    """,
    "init_xml": [],
    'update_xml': [],
    'demo_xml': [],
    'js': [
        'static/src/js/*.js',
        ],
    'css': [
        ],
    'qweb': [        
        ],
    'installable': True,
    'auto_install': False,
#    'certificate': 'certificate',
}