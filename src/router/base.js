import ClassManage from '@/views/base/ClassManage.vue'
import ModifyPassword from '@/views/base/ModifyPassword.vue'
import StudentManage from '@/views/base/StudentManage.vue'
import TeacherManage from '@/views/base/TeacherManage.vue'


export default [
    {
     path:"/ClassManage",
     name:"ClassManage",
     component:ClassManage
    },
    {
    path:"/ModifyPassword",
    name:"ModifyPassword",
    component:ModifyPassword
    },
    {
     path:"/StudentManage",
     name:"StudentManage",
     component:StudentManage
    },
    {
    path:"/TeacherManage",
    name:"TeacherManage",
    component:TeacherManage
    }
]


