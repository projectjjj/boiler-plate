const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const { User } = require("./models/User")
const config = require('./config/key')
//어플리케이션 분석 x-www-form-urlencoded 로 되어있는 것 분석
app.use(bodyParser.urlencoded({extended:true}))
//json 타입으로 된 것 분석
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log('몽고db 연결 성공!'))
.catch(err => console.log('config',config.mongoURI))

app.get('/', (req, res) => {
  res.send('Hello World!ffff')
})

app.post('/register',(req, res)=> {
    //회원가입 할때 필요한 entity를 불러오야겟네
    //user 로 인스턴스 만들기
    const user = new User(req.body)
    user.save((err,userInfo) => {
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success:true
        })
    })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})