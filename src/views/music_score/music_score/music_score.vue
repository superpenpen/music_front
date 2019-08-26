<template>
  <div class="app-container music">
    <div class="head filter-container">
      <el-form :inline="true" :model="filters">
        <el-form-item >
          <el-input size="mini" v-model="filters.musicName" placeholder="乐谱名称" @keyup.enter.native="getMusics"></el-input>
          </el-form-item>
          <el-select size="mini" v-model="filters.authorCountryId"  placeholder="作者国家" filterable style="padding-right:15px;padding-top:5px">
            <el-option v-for="item in authorCountrys" :key="item.authorCountryId" :label="item.authorCountry" :value="item.authorCountryId"></el-option>
          </el-select>
          <el-select size="mini" v-model="filters.authorNameId" placeholder="作者姓名" filterable style="padding-right:15px;padding-top:5px">
            <el-option v-for="item in authorNames" :key="item.authorNameId" :label="item.authorName" :value="item.authorNameId"></el-option>
          </el-select>
          <el-select v-show="moreConditions" size="mini" v-model="filters.authorKnownDegree" placeholder="作者知名程度" style="padding-right:15px;padding-top:5px">
            <el-option v-for="item in authorKnownDegrees" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-show="moreConditions" size="mini" v-model="filters.musicScope" placeholder="考级范围" style="padding-right:15px;padding-top:5px">
            <el-option v-for="item in musicScopes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-show="moreConditions" size="mini" v-model="filters.musicType" placeholder="曲子类型" style="padding-right:15px;padding-top:5px">
            <el-option v-for="item in musicTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select  v-show="moreConditions" size="mini" v-model="filters.hands" placeholder="弹奏方式"  style="padding-right:15px;padding-top:5px">
            <el-option v-for="item in hands" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-show="moreConditions" size="mini" v-model="filters.musicTime"  placeholder="乐谱时期" style="padding-right:15px;padding-top:5px">
            <el-option v-for="item in musicTimes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-show="moreConditions" size="mini" v-model="filters.musicCharacter" placeholder="曲子特性" 
              multiple :multiple-limit="selectLimit" style="padding-right:15px;padding-top:5px;width:30%;">
            <el-option v-for="item in musicCharacters" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-form-item>
          <el-button size="mini" type="primary" @click="getMusics" icon="el-icon-search">搜索</el-button>
          </el-form-item>
          <el-form-item>
          <el-button size="mini"  @click="initQuery">重置</el-button>
          </el-form-item>
          <span style="padding-top: 5px"  v-show="lessConditions">
            <el-button size='mini' type='text' icon='el-icon-arrow-down' @click='showMore'>展开</el-button>
          </span>
          <span style="padding-top: 5px"  v-show="moreConditions">
            <el-button size='mini' type='text' icon='el-icon-arrow-up' @click='showLess'>收起</el-button>
          </span>
      </el-form>
      <el-row>
        <el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
          <el-button size="mini" type="primary" @click.native="showInsertDialog()" icon="el-icon-plus">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="body">
      <el-table class="music-table" size="mini" height="100%" border fit 
        :data="musics" :row-style="tableRowStyle" :cell-style="tableCellStyle">
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <!-- <el-table-column label="ID" prop="id" width="60" align="center" ></el-table-column> -->
        <el-table-column label="乐谱名称" prop="musicName" min-width="90" align="center"></el-table-column>
        <el-table-column label="考级范围" prop="musicScope" min-width="40" align="center">
          <template slot-scope="scope">{{scope.row.musicScope | formatMusicScope }}</template>
        </el-table-column>
        <el-table-column label="曲子类型" prop="musicType" min-width="40" align="center">
          <template slot-scope="scope">{{scope.row.musicType | formatMusicType }}</template>
        </el-table-column>
        <el-table-column label="弹奏方式" prop="hands" min-width="40" align="center">
          <template slot-scope="scope">{{scope.row.hands | formatHands }}</template>
        </el-table-column>
        <el-table-column label="曲子特性" prop="musicCharacter" min-width="60" align="center">
          <template slot-scope="scope">{{scope.row.musicCharacter | formatMusicCharacter }}</template>
        </el-table-column>
        <el-table-column label="乐谱时期" prop="musicTime" min-width="40" align="center">
          <template slot-scope="scope">{{scope.row.musicTime | formatMusicTime }}</template>
        </el-table-column>
        <el-table-column label="作者知名程度" prop="authorKnownDegree" min-width="40" align="center">
          <template slot-scope="scope">{{scope.row.authorKnownDegree | formatAuthorKnownDegree }}</template>
        </el-table-column>
        <el-table-column label="作者国家" prop="authorCountry" min-width="40" align="center">
        </el-table-column>
        <el-table-column label="作者姓名" prop="authorName" min-width="40" align="center">
        </el-table-column>
        <!-- <el-table-column label="乐谱保存路径" prop="filePath" min-width="60" align="center">
        </el-table-column> -->
        <el-table-column label="入库时间" prop="createTime" min-width="60" align="center"></el-table-column>
        <el-table-column label="操作" min-width="80" align="center">
          <template slot-scope="scope">
            <div>
              <!-- <el-button type="primary" size="small" @click="showUpdateDialog(scope.$index)">修改</el-button> -->
              <el-button type="danger" size="small" @click="deleteMusic(scope.$index, scope.row)">删除</el-button>
              <el-button type="primary" size="small" @click="download(scope.$index, scope.row)">下载</el-button>
            </div>
          </template>
        </el-table-column>
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
			<el-form ref="musicForm" label-position="right" label-width="100px" :model="musicForm">
        <el-row>
          <el-col :span="11">
            <el-form-item label="作者姓名" prop="authorName">
              <el-select v-model="musicForm.authorNameId" placeholder="请选择" filterable style="padding-right:5px">
                <el-option v-for="item in authorNames" :key="item.authorNameId" :label="item.authorName" :value="item.authorNameId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="作者国家" prop="authorCountry">
              <el-select v-model="musicForm.authorCountryId" placeholder="请选择" filterable style="padding-right:5px">
                <el-option v-for="item in authorCountrys" :key="item.authorCountryId" :label="item.authorCountry" :value="item.authorCountryId"></el-option>
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
import { getMusics, insertMusic, updateMusic, deleteMusic, getCountrys, getNames } from '@/api/musics'

export default {
  data() {
    return {
      moreConditions: false,
      lessConditions: true,

      // table
      musics: [],
      page: 1,
      pageSize: 15,
      total: 0,
      currentPage: 1,

      filters: {
        musicName: '',
        musicScope: '',
        musicType: '',
        hands: '',
        musicCharacter: [],
        musicTime: '',
        authorKnownDegree: '',
        authorCountryId: '',
        authorNameId: ''
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
        id: '',
        musicName: '',
        musicScope: '',
        musicType: '',
        hands: '',
        musicCharacter: [],
        musicTime: '',
        authorKnownDegree: '',
        authorCountryId: '',
        authorNameId: '',
        filePath: '',
        uuid: ''
      },
      selectLimit: 10,

      // upload
      file: null,
      fileList: [],

      authorCountrys: [],
      authorNames: [],
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
        { label: '前奏曲', value: 19 },
        { label: '间奏曲', value: 20 },
        { label: '全集', value: 21 },
        { label: '舞曲', value: 22 }
      ],
      hands: [
        { label: '请选择', value: 0 },
        { label: '左手', value: 1 },
        { label: '右手', value: 2 },
        { label: '均衡', value: 3 }
      ],
      musicCharacters: [
        { label: '快速跑动', value: 'a' },
        { label: '八度', value: 'b' },
        { label: '双音', value: 'c' },
        { label: '附点', value: 'd' },
        { label: '三连音', value: 'e' },
        { label: '和弦', value: 'f' },
        { label: '断奏', value: 'g' },
        { label: '三六度', value: 'h' },
        { label: '快速', value: 'i' },
        { label: '慢速', value: 'j' },
        { label: '中速', value: 'k' },
        { label: '双手交替', value: 'l' }
      ],
      musicTimes: [
        { label: '请选择', value: 0 },
        { label: '巴洛克', value: 1 },
        { label: '古典', value: 2 },
        { label: '浪漫', value: 3 },
        { label: '印象', value: 4 },
        { label: '现代', value: 5 },
        { label: '流行', value: 6 }
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
    this.getNames()
    this.getCountrys()
  },
  filters: {
    formatMusicScope(musicScope) {
      const musicScopeMap = {
        1: '1-3级',
        2: '4-6级',
        3: '7-9级',
        4: '10级',
        5: '演奏'
      }
      return musicScopeMap[musicScope]
    },
    formatMusicType(musicType) {
      const musicTypeMap = {
        0: '',
        1: '音阶琶音',
        2: '练习曲',
        3: '即兴曲',
        4: '协奏曲',
        5: '幻想曲',
        6: '奏鸣曲',
        7: '谐谑曲',
        8: '夜曲',
        9: '狂想曲',
        10: '圆舞曲',
        11: '组曲（标题音乐）',
        12: '改编曲',
        13: '浪漫曲',
        14: '船歌',
        15: '室内乐',
        16: '复调作品',
        17: '双钢',
        18: '四手联弹',
        19: '前奏曲',
        20: '间奏曲',
        21: '全集',
        22: '舞曲'
      }
      return musicTypeMap[musicType]
    },
    formatHands(hands) {
      const handsMap = {
        0: '',
        1: '左手',
        2: '右手',
        3: '均衡'
      }
      return handsMap[hands]
    },
    formatMusicTime(musicTimes) {
      const musicTimesMap = {
        0: '',
        1: '巴洛克',
        2: '古典',
        3: '浪漫',
        4: '印象',
        5: '现代',
        6: '流行'
      }
      return musicTimesMap[musicTimes]
    },
    formatAuthorKnownDegree(authorKnownDegrees) {
      const authorKnownDegreesMap = {
        0: '',
        1: '极其知名',
        2: '知名',
        3: '小众'
      }
      return authorKnownDegreesMap[authorKnownDegrees]
    },
    formatMusicCharacter(character) {
      var returnData = ''
      if (character.indexOf('a') >= 0) {
        returnData = returnData + '快速跑动、'
      }
      if (character.indexOf('b') >= 0) {
        returnData = returnData + '八度、'
      }
      if (character.indexOf('c') >= 0) {
        returnData = returnData + '双音、'
      }
      if (character.indexOf('d') >= 0) {
        returnData = returnData + '附点、'
      }
      if (character.indexOf('e') >= 0) {
        returnData = returnData + '三连音、'
      }
      if (character.indexOf('f') >= 0) {
        returnData = returnData + '和弦、'
      }
      if (character.indexOf('g') >= 0) {
        returnData = returnData + '断奏、'
      }
      if (character.indexOf('h') >= 0) {
        returnData = returnData + '三六度、'
      }
      if (character.indexOf('i') >= 0) {
        returnData = returnData + '快速'
      }
      if (character.indexOf('j') >= 0) {
        returnData = returnData + '慢速'
      }
      if (character.indexOf('k') >= 0) {
        returnData = returnData + '中速'
      }
      if (character.indexOf('l') >= 0) {
        returnData = returnData + '双手交替'
      }
      return returnData
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    showMore() {
      this.moreConditions = true
      this.lessConditions = false
    },
    showLess() {
      this.moreConditions = false
      this.lessConditions = true
    },
    initQuery() {
      this.filters.musicName = ''
      this.filters.musicScope = ''
      this.filters.musicType = ''
      this.filters.hands = ''
      this.filters.musicCharacter = []
      this.filters.musicTime = ''
      this.filters.authorKnownDegree = ''
      this.filters.authorCountryId = ''
      this.filters.authorNameId = ''
      this.getMusics()
    },
    httpRequest(item) {
      this.file = item.file
    },
    getMusics() {
      const params = {
        page: this.page,
        size: this.pageSize,
        musicName: this.filters.musicName,
        musicScope: this.filters.musicScope,
        musicType: this.filters.musicType,
        hands: this.filters.hands,
        musicCharacter: this.filters.musicCharacter.toString(),
        musicTime: this.filters.musicTime,
        authorKnownDegree: this.filters.authorKnownDegree,
        authorCountryId: this.filters.authorCountryId,
        authorNameId: this.filters.authorNameId
        // date: new Date().getTime()
      }
      getMusics(params).then(res => {
        if (res.code === 1) {
          this.musics = res.data.records
          this.total = res.data.total
        }
      })
    },
    getNames() {
      getNames().then(res => {
        if (res.code === 1) {
          this.authorNames = res.data
        }
      })
    },
    getCountrys() {
      getCountrys().then(res => {
        if (res.code === 1) {
          this.authorCountrys = res.data
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.musicForm.musicName = ''
      this.musicForm.musicScope = 0
      this.musicForm.musicType = 0
      this.musicForm.hands = 0
      this.musicForm.musicCharacter = []
      this.musicForm.musicTime = 0
      this.musicForm.authorKnownDegree = 0
      this.musicForm.authorCountryId = 0
      this.musicForm.authorNameId = 0
      this.musicForm.filePath = ''
    },
    showInsertDialog() {
      this.musicForm.musicName = ''
      this.musicForm.musicScope = 0
      this.musicForm.musicType = 0
      this.musicForm.hands = 0
      this.musicForm.musicCharacter = []
      this.musicForm.musicTime = 0
      this.musicForm.authorKnownDegree = 0
      this.musicForm.authorCountryId = 1
      this.musicForm.authorNameId = 1
      this.musicForm.filePath = ''
      this.dialogType = 'insert'
      this.fileList = []
      this.showDialog = true
    },
    insertMusic() {
      this.$refs.musicForm.validate((valid) => {
        const formData = new FormData()
        formData.append('musicName', this.musicForm.musicName)
        formData.append('musicScope', this.musicForm.musicScope)
        formData.append('musicType', this.musicForm.musicType)
        formData.append('hands', this.musicForm.hands)
        formData.append('musicCharacter', this.musicForm.musicCharacter.toString())
        formData.append('musicTime', this.musicForm.musicTime)
        formData.append('authorKnownDegree', this.musicForm.authorKnownDegree)
        formData.append('authorCountryId', this.musicForm.authorCountryId)
        formData.append('authorNameId', this.musicForm.authorNameId)
        formData.append('file', this.file)
        insertMusic(formData).then(res => {
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
    deleteMusic($index, row) {
      this.$confirm('确定删除此条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = { id: row.id }
        deleteMusic(param).then(res => {
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
    download($index, row) {
      window.open('http://' + window.location.hostname + ':9110/data/' + row.uuid + '.pdf')
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
