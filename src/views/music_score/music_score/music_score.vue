<template>
  <div class="app-container music">
    <div class="head filter-container">
      <el-form>
        <el-form-item>
          <el-button class="create-user-button" type="primary" size="small" icon="el-icon-plus" @click="showInsertDialog()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="body">
      <el-table class="music-table" size="mini" height="100%" border fit 
        :data="musics" :row-style="tableRowStyle" :cell-style="tableCellStyle">
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column label="乐谱名称" prop="musicName" min-width="90" align="center"></el-table-column>
        <el-table-column label="考级范围" prop="musicScope" min-width="90" align="center"></el-table-column>
        <el-table-column label="曲子类型" prop="musicType" min-width="150" align="center"></el-table-column>
        <el-table-column label="弹奏方式" prop="hands" min-width="60" align="center"></el-table-column>
        <el-table-column label="曲子特性" prop="musicCharacter" min-width="60" align="center"></el-table-column>
        <el-table-column label="乐谱时期" prop="musicTime" min-width="60" align="center"></el-table-column>
        <el-table-column label="作者知名程度" prop="authorKnownDegree" min-width="60" align="center"></el-table-column>
        <el-table-column label="作者国家" prop="authorCountry" min-width="60" align="center"></el-table-column>
        <el-table-column label="作者姓名" prop="authorName" min-width="60" align="center"></el-table-column>
        <el-table-column label="乐谱保存路径" prop="filePath" min-width="60" align="center"></el-table-column>
        <el-table-column label="入库时间" prop="createTime" min-width="60" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <div class="pagination-container">
        <el-pagination background layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize" :page-sizes="[15, 30, 50, 100]" :total="total" :pager-count="5" :current-page="currentPage" 
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange">
        </el-pagination>
      </div>
    </div>

    <!--添加/编辑用户对话框-->
		<el-dialog class="music-dialog" :title="titleMap[dialogType]" :visible.sync="showDialog" :close-on-click-modal="false" :before-close="handleClose">
			<el-form ref="musicForm" label-position="right" label-width="100px" :model="musicForm" :rules="musicFormRules">
        <el-row>
          <el-col :span="15">
            <el-form-item label="乐谱名称" prop="musicName">
              <el-input type="text" v-model="musicForm.musicName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="作者姓名" prop="authorName">
              <el-select v-model="musicForm.authorName" placeholder="请选择" style="padding-right:5px">
                <el-option v-for="item in authorNames" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="作者国家" prop="authorCountry">
              <el-select v-model="musicForm.authorCountry" placeholder="请选择" style="padding-right:5px">
                <el-option v-for="item in authorCountrys" :key="item.value" :label="item.country" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="作者知名度" prop="authorKnownDegree">
              <el-select v-model="musicForm.authorKnownDegree" placeholder="请选择" style="padding-right:5px">
                <el-option v-for="item in authorKnownDegrees" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="曲子类型" prop="musicType">
              <el-select v-model="musicForm.musicType" placeholder="请选择" style="padding-right:5px">
                <el-option v-for="item in musicTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="弹奏方式" prop="hands">
              <el-select v-model="musicForm.hands" placeholder="请选择" style="padding-right:5px">
                <el-option v-for="item in hands" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="乐谱时期" prop="musicTime">
              <el-select v-model="musicForm.musicTime" placeholder="请选择" style="padding-right:5px">
                <el-option v-for="item in musicTimes" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="考级范围" prop="musicScope">
              <el-select v-model="musicForm.musicScope" placeholder="请选择" style="padding-right:5px">
                <el-option v-for="item in musicScopes" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="曲子特性" prop="musicCharacter">
              <el-select v-model="musicForm.musicCharacter" placeholder="请选择" multiple :multiple-limit="selectLimit" style="padding-right:5px;width:88%;">
                <el-option v-for="item in musicCharacters" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-upload
              ref="upload"
              class="upload-demo"
              action="false"
              :file-list="fileList"
              :limit=1
              :http-request="httpRequest">
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <!-- <el-button slot="trigger" size="small" type="text" >此处点击上传乐谱</el-button> -->
            </el-upload>
          </el-col>
        </el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('musicForm'), showDialog =false">取消</el-button>
				<el-button v-if="dialogType=='insert'" type="success" @click="insertMusic()">提交</el-button>
        <el-button v-else type="primary" @click="updateMusic()">提交</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMusics, insertMusic, updateMusic, deleteMusic } from '@/api/musics'

export default {
  data() {
    return {
      // table
      musics: [],
      page: 1,
      pageSize: 15,
      total: 0,
      currentPage: 1,

      filters: {
        username: ''
      },

      // dialog
      showDialog: false,
      dialogType: 'insert',
      titleMap: {
        insert: '乐谱信息添加',
        update: '乐谱信息编辑'
      },

      // form
      musicForm: {
        musicName: '',
        musicScope: '',
        musicType: '',
        hands: '',
        musicCharacter: '',
        musicTime: '',
        authorKnownDegree: '',
        authorCountry: '',
        authorName: '',
        filePath: ''
      },
      selectLimit: 10,

      // upload
      file: null,
      fileList: [],

      // rules
      musicFormRules: {
        musicName: [
          { required: true, message: '请输入乐谱名称', trigger: 'change' }
        ]
      },
      musicScopes: [
        { label: '请选择', value: 0 },
        { label: '1-3级', value: 1 },
        { label: '4-6级', value: 2 },
        { label: '7-9级', value: 3 },
        { label: '10级', value: 4 },
        { label: '演奏', value: 5 }
      ],
      musicTypes: [
        { label: '请选择', value: 0 },
        { label: '音阶琶音', value: 1 },
        { label: '练习曲', value: 2 },
        { label: '即兴曲', value: 3 },
        { label: '协奏曲', value: 4 },
        { label: '幻想曲', value: 5 },
        { label: '奏鸣曲', value: 6 },
        { label: '谐谑曲', value: 7 },
        { label: '夜曲', value: 8 },
        { label: '狂想曲', value: 9 },
        { label: '圆舞曲', value: 10 },
        { label: '组曲（标题音乐）', value: 11 },
        { label: '改编曲', value: 12 },
        { label: '浪漫曲', value: 13 },
        { label: '船歌', value: 14 },
        { label: '室内乐', value: 15 },
        { label: '复调作品', value: 16 },
        { label: '双钢', value: 17 },
        { label: '四手联弹', value: 18 },
        { label: '前奏曲', value: 19 }
      ],
      hands: [
        { label: '请选择', value: 0 },
        { label: '左手', value: 1 },
        { label: '右手', value: 2 },
        { label: '均衡', value: 3 }
      ],
      musicCharacters: [
        { label: '请选择', value: 0 },
        { label: '快速跑动', value: 1 },
        { label: '八度', value: 2 },
        { label: '双音', value: 3 },
        { label: '附点', value: 4 },
        { label: '三连音', value: 5 },
        { label: '和弦', value: 6 },
        { label: '断奏', value: 7 },
        { label: '三六度', value: 8 },
        { label: '其他', value: 9 }
      ],
      musicTimes: [
        { label: '请选择', value: 0 },
        { label: '巴洛克', value: 1 },
        { label: '古典', value: 2 },
        { label: '浪漫', value: 3 },
        { label: '印象', value: 4 },
        { label: '现代', value: 5 }
      ],
      authorKnownDegrees: [
        { label: '请选择', value: 0 },
        { label: '极其知名', value: 1 },
        { label: '知名', value: 2 },
        { label: '小众', value: 3 }
      ]
    }
  },
  created() {
    this.getMusics()
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    getMusics() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        date: new Date().getTime()
      }
      getMusics(params).then(res => {
        if (res.code === 1) {
          this.musics = res.data.musics
          this.total = res.data.total
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.musicForm.musicName = ''
      this.musicForm.musicScope = 0
      this.musicForm.musicType = 0
      this.musicForm.hands = 0
      this.musicForm.musicCharacter = ''
      this.musicForm.musicTime = 0
      this.musicForm.authorKnownDegree = 0
      this.musicForm.authorCountry = 0
      this.musicForm.authorName = 0
      this.musicForm.filePath = ''
    },
    showInsertDialog() {
      this.musicForm.musicName = ''
      this.musicForm.musicScope = 0
      this.musicForm.musicType = 0
      this.musicForm.hands = 0
      this.musicForm.musicCharacter = ''
      this.musicForm.musicTime = 0
      this.musicForm.authorKnownDegree = 0
      this.musicForm.authorCountry = 0
      this.musicForm.authorName = 0
      this.musicForm.filePath = ''
      this.dialogType = 'insert'
      this.showDialog = true
    },
    insertMusic() {
      this.$refs.musicForm.validate((valid) => {
        insertMusic(this.musicForm).then(res => {
          const code = res.code
          const msg = res.msg
          if (code !== 1) {
            this.$message({
              message: '添加失败：' + msg,
              type: 'error'
            })
          } else {
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
            this.resetForm('musicForm')
            this.getMusics()
            this.showDialog = false
          }
        })
      })
    },
    showUpdateDialog($index) {
      const user = this.users[$index]
      this.musicForm.id = user.id
      this.musicForm.username = user.username
      this.musicForm.password = user.password
      this.musicForm.descInfo = user.descInfo
      this.musicForm.roleId = user.roleId
      this.musicForm.createMusicId = user.createMusicId
      this.musicForm.status = user.status
      this.musicForm.email = user.email
      this.musicForm.phone = user.phone
      this.musicForm.address = user.address
      this.dialogType = 'update'
      this.showDialog = true
    },
    updateMusic() {
      updateMusic(this.musicForm).then(res => {
        const code = res.code
        const msg = res.msg
        if (code !== 1) {
          this.$message({
            message: '编辑失败：' + msg,
            type: 'error'
          })
        } else {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.getMusics()
          this.showDialog = false
        }
      })
    },
    deleteMusic($index) {
      this.$confirm('确定删除此条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const user = this.users[$index]
        deleteMusic(user).then(res => {
          const code = res.code
          const msg = res.msg
          if (code !== 1) {
            this.$message({
              message: '删除失败：' + msg,
              type: 'error'
            })
          } else {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getMusics()
          }
        })
      })
    },
    // 修改table样式
    tableRowStyle({ row, rowIndex }) {
      return 'height: 45px;'
    },
    tableCellStyle({ row, column, rowIndex, columnIndex }) {
      return 'padding: 1px'
    },
    handleClose() {
      this.resetForm('musicForm')
      this.showDialog = false
    },
    handleCurrentChange(val) {
      this.page = val
      this.getMusics()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getMusics()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .music {
    height: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    .head {
      height: 3%;
      width:100%;
    }
    .body {
      height: 90.2%;
      width: 100%;
      padding-top: 20px;
    }
    .footer {
      height: 2%;
      width: 100%;
      padding-top: 20px;
      .pagination-container {
        float: right;
      }
    }
  }
</style>
